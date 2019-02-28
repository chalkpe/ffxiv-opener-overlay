<template>
  <nav class="profile">
    <span v-if="!me || !me.id || !me.name || !me.job">
      인식된 플레이어가 없습니다!<br>
      지역 이동 한 번만 부탁드려요!
    </span>

    <span v-else-if="!skills || !skills.length">
      {{me.name}} / {{me.job}} / 레벨 {{me.level}}
    </span>
  </nav>
</template>

<script>
export default {
  name: 'Profile',
  props: ['me', 'skills']
}
</script>
