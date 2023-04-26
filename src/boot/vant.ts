import { boot } from 'quasar/wrappers';
import 'vant/lib/index.css';
import Vant from 'vant';
export default boot(({ app }) => {
  app.use(Vant);
});
