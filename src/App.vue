<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>

</script>

<style lang="less">
@import "~@/less/base";
html { text-align: center; }
a { color: red; font-size: 24px; padding: 3px 5px; box-sizing: border-box; line-height: 30px; background-color: #999; }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
