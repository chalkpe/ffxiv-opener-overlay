<template>
  <div id="app" :hidden="hidden">
    <span v-if="!me || !me.id || !me.name">
      앗... 인식된 플레이어가 없습니다! 지역 이동 한 번만 부탁드려요!
    </span>

    <nav class="skills">
      <skill
        v-for="(skill, i) of encounter"
        :skill="skill"
        :key="skill.job + skill.name + i"
        @show="tooltip = $event"></skill>
    </nav>

    <tooltip :skill="tooltip"></tooltip>
  </div>
</template>

<script>
import listen from './listener'
import db from './assets/database.json'

import Skill from './components/Skill.vue'
import Tooltip from './components/Tooltip.vue'

const jobs = {
  '13': '나이트',
  '14': '몽크',
  '15': '전사',
  '16': '용기사',
  '17': '음유시인',
  '18': '백마도사',
  '19': '흑마도사',
  '1a': '비술사',
  '1b': '소환사',
  '1c': '학자',
  '1d': '쌍검사',
  '1e': '닌자',
  '1f': '기공사',
  '20': '암흑기사',
  '21': '점성술사',
  '22': '사무라이',
  '23': '적마도사'
}

const obj = arr => Object.assign({}, ...arr)
const patch = (o, k, a, b) => (o[k][a] = o[k][b] = o[k][a] || o[k][b])

const skills = obj(db.map(job => ({ [job.name]: obj(job.skills.pve.map(skill => ({ [skill.name]: skill }))) })))
patch(skills, '소환사', '트라이디재스터', '트라이디제스터')

export default {
  name: 'app',
  components: {
    Skill, Tooltip
  },

  data: () => ({
    me: {
      id: '',
      job: '',
      name: '',
      level: 0,
    },

    hidden: false,
    encounter: [
      // {timestamp: '0', job: '소환사', skill: '루인가'},
      // {timestamp: '1', job: '소환사', skill: '루인라'},
      // {timestamp: '2', job: '소환사', skill: '트라이디재스터'},
    ],

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
      this.encounter.push({
        job: this.me.job,
        timestamp: Date.now(),
        ...(skills[this.me.job][m[2]] || { name: m[2] })
      })
    },

    onCommand ({ args }) {
      args = args.split(' ')

      switch (args[0]) {
        case 'reset':
          this.encounter = []
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

  .skills {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;

    transition: all 0.5s ease;
    transform-origin: top left;
  }

  .skill:first-of-type::before {
    opacity: 0;
  }

  .skill::before {
    width: 0;
    height: 0;
    margin: 0 0.2rem 0.4rem 0.2rem;

    content: "";
    display: inline-block;
    vertical-align: middle;

    border-left: 0.5rem solid white;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
  }
</style>
