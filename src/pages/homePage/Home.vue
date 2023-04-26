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
    <div class="map">
      <vc-viewer
        @ready="onViewerReady"
        :cesium-path="vcConfig.cesiumPath"
        :showCredit="false"
        :infoBox="false"
        style="height: 1000px; width: 100%"
      >
        <vc-collection-billboard :billboards="billboards1">
        </vc-collection-billboard>
        <vc-collection-primitive>
          <vc-collection-billboard
            :billboards="billboards2"
          ></vc-collection-billboard>
        </vc-collection-primitive>

        <vc-layer-imagery :sort-order="20">
          <vc-imagery-provider-tianditu
            map-style="cva_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery>
        <vc-layer-imagery :sort-order="12">
          <vc-imagery-provider-tianditu
            map-style="img_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
            ref="provider"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery>
      </vc-viewer>

      <!-- <q-icon name="eva-layers-outline" size="30px" @click="typeMap" /><br /> -->

      <div
        class="btn_buttom text-center q-mr-sm q-pb-sm q-gutter-y-sm absolute-bottom-right"
      >
        <div class="selete_map text-center">
          <q-fab
            square
            icon="eva-layers-outline"
            padding="xs"
            color="white"
            size="30px"
            direction="left"
          >
            <q-fab-action
              square
              color="white"
              @click="onClick(1)"
              icon="email"
            />

            <q-fab-action
              square
              color="white"
              @click="onClick(2)"
              icon="alarm"
            />
          </q-fab>
        </div>
        <q-icon
          name="mdi-arrow-up-bold-box-outline"
          @click="openQksb"
          size="30px"
        /><br />
        <q-icon
          name="mdi-crosshairs-gps"
          @click="location()"
          size="30px"
        /><br />
        <q-icon name="mdi-map-marker-outline" size="30px" /><br />
      </div>
    </div>

    <div class="q-mb-lg q-gutter-sm dialog-b">
      <TakeQksb v-model:isShowDialog="isShowDialog" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

import { flyToCamera } from 'vue-cesium/es/utils/cesium-helpers';

import TakeQksb from 'src/pages/homePage/taskPage/TakeQksb.vue';

import { Geolocation } from '@capacitor/geolocation';

// import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: { TakeQksb },
  setup() {
    const vcConfig = reactive({
      cesiumPath: '/Cesium/Cesium.js',
    });
    // const accesstToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Y2U0ZTk2Ni1jNzdkLTQ3OWYtYjVmYS0yMGM3YTk3NjgzMmUiLCJpZCI6Njk5Nywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0ODA1MTc0OH0.Csy6yyAnv6JSBppH0Ou3ahshqcHFEhP27iOz5gjQMEo';
    //选择地图模式
    const onClick = (type) => {
      console.log('选择了' + type + '类型的地图');
    };
    // const router = useRouter();
    let isShowDialog = ref(false);

    const openQksb = () => {
      isShowDialog.value = true;
    };
    //定位  https://www.googleapis.com/' 提供的位置信息容易chaoshi
    const location = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log(
        coordinates.coords.latitude + ',' + coordinates.coords.longitude
      );
      console.log('打印经纬度');
      // let GPSoptions = {
      //   timeout: 10000,
      //   enableHighAccuracy: false,
      //   maximumAge: 3600,
      // };
      // await Geolocation.getCurrentPosition(GPSoptions).then(
      //   (position) => {
      //     console.log('IN');
      //     console.log(position.coords.latitude);
      //     console.log(position.coords.longitude);
      //   },
      //   (error) => {
      //     console.log('Error getting location', error);
      //   }
      // );
    };
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
    const billboards1 = ref([]);
    const billboards2 = ref([]);
    const modelMatrix = ref(null);
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
    // const position = [90, 40, 20]; // [90, 40, 10000]
    // const distanceDisplayCondition = { near: 0, far: 20000000 };
    // const horizontalOrigin = 0;
    // const scale = ref(0.25);
    // const entity = ref(null);
    // const billboard = ref(null);
    return {
      vcConfig,
      ready,
      isShowDialog,
      onViewerReady,
      onClick,
      openQksb,
      location,
      billboards1,
      billboards2,
      modelMatrix,
    };
  },
});
</script>

<style lang="scss">
.map {
  position: relative;
}

.btn_buttom {
  position: absolute;
  bottom: 300px;
  right: 0px;
  width: 50px;
  background-color: $grey-5;
  border-radius: 3px;

  .selete_map {
    color: white;
    background: transparent;
    margin-left: 8px;
    margin-right: 8px;
  }

  .q-icon {
    color: $grey-7;
    background: white;
    border-radius: 5px;
    padding: 2px;
  }
}

.dialog-b {
  margin-bottom: 100px;
  padding-bottom: 100px;
}
</style>
