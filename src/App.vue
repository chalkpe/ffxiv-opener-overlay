<template>
  <div id="app">
    <article v-for="job of db" :key="job.link">
      <h4>{{ job.name }}</h4>
      <skill v-for="skill of job.skills.pve" :skill="skill" :key="skill.name"></skill>
    </article>
  </div>
</template>

<script>
import db from './assets/database.json'
import Skill from './components/Skill.vue'

export default {
  name: 'app',
  components: {
    Skill
  },

  data: () => ({ db }),
  created () {
    // eslint-disable-next-line no-console
    document.addEventListener('onLogLine', e => console.log(e.detail))
  }
}
</script>
