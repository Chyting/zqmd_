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
      @click="$router.push('/test')"
      label="确定"
    />
    <q-btn
      v-show="isShowAddress"
      behavior="mobile"
      icon="contact_mail"
      to="/list"
      size="13px"
      color="grey-2"
      dense
      flat
    />
    <q-btn
      v-show="isShowAddPerson"
      behavior="mobile"
      icon="person_add"
      to="/addContact"
      size="15px"
      color="grey-2"
      dense
      flat
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isshowSetting = computed(() => route.path === '/my');
const isShowAddress = computed(() => route.path === '/message');
const isShowAddPerson = computed(() => route.path === '/list');

const showTextPage = ['/settings'];
const isShowText = computed(
  () => showTextPage.findIndex((item) => item === route.path) === -1
);
</script>

<style scoped></style>
