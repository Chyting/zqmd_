import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    name: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('~/pages/homePage/Home.vue'),
        meta: {
          title: '任务',
        },
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/pages/messagePage/MessageList.vue'),
        meta: {
          title: '通讯',
        },
      },
      {
        path: '/messageEdit',
        name: 'messageEdit',
        component: () => import('src/pages/messagePage/MessageEdit.vue'),
        meta: {
          title: '聊天',
          hideHeader: true,
          hideFooter: false,
        },
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('src/pages/messagePage/FriendList.vue'),
        meta: {
          title: '通讯录',
        },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('src/pages/myPage/MyPage.vue'),
        meta: {
          title: '我的',
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('src/pages/myPage/AppIpSettings.vue'),
        meta: {
          title: '设置',
        },
      },
      {
        path: '/qksb',
        name: 'qksb',
        component: () => import('src/pages/homePage/taskPage/TakeQksb.vue'),
        meta: {
          title: '情况上报',
        },
      },
      {
        path: '/rwdk',
        name: 'rwdk',
        component: () => import('src/pages/homePage/taskPage/TaskPunching.vue'),

        meta: {
          title: '任务打卡',
        },
      },
      {
        path: '/addContact',
        name: 'addContact',
        component: () => import('src/pages/messagePage/AddContact.vue'),
        meta: {
          title: '添加联系人',
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
