<template>
  <div>
    <card :next="`/`" next-text="В начало">
      <div slot="title">{{Test.Title}}</div>
      <div>Вы успешно завершили тест.</div>
      <div>Всего вопросов {{CurrentTestResult.count}}, из них правильно {{CurrentTestResult.isTrue}} </div>
    </card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'Test-Finish',
  computed: {
    id() { return this.$route.params.id },
    Test() { return this.$store.getters.test(this.id) },
    ...mapGetters(['CurrentTestResult', 'CurrentTest']),
  },
  async fetch ({ store, params }) {
    //await store.dispatch('GET_TEST_LIST')
    await store.dispatch('GET_TEST_INFO', params.id)
  }
}
</script>
