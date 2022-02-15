<template>
  <nav class="profile">
    <span v-if="me.name">{{ me.name }}
      <span v-if="me.server">@{{ server }}</span>
    </span>

    <span v-if="me.job">
      <img :src="`${iconPath}/${me.job.name.short}.png`"> {{ jobName }}
      <span v-if="me.level">Lv {{ me.level }}</span>
    </span>
    <span v-else>
      <img :src="`${iconPath}/error.png`"> Adventurer
    </span>

    <span class="version">v{{ version }}</span>
  </nav>
</template>

<script>
import pkg from '../../package.json'
export default {
  name: 'PlayerProfile',
  props: { me: { type: Object, required: true } },

  data: () => ({
    version: pkg.version,
    iconPath: 'https://github.com/hibiyasleep/kagerou/raw/master/share/img/class'
  }),
  
  computed: {
    jobName () {
      return this.me.client
        ? this.me.job.name[this.me.client.code]
        : this.me.job.name.short.toUpperCase()
    },
    server () {
      const map = {
        'KrCarbuncle': '카벙클',
        'KrChocobo': '초코보',
        'KrMoogle': '모그리',
        'KrTonberry': '톤베리',
        'KrFenrir': '펜리르'
      }
      return map[this.me.server] ?? this.me.server
    }
  }
}
</script>

<style scoped>
  .profile {
    font-size: 0.85rem;
    padding: 0.2rem 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .profile img {
    height: 1rem;
    vertical-align: sub;
  }

  span {
    display: inline-block;
  }

  span:not(:last-child) {
    margin-right: 1rem;
  }

  .version {
    float: right;
  }
</style>
