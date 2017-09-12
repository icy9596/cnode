<template>
    <div class="tab-list">
        <!-- tab栏 -->
        <tab></tab>
        <router-view></router-view>
    </div>
</template>

<script>
import tab from 'components/index/tab';

export default {
  components: {
    tab
  }
};
</script>

<style lang="stylus" scoped>
</style>
