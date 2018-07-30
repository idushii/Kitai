<template>
  <card class="EditItem" :save="save ? EventClose : () => {}">
    <div v-if="title" slot="title">{{title}}</div>
    <input type="text" v-model="Item.Quest" placeholder="Вопрос">
    <div class="Info">
      <no-ssr placeholder="Редактор загружается...">
        <Vueditor ref="Vueditor"></Vueditor>
      </no-ssr>
   </div>
    <div>
      <div class="variants-edit" v-for="index in 4" :key="`variant-${index}`">
        <input 
          type="radio" name="variant" 
          :checked="(index-1) == Item.NumberTrue"
          @change="Item.NumberTrue = (index-1)"
        />
        <input 
          type="text" 
          :placeholder="`Вариант ответа #${index}`" 
          :value="Variants[index-1]" @change="e => Item[`Variant_${index}`] = e.target.value"
        />
      </div>
    </div>
  </card>
</template>

<script>
export default {
  name: 'EditItem',
  props: {
    id: { type: Number, default: null },
    index: { type: Number, default: null },
    close: { type: Boolean, default: false },
    save: { type: [Function, Boolean], default: false },
    title: { type: String, default: "" },
    item: { type: [Object, Boolean], default: false },
  },
  data: () => ({
    Item: {},
  }),
  computed: {
    Variants() {
      return [ this.Item.Variant_1, this.Item.Variant_2, this.Item.Variant_3, this.Item.Variant_4 ]
    }
  },
  async created() {
    if (this.item) { this.Item = {...this.item}; return; }
    this.Item = this.$store.getters.test_item(this.id, this.index);
    if (this.Item.Quest === undefined)                    await this.$store.dispatch('GET_TEST_LIST');
    if (this.Item && this.Item.Variant_1 === undefined)   await this.$store.dispatch('GET_TEST_INFO', this.id);
    this.Item = {...this.$store.getters.test_item(this.id, this.index)};//*/
  },
  async mounted() { 
    await this.$nextTick()
    await this.$nextTick()
    let this_ = this; this_.$refs.Vueditor.setContent(this.Item.Info)
    setTimeout(() => {
      this_.$refs.Vueditor.setContent(this.Item.Info)
    }, 1000)
  },
  methods: {
    EventClose() {
      this.Item.Info = this.$refs.Vueditor.getContent()
      if (this.save) this.save(this.Item)
      return this.Item
    }
  }
}
</script>

<style lang="scss">
  .EditItem .content {
    &>input, &>.Info { width: calc(100% - .5rem - 4px); margin: 0px; margin-bottom: 1rem; font-size: 1.2rem; padding: .2rem; }
    &>.Info { font-size: 1rem; min-height: 50vh; }
    &>div {
      display: grid; grid-gap: .5rem;

      &>.variants-edit {
        display: grid; grid-template-columns: 2rem 1fr;
        width: 100%;

        input[type=radio] { margin: .5rem; }
        input { padding: .2rem; }
      }
    }
    
  }
</style>
