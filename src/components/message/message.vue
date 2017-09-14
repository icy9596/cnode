<template>
    <div class="message">
        <div class="has-read" v-if="has_read_messages.length">
            <h2>{{has_read_messages.length + '条信息'}}</h2>
            <ul class="mess-list">
                <li class="mess-item" v-for="(item,index) in has_read_messages" :key="item.id">{{`第${index}条消息${item.id}`}}</li>
            </ul>
        </div>
        <div class="hasnot-read" v-if="hasnot_read_messages.length">
            <h2>{{hasnot_read_messages.length + '条未读信息'}}</h2>
            <ul class="mess-list">
                <li class="mess-item" v-for="(item,index) in hasnot_read_messages" :key="item.id">{{`第${index}条消息${item.id}`}}</li>
            </ul>
        </div>
        <div class="none" v-if="none">暂无消息!</div>
    </div>
</template>

<script>
import { getMessage } from 'common/js/request.js';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            has_read_messages: [],
            hasnot_read_messages: []
        };
    },
    computed: {
        ...mapGetters(['token']),
        none () {
            return !this.has_read_messages.length && !this.hasnot_read_messages.length;
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
                }
            });
        }
    },
    mounted () {
        this._getMessage();
    },
    deactivated () {
        this.$destroy();
    }
};
</script>

<style lang="stylus" scoped>
    .message
        .none
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
</style>
