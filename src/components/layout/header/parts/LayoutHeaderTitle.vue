<template>
  <span class="text-h6 text-white header-title">
    {{ props.title }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LayoutHeaderTitle',

  props: {
    title: {
      type: String,
      required: true,
      default: null,
    },
  },

  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
/* .header-title {
  text-align: center;
} */
</style>
