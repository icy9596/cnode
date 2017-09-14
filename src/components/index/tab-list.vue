<template>
    <div class="tab-list-wrap">
        <ul class="tab-list"
            v-infinite-scroll="_getTopics"
            :infinite-scroll-distance="100"
            :infinite-scroll-immediate-check="true"
        >
            <router-link tag="li" :to="'/topic/' + item.id" class="list-item" v-for="(item, index) in contentList" :key="index">
                <div class="top">
                    <div class="avatar">
                        <img v-lazy="item.author.avatar_url">
                    </div>
                    <div class="info">
                        <div class="name">{{item.author.loginname}}</div>
                        <time class="date">{{item.create_at | dateFormat}}</time>
                        <span class="tag" v-if="item.tab">#{{tabFormat(item.tab)}}#</span>
                    </div>
                </div>
                <div class="content">{{item.title}}</div>
                <div class="bottom">
                    <div class="visit">
                        <i class="icon-kanguo"></i>
                        {{item.visit_count}}
                    </div>
                    <div class="reply">
                        <i class="icon-pinglun"></i>
                        {{item.reply_count}}
                    </div>
                    <div class="last_reply" v-if="item.last_reply_at">
                        {{item.last_reply_at | dateFormat}}
                    </div>
                </div>
            </router-link>
        </ul>
        <div class="loading-wrap" v-show="loading">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { getTopics } from 'common/js/request.js';
import Vue from 'vue';
import loading from 'components/index/loading';

const LIMIT_LENGTH = 20;

Vue.filter('dateFormat', (date) => {
    let oldDate = new Date(date);
    let nowDate = new Date();
    let diff = nowDate - oldDate;

    let diffY = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);
    let diffM = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
    let diffD = Math.floor(diff / 1000 / 60 / 60 / 24);
    let diffH = Math.floor(diff / 1000 / 60 / 60);
    let diffm = Math.floor(diff / 1000 / 60);
    let diffS = Math.floor(diff / 1000);

    if (diffY > 0) {
        return diffY + '年前';
    } else if (diffM > 0) {
        return diffM + '个月前';
    } else if (diffD > 0) {
        return diffD + '天前';
    } else if (diffH > 0) {
        return diffH + '小时前';
    } else if (diffm > 0) {
        return diffm + '分钟前';
    } else if (diffS > 0) {
        return diffS + '秒前';
    }
});

export default {
    data () {
        return {
            contentList: [],
            currentPage: 1,
            tab: '',
            loading: false
        };
    },
    methods: {
        _getTopics () {
            if (this.loading) return;
            this.loading = true;
            getTopics({
                page: this.currentPage,
                tab: this.tab,
                limit: LIMIT_LENGTH,
                mdrender: true
            }).then(res => {
                let data = res.data;
                if (res.status === 200) {
                    if (data.success === true) {
                        this.contentList = this.contentList.concat(data.data);
                        this.currentPage++;
                        this.loading = false;
                    }
                } else {
                    console.error('请求失败');
                }
            });
        },
        changeTopics (tab) {
            this.currentPage = 1;
            this.contentList = [];
            this.tab = tab;
            this._getTopics();
        },
        tabFormat (tab) {
            switch (tab) {
                case 'share':
                    return '分享';
                case 'ask':
                    return '问答';
                case 'job':
                    return '招聘';
            }
        }
    },
    components: {
        loading
    },
    beforeRouteUpdate (to, from, next) {
        this.changeTopics(to.params.tab);
        next();
    },
    created () {
        this.tab = this.$route.params.tab;
        this._getTopics();
    }
};
</script>

<style lang="stylus" scoped>
    .tab-list-wrap
        position: fixed
        top: 50px
        bottom: 59px
        left: 0
        width: 100%
        overflow-x: hidden
        .loading-wrap
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
        .tab-list
            background-color #eee
            .list-item
                margin-bottom 10px
                padding 10px
                padding-bottom 0
                background-color #fff
                .top
                    display flex
                    .avatar
                        width 40px
                        height 40px
                        margin-right 10px
                        border-radius 50%
                        box-sizing border-box
                        border 1px solid #ccc
                        overflow hidden
                        img
                            width 100%
                            height 100%
                    .info
                        flex 1
                        padding-top 4px
                        .name
                            margin-bottom 4px
                            font-size 18px
                        .date
                            font-size 14px
                            color #aaa
                        .tag
                            font-size 14px
                            color green
                .content
                    margin 14px 0 14px 0
                    font-size 18px
                    line-height 24px
                    font-weight bold
                .bottom
                    display flex
                    padding 10px 0
                    border-top 1px solid #ccc
                    text-align center
                    color #aaa
                    font-size 12px
                    .visit, .reply, .last_reply
                        display flex
                        justify-content center
                        align-items center
                        flex 1
                        border-right 1px solid #ccc
                        &:last-child
                            border none
                        i
                            display inline-block
                            vertical-align top
                            margin-right 4px
</style>
