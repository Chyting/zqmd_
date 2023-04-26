<template>
  <q-page class="q-py-sm">
    <q-list :model-value="line">
      <q-item
        v-for="line in list"
        :key="line.id"
        clickable
        v-ripple
        @click="openEdit(line.name)"
      >
        <van-swipe-cell class="fit">
          <div class="flex q-pa-xs">
            <q-item-section avatar>
              <q-avatar color="theme" text-color="white">
                <img :src="line.avator" />
                <q-badge color="red" floating>2</q-badge></q-avatar
              >
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-regular">{{
                line.name
              }}</q-item-label>

              <q-item-label caption lines="1">
                <span> {{ line.lastMessage }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption text-color="txt666" lines="1">{{
                line.time
              }}</q-item-label>
            </q-item-section>
          </div>

          <template #right>
            <van-button square type="primary" dense text="标为未读" />
            <van-button square type="warning" dense text="不显示" />
            <van-button
              square
              type="danger"
              dense
              text="删除"
              @click="cancel"
            />
          </template>
        </van-swipe-cell>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';

const list = [
  {
    id: 1,
    name: '王静',
    key: '王静',
    lastMessage: '你今天吃饭了吗',
    time: '1分钟前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic1.jpeg',
  },
  {
    id: 2,
    name: '李倩',
    key: '手机WiFi',
    lastMessage: '你今天加班了吗',
    time: '30分钟前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic8.jpeg',
  },
  {
    id: 3,
    name: '杨总',
    key: '杨总',
    lastMessage: '今天饭真好吃',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic3.jpeg',
  },
  {
    id: 4,
    name: '正宗',
    key: '正宗',
    lastMessage: '今天i额武汉人福额好吃',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic6.jpg',
  },
  {
    id: 5,
    name: '哈比',
    key: '哈比',
    lastMessage: '武汉啊好的',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic7.jpeg',
  },

  {
    id: 6,
    name: '实心',
    key: '实心',
    lastMessage: '头疼',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic8.jpeg',
  },
  {
    id: 7,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic9.jpeg',
  },
  {
    id: 8,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic10.jpeg',
  },
  {
    id: 9,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic2.png',
  },
  {
    id: 7,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic1.jpeg',
  },
  {
    id: 8,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic1.jpeg',
  },
  {
    id: 9,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic1.jpeg',
  },
  {
    id: 10,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic4.jpeg',
  },
  {
    id: 11,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic7.jpeg',
  },
  {
    id: 12,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
    avator: 'src/assets/images/pic6.jpg',
  },
];

const line = reactive({
  id: 1,
  name: '',
  key: '',
  lastMessage: '',
  time: '',
  to: '/messageEdit',
});

const router = useRouter();
const openEdit = (name: string) => {
  router.push({ path: '/messageEdit', query: { id: name } });
};
const cancel = () => {
  showConfirmDialog({
    message: '确认删除吗？',
  }).then(
    () => {
      console.log('删除成功');
    },
    () => {
      console.log('取消了');
    }
  );
};
</script>

<style lang="scss" scoped></style>
