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
      style="height: 550px"
    >
      <q-list dense padding class="rounded-borders">
        <q-infinite-scroll @load="onLoad">
          <q-item
            clickable
            v-ripple
            v-for="(item, index) in list"
            :key="item.id"
            class="caption q-py-sm row q-gutter-sm cursor-pointer"
            style="font-size: 10px"
          >
            <q-item-section class="col-1">
              <q-badge
                class="shadow-1"
                style="height: 15px; width: 20px"
                :label="index + 1"
              >
              </q-badge>
            </q-item-section>
            <q-item-section class="col-2">
              <span>{{ item.taskType }}</span>
              <span>{{ item.tool }}</span>
            </q-item-section>
            <q-item-section class="col-5">
              <span>{{ item.address }}</span>
              <div class="flex justify-between">
                <span>{{ item.timePeriod }}</span>
                <span>{{ item.timePeriod }}</span>
              </div>
            </q-item-section>
            <q-item-section class="col-3">
              <span>{{ item.taskTime }}</span>
            </q-item-section>
          </q-item>
        </q-infinite-scroll>
        <q-inner-loading
          :showing="visible"
          label="加载中..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { HistoryTask } from '@/constant/historyType';
const date = ref('');
const show = ref(false);
const keywords = ref<string>('');
const thumbStyle = ref({
  width: '0',
});
const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value: Date) => {
  show.value = false;
  date.value = formatDate(value);
};

const list = ref<HistoryTask[]>([]);
const visible = ref<boolean>(true);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    const obj: HistoryTask = {
      taskType: 'XL',
      address: '安民河桥-老丁码头-文安滩',
      taskTime: '2023-04-11 11:42:22',
      timePeriod: '8:30-9:30',
      tool: '徒步+乘车',
      distance: '8.0',
    };
    for (let i = 0; i < 15; i++) {
      obj.id = i;
      list.value.push(obj);
    }
    if (list.value.length >= 15) {
      visible.value = false;
    }
  }, 1000);
};
</script>
