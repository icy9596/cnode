<template>
  <div id="app">
    <!-- tarbar -->
    <tabbar></tabbar>

    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from 'components/tabbar';

export default {
  components: {
    tabbar
  }
};
</script>

<style lang="stylus">
@import './common/css/index.styl'

#app
  position absolute
  width 100%
  height 100%
</style>
