<template>
    <div class="login">
        <m-header title="登录" class="header" fixed>
            <div class="back" slot="left" @click="back">
                <i class="icon-xitongfanhui"></i>
            </div>
        </m-header>
        <div class="form-wrap">
            <input class="token" type="text" placeholder="请输入Access Token">
            <a class="btn">登录</a>
        </div>
     </div>
</template>

<script>
import { Button, Header } from 'mint-ui';

export default {
    methods: {
        back () {
            this.$router.go(-1);
        }
    },
    components: {
        'm-button': Button,
        'm-header': Header
    }
};
</script>

<style lang="stylus" scoped>
    .login
        .header
            background-color #fff
            border-bottom 1px solid #ccc
            font-size 18px
            color #000
        .form-wrap
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
        .token
            width 300px
            padding-left 10px
            line-height 40px
            border 1px solid #ccc
            border-radius 4px
            margin-bottom 10px
            box-sizing border-box
        .btn
            display block
            width 300px
            height 40px
            background green
            color #fff
            border-radius 4px
            line-height: 40px
            text-align center
</style>
