<template>
  <q-dialog v-model="seamless" position="bottom" class="dialog_bottom">
    <div class="bg-bgcolor q-px-md">
      <div class="no-wrap q-pt-md" flat>
        <span class="text-subtitle1 text-weight-bold">上报 </span>
        <q-icon
          class="absolute-right q-pt-md q-mr-sm"
          size="24px"
          name="mdi-close"
          @click="closeDialog"
        ></q-icon>
      </div>

      <div class="bg-white q-mt-sm q-px-md content_box">
        <div class="q-pt-md no-wrap text-center ll_selete flex items-center">
          <div class="q-mt-none q-ml-sm">
            <span class="text-subtitle1"> 情况类型</span>
            <span class="text-subtitle1 text-red"> *</span>
          </div>
          <span class="text-left selete_box">
            <q-btn-dropdown
              class="text-subtitle1 text-txt666"
              :label="seleteValue"
              style="font-size: 14px"
              unelevated
            >
              <q-list :model-value="seleteDatas">
                <q-item
                  clickable
                  v-close-popup
                  @click="onItemClick(seleteInfo.name)"
                  v-for="seleteInfo in seleteDatas"
                  :key="seleteInfo.id"
                >
                  <q-item-section>
                    <q-item-label>{{ seleteInfo.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown></span
          >
        </div>
        <div class="q-mt-none q-ml-sm">
          <span class="text-subtitle1"> 上传附件</span>
          <span class="text-subtitle1 text-red"> *</span>
          <span class="q-ml-sm text-txt999" style="font-size: 14px">
            请提供事件的凭证照片</span
          >
        </div>
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
          <div class="uploadBtn bg-theme">
            <section>
              <span
                v-if="imageList.length > 0"
                class="empty bg-theme"
                @click="empty"
              >
                清空
              </span>
            </section>
          </div>
        </div>

        <div class="q-ml-sm text-subtitle1">情况描述</div>
        <div class="conter q-my-sm q-mx-sm q-pb-lg">
          <textarea
            class="q-mx-sm q-pr-md"
            placeholder="描述具体情况,有助于快速处理"
            id="textarea"
            maxlength="200"
            v-on:keyup="content()"
            v-on:compositionstart="importStart()"
            v-on:compositionend="importEnd()"
            v-model="contentData"
          ></textarea>
          <p class="number text-primary text-weight-bold text-overline">
            {{ conterNum }}/200
          </p>
        </div>

        <q-btn
          unelevated
          rounded
          class="btn_submit absolute-center q-mt-lg"
          color="theme"
          label="提交"
          @click="submit"
          style="
             {
              height: 30px;
              width: 80%;
            }
          "
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import { Toast } from '@capacitor/toast';

//是否显示
const props = defineProps({
  isShowDialog: {
    type: Boolean,
    default: false,
  },
});
//修改父组件的隐藏属性
const emit = defineEmits(['update:isShowDialog']);
//必须用reactive，ref不刷新
let seamless = reactive(false as any);
//动态改变dialog是否显示，因为props的值，不能给v-model赋值
watchEffect(() => {
  seamless = props.isShowDialog;
});
// 关闭弹窗并修改v-model值
const closeDialog = () => {
  seamless = false;
  emit('update:isShowDialog', seamless);
};
//选择框数据
const seleteDatas = [
  {
    id: 1,
    name: 'Photos',
  },
  {
    id: 2,
    name: 'Videos',
  },
  {
    id: 3,
    name: 'Articles',
  },
];
const seleteValue = ref<string>('请选择事件类型');

//选择框点击
const onItemClick = (name: string) => {
  seleteValue.value = name;
};

//输入框并监听字数
const contentData = ref<string>();
const conterNum = ref<number>(0);
const cInput = ref<boolean>(false);

const content = () => {
  if (cInput.value == false && contentData.value) {
    conterNum.value = contentData.value.length;
  }
};
const importStart = () => {
  cInput.value = true;
};
const importEnd = () => {
  cInput.value = false;
  // write();
};

//提交上报数据
const submit = () => {
  console.log();
};

//图片选择数据
interface ImageValue {
  key: number;
  name: string;
  src: string;
  size: number;
}

const imagevlaue = ref<ImageValue>();

const imageList: ImageValue[] = reactive([]);

//默认为0，不然初始值会有一张图片
if (imagevlaue.value?.src === '') {
  imageList.length = 0;
}
// 清空图片
const empty = async () => {
  imageList.length = 0;
};
// 删除一张图片
const remove = async (index: number) => {
  if (index > -1) {
    imageList.splice(index, 1);
  }
};
//输入上传图片
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
</script>

<style scoped lang="scss">
.dialog_bottom {
  padding-bottom: 15px;
  .content_box {
    border-radius: 8px;
  }
  .ll_selete {
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .selete_box {
      margin-left: 10px;
      width: 200px;
    }
  }
  .imgUploader {
    margin: 0.5em 0 0.5em;
    // border: 1px solid #e5e5e5;

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
  .conter {
    width: 100%;
    height: 120px;
    position: relative;
    margin: 0.5em 0 0.5em;
  }
  .number {
    position: absolute;
    width: 98%;
    height: 8%;
    bottom: 0;
    padding: 0;
    text-align: right;
  }
  #textarea {
    position: absolute;
    bottom: 0;
    width: 98%;
    height: 100%;
    border: 1px solid #00000000;
    background-color: #eeeeee;
    border-radius: 8px;
    text-indent: 8px;
    padding: 10px;
  }
  .btn_submit {
    position: relative;
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
