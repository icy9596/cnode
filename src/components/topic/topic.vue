<template>
    <div class="topic">
        <m-header title="主题" fixed class="header">
            <div class="back" slot="left" @click="back">
                <i class="icon-xitongfanhui"></i>
            </div>
        </m-header>
        <author 
            :img_src="topicData.author.avatar_url" 
            :index="'楼主'"
            :loginname="topicData.author.loginname"
            :create_at="topicData.create_at"
            v-if="topicData.author"
        ></author>
        <div class="first">
            <div class="title">
                <h1>{{topicData.title}}</h1>
            </div>
            <div class="info">
                <span class="visit"><i class="icon-kanguo"></i>{{topicData.visit_count}}</span>
                <span class="reply-count"><i class="icon-pinglun"></i>{{topicData.reply_count}}</span>
            </div>
        </div>
        <div class="content" v-html="topicData.content"></div>
        <div class="reply-wrap">
            <div class="replies-count">共(<span class="count" v-if="topicData.replies"> {{topicData.replies.length}} </span>)条回复</div>
            <ul class="reply-list">
                <li class="reply-item" v-for="(item,index) in topicData.replies" :key="item.id">
                    <author 
                        :img_src="item.author.avatar_url" 
                        :index="index + 1"
                        :loginname="item.author.loginname"
                        :create_at="item.create_at"
                        v-if="topicData.author"
                    ></author>
                    <div class="text" v-html="item.content"></div>
                    <div class="click">
                        <span class="zan" :class="{'is-uped': item.is_uped}" @click="_replyUps(item)"><i class="icon-zan"></i>{{item.ups.length ? item.ups.length : ''}}</span>
                        <span><i class="icon-fenxiang"></i></span>
                    </div>
                </li>
            </ul>
            <div class="reply-no-login" v-if="!token">
                <p>您还未登录，请先<router-link :to="{path: '/login', query: {redirect: $route.fullPath}}" replace class="login-btn">登录！</router-link></p>
            </div>
            <div class="reply-islogin" v-if="token">
                <textarea class="reply-content" placeholder="发表评论..." v-model="content"></textarea>
                <button class="submit" @click="_submitReplies">回复</button>
            </div>
        </div>
        <div class="loading-wrap" v-if="loading">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { getTopicDetail, replyUps, submitReplies } from 'common/js/request.js';
import { Header, Toast } from 'mint-ui';
import author from 'components/author';
import loading from 'components/index/loading';
import { mapMutations, mapGetters } from 'vuex';

export default {
    data () {
        return {
            topicData: {},
            loading: false,
            content: ''
        };
    },
    computed: {
        ...mapGetters(['topicId', 'token', 'user'])
    },
    methods: {
        _getTopicDetail () {
            let id = this.$route.params.id;
            let options = {
                mdrender: true,
                accesstoken: this.token
            };
            this.loading = true;
            this.updateTopicId(id);
            getTopicDetail(id, options).then(res => {
                this.topicData = res.data.data;
                this.loading = false;
            });
        },
        _replyUps (item) {
            let token = this.token;
            if (token === '') {
                this.$router.replace({
                    path: '/login',
                    query: {
                        redirect: `/topic/${this.topicData.id}`
                    }
                });
            } else {
                replyUps(item.id, token).then(res => {
                    let data = res.data;
                    if (data.success) {
                        item.is_uped = !item.is_uped;
                        if (data.action === 'up') {
                            item.ups.push('user');
                        } else if (data.action === 'down') {
                            item.ups.pop();
                        }
                    }
                }).catch(err => {
                    if (err.response) {
                        Toast(err.response.data.error_msg);
                    }
                });
            }
        },
        _submitReplies () {
            let tid = this.$route.params.id;
            let data = {
                accesstoken: this.token,
                content: this.content,
                reply_id: this.reply_id || ''
            };
            submitReplies(tid, data).then(res => {
                if (res.data.success) {
                    let author = {
                        avatar_url: this.user.avatar_url,
                        loginname: this.user.loginname
                    };
                    let createAt = new Date().toUTCString();
                    this.topicData.replies.push({
                        author: author,
                        content: this.content,
                        create_at: createAt,
                        id: res.data.reply_id,
                        reply_id: null,
                        ups: []
                    });
                    Toast('评论成功');
                    this.content = '';
                }
            });
        },
        back () {
            this.$router.back();
        },
        ...mapMutations(['updateTopicId'])
    },
    components: {
        'm-header': Header,
        'author': author,
        loading
    },
    created () {
        this._getTopicDetail();
    },
    watch: {
        token () {
            this._getTopicDetail();
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let id = to.params.id;
            if (vm.topicId !== id) {
                vm.topicData = {};
                vm._getTopicDetail();
            }
        });
    }
};
</script>

