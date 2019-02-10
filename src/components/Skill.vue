<template>
  <div class="skill" >
    <div class="wrapper" v-if="skill">
      <img :src="skill.icon" :alt="skill.name" :title="skill.name" width="40" height="40">
    </div>

    <div v-else>?</div>
  </div>
</template>

<script>
  export default {
    props: ['skill']
  }
</script>

<style scoped>
  .skill .wrapper {
    width: 48px;
    height: 48px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  .skill .wrapper img {
    display: block;
    position: absolute;

    top: 2px;
    left: 50%;
    z-index: 1;
    margin-left: -20px;
  }

  .skill .wrapper::after {
    width: 48px;
    height: 48px;
    display: block;
    position: absolute;

    top: 0;
    left: 0;
    z-index: 2;

    content: "";
    background: url("../assets/frame.png") no-repeat;
}
</style>
