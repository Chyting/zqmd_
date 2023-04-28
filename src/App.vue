<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useContactStore } from 'src/stores/contact';
import { useSQLite } from 'vue-sqlite-hook';
import { getCurrentInstance } from 'vue';

const contact = useContactStore();
const router = useRouter();
router.beforeEach((to, from, next) => {
  const list = ['/', 'home', 'message', 'my']; // 将需要切换效果的路由名称组成一个数组
  const toName = to.name as string; // 即将进入的路由名字
  const fromName = from.name as string; // 即将离开的路由名字
  const toIndex = list.indexOf(toName); // 进入下标
  const fromIndex = list.indexOf(fromName); // 离开下标
  let direction = '';
  if (toIndex == -1 || fromIndex == -1) {
    if (to.path == '/list' && from.path == '/messageEdit') {
      direction = 'left';
    } else if (to.path == '/list' && from.path == '/addContact') {
      direction = 'left';
    } else {
      if (toIndex > fromIndex) {
        // 如果进入的下标小于离开的下标，那么是左滑
        direction = 'left';
      } else {
        direction = 'right'; // 如果进入的下标大于离开的下标，那么是右滑
      }
    }
  }
  contact.setDirection(direction);
  return next();
});

//数据库
const app = getCurrentInstance();
const isModalOpen = app?.appContext.config.globalProperties.$isModalOpen;
const contentMessage = app?.appContext.config.globalProperties.$messageContent;
const jsonListeners = app?.appContext.config.globalProperties.$isJsonListeners;
const onProgressImport = async (progress: string) => {
  if (jsonListeners.jsonListeners.value) {
    if (!isModalOpen.isModal.value) isModalOpen.setIsModal(true);
    contentMessage.setMessage(
      contentMessage.message.value.concat(`${progress}\n`)
    );
  }
};
const onProgressExport = async (progress: string) => {
  if (jsonListeners.jsonListeners.value) {
    if (!isModalOpen.isModal.value) isModalOpen.setIsModal(true);
    contentMessage.setMessage(
      contentMessage.message.value.concat(`${progress}\n`)
    );
  }
};
if (app != null) {
  // !!!!! if you do not want to use the progress events !!!!!
  // since vue-sqlite-hook 2.1.1
  // app.appContext.config.globalProperties.$sqlite = useSQLite()
  // before
  // app.appContext.config.globalProperties.$sqlite = useSQLite({})
  // !!!!!                                               !!!!!
  app.appContext.config.globalProperties.$sqlite = useSQLite({
    onProgressImport,
    onProgressExport,
  });
}
</script>
