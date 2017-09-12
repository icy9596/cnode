<template>
  <div id="app">
    <!-- tarbar -->
    <tabbar v-if="tabbarShow"></tabbar>

    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from 'components/tabbar';

export default {
  components: {
    tabbar
  },
  computed: {
    tabbarShow () {
      return this.$route.path.indexOf('/topic') === -1 && this.$route.path.indexOf('/login') === -1 && this.$route.path.indexOf('/about') === -1;
    }
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
