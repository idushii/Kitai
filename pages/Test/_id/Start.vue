<template>
  <div>
    <card :next="`Page/0`" :edit="isAuth" :edit-link="`/Test/${id}/EditInfo`" next-text="Пройти тест">
      <div slot="title">{{info.Title}}</div>
      <div slot="content" v-html="info.InfoFull" />
    </card>
  </div>
</template>

<script>
export default {
  name: 'Test-Start',

  computed: {
    id() { return this.$route.params.id },
    info() { return this.$store.getters.test(this.id) }
  },
  async fetch ({ store, params }) {
    //await store.dispatch('GET_TEST_LIST')
    await store.dispatch('GET_TEST_INFO', params.id)
  }
}
</script>
