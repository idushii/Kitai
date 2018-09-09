<template>
  <div>
    <card :edit="isAuth" :edit-link="`/Test/${id}/Page/${index}/Edit`">
      <div slot="title">{{item.Quest}}</div>
      <div slot="content">
        <audio-file v-if="item.Sound" :src="item.Sound" />
        <div class="info" v-html="item.Info"></div>
      </div>
    </card>
    <card :next="NextLink">
      <div slot="title"> Ваше решение? </div>
      <div slot="content" class="variants">
        <label v-if="item.Variant_1"> <input type="radio" name="quest" value="0" v-model="Answer" /> {{item.Variant_1}} </label>
        <label v-if="item.Variant_2"> <input type="radio" name="quest" value="1" v-model="Answer" /> {{item.Variant_2}} </label>
        <label v-if="item.Variant_3"> <input type="radio" name="quest" value="2" v-model="Answer" /> {{item.Variant_3}} </label>
        <label v-if="item.Variant_4"> <input type="radio" name="quest" value="3" v-model="Answer" /> {{item.Variant_4}} </label>
      </div>
    </card>
  </div>
</template>
<script>
export default {
  name: 'Test-Page',
  data: () => ({
    Answer: null,
  }),
  watch: {
    Answer(value) {
      this.$store.commit('ADD_CURRENT_TEST_ITEM', {idTest: this.item.idTest, idItem: this.item.id, Answer: this.Answer })
    }
  },
  computed: {
    id() { return this.$route.params.id },
    isNext() { return (this.test.Items.length-1 > this.index ) ? true : false },
    hasAnswer() { return this.Answer !== null }, 
    index() { return this.$route.params.index },
    test() { return this.$store.getters.test(this.id) || { Items: [] } },
    item() { return this.$store.getters.test_item(this.id, this.index) || {} },
    NextLink() {
      if ( this.hasAnswer ) {
        if ( this.isNext )
          return `${this.index*1 + 1}`
        else 
          return `/Test/${this.item.idTest}/Finish`
      }
      return `${this.index}`
    }
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
