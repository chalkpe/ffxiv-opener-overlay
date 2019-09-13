<template>
  <nav class="profile">
    <span v-if="me.name">{{ me.name }}</span><span v-if="me.server"> @ {{ me.server }}</span>
    <br>
    <span v-if="me.job">
      {{ me.job.name[me.client ? me.client.code : 'na'] }}
      <span v-if="me.level">&ndash; Lv {{  me.level  }}</span>
    </span>
  </nav>
</template>

<script>
export default {
  name: 'Profile',
  props: ['me']
}
</script>

<style scoped>
  .profile {
    text-align: center;
    word-break: keep-all;
  }
</style>
