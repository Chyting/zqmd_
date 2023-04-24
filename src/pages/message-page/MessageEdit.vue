<template>
  <div class="q-py-md">
    <q-list :model-value="messageLine">
      <q-chat-message label="4月19日 10:10" />
      <q-item v-for="messageLine in messageList" :key="messageLine.id">
        <div class="full-width" justify-center>
          <q-chat-message
            :text="[messageLine.text]"
            :avatar="messageLine.ava"
            :sent="messageLine.sent"
            :stamp="messageLine.stamp"
            :bg-color="messageLine.sent ? 'green-4' : 'grey-3'"
          />
        </div>
      </q-item>
    </q-list>
    <div>
      <q-toolbar
        class="q-pt-sm q-pb-md bg-grey-11 text-white rounded-borders footer absolute-bottom"
      >
        <q-input
          class="bg-white full-width"
          dark
          dense
          standout
          v-model="text"
          autogrow
        >
        </q-input>
        <q-btn
          v-show="isshowAdd"
          round
          dense
          flat
          icon="add"
          class="q-ml-sm bg-grey-5"
          @click="addClick(true)"
        />

        <q-btn
          v-show="isshowSend"
          round
          flat
          label="发送"
          class="q-ml-sm bg-theme"
          @click="sendClick"
        />
      </q-toolbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { Filesystem } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// import mittBus from 'src/utils/mittBus';

const messageLine = ref('main');

const $q = useQuasar();

//动态设置标题
// onMounted(() => {
//   mittBus.emit('setTitle', route.query.id);
// });

const text = ref<string>('');

const isshowAdd = ref<boolean>(true);
const isshowSend = ref<boolean>(false);

watch(text, () => {
  isshowSend.value = text.value !== '';
  isshowAdd.value = text.value === '';
});

const messageList = ref<array>([
  {
    id: 1,
    name: '王静',
    key: '王静',
    text: '你今天吃饭了吗',
    stamp: '1分钟前',
    sent: true,
    ava: 'https://cdn.quasar.dev/img/avatar.png',
  },
  {
    id: 2,
    name: '李倩',
    key: '李倩',
    text: '今天星期几',
    stamp: '50秒前',
    sent: false,
    ava: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },

  {
    id: 4,
    name: '王静',
    key: '王静',
    text: '后台开发完了吗',
    stamp: '20分钟前',
    sent: true,
    ava: 'https://cdn.quasar.dev/img/avatar.png',
  },
  {
    id: 3,
    name: '李倩',
    key: '李倩',
    text: '钱啊哈哈哈好好笑',
    stamp: '今天下午',
    sent: false,
    ava: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },
]);

const sendClick = () => {
  text.value = '';
};

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.DataUrl,
  });

  console.log('imageUrl', image.webPath);
};

const pickPicture = async () => {
  const image = await Camera.pickImages({
    quality: 90,
    limit: 9,
  });

  console.log('imageUrl', image.photos.length);
};

const jump = () => {
  location.href = 'https://www.baidu.com/';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addClick = (grid: any) => {
  $q.bottomSheet({
    message: '  ',
    grid,
    actions: [
      {
        label: '相册',
        img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
        id: 'photo',
      },
      {
        label: '拍照',
        img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
        id: 'camera',
      },
      {
        label: '音视频',
        img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
        id: 'video',
      },
      {
        label: '短指令',
        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
        id: 'message',
      },
    ],
  }).onOk((action) => {
    switch (action.id) {
      case 'photo':
        // if("granted"===Filesystem.checkPermissions()){

        // }
        Filesystem.requestPermissions();
        pickPicture();
        break;
      case 'camera':
        takePicture();
        break;
      case 'video':
        jump();
        break;
      case 'message':
        break;
    }
  });
};
</script>
<style scoped></style>
