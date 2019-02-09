<template>
  <div class="skill" :title="skill.name">
    <img :src="skill.icon" :alt="skill.name" width="40" height="40">
  </div>
</template>

<script>
  // const jobs = {
  //   '13': '나이트',
  //   '14': '몽크',
  //   '15': '전사',
  //   '16': '용기사',
  //   '17': '음유시인',
  //   '18': '백마도사',
  //   '19': '흑마도사',
  //   '1a': '비술사',
  //   '1b': '소환사',
  //   '1c': '학자',
  //   '1d': '쌍검사',
  //   '1e': '닌자',
  //   '1f': '기공사',
  //   '20': '암흑기사',
  //   '21': '점성술사',
  //   '22': '사무라이',
  //   '23': '적마도사'
  // }

  export default {
    props: ['skill']
  }
</script>

<style scoped>
  .skill {
    position: relative;
    width: 48px;
    height: 48px;
    display: inline-block;
    vertical-align: middle;
  }

  .skill img {
    display: block;
    position: absolute;

    top: 2px;
    left: 50%;
    z-index: 1;
    margin-left: -20px;
  }

  .skill::after {
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
