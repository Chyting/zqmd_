<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="organinzation"
      node-key="id"
      color="grey-7"
      text-color="grey-7"
      selected-color="primary"
      @update:ticked="tickNode"
      v-model:expanded="expanded"
      :default-expand-all="true"
      :ticked="ticked"
      ref="tree"
      tick-strategy="strict"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const treeJson = [
  {
    children: [{ id: 1, label: 'test', pid: 0, children: [] }],
    id: 1,
    label: 'test',
    pid: 0,
  },
];
export default {
  data() {
    return {
      organinzation: [],
      expanded: [],
      ticked: [],
      lastTicked: [],
    };
  },
  mounted() {
    this.getdata().then((res) => {
      this.organinzation = Object.assign([], res);
      this.dataload = true;
    });
  },
  methods: {
    ...mapActions('zhinuo', ['handleNodeGet']),
    getdata() {
      return new Promise((selove, reject) => {
        this.$showloading(this);
        this.handleNodeGet({
          type: 'all',
        }).then((res) => {
          this.$clearloading(this);
          if (res.errno == 0) {
            selove(this.initTree(res.data));
          } else {
            selove([]);
          }
        });
      });
    },

    initTree(data) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let children = [];
        if (temp.children && temp.children.length > 0) {
          children = this.treeChildren(temp.children);
        }
        arr.push({
          label: temp.name,
          id: temp.id,
          pid: temp.pid,
          children,
        });
      }
      return Object.assign([], arr);
    },
    // 这里是对后台返回的数据进行处理的 吧数据处理成符合树组件要求的数据格式
    treeChildren(resdata) {
      let data = [];
      if (resdata) {
        for (let i = 0; i < resdata.length; i++) {
          let item = resdata[i];
          let havechild = [];
          //判断是否存在子节点
          if (item.children && item.children.length > 0) {
            havechild = Object.assign([], this.treeChildren(item.children));
          }
          data.push({
            label: item.name,
            id: item.id,
            pid: item.pid,
            children: havechild,
          });
        }
      }
      return data;
    },
    //根据节点值获取树数据
    getObjByID(data, id) {
      let r = null;
      for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (element.id == id) {
          r = element;
          break;
        }
        if (element.children && element.children.length > 0) {
          r = this.getObjByID(element.children, id);
          if (r != null) {
            break;
          }
        }
      }
      return r;
    },
    // 获取当前节点下所有子节点的id
    getChildAll(data) {
      let childrenId = [];
      function recursion(nodedata) {
        for (const children of nodedata.children) {
          childrenId.push(children.id);
          if (children.children.length > 0) {
            recursion(children);
          }
        }
      }
      recursion(data);
      return childrenId;
    },
    // 勾选时触发的方法，主要就是在这里对数据进行处理的
    tickNode(val) {
      //  val为当前节点操作之后，树节点中所有处于勾选状态的节点数据
      //  this.lastTicked也可以在this.ticked = val;之前通过this.ticked 获得，数据是一样的，都是视图更新前勾选的数据
      this.ticked = val;
      this.lastTicked = this.$refs.tree.getTickedNodes().map((val) => val.id);
      // this.$refs.tree.getTickedNodes()获取视图更新前的数据
      const addTickedNodes = _.difference(val, this.lastTicked); // 通过比较得出此次操作勾选的节点
      const delTickedNodes = _.difference(this.lastTicked, val); // 通过比较得出此次操作取消勾选的节点
      if (addTickedNodes.length == 0) {
        this.optionChoiceLimts(delTickedNodes.join(''), 'remove', val);
      } else {
        this.optionChoiceLimts(addTickedNodes.join(''), 'add', val);
      }
    },
    // 处理树展示的勾选（主要是来做勾选父节点子节点自动勾选和取消父节点子节点自动取消的数据处理）
    optionChoiceLimts(id, type, val) {
      let findObj = this.getObjByID(this.organinzation, id);
      if (type == 'remove') {
        const allchildrenId = this.getChildAll(findObj);
        const removeAllchild = _.union([Number(id)], allchildrenId);
        const tickeNode = _.difference(this.lastTicked, removeAllchild);
        this.ticked = tickeNode;
      } else {
        const allchildrenId = this.getChildAll(findObj);
        const tickeNode = _.union(val, allchildrenId, [Number(id)]);
        this.ticked = tickeNode;
      }
    },
  },
};

//   此时就可以通过this.ticked 获取页面上树节点中所有出游勾选状态的节点了
</script>
