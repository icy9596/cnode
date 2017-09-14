<template>
    <div class="home">
        <m-header title="个人中心" fixed class="header"></m-header>
        <div class="user-bg"></div>
        <div class="user" @click="login">
            <div class="user-avatar">
                <img :src="user.avatar_url">
            </div>
            <div class="text" v-if="!token">你还没有登陆，请先登录！</div>
            <div class="login-in" v-if="token">{{user.loginname}}</div>
        </div>
        <div class="nav">
            <ul>
                <router-link to="/issue" tag="li" class="nav-item">
                    <i class="icon-dianping"></i>
                    <span class="text">发表主题</span>
                    <i class="icon-xiayibu"></i>
                </router-link>
                <router-link to="/message" tag="li" class="nav-item">
                    <i class="icon-duanxin"></i>
                    <span class="text">我的消息</span>
                    <i class="icon-xiayibu"></i>
                </router-link>
                <router-link to="/about" tag="li" class="nav-item">
                    <i class="icon-xinxi"></i>
                    <span class="text">关于</span>
                    <i class="icon-xiayibu"></i>
                </router-link>
            </ul>
        </div>
        <div class="logout" @click="logout" v-if="token">退出登录</div>
    </div>
</template>

<script>
import { Header } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex';

export default {
    methods: {
        login () {
            this.$router.push('/login');
        },
        ...mapMutations(['logout'])
    },
    computed: {
        ...mapGetters(['user', 'token'])
    },
    components: {
        'm-header': Header
    }
};
</script>

<style lang="stylus" scoped>
    .home
        width 100%
        padding 50px 0 59px 0
        .header
            height 50px
            font-size 16px
            font-weight bold
            background-color #fff
            color #000
            border-bottom 1px solid #ccc
            box-sizing border-box
        .user-bg
            width 100%
            padding-top 50%
            background url('../../assets/user_bg.jpg') no-repeat center center;
            background-size cover
        .user
            display flex
            flex-direction: column
            align-items: center 
            transform translateY(-50%)
            .user-avatar
                width 120px
                height 120px
                background-color #eeeeee
                border 1px solid #ccc
                border-radius 50%
                overflow hidden
                margin-bottom 20px
                img
                    width 100%
            .text
                font-size 14px
                color green
            .login-in
                font-size 18px
                color #000
        .nav
            .nav-item
                display flex
                align-items center
                font-size 16px
                line-height 48px
                border-top 1px solid #ccc
                &:last-child
                    border-bottom 1px solid #ccc
                [class^="icon-"]
                    font-size 24px
                    margin 0 10px
                .icon-dianping
                    color green
                .icon-duanxin
                    color red
                .icon-xiayibu
                    flex 1
                    text-align right
        .logout
            text-align center
            font-size 18px
            color red
            line-height 50px
            border-bottom 1px solid #ccc
</style>
