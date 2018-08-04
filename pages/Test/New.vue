<template>
  <div>
    <card clings title back="/Test" :save=save>Создать тест</card>
    <test-edit-info v-model="Test" />
  </div>
</template>

<script>
export default {
  name: 'NewTest',
  layout: 'document',
  data: () => ({
    Test: {
      id: null,
      idCategory: 3,
      Title: '',
      Info: '',
      InfoFull: '',
    }
  }),
  methods: {
    async save() {
      let result = await this.$store.dispatch('NEW_TEST', this.Test)
      if (result) {
        this.$router.push(`/Test/${this.$store.getters.TestLastID}/Edit`)
      } else {
        alert(result.message)
      }
    }
  }
}
</script>

<style>

</style>
