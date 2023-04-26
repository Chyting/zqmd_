<template>
  <q-layout view="lHh Lpr lFf">
    <LayoutHeader :is-hide-header="isShowHeader" :is-back="isShowFooter" />

    <q-page-container :class="{ 'footer-padding': isShowHeader }" class="fit">
      <router-view
        class="transition_body"
        v-slot="{ Component }"
        :class="{ 'bg-grey-2': isShowHeader, 'q-px-xs': !isShowHeader }"
      >
        <transition :name="transitionName" mode="out-in">
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
import { computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useContactStore } from 'stores/contact';
const route = useRoute();
const $q = useQuasar();
const contactStore = useContactStore();

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
const transitionName = computed(() => {
  const viewDir = contactStore.viewDirection;
  let tranName = '';
  if (viewDir === 'left') {
    tranName = 'view-out';
  } else if (viewDir === 'right') {
    tranName = 'view-in';
  } else {
    tranName = 'fade';
  }

  return tranName;
});
</script>

<style lang="scss" scoped>
.footer-padding {
  padding-bottom: 207px !important;
}

.footer {
  position: fixed !important;
}

@keyframes inRight {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

@keyframes outLeft {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

.view-in-enter-active,
.view-out-leave-active {
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.view-in-enter-active {
  -webkit-animation-name: inRight;
  animation-name: inRight;
}

.view-out-leave-active {
  -webkit-animation-name: outLeft;
  animation-name: outLeft;
}
</style>
