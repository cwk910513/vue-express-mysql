import Vue from 'vue';
import Router from 'vue-router';

// 登录模块
import login from '@/components/login/login';
// 工作台模块
import dashboard from '@/components/layout/dashboard';
// 欢迎首页
import home from '@/components/home';
// 个人中心
import personInfo from '@/components/personInfo';
// 用户管理
import userComponent from '@/components/user';

Vue.use(Router)

let router = new Router({
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
            title: '工作台',
            component: dashboard,
            children: [
                {
                    path: '/dashboard/',
                    name: 'home',
                    title: '欢迎首页',
                    meta: {
                        requireAuth: true,
                    },
                    component: home
                },
                {
                    path: '/dashboard/info',
                    name: 'info',
                    title: '个人中心',
                    meta: {
                        requireAuth: true,
                    },
                    component: personInfo
                },
                {
                    path: '/dashboard/user',
                    name: 'user',
                    title: '用户管理',
                    meta: {
                        requireAuth: true,
                    },
                    component: userComponent
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
		if(sessionStorage.getItem("loginAuth")) {
			next();
		}else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}    // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
    }
    else {
        next();
    }
})

export default router;