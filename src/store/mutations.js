import * as types from './types.js';

let mutations = {
    [types.UPDATE_TOPICID] (state, id) {
        state.topicId = id;
    },
    [types.LOGIN] (state, token) {
        state.token = token;
    },
    [types.LOGOUT] (state) {
        state.token = '';
    },
    [types.RECORDPATH] (state, path) {
        state.indexPath = path;
    }
};

export default mutations;
