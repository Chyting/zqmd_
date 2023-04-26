<template>
  <q-page>
    <div class="q-mt-md text-subtitle1 text-weight-bold">图片</div>
    <div class="imgUploader">
      <div class="file-list">
        <section
          v-for="(imagevlaue, index) in imageList"
          :key="index"
          :model-value="imagevlaue"
          class="file-item draggable-item"
        >
          <img :src="imagevlaue.src" />
          <span class="file-remove" @click="remove(index)">+</span>
        </section>
        <section class="file-item" v-if="imageList.length < 5">
          <div class="add">
            <span><i class="fa fa-camera text-theme"></i></span>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="captureImage($event)"
              ref="ImageInput"
            />
          </div>
        </section>
      </div>
      <div class="uploadBtn">
        <section>
          <span v-if="imageList.length > 0" class="empty" @click="empty">
            清空
          </span>
        </section>
      </div>
    </div>
    <div class="q-mt-md text-subtitle1 text-weight-bold">视频</div>
    <div class="imgUploader">
      <div class="file-list">
        <section
          v-for="(file, position) in videoList"
          :key="position"
          :model-value="file"
          class="file-item draggable-item"
        >
          <video :src="file.src" />
          <span class="file-remove" @click="removeVideo(position)">+</span>
        </section>
        <section class="file-item" v-if="videoList.length < 2">
          <div class="add">
            <span><i class="fa fa-camera text-theme"></i></span>
            <input
              type="file"
              multiple
              accept="video/*"
              @change="seleteVideo($event)"
              ref="fileInput"
            />
          </div>
        </section>
      </div>
      <div class="uploadBtn">
        <section>
          <span v-if="videoList.length > 0" class="empty" @click="emptyVideo">
            清空
          </span>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Toast } from '@capacitor/toast';

interface ImageValue {
  key: number;
  name: string;
  src: string;
  size: number;
}

const imagevlaue = ref<ImageValue>({
  key: 0,
  name: '',
  src: '',
  size: 0,
});

const imageList = reactive([<ImageValue>imagevlaue.value]);
const videoList = reactive([<ImageValue>imagevlaue.value]);

if (imagevlaue.value.src === '') {
  imageList.length = 0;
}

if (imagevlaue.value.src === '') {
  videoList.length = 0;
}

// 清空图片
const empty = async () => {
  imageList.length = 0;
};

// 清空视频
const emptyVideo = async () => {
  videoList.length = 0;
};

// 删除一张图片
const remove = async (index: number) => {
  if (index > -1) {
    imageList.splice(index, 1);
  }
};
// 删除一个视频
const removeVideo = async (position: number) => {
  if (position > -1) {
    videoList.splice(position, 1);
  }
};
const ImageInput = ref<null | HTMLInputElement>(null);

//图片选择并回显
const captureImage = async (e: Event) => {
  // imageList.length = 0;
  const input = e.target as HTMLInputElement;
  let fileList = input.files;
  if (fileList != null) {
    for (let i = 0, len = fileList.length; i < len; i++) {
      const file = fileList[i] as File;
      if (fileList[i] != null && i < 5) {
        // 将图片文件转成BASE64格式
        let reader = new FileReader();
        reader.onload = (e) => {
          if (e.target != null && e.target.result != null) {
            imageList.push({
              key: i,
              name: file.name,
              size: file.size,
              src: e.target.result as string,
            });

            //只能写在这里，因为取图片有延迟，不能写在for循环外，或者做延时操作
            if (imageList.length > 5) {
              imageList.length = 5;
              Toast.show({
                text: '图片不能超过5张!',
                duration: 'short',
                position: 'center',
              });
              return;
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }

    // 上传图片
    // submit () {
    //   let formData = new FormData()
    //   this.imgStore.forEach((item, index) => {
    //     item.name = 'imgFiles[' + index + ']'
    //     formData.append(item.name, item.file)
    //   })
    // }
  }
};

//capacitor 提供的安卓图片选择第二种方法，回显比第一种快
// const pickImages = await Camera.pickImages({
//   quality: 50,
//   limit: 9,
// });
// if (pickImages) {
//   // imageList.length = 0;
//   for (let i = 0; i < pickImages.photos.length; i++) {
//     //去重,未完成
//     // const isHave = () =>
//     //   imageList.findIndex(
//     //     (item) => item.src === pickImages.photos[i].webPath
//     //   ) === -1;
//     if (i < 6) {
//       imageList.push({
//         key: i,
//         name: i + '',
//         size: 0,
//         src: pickImages.photos[i].webPath,
//       });
//     }
//   }
// }
// if (imageList.length > 5) {
//   imageList.length = 5;
//   Toast.show({
//     text: '图片不能超过5张!',
//     duration: 'short',
//     position: 'center',
//   });
// }

//// 要把这个导出去，这样才能够动态绑定
const fileInput = ref<null | HTMLInputElement>(null);

const seleteVideo = async (e: Event) => {
  videoList.length = 0;

  const input = e.target as HTMLInputElement;

  let fileList = input.files;
  if (fileList != null) {
    for (let i = 0, len = fileList.length; i < len; i++) {
      const file = fileList[i] as File;
      if (fileList[i] != null && i < 5) {
        // 将视频文件转成BASE64格式
        let reader = new FileReader();
        reader.onload = (e) => {
          if (e.target != null && e.target.result != null) {
            videoList.push({
              key: i,
              name: file.name,
              size: file.size,
              src: e.target.result as string,
            });

            //只能写在这里，因为取视频有延迟，不能写在for循环外，或者做延时操作
            if (videoList.length > 2) {
              videoList.length = 2;
              Toast.show({
                text: '视频不能超过2个!',
                duration: 'short',
                position: 'center',
              });
              return;
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.imgUploader {
  margin: 1em 0 2em;
  border: 1px solid #e5e5e5;

  .file-list {
    padding: 10px 0px;

    &::after {
      content: '';
      display: block;
      clear: both;
      visibility: hidden;
      line-height: 0;
      height: 0;
      font-size: 0;
    }

    .file-item {
      float: left;
      position: relative;
      width: 100px;
      text-align: center;

      img {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
      }

      video {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
      }

      .file-remove {
        position: absolute;
        right: 12px;
        top: 4px;
        width: 14px;
        height: 14px;
        color: white;
        cursor: pointer;
        line-height: 12px;
        border-radius: 100%;
        transform: rotate(45deg);
        background: rgba(0, 0, 0, 0.5);
      }

      .flie-loading {
        position: absolute;
        left: 0;
        right: 0;
        top: 1em;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .flie-finished {
        position: absolute;
        left: 0;
        right: 0;
        top: 1em;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }

      &:hover .file-remove {
        display: inline;
      }

      .file-name {
        margin: 0;
        height: 40px;
        word-break: break-all;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    cursor: pointer;
    border: 1px dashed #666;
    color: #fff;
    position: relative;
    background: #fff;

    .fa {
      font-size: 1.4em;
      color: #7dd2d9;
    }
  }

  .uploadBtn {
    position: relative;

    .empty {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #666;
      color: #fff;
      padding: 0.2em 1em;
    }
  }
}

input[type='file'] {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  border: 1px solid #000;
  opacity: 0;
}
</style>
