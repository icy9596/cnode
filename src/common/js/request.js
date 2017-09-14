import axios from 'axios';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

// 获取列表内容
function getTopics (options) {
    return axios.get('/topics', {
        params: options
    });
}

function getTopicDetail (id, options) {
    return axios.get(`/topic/${id}`, {
        params: options
    });
}

function loginToken (token) {
    return axios.post('/accesstoken', {
        accesstoken: token
    });
}

function replyUps (id, token) {
    return axios.post(`/reply/${id}/ups`, {
        accesstoken: token
    });
}

function getMessage (token) {
    return axios.get('/messages', {
        params: {
            accesstoken: token
        }
    });
}

function issueTopics (data) {
    return axios.post('/topics', {
        accesstoken: data.accesstoken,
        title: data.title,
        tab: data.tab,
        content: data.content
    });
}

export { getTopics, getTopicDetail, loginToken, replyUps, getMessage, issueTopics };
