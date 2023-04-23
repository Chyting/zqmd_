<template>
  <q-layout view="lHh Lpr lFf">
    <LayoutHeader
      class="absolute_top"
      :is-hide-header="isShowHeader"
      :is-back="isShowFooter"
    />

    <q-page-container :class="{ 'footer-padding': isShowHeader }">
      <router-view
        :class="{ 'bg-grey-2': isShowHeader, 'q-px-md': !isShowHeader }"
      />
    </q-page-container>

    <LayoutFooter
      class="footer absolute-bottom"
      :is-hide-footer="isShowFooter"
    />
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'components/layout/header/LayoutHeader.vue';
import LayoutFooter from 'components/layout/LayoutFooter.vue';
import { StatusBar } from '@capacitor/status-bar';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

//当路由地址不是map时，显示头部
const headerPages = ['/home'];
const isShowHeader = computed(
  () => headerPages.findIndex((item) => item === route.path) !== -1
);

// const $q = useQuasar();

//设置沉浸式
if (isShowHeader.value) {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: '#199745' });
  StatusBar.show();
  // $q.addressbarColor.set('#199745');
} else {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: '#ffffffff' });
  StatusBar.show();
  // $q.addressbarColor.set('#00000000');
}

//当路由地址不是主界面tab时，隐藏footer,并显示返回键
const footerPages = ['/home', '/message', '/list', '/my'];
const isShowFooter = computed(
  () => footerPages.findIndex((item) => item === route.path) === -1
);
</script>

<style lang="scss" scoped>
.footer-padding {
  padding-bottom: 207px !important;
}
.footer {
  position: fixed !important;
}
</style>
