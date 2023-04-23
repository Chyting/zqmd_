<template>
  <q-footer class="bg-white text-white" v-if="!isHideFooter" bordered>
    <q-tabs
      :model-value="tab"
      class="text-grey"
      active-color="theme"
      indicator-color="transparent"
      dense
      no-caps
    >
      <q-route-tab
        v-for="tab in tabsList"
        :key="tab.id"
        :label="tab.title"
        :name="tab.key"
        :icon="tab.icon"
        class="text-h6"
        :to="tab.ref"
      >
        <q-badge v-if="tab.isBradge" color="red" floating>{{
          count
        }}</q-badge></q-route-tab
      >
    </q-tabs>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LayoutFooter',

  props: {
    isHideFooter: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  setup() {
    const tab = ref(null);
    const count = ref(1);

    // if (tab.value === '任务') {
    //   count.value = 1;
    // } else if (tab.value === '消息') {
    //   count.value = 2;
    // }

    return {
      count,
      tab,
      tabsList,
    };
  },
});

const tabsList = [
  {
    id: 1,
    title: '任务',
    key: 'main',
    icon: 'home',
    ref: '/home',
    isBradge: true,
    count: 1,
  },
  {
    id: 2,
    title: '消息',
    key: 'message',
    icon: 'chat_bubble_outline',
    ref: '/message',
    isBradge: true,
    count: 2,
  },
  {
    id: 3,
    title: '通讯录',
    key: 'list',
    icon: 'list',
    ref: '/list',
    isBradge: false,
  },
  {
    id: 4,
    title: '我的',
    key: 'my',
    icon: 'schedule',
    ref: '/my',
    isBradge: false,
  },
];
</script>

<style scoped></style>
