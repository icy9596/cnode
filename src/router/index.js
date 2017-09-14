import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js';

import index from 'components/index/index';
import tabList from 'components/index/tab-list';

import issue from 'components/issue/issue';
import message from 'components/message/message';
import home from 'components/home/home';

import topic from 'components/topic/topic';
import about from 'components/about';
import login from 'components/login';

import { Toast } from 'mint-ui';

Vue.use(Router);

let routes = [
  {
    path: '/',
    redirect: '/index/all'
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '',
        redirect: 'all'
      },
      {
        path: ':tab',
        component: tabList
      }
    ]
  },
  {
    path: '/issue',
    component: issue,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/message',
    component: message,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/topic/:id',
    component: topic
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/login',
    component: login
  }
];

let router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      Toast({
        message: '请先登录',
        duration: 2000
      });
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  next();
});

export default router;