<style lang="stylus">
    .topic
        padding 60px 10px 0 10px
        .header
            height 50px
            box-sizing border-box
            border-bottom 1px solid #ccc
            background-color #fff
            font-size 16px
            font-weight bold
            color #000
            .mint-header-title
                font-weight bold
            .back
                height 50px
                i
                    font-size 18px
                    line-height 50px
        
        .first
            padding 20px 0
            .title
                padding 0 10px
                margin-bottom 20px
                h1
                    font-size 22px
                    line-height 28px
                    font-weight bold
                    text-align center
                    color #000
            .info
                text-align center
                .visit
                    margin-right 10px
                i
                    margin-right 4px
        .content
            .markdown-text
                h2
                    font-size 24px
                    font-weight bold
                    padding 10px 0
                    border-bottom 1px solid #eee
                h3
                    font-size 20px
                    font-weight bold
                    padding 10px 0
                    border-bottom 1px solid #eee
                p
                    margin 10px 0
                    font-size 16px
                    line-height 22px
                img
                    width 100%
                ul
                    padding 20px 0 20px 20px
                    li
                        font-size 16px
                        line-height 22px
                        list-style disc inside
                a
                    word-break break-all
                    color #0366d6
                blockquote
                    padding-left 20px
                    color #aaa
                    border-left 4px solid #ddd
                .prettyprint
                    padding 10px
                    font-size 16px
                    line-height 22px
                    color #24292e
                    border-radius 4px
                    overflow: auto
                    background-color: #f6f8fa
                table
                    display: block;
                    width: 100%;
                    overflow: auto;
                    font-size 16px
                    line-height 22px
                    tr
                        background-color: #fff
                        border-top: 1px solid #c6cbd1
                        &:nth-of-type(2n)
                             background-color: #eee                       
                        th, td
                            padding: 6px 13px
                            border: 1px solid #dfe2e5
        .reply-wrap
            .replies-count
                padding-left 10px
                font-size 16px
                line-height 38px
                border-top 1px solid #eee
                border-bottom 1px solid #eee
                border-left 4px solid green
                .count
                    color green
            .reply-list
                .reply-item
                    padding 10px 0
                    border-bottom 1px solid #ccc
                    .author
                        margin-bottom 14px
                    .text
                        padding-left 50px
                        margin-bottom 14px
                        p
                            font-size 16px
                            line-height 24px
                            word-break break-all
                        a
                            color #0366d6
                            word-break: break-all
                        img
                            width 100%
                        .prettyprint
                            padding: 10px
                            font-size: 16px
                            line-height: 22px
                            color: #24292e
                            border-radius: 4px
                            overflow: auto
                            background-color: #f6f8fa
                    .click
                        text-align right
                        font-size 0
                        [class^="icon"], .zan
                            padding 5px
                            font-size 20px
                        .zan
                            &.is-uped
                                color green
                                .icon-zan
                                    color green
            .reply-no-login
                height 200px
                font-size 16px
                line-height 200px
                text-align center
                .login-btn
                    color green
            .reply-islogin
                margin 20px 0
                text-align right
                .reply-content
                    display block
                    width 100%
                    height 100px
                    padding 10px
                    margin-bottom 10px
                    font-size 16px
                    border 1px solid #ddd
                    box-sizing border-box
                    resize none
                    outline none
                .submit
                    width 80px
                    height 30px
                    font-size 14px
                    line-height 14px
                    border none 
                    color #fff
                    background-color green
        .loading-wrap
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
</style>
