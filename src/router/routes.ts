import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('~/pages/homePage/HomePage.vue'),
        meta: {
          title: '任务',
          keepAlive: true,
        },
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/pages/messagePage/MessageList.vue'),
        meta: {
          title: '通讯',
          keepAlive: false,
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
          keepAlive: false,
        },
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('src/pages/messagePage/FriendList.vue'),
        meta: {
          title: '通讯录',
          keepAlive: false,
        },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('src/pages/myPage/MyPage.vue'),
        meta: {
          title: '我的',
          keepAlive: false,
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('src/pages/myPage/AppIpSettings.vue'),
        meta: {
          title: '设置',
          keepAlive: false,
        },
      },
      {
        path: '/qksb',
        name: 'qksb',
        component: () => import('src/pages/homePage/taskPage/TakeQksb.vue'),
        meta: {
          title: '情况上报',
          keepAlive: false,
        },
      },
      {
        path: '/rwdk',
        name: 'rwdk',
        component: () => import('src/pages/homePage/taskPage/TaskPunching.vue'),

        meta: {
          title: '任务打卡',
          keepAlive: false,
        },
      },
      {
        path: '/addContact',
        name: 'addContact',
        component: () => import('src/pages/messagePage/AddContact.vue'),
        meta: {
          title: '添加联系人',
          keepAlive: false,
        },
      },
      {
        path: '/myPlace',
        name: 'myPlace',
        component: () => import('@/pages/myPage/myPlace/Index.vue'),
        meta: {
          title: '我的地点',
          keepAlive: false,
        },
      },
      {
        path: '/historyTask',
        name: 'historyTask',
        component: () => import('@/pages/myPage/historyTask/Index.vue'),
        meta: {
          title: '历史任务',
          keepAlive: false,
        },
      },
      {
        path: '/myReport',
        name: 'myReport',
        component: () => import('@/pages/myPage/myReport/Index.vue'),
        meta: {
          title: '我上报的',
          keepAlive: false,
        },
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('src/components/TaskLocationTest.vue'),
        meta: {
          title: '测试',
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
