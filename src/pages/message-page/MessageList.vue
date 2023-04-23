<template>
  <q-page>
    <div class="q-py-sm">
      <q-list separator :model-value="line">
        <q-item
          class="q-py-md"
          v-for="line in list"
          :key="line.id"
          clickable
          v-ripple
          @click="openEdit(line.name)"
        >
          <q-item-section avatar>
            <q-avatar color="theme" text-color="white">
              <small>{{ line.name[0] }}</small>
              <q-badge color="red" floating>4</q-badge></q-avatar
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
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { number } from '@intlify/core-base';
// import { route } from 'quasar/wrappers';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const list = [
  {
    id: 1,
    name: '王静',
    key: '王静',
    lastMessage: '你今天吃饭了吗',
    time: '1分钟前',
    to: '/messageEdit',
  },
  {
    id: 2,
    name: '李倩',
    key: '手机WiFi',
    lastMessage: '你今天加班了吗',
    time: '30分钟前',
    to: '/messageEdit',
  },
  {
    id: 3,
    name: '杨总',
    key: '杨总',
    lastMessage: '今天饭真好吃',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 4,
    name: '正宗',
    key: '正宗',
    lastMessage: '今天i额武汉人福额好吃',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 5,
    name: '哈比',
    key: '哈比',
    lastMessage: '武汉啊好的',
    time: '一天前',
    to: '/messageEdit',
  },

  {
    id: 6,
    name: '实心',
    key: '实心',
    lastMessage: '头疼',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 7,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 8,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 9,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 7,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 8,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 9,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 10,
    name: '张颖',
    key: '张颖',
    lastMessage: '颈椎疼',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 11,
    name: '严迪',
    key: '严迪',
    lastMessage: '真拿受压真',
    time: '一天前',
    to: '/messageEdit',
  },
  {
    id: 12,
    name: '王粉粉',
    key: '王粉粉',
    lastMessage: '好瞌睡',
    time: '一天前',
    to: '/messageEdit',
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

// const list: Array<any> = new Array<any>();

// for (let i = 0; i++; i < 12) {
//   line.id = 1;
//   line.name = '王静';
//   line.key = '王静';
//   line.lastMessage = '你今天吃饭了吗';
//   line.time = '1分钟前';
//   line.to = '/messageEdit';
//   // line.id = i;
//   // if (i % 2 === 0) {
//   //   (line.name = '王静'),
//   //     (line.key = '王静'),
//   //     (line.lastMessage = '你今天吃饭了吗'),
//   //     (line.time = '1分钟前'),
//   //     (line.to = '/messageEdit');
//   // } else if (i % 3 == 0) {
//   //   (line.name = '李倩'),
//   //     (line.key = '李倩'),
//   //     (line.lastMessage = '你今天加班了吗'),
//   //     (line.time = '30分钟前'),
//   //     (line.to = '/messageEdit');
//   // } else if (i % 5 == 0) {
//   //   (line.name = '王粉粉'),
//   //     (line.key = '王粉粉'),
//   //     (line.lastMessage = '今天饭真好吃'),
//   //     (line.time = '一天前'),
//   //     (line.to = '/messageEdit');
//   // } else {
//   //   (line.name = '严迪'),
//   //     (line.key = '严迪'),
//   //     (line.lastMessage = '严迪真好看呀'),
//   //     (line.time = '一个月前'),
//   //     (line.to = '/messageEdit');
//   // }
//   list.push(line);
// }
</script>
