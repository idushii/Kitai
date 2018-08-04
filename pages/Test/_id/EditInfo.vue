<template>
  <div class="EditInfo">
    <card title clings :back="`/Test/${$route.params.id}/Start`" :save=save>Изменить описание теста</card>
    <test-edit-info :id=$route.params.id*1 close @close=save />
  </div>
</template>

<script>
export default {
  name: 'EditInfo',
  layout: 'document',
  methods: {
    async save(Item) {
      await this.$store.dispatch(`SAVE_TEST_INFO`, Item)
      this.$router.push(`/Test/${this.$route.params.id}/Start`)
    }
  }
}
</script>

<style>
  .EditInfo .card { margin-bottom: 1rem; }
</style>
