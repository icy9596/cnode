<template>
    <div class="about">
        <m-header title="关于" class="header" fixed>
            <div class="back" slot="left" @click="back">
                <i class="icon-xitongfanhui"></i>
            </div>
        </m-header>
        <div class="wrap" ref="wrap">
            <p>_ooOoo_</p>
            <p>o8888888o</p>
            <p>88" . "88</p>
            <p>(| -_- |)</p>
            <p>O\  =  /O</p>
            <p>____/`---'\____</p>
            <p>.'  \\|     |//  `.</p>
            <p>/  \\|||  :  |||//  \</p>
            <p>/  _||||| -:- |||||-  \</p>
            <p>|   | \\\  -  /// |   |</p>
            <p>| \_|  ''\---/''  |   |</p>
            <p>\  .-\__  `-`  ___/-. /</p>
            <p>___`. .'  /--.--\  `. . __</p>
            <p>."" '<  `.___\_<|>_/___.'  >'"".</p>
            <p>| | :  `- \`.;`\ _ /`;.`/ - ` : | |</p>
            <p>\  \ `-.   \_ __\ /__ _/   .-` /  /</p>
            <p>======`-.____`-.___\_____/___.-`____.-'======</p>
            <p>`=---='</p>
            <p>^^^^^^^^^^^^^^^^^^^^^^</p>
            <p class="fo">佛祖保佑 永无BUG！</p>
            <!-- <p>佛曰:</p>
            <p>写字楼里写字间，写字间里程序员；</p>
            <p>程序人员写程序，又拿程序换酒钱。</p>
            <p>酒醒只在网上坐，酒醉还来网下眠；</p>
            <p>酒醉酒醒日复日，网上网下年复年；</p>
            <p>但愿老死电脑间，不愿鞠躬老板前；</p>
            <p>奔驰宝马贵者趣，公交自行程序员；</p>
            <p>别人笑我忒疯癫，我笑自己命太贱；</p>
            <p>不见满街漂亮妹，哪个归得程序员？</p> -->
        </div>
    </div>
</template>

<script>
import { Header } from 'mint-ui';

export default {
    methods: {
        back () {
            this.$router.go(-1);
        }
    },
    components: {
        'm-header': Header
    },
    mounted () {
        let pArr = this.$refs.wrap.children;
        for (let i = 0, len = pArr.length; i < len; i++) {
            let str = pArr[i].innerHTML;
            while (/\s/.test(str)) {
                str = str.replace(' ', '&nbsp;&nbsp;');
            }
            pArr[i].innerHTML = str;
        }
    },
    deactivated () {
        this.$destroy();
    }
};
</script>

<style lang="stylus" scoped>
    .about
        position relative
        padding 50px 0 59px 0
        width 100%
        height 100%
        box-sizing border-box
        .header
            height 50px
            font-size 18px
            background-color #ffffff
            color #000
            border-bottom 1px solid #cccccc
        .wrap
            width 100%
            text-align center
            line-height 20px
            font-size 16px
            color green
            .fo
                color red
                font-size 24px
                margin-bottom 30px
</style>
