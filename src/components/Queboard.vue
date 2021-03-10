<template>
  <div>
    <transition name="fade">
      <section v-if="page === 1">
        q
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Queboard",

  data() {
    return {
      page: 1,

    }
  }
}
</script>

<style scoped>

</style>