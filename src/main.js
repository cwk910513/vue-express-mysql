import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
// 引入ant-design-vue及样式
import AntDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 注册并引入Vuex
import store from './store/store';
// 引入vee-validate
import VeeValidate from 'vee-validate';


Vue.use(VueResource);
// 全局引用ant-design-vue组件
Vue.use(AntDesignVue);
Vue.use(VeeValidate);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
