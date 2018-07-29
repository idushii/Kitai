<template>
  <div>{{formError}}</div>
</template>

<script>
export default {
  name: 'logout',
  data: () => ({
    formError: ''
  }),
  async created() {
    try {
      await this.$store.dispatch('logout')
      this.$router.push({path: '/'})
    } catch (e) {
      this.formError = e.message
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
