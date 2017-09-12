import Vue from 'vue';
import Router from 'vue-router';

import index from 'components/index/index';
import tabList from 'components/index/tab-list';

import issue from 'components/issue/issue';
import message from 'components/message/message';
import home from 'components/home/home';

import topic from 'components/topic/topic';
import about from 'components/about';
import login from 'components/login';

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
    component: issue
  },
  {
    path: '/message',
    component: message
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

export default new Router({
  routes
});
