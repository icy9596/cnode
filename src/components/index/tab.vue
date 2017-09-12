<template>
    <m-navbar v-model="selected" class="tab" :fixed="true">
        <m-tabitem id="all" @click.native="changRoute">全部</m-tabitem>
        <m-tabitem id="good" @click.native="changRoute">精华</m-tabitem>
        <m-tabitem id="share" @click.native="changRoute">分享</m-tabitem>
        <m-tabitem id="ask" @click.native="changRoute">问答</m-tabitem>
        <m-tabitem id="job" @click.native="changRoute">招聘</m-tabitem>
    </m-navbar>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui';

export default {
    data () {
        return {
            selected: 'all'
        };
    },
    methods: {
        changRoute () {
            this.$router.push({
                path: '/index/' + this.selected
            });
        }
    },
    components: {
        'm-navbar': Navbar,
        'm-tabitem': TabItem
    },
    created () {
        this.selected = this.$route.params.tab;
    }
};
</script>

<style lang="stylus" scoped>
    .tab
        .mint-tab-item
            font-size: 16px
        .mint-tab-item.is-selected
            border-bottom: 3px solid green
            color: green

</style>
