<template>
  <div card>
    <Header :bar="bar"></Header>
    <transition name="fade">
      <section>
        <span class="img" :class="{imgMove: imgMove}"></span>
        <div class="visual">
          <h1 mov data-load="1" :class="{txt: txtActive}">{{ q.title }}</h1>
          <p mov data-load="2" :class="{txt: txtActive}">{{ q.subTitle }}</p>
          <p mov data-load="3" :class="{txt: txtActive}">{{ q.question }}</p>
          <img :src="`/img/${q.img}`" alt="" :class="{txt: txtActive}" mov data-load="4">
          <label mov data-load="5" v-for="(e, i) in q.examples" :key="i" :class="{txt: txtActive}">
            {{ i + 1 }}. <input :type="`${ q.type }`" :value="i + 1" v-model="answer[step]"> {{ e.label || e }}
          </label>
          <a @click="prev" mov data-load="6" :class="{txt: txtActive}" v-if="step !== 'q1'">이전</a>
          <a @click="que" mov data-load="6" :class="{txt: txtActive}">다음</a>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import QueData from '@/data/queBoard';
import Header from "@/components/Header";

export default {
  name: "Card",
  components: {Header},
  data() {
    return {
      imgMove: false,
      txtActive: false,
      step: 'q1',
      answer: {},
      history: [],
      bar: [],
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
      return QueData[this.month][this.step];
    },
    queLength() {
      return QueData[this.month];
    }
  },
  methods: {
    imgMoving() {
      this.imgMove = !this.imgMove;
      this.txtLoad();
    },
    txtLoad() {
      this.txtActive = !this.txtActive;
    },
    getNext() {
      console.log(this.answer[this.step])
      const answer = this.answer[this.step];
      if (!answer) return null;
      const n = typeof answer === 'number'
                ? this.q.examples[answer - 1].next
                : answer.map(n => this.q.examples[n - 1].next).find(x => x)
      if (n) return n;
      if (!this.q.next) this.msg();
      return this.q.next;
    },
    msg() {
      alert('끝');
      return false;
    },
    prev() {
      this.step = this.history.pop();
    },
    que() {
      if (!this.answer[this.step] || this.answer[this.step].length === 0) {
        alert('답변을 선택해주세요');
        return;
      }
      this.history.push(this.step);
      this.step = this.getNext();
    },
  },
  mounted() {
    this.imgMoving();
    this.bar = Object.keys(this.queLength).length;
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