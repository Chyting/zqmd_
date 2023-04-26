<template>
  <q-page class="q-px-none">
    <van-search v-model="keywords" placeholder="请输入搜索关键词" />
    <van-index-bar
      ref="indexBarRef"
      :index-list="Object.keys(filterData)"
      :sticky-offset-top="50"
      @select="selectBar"
      @change="changeBar"
    >
      <template v-for="item in Object.entries(filterData)" :key="item.index">
        <van-index-anchor :index="item[0]" />
        <van-cell>
          <template #icon>
            <q-list class="fit">
              <q-item
                class="q-py-md"
                v-for="line in item[1]"
                :key="line.id"
                clickable
                v-ripple
                @click="openEdit(line.name)"
              >
                <q-item-section avatar>
                  <q-avatar color="theme" text-color="white">
                    <small>{{ line.name }}</small>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-regular">{{
                    line.name
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </van-cell>
      </template>
    </van-index-bar>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import pinyin from 'js-pinyin';
import { useRouter } from 'vue-router';

const router = useRouter();
let basePersonData: object[] = ref([
  { name: '张三', id: 1 },
  { name: '里斯', id: 2 },
  { name: '王', id: 3 },
  { name: 'Params', id: 4 },
  { name: '王二麻子', id: 5 },
  { name: '喜喜', id: 6 },
  { name: '剌不花', id: 7 },
  { name: '婆婆', id: 8 },
  { name: '徐', id: 9 },
  { name: 've', id: 10 },
  { name: '冰灯', id: 11 },
  { name: '那个', id: 12 },
  { name: '漫光', id: 13 },
  { name: '库', id: 14 },
]);
let keywords: string = ref('');
let filterData = computed(() => {
  return refactorAddressBook(basePersonData.value);
});

let indexBarRef = ref();
// 重构通讯录人员数组
const refactorAddressBook = (list: Array): object[] => {
  let newArr = {};
  list.map((child) => {
    let letter = pinyin.getCamelChars(child.name).charAt(0);
    if (newArr[letter]) {
      newArr[letter].push(child);
    } else {
      newArr[letter] = [child];
    }
  });
  return newArr;
};
// 点击索引栏的字符
const selectBar = (index) => {
  console.log('点击的字符是：', index);
};
const changeBar = (index) => {
  console.log('当前高亮的索引：', index);
};
const openEdit = (name: string) => {
  router.push({ path: '/messageEdit', query: { id: name } });
};
</script>
