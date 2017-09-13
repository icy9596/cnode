import Vue from 'vue';
import Vuex from 'vuex';

import state from './state.js';
import mutations from './mutations.js';
import getters from './getters.js';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

let store = new Vuex.Store({
    state,
    mutations,
    getters,
    plugins: [createLogger()]
});

export default store;
