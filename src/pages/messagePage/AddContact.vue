<template>
  <q-page class="fit">
    <van-search v-model="keywords" placeholder="请输入账号/用户名" />
    <q-list class="fit">
      <q-item
        class="q-py-md row"
        v-for="person in contactList"
        :key="person.id"
        clickable
      >
        <q-item-section class="col-1.5" avatar>
          <q-avatar color="theme" text-color="white">
            <img :src="person.avator" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="col-2">
          <q-item-label class="text-weight-regular">{{
            person.name
          }}</q-item-label>
        </q-item-section>
        <q-item-section class="col-5"></q-item-section>

        <q-item-section class="col-2">
          <q-btn
            label="添加"
            color="secondary"
            size="md"
            dense
            @click.stop="addContact(person)"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
let keywords = ref('');
let contactList = ref([
  { id: '1', name: 'BHSG1', avator: 'src/assets/images/pic1.jpeg' },
  { id: '2', name: '张三丰', avator: 'src/assets/images/pic2.png' },
]);
const addContact = (person) => {
  console.log('成功添加联系人', person.name);
};
</script>
<style lang="scss"></style>
