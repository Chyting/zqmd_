<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-20 11:25:12
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-21 15:48:48
 * @FilePath: \vue_quasar_cesium\src\pages\IndexPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <q-page class="full-width" style="overflow: hidden">
    <q-btn color="primary" label="Primary" />
    <vc-config-provider :cesium-path="vcConfig.cesiumPath">
      <vc-viewer
        @ready="onViewerReady"
        :showCredit="false"
        :infoBox="false"
        style="height: 1000px; width: 100%"
      >
        <vc-layer-imagery :sort-order="20">
          <vc-imagery-provider-tianditu
            map-style="cva_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery>
        <vc-layer-imagery :sort-order="10">
          <vc-imagery-provider-tianditu
            map-style="img_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
            ref="provider"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery>
      </vc-viewer>
    </vc-config-provider>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

import { flyToCamera } from 'vue-cesium/es/utils/cesium-helpers';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const vcConfig = reactive({
      cesiumPath: '/Cesium/Cesium.js',
    });
    const otherOpts = reactive({
      position: 'bottom-left',
      offset: [2, 3],
    });

    const mainFabOpts = reactive({
      direction: 'left',
    });

    const accesstToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Y2U0ZTk2Ni1jNzdkLTQ3OWYtYjVmYS0yMGM3YTk3NjgzMmUiLCJpZCI6Njk5Nywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0ODA1MTc0OH0.Csy6yyAnv6JSBppH0Ou3ahshqcHFEhP27iOz5gjQMEo';

    const ready = ({ Cesium, viewer }) => {
      console.log('我成功加载之后', Cesium, viewer);

      flyToCamera(
        viewer,
        {
          position: {
            x: -2324661.04245,
            y: 5396877.95,
            z: 4894530.259174151,
          },
          // heading: 0, //航向角
          // pitch: 180, // 俯仰角
          roll: 6.283185307179586, // 据中心的距离 米为单位
        },
        {
          duration: 1,
          zIndex: 10,
          complete: () => {
            console.log('我已飞入');
          },
        }
      );
    };

    /**
     * 隐藏图元集合
     */
    const collectionRef = ref(null);
    const billboards1 = ref([]);
    const billboards2 = ref([]);
    const modelMatrix = ref(null);

    const positions = ref([
      [105, 32],
      [106, 34],
      [107, 30],
    ]);
    // methods
    const onClicked = (e) => {
      console.log(e);
    };
    const unload = () => {
      collectionRef.value.unload();
    };
    const reload = () => {
      collectionRef.value.reload();
    };
    const load = () => {
      collectionRef.value.load();
    };
    const onViewerReady = ({ Cesium, viewer }) => {
      flyToCamera(
        viewer,
        {
          position: {
            x: -2324661.04245,
            y: 5396877.95,
            z: 4894530.259174151,
          },
          // heading: 0, //航向角
          // pitch: 180, // 俯仰角
          roll: 6.283185307179586, // 据中心的距离 米为单位
        },
        {
          duration: 1,
          zIndex: 10,
          complete: () => {
            console.log('我已飞入');
          },
        }
      );
      for (var i = 0; i < 15; i++) {
        let billboard1 = {};
        billboard1.position = {
          lng: Math.random() * 40 + 85,
          lat: Math.random() * 30 + 21,
        };
        billboard1.image = '/images/飞机场.svg';
        billboard1.scale = 0.1;
        billboards1.value.push(billboard1);

        let billboard2 = {};
        billboard2.position = {
          lng: Math.random() * 40 + 85,
          lat: Math.random() * 30 + 21,
        };
        billboard2.image = '/images/岛屿.svg';
        billboard2.scale = 0.15;
        billboards2.value.push(billboard2);
      }

      modelMatrix.value = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(105, 38, 10000)
      );
    };

    const image = 'public/images/video.svg';
    const position = [90, 40, 20]; // [90, 40, 10000]
    const distanceDisplayCondition = { near: 0, far: 20000000 };
    const horizontalOrigin = 0;
    const scale = ref(0.25);
    const entity = ref(null);
    const billboard = ref(null);

    return {
      vcConfig,
      accesstToken,
      otherOpts,
      mainFabOpts,

      ready,

      unload,
      reload,
      load,
      onClicked,
      onViewerReady,
      collectionRef,
      billboards1,
      billboards2,
      modelMatrix,

      positions,

      image,
      position,
      distanceDisplayCondition,
      horizontalOrigin,
      scale,
      entity,
      billboard,
    };
  },
});
</script>

<style lang="scss">
.vc-box {
  width: 200px;
  height: 150px;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 16px;
}
</style>
