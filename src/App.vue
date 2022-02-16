<template>
  <div id="app" :hidden="hidden">
    <ActionEncounter :actions="actions" />
    <PlayerProfile v-if="!actions.length || !jobId" :me="me" :job="job" />
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

    jobId: '00',
    region: 'en',
    me: { id: 0, name: '', level: 0, server: '' }
  }),

  computed: {
    job () {
      const { jobId, database } = this
      return database?.find((job) => job.code === jobId)
    },

    client () {
      const { region } = this
      return clients.find((client) => client.code === region)
    }
  },

  mounted () {
    listen(d => this.onLogLine(d))
    database.getLanguage().then((r) => this.updateDatabase(r))

    if (window.location.hostname === 'localhost') console.log(this)
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

    async updateDatabase (region) {
      this.region = region
      this.database = await database.fetch(region)

      if (window.location.hostname === 'localhost') console.log(this.database)
    },

    onMeAdded ({ id, name }) {
      this.me.id = id
      this.me.name = name
    },

    onEntityAdded ({ id, job, level, server }) {
      if (id !== this.me.id) return

      this.jobId = job
      this.me.level = level
      this.me.server = server
    },

    onUse (data) {
      this.checkUsage(data, this.client || clients)
    },

    async checkUsage (data, client) {
      if (Array.isArray(client))
        return client.forEach(c => this.checkUsage(data, c))

      const { message, timestamp } = data
      const m = client.patterns
        .map(pattern => pattern.exec(message))
        .find(m => m && (m[1] === client.you || m[1] === this.me.name))

      if (!m) return
      if (this.client !== client) await this.updateClient(client.code)

      const job = this.job
      const name = m[2].trim()
      const skill = job?.skills?.pve?.find((s) => s.name === name) ?? { name, effect: '', icon: '' }

      this.actions.push({ timestamp, skill, job })
    },

    onCommand ({ args: command }) {
      const args = command.split(' ')

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
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
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
