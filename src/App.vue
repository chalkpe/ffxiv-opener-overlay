<template>
  <div id="app" :hidden="hidden">
    <ActionEncounter :actions="actions" />
    <PlayerProfile v-if="!actions.length" :me="me" />
  </div>
</template>

<script>
import listen from './listener'
import clients from './clients'
import database from './database'

import PlayerProfile from './components/PlayerProfile.vue'
import ActionEncounter from './components/ActionEncounter.vue'

export default {
  name: 'App',
  components: { PlayerProfile, ActionEncounter },

  data: () => ({
    hidden: false,
    actions: [],
    me: {
      id: 0,
      name: '',
      level: 0,
      job: null,
      client: null
    }
  }),

  mounted () {
    listen(d => this.onLogLine(d))
    if (window.location.hostname === 'localhost') console.log(this, database)
  },

  methods: {
    onLogLine (data) {
      switch (data.type) {
        case 'use': return this.onUse(data)
        case 'me': return this.onMeAdded(data)
        case 'add': return this.onEntityAdded(data)
        case 'cmd': return this.onCommand(data)
      }
    },

    onMeAdded ({ id, name }) {
      this.me.id = id
      this.me.name = name
    },

    onEntityAdded ({ id, job, level, server }) {
      if (id !== this.me.id) return

      this.me.level = level
      this.me.server = server
      this.me.job = Object.values(database).find(j => j.name.code === job)
    },

    onUse ({ message }) {
      this.checkUsage(message, this.me.client || clients)
    },

    checkUsage (message, client) {
      if (Array.isArray(client))
        return client.forEach(c => this.checkUsage(message, c))

      const m = client.patterns
        .map(pattern => pattern.exec(message))
        .find(m => m && (m[1] === client.you || m[1] === this.me.name))

      if (!m) return
      this.me.client = client
      const skill = this.me.job[`${client.code}:${m[2]}`]
      if(skill) this.actions.push({ skill, job: this.me.job, timestamp: Date.now() })
    },

    onCommand ({ args }) {
      args = args.split(' ')

      switch (args[0]) {
        case 'reset':
          this.actions = []
          break

        case 'scale':
          document.querySelector('html').style.fontSize = `${16 * parseFloat(args[1])}px`
          break

        case 'toggle':
          this.hidden = !this.hidden
      }
    }
  }
}
</script>

<style>
  * {
    margin: 0; padding: 0;
  }

  html {
    font-size: 16px;
    font-family: Roboto, 'Noto Sans JP', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: white;
  }

  *::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 0.25rem;
  }

  *::-webkit-scrollbar-button {
    display: none;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background: rgba(158, 158, 158, 0.5);
  }
</style>

<style scoped>
  #app {
    width: 100vw;
    height: 100vh;
    border-radius: 0.5rem;

    overflow-x: hidden;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
  }

  #app[hidden] {
    display: none;
  }
</style>
