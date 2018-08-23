<template>
  <div>
    <card :next="`/`" next-text="В начало" :edit=$store.getters.USER>
      <div slot="title">{{info.Title}}</div>
      <div slot="content">Вы успешно завершили тест. Результаты Вы можете получить позже.</div>
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
