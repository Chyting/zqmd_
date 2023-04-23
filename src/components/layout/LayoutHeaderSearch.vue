<template>
  <q-input
    :model-value="search"
    class="layout-header-search col-grow"
    type="search"
    debounce="300"
    placeholder="请输入搜索内容"
    standout="bg-white text-black"
    rounded
    dense
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LayoutHeaderSearch',

  setup() {
    const search = ref('');

    return {
      search,
    };
  },
});
</script>

<style lang="sass" scoped>
.layout-header-search
  ::v-deep(.q-field__control)
    background: green
  ::v-deep(.q-placeholder)
    color: white
</style>
