import Vue from 'vue';
import Router from 'vue-router';

// 登录模块
import login from '@/components/login/login';
// 工作台模块
import dashboard from '@/components/layout/dashboard';
// 欢迎首页
import home from '@/components/home';

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