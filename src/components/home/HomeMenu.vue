<template>
  <q-page class="row justify-between bg-white">
    <div class="q-mt-lg">
      <q-btn label="上报" to="/qksb"></q-btn>
      <br />
      <q-btn label="打卡" to="/rwdk"></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'messsage-info',
});
</script>
