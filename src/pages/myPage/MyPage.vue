<template>
  <q-page>
    <div class="avator_bg"></div>
    <q-avatar size="80px" class="q-px-md">
      <img src="https://cdn.quasar.dev/img/avatar.png" />
    </q-avatar>
    <div class="q-pa-md flex justify-start">
      <div
        v-for="item in btnList"
        :key="item.id"
        class="q-mr-md flex items-center relative-position"
        @click="jumpTo(item.path)"
        v-ripple
      >
        <q-icon size="30px" :name="item.icon"></q-icon>
        <span>{{ item.event }}</span>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const btnList = ref([
  { id: 1, event: '历史任务', icon: 'history', path: '/historyTask' },
  { id: 2, event: '我的地点', icon: 'place', path: '/myPlace' },
  { id: 3, event: '我上报的', icon: 'near_me', path: '/myReport' },
]);
const jumpTo = (path: string) => {
  router.push(path);
};
</script>
<style lang="scss">
.avator_bg {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    z-index: -1;
    display: inline-block;
    content: '';
    width: 100%;
    height: 40px;
    background-color: rgb(25, 148, 80);
  }
}
</style>
