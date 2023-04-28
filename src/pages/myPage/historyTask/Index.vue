<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="row relative-position">
      <van-search
        class="col-11"
        v-model="keywords"
        placeholder="请输入账号/用户名"
      />
      <q-icon
        size="30px"
        class="col-1 relative-position"
        name="date_range"
        color="primary"
        @click="show = true"
        v-ripple
      ></q-icon>
      <van-calendar v-model:show="show" @confirm="onConfirm" />
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      class="full-width"
      style="height: 500px"
    >
      <q-list dense padding class="rounded-borders">
        <q-infinite-scroll @load="onLoad" style="height: 500px">
          <q-item
            clickable
            v-for="(item, index) in list"
            :key="item"
            class="caption q-py-sm"
          >
            <q-badge class="shadow-1" style="height: 15px" :label="index + 1">
            </q-badge>
            <div class="flex col"></div>
          </q-item>
        </q-infinite-scroll>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
const date = ref('');
const show = ref(false);
const keywords = ref(false);
const thumbStyle = ref({
  width: '0',
});
const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 50; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};
</script>
