<template>
  <main class="encounter-wrapper">
    <nav class="encounter">
      <ActionIcon
        v-for="action of actions"
        :key="action.timestamp"
        :action="action"
        @show="tooltip = $event"
      />
    </nav>

    <ActionTooltip :action="tooltip" />
  </main>
</template>

<script>
import ActionIcon from './ActionIcon.vue'
import ActionTooltip from './ActionTooltip.vue'

export default {
  name: 'ActionEncounter',
  components: { ActionIcon, ActionTooltip },
  props: { actions: { type: Array, required: true } },
  data: () => ({ tooltip: null })
}
</script>

<style scoped>
  .encounter-wrapper {
    flex-grow: 1;
    padding: 0.5rem;
    position: relative;
  }

  .encounter {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
    row-gap: 0.25rem;

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
