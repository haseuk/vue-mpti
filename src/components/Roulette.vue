<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            VueRoulette
          </h1>
          <h2 class="subtitle">
            A simple roulette using VueJS
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" id="app">
        <div class="columns">
          <div class="column">
            <div class="columns is-centered">
              <input type="button" class="button is-dark" value="SPIN ROULETTE" id='spin' v-on:click="spin"/>
            </div>
            <div class="columns is-centered">
              <canvas id="canvas" width="500" height="500"></canvas>
            </div>
          </div>
<!--          <div class="column">-->
<!--            <div class="columns is-multiline">-->
<!--              <div class="column is-half">-->
<!--                <div class="field">-->
<!--                  <input class="input" type="text" placeholder="Input More Prize" v-model="new_option" v-on:keyup.enter="addOptions">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="column is-half">-->
<!--                <button class="button is-primary" v-on:click="addOptions">Add Prize</button>-->
<!--              </div>-->
<!--              <div class="column is-one-quarter" v-for="option in options" :key="option">-->
<!--                <button class="button is-danger" v-on:click="removeOptions(option)">x</button>-->
<!--                <span> {{option}} </span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "roullette",

  data() {
    return {
      options: ['꽝','1000','2000','3000','4000','5000','10','10000'],
      startAngle: 0,
      startAngleStart: 0,
      spinTimeout: null,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      ctx: '',
      img: null,
    }
  },


  computed: {
    arc: function () {
      return Math.PI / (this.options.length / 2);
    }
  },

  methods: {
    byte2Hex: function (n) {
      let nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    },

    RGB2Color: function (r,g,b) {
      return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    },

    getColor: function (item, maxitem) {
      let phase = 0;
      let center = 128;
      let width = 127;
      let frequency = Math.PI*2/maxitem;

      const RED   = Math.sin(frequency*item+2+phase) * width + center;
      const GRN = Math.sin(frequency*item+0+phase) * width + center;
      const BLU  = Math.sin(frequency*item+4+phase) * width + center;

      return this.RGB2Color(RED,GRN,BLU);
    },

    drawRouletteWheel: function () {
      let canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        let outsideRadius = 200;
        let textRadius = 160;
        let insideRadius = 125;

        this.ctx = canvas.getContext("2d");
        this.ctx.clearRect(0,0,500,500);

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;

        this.ctx.font = 'bold 12px Helvetica, Arial';

        for(let i = 0; i < this.options.length; i++) {
          let angle = this.startAngle + i * this.arc;
          this.ctx.fillStyle = this.getColor(i, this.options.length);

          this.ctx.beginPath();
          this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
          this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
          this.ctx.stroke();
          this.ctx.fill();

          this.ctx.save();
          this.ctx.shadowOffsetX = -1;
          this.ctx.shadowOffsetY = -1;
          this.ctx.shadowBlur    = 0;
          this.ctx.shadowColor   = "rgb(220,220,220)";
          this.ctx.fillStyle = "black";
          this.ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius,
              250 + Math.sin(angle + this.arc / 2) * textRadius);
          this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
          let text = this.options[i];
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
          this.ctx.restore();
        }

        //Arrow
        // this.ctx.fillStyle = "black";
        // this.ctx.beginPath();
        // this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        // this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        // this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        // this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        // this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        // this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        // this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        // this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        // this.ctx.fill();
      }
    },

    spin: function () {
      this.spinAngleStart = Math.random() * 10 + 10;
      this.spinTime = 0;
      this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
      this.rotateWheel();
    },

    rotateWheel: function () {
      this.spinTime += 30;
      if(this.spinTime >= this.spinTimeTotal) {
        this.stopRotateWheel();
        return;
      }
      let spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
      this.startAngle += (spinAngle * Math.PI / 180);
      this.drawRouletteWheel();

      let _this = this
      this.spinTimeout = setTimeout(function() {
        _this.rotateWheel()
      }, 30);
    },

    stopRotateWheel: function () {
      clearTimeout(this.spinTimeout);
      let degrees = this.startAngle * 180 / Math.PI + 90;
      let arcd = this.arc * 180 / Math.PI;
      let index = Math.floor((360 - degrees % 360) / arcd);
      this.ctx.save();
      this.ctx.font = 'bold 30px Helvetica, Arial';
      let text = this.options[index]
      console.log(index, text, this.options, this.arc)
      this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
      this.ctx.restore();
    },

    easeOut: function (t, b, c, d) {
      let ts = (t/=d)*t;
      let tc = ts*t;
      return b+c*(tc + -3*ts + 3*t);
    }
  },

  mounted() {
    this.drawRouletteWheel();
  }
}
</script>

<style>
  @import "~@/less/roullette.css";
</style>