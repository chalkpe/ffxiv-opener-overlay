<template>
  <div v-if="action" class="tooltip">
    <article>
      <h1 class="name">
        {{ action.skill.name }}
        <span v-if="action.job" class="job">{{ action.job.name[action.skill.client] }}</span>
      </h1>

      <p class="effect">
        {{ action.skill.effect.replace(/<br>/gi, '\n') }}
      </p>

      <span v-if="action.timestamp" class="timestamp">
        {{ new Date(action.timestamp).toISOString() }}
      </span>
    </article>
  </div>  
</template>

<script>
export default {
  props: { action: { type: Object, default: null } }
}
</script>

<style scoped>
  .tooltip {
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    position: absolute;

    padding: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .tooltip .name {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .tooltip .job {
    color: #ccc;
    font-size: 0.9rem;
  }

  .tooltip .effect {
    color: #aaa;
    font-size: 0.9rem;
    white-space: pre-line;
  }

  .tooltip .timestamp {
    color: #888;
    font-size: 0.75rem;
    font-family: Consolas, monospace;
  }
</style>
