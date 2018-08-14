<template>
  <div>
    <card :edit="isAuth" :edit-link="`/Test/${id}/Page/${index}/Edit`">
      <div slot="title">{{item.Quest}}</div>
      <div slot="content">
        <div class="info" v-html="item.Info"></div>
      </div>
    </card>
    <card :next="isNext ? `${index*1 + 1}` : '/Test/1/Finish'">
      <div slot="title"> Ваше решение? </div>
      <div slot="content" class="variants">
        <label v-if="item.Variant_1"> <input type="radio" name="quest" /> {{item.Variant_1}} </label>
        <label v-if="item.Variant_2"> <input type="radio" name="quest" /> {{item.Variant_2}} </label>
        <label v-if="item.Variant_3"> <input type="radio" name="quest" /> {{item.Variant_3}} </label>
        <label v-if="item.Variant_4"> <input type="radio" name="quest" /> {{item.Variant_4}} </label>
      </div>
    </card>
  </div>
</template>
<script>
export default {
  name: 'Test-Page',
  layout: 'site',
  computed: {
    id() { return this.$route.params.id },
    isNext() { return (this.test.Items.length-1 > this.index ) ? true : false },
    index() { return this.$route.params.index },
    test() { return this.$store.getters.test(this.id) || { Items: [] } },
    item() { return this.$store.getters.test_item(this.id, this.index) || {} },
  },
  async fetch ({ store, params }) {
    if (!this.test) {
      await store.dispatch('GET_TEST_INFO', params.id)
    }
  }
}
</script>

<style lang="scss">
#content {
  .variants {
    display: grid; grid-template-rows: repeat(auto-fit, 1rem); grid-gap: 1rem;
  }
}
</style>
