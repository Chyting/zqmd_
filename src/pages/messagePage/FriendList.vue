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
                    <img :src="line.avator" />
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
import pinyin from 'ts-pinyin';
import { useRouter } from 'vue-router';

const router = useRouter();

interface PersonData {
  name: string;
  id: number;
  avator: string;
}

let basePersonData = ref([] as PersonData[]);

basePersonData.value = [
  { name: '张三', id: 1, avator: 'src/assets/images/pic1.jpeg' },
  { name: '里斯', id: 2, avator: 'src/assets/images/pic2.png' },
  { name: '王', id: 3, avator: 'src/assets/images/pic4.jpeg' },
  { name: 'Params', id: 4, avator: 'src/assets/images/pic3.jpeg' },
  { name: '王二麻子', id: 5, avator: 'src/assets/images/pic6.jpg' },
  { name: '喜喜', id: 6, avator: 'src/assets/images/pic7.jpeg' },
  { name: '剌不花', id: 7, avator: 'src/assets/images/pic1.jpeg' },
  { name: '婆婆', id: 8, avator: 'src/assets/images/pic2.png' },
  { name: '徐', id: 9, avator: 'src/assets/images/pic3.jpeg' },
  { name: 've', id: 10, avator: 'src/assets/images/pic8.jpeg' },
  { name: '冰灯', id: 11, avator: 'src/assets/images/pic3.jpeg' },
  { name: '那个', id: 12, avator: 'src/assets/images/pic10.jpeg' },
  { name: '漫光', id: 13, avator: 'src/assets/images/pic2.png' },
  { name: '库', id: 14, avator: 'src/assets/images/pic9.jpeg' },
];

let keywords = ref<string>('');
let filterData = computed(() => {
  return refactorAddressBook(basePersonData.value);
});

let indexBarRef = ref();
// 重构通讯录人员数组
const refactorAddressBook = (list: Array<PersonData>): PersonData[] => {
  let newArr = {} as any;
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
const selectBar = (index: number) => {
  console.log('点击的字符是：', index);
};
const changeBar = (index: number) => {
  console.log('当前高亮的索引：', index);
};
const openEdit = (name: string) => {
  router.push({ path: '/messageEdit', query: { id: name } });
};
</script>
