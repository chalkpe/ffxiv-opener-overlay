<template>
  <nav class="encounter">
    <skill
      v-for="(s, i) of skills"
      :skill="s"
      :key="s.job + s.name + i"
      @show="$emit('show', $event)"></skill>
  </nav>
</template>

<script>
import Skill from './Skill.vue'

export default {
  name: 'Encounter',
  props: ['skills'],
  components: { Skill }
}
</script>

<style scoped>
  .encounter {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;

    transition: all 0.5s ease;
    transform-origin: top left;
  }

  .encounter .skill:first-of-type::before {
    opacity: 0;
  }

  .encounter .skill::before {
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
