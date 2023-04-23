import { RouteRecordRaw } from 'vue-router';
// import { Storage } from '@capacitor/storage';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: '/',
  //   beforeEnter: async (to, from, next) => {
  //     try {
  //       const { value: alreadyLaunched } = await Storage.get({
  //         key: 'alreadyLaunched',
  //       });
  //       next({ name: !alreadyLaunched ? 'authentication' : 'home' });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  // },
  {
    path: '/',
    redirect: '/home',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('pages/home-page/Home.vue'),
        meta: {
          title: '任务',
        },
      },
      {
        path: '/message',
        component: () => import('src/pages/message-page/MessageList.vue'),
        meta: {
          title: '消息',
        },
      },
      {
        path: '/messageEdit',
        component: () => import('pages/message-page/MessageEdit.vue'),
        meta: {
          title: '聊天',
          hideHeader: true,
          hideFooter: false,
        },
      },
      {
        path: '/list',
        component: () => import('pages/list-page/AddressList.vue'),
        meta: {
          title: '通讯录',
        },
      },
      {
        path: '/my',
        component: () => import('pages/my-page/My.vue'),
        meta: {
          title: '我的',
        },
      },
      {
        path: '/settings',
        component: () => import('src/pages/AppIpSettings.vue'),
        meta: {
          title: '设置',
        },
      },
      {
        path: '/qksb',
        component: () => import('src/pages/TakeQksb.vue'),
        meta: {
          title: '情况上报',
        },
      },

      // {
      //   path: '/rwdk',
      //   component: () => import('src/pages/TaskPunching.vue'),

      //   meta: {
      //     title: '任务打卡',
      //   },
      // },
      {
        path: '/rwdk',
        component: () => import('src/pages/TaskPunching.vue'),

        meta: {
          title: '任务打卡',
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
