import { boot } from 'quasar/wrappers';
import VueCesium from 'vue-cesium';
import 'vue-cesium/dist/index.css';
// import enUS from "vue-cesium/es/locale/lang/en-us";

export default boot(({ app }) => {
  app.use(VueCesium);
});
