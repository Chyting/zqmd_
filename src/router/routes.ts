import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('src/pages/homePage/Home.vue'),
        meta: {
          title: '任务',
        },
      },
      {
        path: '/message',
        component: () => import('src/pages/messagePage/MessageList.vue'),
        meta: {
          title: '消息',
        },
      },
      {
        path: '/messageEdit',
        component: () => import('src/pages/messagePage/MessageEdit.vue'),
        meta: {
          title: '聊天',
          hideHeader: true,
          hideFooter: false,
        },
      },
      {
        path: '/list',
        component: () => import('src/pages/messagePage/FriendList.vue'),
        meta: {
          title: '通讯录',
        },
      },
      {
        path: '/my',
        component: () => import('src/pages/myPage/My.vue'),
        meta: {
          title: '我的',
        },
      },
      {
        path: '/settings',
        component: () => import('src/pages/myPage/AppIpSettings.vue'),
        meta: {
          title: '设置',
        },
      },
      {
        path: '/qksb',
        component: () => import('src/pages/homePage/taskPage/TakeQksb.vue'),
        meta: {
          title: '情况上报',
        },
      },
      {
        path: '/rwdk',
        component: () => import('src/pages/homePage/taskPage/TaskPunching.vue'),

        meta: {
          title: '任务打卡',
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
