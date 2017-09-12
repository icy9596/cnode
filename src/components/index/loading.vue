<template>
    <div class="loading">
        <div></div>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="stylus" scoped>
    .loading
        background: none repeat scroll 0 0 #fff;
        border-color: #009933;
        border-radius: 100%;
        border-style: solid;
        border-width: 2px 2px 50px;
        height: 48px;
        position: relative;
        width: 96px;
        animation: anim 1s linear infinite;
        &:before
            background: none repeat scroll 0 0 #fff;
            border: 18px solid #009933;
            border-radius: 100%;
            content: "";
            height: 12px;
            left: 0;
            position: absolute;
            top: 50%;
            width: 12px;
        &:after
            background: none repeat scroll 0 0 #009933;
            border: 18px solid #fff;
            border-radius: 100%;
            content: "";
            height: 12px;
            left: 50%;
            position: absolute;
            top: 50%;
            width: 12px;
    @keyframes anim{
        0% {
            transform: rotateZ(0deg);
        }
        50% {
            transform: rotateZ(180deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
</style>
