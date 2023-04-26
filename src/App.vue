<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useContactStore } from 'stores/contact';
const contact = useContactStore();
const router = useRouter();
router.beforeEach((to, from, next) => {
  const list = ['/', 'home', 'message', 'my']; // 将需要切换效果的路由名称组成一个数组
  const toName: string = to.name; // 即将进入的路由名字
  const fromName: string = from.name; // 即将离开的路由名字
  const toIndex = list.indexOf(toName); // 进入下标
  const fromIndex = list.indexOf(fromName); // 离开下标
  let direction = '';
  if (toIndex == -1 || fromIndex == -1) {
    if (to.path == '/list' && from.path == '/messageEdit') {
      direction = 'left';
    } else if (to.path == '/list' && from.path == '/addContact') {
      direction = 'left';
    } else {
      if (toIndex > fromIndex) {
        // 如果进入的下标小于离开的下标，那么是左滑
        direction = 'left';
      } else {
        direction = 'right'; // 如果进入的下标大于离开的下标，那么是右滑
      }
    }
  }
  contact.setDirection(direction);
  return next();
});
</script>
