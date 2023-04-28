import { boot } from 'quasar/wrappers';
import { useContactStore } from 'src/stores/contact';
export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const contact = useContactStore();
    const list = ['/', 'home', 'message', 'my']; // 将需要切换效果的路由名称组成一个数组
    const toName = to.name as string; // 即将进入的路由名字
    const fromName = from.name as string; // 即将离开的路由名字
    const toIndex = list.indexOf(toName); // 进入下标
    const fromIndex = list.indexOf(fromName); // 离开下标
    let direction = '';
    if (toIndex == -1 || fromIndex == -1) {
      if (to.path == '/list' && from.path == '/messageEdit') {
        direction = 'left';
      } else if (to.path == '/list' && from.path == '/addContact') {
        direction = 'left';
      } else {
        if (toIndex > fromIndex) {
          // 如果进入的下标小于离开的下标，那么是左滑
          direction = 'left';
        } else {
          direction = 'right'; // 如果进入的下标大于离开的下标，那么是右滑
        }
      }
    }
    contact.setDirection(direction);
    return next();
  });
});
