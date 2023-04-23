<template>
  <!-- <LayoutHeaderSearch v-if="isHomePage" /> -->

  <q-space />

  <span>
    <q-btn
      v-show="isshowSetting"
      behavior="mobile"
      class="q-ml-md"
      icon="eva-settings-outline"
      to="/settings"
      size="15px"
      dense
      flat
    />
    <q-btn
      v-show="!isShowText"
      behavior="mobile"
      class="text-white text-center no-wrap round"
      flat
      round
      label="确定"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isshowSetting = computed(() => route.path === '/my');

const showTextPage = ['/settings'];
const isShowText = computed(
  () => showTextPage.findIndex((item) => item === route.path) === -1
);
</script>

<style scoped></style>
