<template>
    <div class="issue">
        <m-header title="发表" fixed class="header">
            <div class="issue-btn" slot="right" @click="_issueTopics">
                <i class="icon-dianping"></i>
            </div>
        </m-header>
        <div class="issue-wrap">
            <input type="text" class="issue-title" v-model="title" placeHolder="标题...">
            <select name="tabs" class="tabs" v-model="tab">
                <option value>请选择</option>
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
                <option value="dev">测试</option>
            </select>
            <textarea class="content" v-model="content" placeholder="内容..."></textarea>
       </div>
    </div>
</template>

<script>
import { Header, Toast } from 'mint-ui';
import { issueTopics } from 'common/js/request.js';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            title: '',
            content: '',
            tab: ''
        };
    },
    methods: {
        _issueTopics () {
            if (this.title === '') {
                Toast('请输入标题');
                return;
            } else if (this.content === '') {
                Toast('请输入内容');
                return;
            } else if (this.tab === '') {
                Toast('请选择');
                return;
            }
            if (this.tab !== 'dev') {
                Toast('只能发表测试板块');
                return;
            }
            let data = {
                accesstoken: this.token,
                title: this.title,
                content: this.content,
                tab: this.tab
            };
            issueTopics(data).then(res => {
                if (res.data.success) {
                    Toast('发表成功!');
                }
            }).catch(err => {
                if (err.response) {
                    Toast(err.response.data.error_msg);
                }
            });
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    components: {
        'm-header': Header
    },
    deactivated () {
        this.$destroy();
    }
};
</script>

<style lang="stylus" scoped>
    .issue
        padding-top 50px
        .header
            height 50px
            background-color #fff
            border-bottom 1px solid #ccc
            color #000
            font-size 16px
            font-weight bold
            .issue-btn
                height 50px
                line-height 50px
        .issue-wrap
            .issue-title
                width 100%
                padding-left 20px
                box-sizing border-box
                outline none
                font-size 16px
                line-height 50px
                border-bottom 1px solid #ccc
            .tabs
                width 100%
                line-height 50px
                height 50px
                padding-left 16px
                font-size 16px
                border none
                outline none
            .content
                width 100%
                height 300px
                padding 6px 20px 0
                box-sizing border-box
                font-size 16px
                line-height 22px
                border none
                border-top 1px solid #ccc
                outline none
                resize none
</style>
