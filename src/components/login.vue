<template>
    <div class="login">
        <m-header title="登录" class="header" fixed>
            <div class="back" slot="left" @click="back">
                <i class="icon-xitongfanhui"></i>
            </div>
        </m-header>
        <div class="form-wrap">
            <input class="token" type="text" placeholder="请输入Access Token" v-model="token">
            <a class="btn" @click="loginUser">登录</a>
        </div>
     </div>
</template>

<script>
import { Button, Header, Toast } from 'mint-ui';
import { loginToken } from 'common/js/request.js';
import { mapMutations } from 'vuex';

export default {
    data () {
        return {
            token: ''
        };
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        loginUser () {
            let token = this.token;
            loginToken(token).then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    if (data.success === true) {
                        this.login(token);
                        this.addUser({
                            avatar_url: data.avatar_url,
                            loginname: data.loginname,
                            id: data.id
                        });
                        window.localStorage.setItem('_token', token);
                        this.token = '';
                        this.$router.push(this.$route.query.redirect || '/home');
                        Toast({
                            message: '登录成功!',
                            duration: 2000
                        });
                    }
                }
            }).catch(err => {
                if (err.response) {
                    Toast({
                        message: err.response.data.error_msg,
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: '错误',
                        duration: 2000
                    });
                }

                this.token = '';
            });
        },
        ...mapMutations(['login', 'addUser'])
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
