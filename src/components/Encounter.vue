<template>
  <nav class="encounter">
    <action
      v-for="action of actions"
      :action="action"
      :key="action.timestamp"
      @show="$emit('show', $event)"></action>
  </nav>
</template>

<script>
import Action from './Action.vue'

export default {
  name: 'Encounter',
  props: ['actions'],
  components: { Action }
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

  .encounter .action:first-of-type::before {
    opacity: 0;
  }

  .encounter .action::before {
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
