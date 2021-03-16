<template>
  <div header>
    <div class="box">
      <div>
        <ul>
          <li v-for="cell in bar" :key="cell"></li>
        </ul>
      </div>
<!--      <img src="/img/bar.png" alt="" class="bar">완료-->
      <img src="/img/arrow.png" alt="" class="arrow">
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['bar'],
  propsList: '',

  data() {
    return {
      propsList: this.props
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
@import "~@/less/asset";

  [header] { color: #000; .tr;
    .box { .rel; .ib; .wh(660,44); .p(0);
      .bar { .wh(660,44); .abs; .rt; .ib; }
      .arrow { .lt(0,50%); .abs; z-index: 1; }
      li { .ib; .h(30); .-a(#000); }
    }
  }
</style>