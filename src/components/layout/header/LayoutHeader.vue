<template>
  <q-header
    v-if="!isHideHeader"
    :style="[
      !isSubheaderHidden ? 'z-index: 100' : 'z-index: -1',
      { background: getRootHeaderBackground },
    ]"
    bordered
  >
    <div class="row">
      <q-toolbar>
        <div class="col-2">
          <q-btn
            v-if="isBack"
            color="white"
            icon="arrow_back"
            rounded
            dense
            flat
            @click="goBack"
          />
        </div>
        <div
          class="col-8 text-center text-h6 text-white q-pl-lg q-pr-sm header-title"
        >
          <LayoutHeaderTitle />
        </div>

        <div class="col-2 text-center q-mr-md q-ml-sm">
          <LayoutHeaderHome />
        </div>
      </q-toolbar>
    </div>

    <div v-if="isHideHeader" v-show="!isSubheaderHidden" class="height-200">
      <q-scroll-observer @scroll="onScroll" />
    </div>
  </q-header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import LayoutHeaderHome from './LayoutHeaderHome.vue';
import LayoutHeaderTitle from 'src/components/layout/header/parts/LayoutHeaderTitle.vue';
import QuasarScrollInterface from 'src/types/quasarScrollInterface.js';

const props = defineProps({
  isHideHeader: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBack: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const router = useRouter();

const goBack = () => router.go(-1);
const scrollTopPosition = ref<number>(0);

const isSubheaderHidden = computed((): boolean => props.isHideHeader);

const onScroll = (value: QuasarScrollInterface): void => {
  scrollTopPosition.value = value.position.top;
};

const getRootHeaderBackground = computed(() => {
  if (props.isHideHeader) {
    return 'linear-gradient(#00000000, #00000000) !important';
  } else {
    return 'linear-gradient(#199745, #199745) !important';
  }
});
</script>
