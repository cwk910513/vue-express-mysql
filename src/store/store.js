import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const state = {
    currentItemKey: '',
    httpError: {
        hasError: false,
        code: 'error',
        message: '请求失败'
    }
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;