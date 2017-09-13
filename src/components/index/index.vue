<template>
    <div class="tab-list">
        <!-- tab栏 -->
        <tab></tab>
        <router-view></router-view>
    </div>
</template>

<script>
import tab from 'components/index/tab';
import { mapMutations } from 'vuex';

export default {
  components: {
    tab
  },
  methods: {
    ...mapMutations(['recordPath'])
  },
  created () {
      this.recordPath(this.$route.fullPath);
  },
  beforeRouteLeave (to, from, next) {
    this.recordPath(from.fullPath);
    next();
  },
  beforeRouteUpdate (to, from, next) {
    this.recordPath(to.fullPath);
    next();
  }
};
</script>

<style lang="stylus" scoped>
</style>
