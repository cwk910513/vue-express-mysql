import Vue from 'vue';
import Router from 'vue-router';

// 登录模块
import login from '@/components/login/login';
// 工作台模块
import dashboard from '@/components/layout/dashboard';
// 欢迎首页
import home from '@/components/home';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }, 
        {
            path: '/dashboard',
            name: 'dashboard',
            title: '工作台',
            component: dashboard,
            children: [
                {
                    path: '/',
                    name: 'home',
                    title: '欢迎首页',
                    meta: {
                        requireAuth: true,
                    },
                    component: home
                }
            ]
        }
    ]
})