<template>
  <div card>
    <p>이 달의 카드를 선택해주세요</p>
    <ul>
      <li v-for="card in cards" :key="card.month">
        <router-link :to="`/card/${card.month}`">{{ card.month }} 월</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CardSelect",

  data() {
    return {
      cards: [
        { month: 4, },
        { month: 5, },
        { month: 6, },
        { month: 7, }
      ],
    }
  }


}
</script>

<style lang="less" scoped>
  [card] {
    li { list-style: none; display: inline-block; width: 20%; line-height: 200px; margin: 20px; background: #999; }
  }
</style>