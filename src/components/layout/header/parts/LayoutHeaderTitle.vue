<template>
  <span class="text-h6 text-white header-title">
    {{ title }}
  </span>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
let title = ref<string>();

// 监听路由变化 设置顶部标题
watchEffect(() => {
  if (route.meta.title == '聊天') {
    title.value = route.query.id as string;
  } else {
    title.value = <string>route.meta.title;
  }
});
</script>

<style scoped>
/* .header-title {
  text-align: center;
} */
</style>
