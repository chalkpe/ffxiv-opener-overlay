<template>
  <div id="app" :style="style">
    <span v-if="!me || !me.id || !me.name">
      앗... 인식된 플레이어가 없습니다! 지역 이동 한 번만 부탁드려요!
    </span>

    <skill
      v-for="(e, i) of encounter"
      :key="e.job + e.skill + i"
      :skill="skills[e.job][e.skill]"></skill>
  </div>
</template>

<script>
import listen from './listener'
import db from './assets/database.json'
import Skill from './components/Skill.vue'

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
    Skill
  },

  data: () => ({
    skills,
    me: {
      id: '',
      job: '',
      name: '',
      level: 0,
    },

    style: '',
    encounter: [
      // {timestamp: '0', job: '소환사', skill: '루인가'},
      // {timestamp: '1', job: '소환사', skill: '루인라'},
      // {timestamp: '2', job: '소환사', skill: '트라이디재스터'},
    ]
  }),
  
  mounted () {
    listen(d => this.onLogLine(d))
  },

  methods: {
    onLogLine (data) {
      console.log(data)
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

      console.log(m)

      if (!m || m[1] !== this.me.name) return
      this.encounter.push({ job: this.me.job, skill: m[2] })
    },

    onCommand ({ args }) {
      args = args.split(' ')

      switch (args[0]) {
        case 'reset':
          this.encounter = []
          break

        case 'size':
          this.style = `transform: scale(${args[1]});`
          break
      }
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    color: white;
  }
</style>

<style scoped>
  #app {
    padding: 5px;
    width: calc(100vw - 10px);
    height: calc(100vh - 10px);

    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .skill:first-of-type::before {
    opacity: 0;
  }

  .skill::before {
    width: 0;
    height: 0;
    margin: 0 2px 6px 3px;

    content: "";
    display: inline-block;
    vertical-align: middle;

    border-left: 7px solid white;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
</style>
