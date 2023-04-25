<template>
  <q-page>
    <!-- <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      ...
    </van-index-bar> -->
    <van-index-bar :index-list="indexList">
      <div v-for="item in filterData" :key="item.id">
        <van-index-anchor :index="item.index"></van-index-anchor>
        <van-cell
          v-for="child in item.children"
          :key="child.id"
          :title="child.name"
        />
      </div>
    </van-index-bar>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import pinyin from 'js-pinyin';
console.log(pinyin.getFullChars('管理员'));
console.log(pinyin.getCamelChars('管理员'));

const indexList = ref<Array>([]);
const filterData = ref<Array>([
  {
    index: 'A',
    id: 1,
    children: [
      { name: '张三', id: 1 },
      { name: '里斯', id: 2 },
    ],
  },
  {
    index: 'B',
    id: 2,
    children: [
      { name: 'wanger', id: 3 },
      { name: 'Params', id: 4 },
    ],
  },
  {
    index: 'C',
    id: 2,
    children: [
      { name: 'wanger', id: 3 },
      { name: 'Params', id: 4 },
    ],
  },
]);
onMounted(() => {
  indexList.value = [...Array(26).keys()].map((i) =>
    String.fromCharCode(i + 65)
  );
});
</script>
