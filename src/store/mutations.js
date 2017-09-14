import * as types from './types.js';

let mutations = {
    [types.UPDATE_TOPICID] (state, id) {
        state.topicId = id;
    },
    [types.LOGIN] (state, token) {
        state.token = token;
    },
    [types.LOGOUT] (state) {
        if (state.token === '') return;
        state.token = '';
        state.user = {};
    },
    [types.RECORDPATH] (state, path) {
        state.indexPath = path;
    },
    [types.ADD_USER] (state, user) {
        state.user = user;
    }
};

export default mutations;
