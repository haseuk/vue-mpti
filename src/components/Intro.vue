<template>
  <div intro>
    <transition name="fade">
      <section v-if="page === 1" :key="1">
        <h1>MPTI에 오신걸 환영합니다</h1>
        <p>
          텔미트렌의 다양한 처방 케이스에<br>
          대해 좀더 나은 제품과 서비스를 만들기 위해<br>
          선생님들의 많은 참여 부탁드립니다*
        </p>
        <a @click="next">참여하기</a>
      </section>
      <section v-else-if="page === 2" :key="2">
        <p>
          TEST 참여 전<br>
          알고 계신 코드를 입력해 주세요*
        </p>
        <label>
          코드 <input type="text" v-model="code"> <a @click="submit">확인</a>
        </label>
        <p>만약 알고 계신 코드가 없다면 <a @click="next">이동</a> 버튼을 클릭해주세요*</p>
      </section>
      <section v-else-if="page === 3" :key="3">
        <p> 테스트 진행을 위해 아래 정보를 입력해 주세요*</p>
        <label>
          병원명 <input type="text" v-model="hospital">
        </label>
        <label>
          성 함 <input type="text" v-model="name">
        </label>
        <a @click="form">다음</a>
      </section>
      <section v-else-if="page === 4" :key="4">
        <p>{{ this.hospital }}병원(의원) {{ this.name }}선생님 안녕하세요?<br> 테스트를 시작하겠습니다*</p>
        <router-link to="cardSelect">시작</router-link>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Intro",

  data() {
    return {
      page: 2,
      code: '',
      hospital: '',
      name: '',
    }
  },
  methods: {
    next: function() {
      this.page += 1;
    },
    submit: function() {
      if(!this.code) {
        alert('코드 번호를 입력하세요.')
      } else {
        alert('코드 번호를 확인했습니다.')
        this.next();
      }
    },
    form: function() {
      if(!this.hospital && !this.name) {
        alert('병원명과 성함을 작성해주세요.')
      } else {
        this.next();
        this.textChanger();
      }
    },
    textChanger: function() {
      this.hospital = this.hospital.replace('병원','');
      this.hospital = this.hospital.replace('의원','');
    }
  }
}
</script>

<style lang="less">
@import "~@/less/asset";

[intro] { font-size: 20px; text-align: center;
  section { .abs; .lt; .wf; .hf; }
}

</style>