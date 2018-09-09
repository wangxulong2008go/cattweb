import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Router.prototype.goBack = function () {
  this.isBack = true;//判断后退前进效果效果
  this.go(-1)
}

Vue.use(Router);
const Home = resolve => require(['../views/home/Home'],resolve);//首页

const Error = resolve => require(['../views/error/Error'],resolve);//错误页面
const Guid = resolve => require(['../views/home/Guid'],resolve);//引导页面
const House = resolve => require(['../views/home/House'],resolve);//我的小窝
const Citys = resolve => require(['../views/home/City'],resolve);//城市列表
const router = new Router({
  linkActiveClass:'list-active',
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path:'/home',
          component:Home,
          meta: { keepAlive: true }
        },
        {
          path: '/guid',
          component: Guid,
          meta: {
            keepAlive:true
          }
        },
        {
          path: '/house',
          component: House,
          meta: {
            keepAlive:true
          }
        },
        {
          path: '/city',
          component: Citys,
          meta: {
            keepAlive:true
          }
        },
        {
          path: '/error',
          component: Error,
          meta: {
            keepAlive:true
          }
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    }
  ]
});
export default router;
