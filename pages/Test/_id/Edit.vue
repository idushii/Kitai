<template>
  <div class="TestEdit">
    <card title back="/Page/Testing" :save=save>Изменить тест</card>
    <test-edit-info ref=TestEditInfo :id=id />
    <edit-item v-if="Items && Items.length" v-for="(item, index) in  Items" :key="`item-${index}`" :id="id" :index="index" ref=EditItem :item=item />
  </div>
</template>

<script>
import TestEditInfo from '~/components/Test/EditInfo.vue'
import EditItem from '~/components/Test/EditItem.vue'
export default {
  name: 'Test-Edit',
  layout: 'document',
  computed: {
    id() { return this.$route.params.id*1 },
  },
  data: () => ({
    //Items: []
  }),
  asyncData({ req, params, store }) {
    return store.dispatch('GET_TEST_INFO', params.id).then(() => ({Items: store.getters.test(params.id).Items}))
  },
  async created() {
    //this.Items = await this.$store.dispatch('GET_TEST_INFO', this.id).then(() => this.$store.getters.test(this.id).Items)
  },
  methods: {
    save() {
      let Test = { ...this.$refs.TestEditInfo.EventClose(), Items: [] }
      for(let item of this.$refs.EditItem) {
        Test.Items.push(item.EventClose())
      }
      this.$store.dispatch('SAVE_TEST', Test)
    }
  },
  components: {
    TestEditInfo,
    EditItem
  }
}
</script>

<style lang="scss" scoped>
  .TestEdit {
    display: grid; grid-gap: 1rem;
    margin-bottom: 10vh !important;
  }
</style>
