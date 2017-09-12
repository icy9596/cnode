import axios from 'axios';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

// 获取列表内容
function getTopics (options) {
    return axios.get('/topics', {
        params: options
    });
}

export { getTopics };
