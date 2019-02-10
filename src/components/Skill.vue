<template>
  <div class="skill">
    <div class="wrapper">
      <img v-if="skill" :src="skill.icon" :alt="skill.name" :title="skill.name">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['skill']
  }
</script>

<style scoped>
  .skill .wrapper {
    width: 3rem;
    height: 3rem;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background: url("../assets/background.png") no-repeat 0.25rem 0.125rem;
    background-size: 2.5rem 2.5rem;
  }

  .skill .wrapper img {
    display: block;
    position: absolute;

    width: 2.5rem;
    height: 2.5rem;
    z-index: 1;

    left: 50%;
    top: 0.125rem;
    margin-left: -1.25rem;
  }

  .skill .wrapper::after {
    width: 3rem;
    height: 3rem;
    display: block;
    position: absolute;

    top: 0;
    left: 0;
    z-index: 2;

    content: "";
    background: url("../assets/frame.png") no-repeat;
    background-size: cover;
}
</style>
