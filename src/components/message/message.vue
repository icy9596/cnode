<template>
    <div class="message">
        <m-header title="消息" fixed class="header"></m-header>
        <div class="has-read" v-if="has_read_messages.length">
            <h2>{{has_read_messages.length + '条已读信息'}}</h2>
            <ul class="mess-list">
                <li class="mess-item" v-for="(item,index) in has_read_messages" :key="item.id">
                    <div class="top">
                        <div class="avata">
                            <img :src="item.author.avatar_url">
                        </div>
                        <div class="info">
                            <span class="user-name">{{item.author.loginname}}</span><span class="date">{{item.create_at | dateFormat}}</span>
                            <div class="text">回复了您的话题<span class="topic">{{item.topic.title}}</span></div>
                        </div>
                    </div>
                    <div class="content" v-html="item.reply.content"></div>
                </li>
            </ul>
        </div>
        <div class="hasnot-read" v-if="hasnot_read_messages.length">
            <h2>{{hasnot_read_messages.length + '条未读信息'}}</h2>
            <ul class="mess-list">
                <li class="mess-item" v-for="(item,index) in hasnot_read_messages" :key="item.id">
                    <div class="top">
                        <div class="avata">
                            <img :src="item.author.avatar_url">
                        </div>
                        <div class="info">
                            <span class="user-name">{{item.author.loginname}}</span><span class="date">{{item.create_at | dateFormat}}</span>
                            <div class="text">回复了您的话题<span class="topic">{{item.topic.title}}</span></div>
                        </div>
                    </div>
                    <div class="content" v-html="item.reply.content"></div>
                </li>
            </ul>
        </div>
        <div class="none" v-if="none">暂无消息!</div>
        <div class="loading-wrap" v-if="loading">
            <loading ></loading>
        </div>
    </div>
</template>

<script>
import { getMessage } from 'common/js/request.js';
import { mapGetters } from 'vuex';
import { Header } from 'mint-ui';
import loading from 'components/index/loading';

export default {
    data () {
        return {
            has_read_messages: [],
            hasnot_read_messages: [],
            loading: true
        };
    },
    computed: {
        ...mapGetters(['token']),
        none () {
            return !this.has_read_messages.length && !this.hasnot_read_messages.length && !this.loading;
        }
    },
    methods: {
        _getMessage () {
            let token = this.token;
            getMessage(token).then(res => {
                let data = res.data;
                if (data.success) {
                    this.has_read_messages = data.data.has_read_messages;
                    this.hasnot_read_messages = data.data.hasnot_read_messages;
                    this.loading = false;
                }
            }).catch(err => {
                this.loading = false;
                console.error(err);
            });
        }
    },
    components: {
        'm-header': Header,
        loading: loading
    },
    mounted () {
        this._getMessage();
    }
};
</script>

<style lang="stylus" scoped>
    .message
        position relative
        width 100%
        height 100%
        padding-top 50px
        box-sizing border-box
        .header
            height 50px
            background-color #fff
            color #000
            font-size 16px
            font-weight bold
            border-bottom 1px solid #ccc
        .none
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
        .hasnot-read, .has-read
            h2
                margin-top 10px
                padding-left 10px
                font-size 20px
                font-weight bold
                border-left 4px solid green
            .mess-list
                .mess-item
                    padding 10px
                    border-bottom 1px solid #ddd
                    .top
                        display flex
                        .avata
                            width 40px
                            height 40px
                            margin-right 10px
                            border-radius 50%
                            border 1px solid #cccccc
                            overflow hidden
                            box-sizing border-box
                            img
                                width 100%
                        .info
                            font-size 14px
                            line-height 18px
                            .user-name
                                margin-right 10px
                            .date
                                font-size 12px
                                color #666
                            .text
                                .topic
                                    margin-left 10px
                                    color green
                    .content
                        margin 10px 0 0 50px
                        border-radius 6px
                        padding 10px
                        font-size 16px
                        line-height 24px
                        background-color #eee
        .loading-wrap
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
</style>
