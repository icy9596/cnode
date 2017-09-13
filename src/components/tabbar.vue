<template>
    <m-tabbar v-model="selected" class="tabbar" :fixed="true">
        <m-tabitem :id="index()" @click.native="changeRouter">
            <i class="icon-shouye" slot="icon"></i>
            首页
        </m-tabitem>
        <m-tabitem id="/issue" @click.native="changeRouter">
            <i class="icon-dianping" slot="icon"></i>
            发表
        </m-tabitem>
        <m-tabitem id="/message" @click.native="changeRouter">
            <i class="icon-duanxin" slot="icon"></i>
            消息
        </m-tabitem>
        <m-tabitem id="/home" @click.native="changeRouter">
            <i class="icon-geren" slot="icon"></i>
            我的
        </m-tabitem>
    </m-tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            selected: ''
        };
    },
    methods: {
        changeRouter () {
            this.$router.push({
                path: this.selected
            });
        },
        // 如果indexPath为空 点击首页时跳转/index/all
        index () {
            return this.indexPath || '/index/all';
        }
    },
    computed: {
        ...mapGetters(['indexPath'])
    },
    components: {
        'm-tabbar': Tabbar,
        'm-tabitem': TabItem
    },
    created () {
        this.selected = this.$route.fullPath;
    },
    watch: {
        $route () {
            this.selected = this.$route.fullPath;
        }
    }
};
</script>

<style lang="stylus" scoped>
    .tabbar
        background-image: none;
        .mint-tab-item.is-selected
            background-color #fff
            color: green
        [class^="icon-"]
            font-size: 24px

</style>
