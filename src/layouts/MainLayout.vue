<template>
  <q-layout view="lHh Lpr lFf">
    <LayoutHeader :is-hide-header="isShowHeader" :is-back="isShowFooter" />

    <q-page-container :class="{ 'footer-padding': isShowHeader }" class="fit">
      <router-view
        class="transition_body"
        v-slot="{ Component }"
        :class="{ 'bg-grey-2': isShowHeader, 'q-px-xs': !isShowHeader }"
      >
        <transition :name="transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
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
import { computed, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
const route = useRoute();
const $q = useQuasar();

//当路由地址不是map时，显示头部
const headerPages = ['/home'];
const isShowHeader = computed(
  () => headerPages.findIndex((item) => item === route.path) !== -1
);

//当路由地址不是主界面tab时，隐藏footer,并显示返回键
const footerPages = ['/home', '/message', '/my'];
const isShowFooter = computed(
  () => footerPages.findIndex((item) => item === route.path) === -1
);
onMounted(() => {
  //设置沉浸式
  if ($q.platform.is.android) {
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
  }
});
let transitionName = ref<string>('');
watch(route, () => {
  const baseRouteList = ['/home', '/message', '/my'];
  if (baseRouteList.indexOf(route.path) !== -1) {
    transitionName.value = 'slide-right';
  } else {
    transitionName.value = 'slide-left';
  }
});
</script>

<style lang="scss" scoped>
.footer-padding {
  padding-bottom: 207px !important;
}

.footer {
  position: fixed !important;
}
.transition_body {
  transition: all 0.2s ease-out;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-active {
  transform: translate(-50%, 0);
}
.slide-right-enter {
  transform: translate(-50%, 0);
}
.slide-right-leave-active {
  transform: translate(100%, 0);
}
</style>
