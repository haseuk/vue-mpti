<template>
  <div card>
    <transition name="fade">
      <section>
        <span class="img" :class="{imgMove: imgMove}"></span>
        <div class="visual">
          <h1 mov data-load="1" :class="{txt: txtActive}">{{ q.title }}</h1>
          <p mov data-load="2" :class="{txt: txtActive}">{{ q.question }}</p>
          <img :src="`/img/${q.img}`" alt="" :class="{txt: txtActive}" mov data-load="3">
          <label v-for="(e, i) in q.examples" :key="i">
            {{ i + 1 }}. <input type="checkbox" :value="i + 1" v-model="answer[step]"> {{ e }}
          </label>
          <a @click="que">다음</a>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import CardData from '@/data/card';

export default {
  name: "Card",
  data() {
    return {
      imgMove: false,
      txtActive: false,
      step: 0,
      answer: [[]],
    }
  },
  watch: {
    step() {
      if (!this.answer[this.step]) this.answer[this.step] = [];
    }
  },
  computed: {
    month() {
      return this.$route.params.month;
    },
    q() {
      return CardData[this.month][this.step];
    }
  },
  methods: {
    imgMoving: function() {
      this.imgMove = !this.imgMove;
      this.txtLoad();
    },
    txtLoad: function() {
      this.txtActive = !this.txtActive;
    },
    que: function() {
      if (!this.answer[this.step] || this.answer[this.step].length === 0) {
        alert('메롱');
        return;
      }
      this.step = this.answer[0];
    }
  },
  mounted() {
    this.imgMoving();
  }
}
</script>

<style lang="less">
  [card] {
    section { position: relative;}
    .img { display: block; height: 100vh; background-size: cover; background-image: url("/img/img.png"); background-position: right 100% top 100%; transition: 3s; transition-delay: 0.5s; position: relative; }
    .imgMove { background-position: right 0 top 100%; }
    .visual { font-size: 25px; width: 100%; position: absolute; left: 0; top: 0; z-index: 1;}
    [mov] { opacity: 0; transition: opacity 1s; }
    [mov].txt { opacity: 1;}
    [mov][data-load="1"] { transition-delay: 3s;}
    [mov][data-load="2"] { transition-delay: 3.5s;}
    [mov][data-load="3"] { transition-delay: 4s;}
    [mov][data-load="4"] { transition-delay: 4.5s;}
    [mov][data-load="5"] { transition-delay: 5s;}
    [mov][data-load="6"] { transition-delay: 5.5s;}
    label { display: block; }
  }
</style>