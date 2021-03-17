<template>
  <div header>
    <div class="box">
      <div>
        <ul>
          <li v-for="cell in props1" :key="cell"></li>
        </ul>
      </div>
<!--      <img src="/img/bar.png" alt="" class="bar">완료-->
      <img src="/img/arrow.png" alt="" class="arrow" :style="{'left': (this.arrow + 1) * 60+'px'}">
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['props1', 'props2'],

  data() {
    return {
      propsList: this.props,
      arrow: '',
    }
  },
  methods: {
    cellNaming() {
      this.arrow = this.props2.replace('q','') - 1;
    },
  },
  mounted() {
    this.cellNaming();
  }
}
</script>

<style lang="less">
@import "~@/less/asset";

  [header] { color: #000; .tr;
    .box { .rel; .ib; .p(0);
      .bar { .abs; .rt; .ib; }
      .arrow { .lt(0,50%); .abs; z-index: 1; }
      li { .ib; .h(30); .-a(#000); .w(60); }
      .arrow { .abs; .l(0); transform: translateX(-50%); }
    }
  }
</style>