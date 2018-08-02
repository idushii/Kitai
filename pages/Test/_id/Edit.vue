<template>
  <div class="TestEdit">
    <card title back="/Page/Testing" :save=save>Изменить тест</card>
    <test-edit-info ref=TestEditInfo :id=id />
    <edit-item 
      v-if="Items && Items.length" :is-hide="item.isHide"
      v-for="(item, index) in  Items" :key="`item-${index}`"
      :id="id" :index="index" :title="`Вопрос #${index+1}`"
      ref=EditItem :item=item :close=hideQuest
    />
    <fab-add @click="addNewQuest" />
  </div>
</template>

<script>
import TestEditInfo from '~/components/Test/EditInfo.vue'
import EditItem from '~/components/Test/EditItem.vue'
import FabAdd from '~/components/btns/fab-add.vue'
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
    return store.dispatch('GET_TEST_INFO', params.id).then(() => ({Items: store.getters.test(params.id).Items.map(item => ({...item, isHide: false}))}))
  },
  async created() {
    //this.Items = await this.$store.dispatch('GET_TEST_INFO', this.id).then(() => this.$store.getters.test(this.id).Items)
  },
  methods: {
    async save() {
      let Test = { ...this.$refs.TestEditInfo.EventClose(), Items: [] }
      for(let item of this.$refs.EditItem) { Test.Items.push(item.EventClose()) }
      let result = await this.$store.dispatch('SAVE_TEST', Test)
      if (result === true) this.$router.push(`/Page/Testing`)
      else alert(JSON.stringify(result))
    },
    hideQuest(index) {
      this.Items[index].isHide = true
    },
    addNewQuest() {
      this.Items.push({
        id: null, 
        idTest: this.id,
        Quest: "",
        Info: "",
        OrderItem: 0,
        NumberTrue: 0,
        Variant_1: "",
        Variant_2: "",
        Variant_3: "",
        Variant_4: "",
        isHide: false,
      })
    }
  },
  components: {
    TestEditInfo,
    EditItem,
    FabAdd
  }
}
</script>

<style lang="scss" scoped>
  .TestEdit {
    display: grid; grid-gap: 1rem;
    margin-bottom: 10vh !important;
  }
</style>
