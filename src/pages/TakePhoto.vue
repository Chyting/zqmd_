<template>
  <q-page>
    <div class="q-mt-md">
      <div class="text-h6">图片</div>
      <br />
      <div>
        <img :src="imageSrc" />
        <span> <img src="add" @click="captureImage" /> </span>
      </div>
      <br />
      <div class="text-h6">视频</div>
      <br />
      <div>
        <img :src="imageSrc" />
      </div>
      <br />
      <div></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

const imageSrc = ref('');

const captureImage = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Photos,
    resultType: CameraResultType.Uri,
  });

  //结果将因resultType选项的值而异。
  //CameraResultType.Uri-从image.webPath获取结果
  //CameraResultType.Base64-从image.base64String获取结果
  //CameraResultType.DataUrl-从image.DataUrl获取结果
  if (image != null && image.webPath != null && image.webPath !== 'undefined') {
    imageSrc.value = image.webPath;
  }
};
</script>

<style lang="sass" scoped></style>
