<template>
  <div id="app" :hidden="hidden">
    <profile :me="me" :skills="skills"></profile>
    <encounter :skills="skills" @show="tooltip = $event"></encounter>
    <tooltip :skill="tooltip"></tooltip>
  </div>
</template>

<script>
import listen from './listener'
import database from './database'
import jobs from './assets/jobs.json'

import Profile from './components/Profile.vue'
import Tooltip from './components/Tooltip.vue'
import Encounter from './components/Encounter.vue'

export default {
  name: 'app',
  components: {
    Tooltip, Profile, Encounter
  },

  data: () => ({
    me: {
      id: '',
      job: '',
      name: '',
      level: 0,
    },

    skills: [
      // {timestamp: '0', job: '소환사', skill: '루인가'},
      // {timestamp: '1', job: '소환사', skill: '루인라'},
      // {timestamp: '2', job: '소환사', skill: '트라이디재스터'},
    ],

    hidden: false,
    tooltip: null
  }),
  
  mounted () {
    console.log(this)
    listen(d => this.onLogLine(d))
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

    onEntityAdded ({ id, job, level }) {
      if (id !== this.me.id) return

      this.me.level = level
      this.me.job = jobs[job.toLowerCase()]
    },

    onUse ({ message }) {
      const m = /(.+)[이가] (.+)[을를] 시전했습니다/.exec(message)

      if (!m || m[1] !== this.me.name) return
      this.skills.push({
        job: this.me.job,
        timestamp: Date.now(),
        ...(database[this.me.job][m[2]] || { name: m[2] })
      })
    },

    onCommand ({ args }) {
      args = args.split(' ')

      switch (args[0]) {
        case 'reset':
          this.skills = []
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
    font-family: 'Malgun Gothic', sans-serif;
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
    padding: 0.5rem;
    box-sizing: border-box;
    overflow-x: hidden;

    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
  }

  #app[hidden] {
    display: none;
  }
</style>
