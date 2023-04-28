<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSQLite } from 'vue-sqlite-hook';
import { getCurrentInstance } from 'vue';

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
