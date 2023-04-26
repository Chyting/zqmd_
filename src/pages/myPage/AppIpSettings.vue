<template>
  <q-page>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-y-sm">
        <q-input color="theme" v-model="zqmd" label="执勤末端后台IP"> </q-input>

        <q-input color="theme" v-model="oss" label="文件OSS服务IP"> </q-input>

        <q-input
          color="theme"
          v-model="message"
          label="短消息通信服务IP"
        ></q-input>

        <q-input
          color="theme"
          v-model="messageInfo"
          label="短消息后台服务IP"
        ></q-input>

        <q-input color="theme" v-model="taishi" label="态势后台IP"></q-input>

        <q-input color="theme" v-model="tfsk" label="情况上报服务IP"></q-input>

        <q-toggle
          color="theme"
          class="q-mt-md"
          v-model="isZqmd"
          label="登录到巡逻末端后台/态势后台"
        ></q-toggle>

        <div><q-btn label="确定" type="submit" color="theme" /></div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { Toast } from '@capacitor/toast';
const $q = useQuasar();
const router = useRouter();

//定义配置IP
const zqmd = ref<string>('');
const oss = ref<string>('');
const message = ref<string>('');
const messageInfo = ref<string>('');
const taishi = ref<string>('');
const tfsk = ref<string>('');
const isZqmd = ref<boolean>(true);
const isZqmdValue = ref<string>('');
isZqmdValue.value = isZqmd.value ? 'true' : 'false';

//缓存到本地数组
const data: Array<string> = new Array<string>();
//读取本地缓存IP文件
const readInfo = $q.localStorage.getItem('deployIp');
//读取的文件数据转为string
if (JSON.stringify(readInfo) != null && JSON.stringify(readInfo) !== '') {
  const show = JSON.stringify(readInfo)
    .replace('[', '')
    .replace(']', '')
    .replace(/"/g, '')
    .replace(/null/g, '');
  // .replaceAll('"', '');  不适配手机
  //本地缓存文件中的json数据转数组
  const showInfo = show.split(','); // 在每个逗号(,)处进行分解。
  //回显缓存IP
  zqmd.value = showInfo[0];
  oss.value = showInfo[1];
  message.value = showInfo[2];
  messageInfo.value = showInfo[3];
  taishi.value = showInfo[4];
  tfsk.value = showInfo[5];
  isZqmdValue.value = showInfo[6];
  isZqmd.value =
    isZqmdValue.value !== null &&
    isZqmdValue.value !== '' &&
    isZqmdValue.value === 'true';
  showInfo.length = 0;
}

//将输入框的数据保存到内存
const saveInfo = () => {
  //清空上一次数据
  data.length = 0;

  data.push(zqmd.value);
  data.push(oss.value);
  data.push(message.value);
  data.push(messageInfo.value);
  data.push(taishi.value);
  data.push(tfsk.value);
  data.push(isZqmd.value ? 'true' : 'false');

  try {
    $q.localStorage.set('deployIp', data);

    showToast('保存成功！');
    data.length = 0;

    router.go(-1);
  } catch (e) {
    // 由于Web Storage API错误，
    // 数据未成功保存
    showToast('保存失败！');
  }
};

const showToast = (info: string) => {
  Toast.show({
    text: info,
    duration: 'short',
    position: 'center',
  });
};

const onSubmit = () => {
  saveInfo();
};
</script>
