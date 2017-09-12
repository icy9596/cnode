<template>
    <div class="author">
        <div class="avatar">
            <img :src="img_src">
        </div>
        <div class="name">{{loginname}}</div>
        <div class="date">{{create_at | dateFormat}}</div>
        <div class="index">#{{index}}#</div>
    </div>
</template>

<script>
export default {
    props: {
        img_src: String,
        index: [String, Number],
        loginname: String,
        create_at: String
    }
};
</script>

<style lang="stylus" scoped>
    .author
        display flex
        align-items center
        .avatar
            width 40px
            height 40px
            margin-right 10px
            border-radius 50%
            overflow hidden
            box-sizing border-box
            border 1px solid #aaa
            img
                width 100%
        .name
            margin-right 10px
            color green
        .date
            font-size 12px
        .index
            flex 1
            text-align right
</style>
