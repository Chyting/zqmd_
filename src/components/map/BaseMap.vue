<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-22 08:58:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-22 09:10:30
 * @FilePath: \vue_quasar_cesium\src\components\map\BaseMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <q-page class="flex flex-center" style="overflow: hidden">
    <vc-config-provider :cesium-path="vcConfig.cesiumPath">
      <vc-viewer :showCredit="false" :infoBox="false" @ready="onViewerReady">
        <!-- 影像图层 地名 -->
        <!-- <vc-layer-imagery
          :imagery-provider="imageryProvider"
          :alpha="alpha"
        ></vc-layer-imagery> -->
        <vc-layer-imagery
          @ready="onImageryLayerReady"
          ref="layer"
          :imagery-provider="imageryProvider"
          :alpha="alpha"
          :brightness="brightness"
          :contrast="contrast"
        ></vc-layer-imagery>
        <vc-layer-imagery
          @ready="onImageryLayerReady"
          ref="layer"
          :imagery-provider="imageryProvider2"
          :alpha="alpha"
          :brightness="brightness"
          :contrast="contrast"
        ></vc-layer-imagery>
        <!-- <vc-layer-imagery :sort-order="20">
          <vc-imagery-provider-tianditu
            map-style="cva_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery> -->
        <!-- 影像图层 天地图 -->
        <!-- <vc-layer-imagery :sort-order="10">
          <vc-imagery-provider-tianditu
            map-style="img_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
            ref="provider"
          ></vc-imagery-provider-tianditu>
        </vc-layer-imagery> -->
        <!-- 国界线 -->
        <vc-datasource-geojson
          ref="datasourceRef"
          data="/public/datas/china_line.json"
          stroke="red"
          fill="transparent"
        ></vc-datasource-geojson>
        <slot></slot>
      </vc-viewer>
    </vc-config-provider>
  </q-page>
</template>
<script setup>
import { reactive, ref } from "vue";
const emit = defineEmits(["onBaseMapReady"]);
let imageryProvider = reactive({});
let imageryProvider2 = reactive({});
const layer = ref(null);
const alpha = ref(1);
const brightness = ref(1);
const contrast = ref(1);
// const sliderRef = ref(null);

const vcConfig = reactive({
  cesiumPath: "/Cesium/Cesium.js",
});
const onViewerReady = ({ Cesium, viewer }) => {
  imageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: "/public/satellite/{z}/{x}/{y}.jpg",
    fileExtension: "jpg",
  });
  imageryProvider2 = new Cesium.UrlTemplateImageryProvider({
    url: "/public/overlay/{z}/{x}/{y}.png",
    fileExtension: "png",
  });
  emit("onBaseMapReady", Cesium, viewer);
};
</script>
<style lang="scss"></style>
