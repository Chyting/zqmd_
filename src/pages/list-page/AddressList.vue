<template>
  <div class="q-pa-md q-gutter-sm">
    <!--node-key包含唯一节点id的每个节点对象的属性名
    //selected 当前所选节点的键
    @update:selected="treeSelect"//当所选节点更改时发出
   accordion//允许将树设置为手风琴模式
   label-key="label"//包含节点标签的每个节点对象的属性名-->
    <q-tree
      :nodes="lazy"
      node-key="label"
      color="theme"
      v-model:selected="selected"
      @update:selected="treeSelect"
      label-key="label"
      class="treelist"
      ref="treeRef"
      default-expand-all
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-black">
            {{ prop.node.label }}
          </div>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const nodes = [
  {
    label: '组织机构',
    children: [
      { label: '九连一分队', lazy: false },
      { label: '九连二分队', lazy: false },
      { label: '九连三分队', lazy: false },
      { label: '八连执勤二分队', lazy: false },
    ],
  },
  {
    label: '组织席位',
    children: [
      { label: '指挥席', lazy: false },
      { label: '参谋长', lazy: false },
    ],
  },
];
export default {
  setup() {
    const router = useRouter();
    const selected = ref('');

    const treeSelect = () => {
      console.log(selected.value);
      if (
        selected.value != null &&
        selected.value.indexOf('组织机构') === -1 &&
        selected.value.indexOf('组织席位') === -1
      ) {
        router.push({ path: '/messageEdit', query: { id: selected.value } });
      }
    };

    return {
      lazy: ref(nodes),
      selected,
      treeSelect,
    };
  },
};
</script>
