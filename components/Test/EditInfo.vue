<template>
  <card class="TestEditInfo" :close=close @close="EventClose">
    <div v-if="title" slot="title">{{title}}</div>
    <div slot="content">
      <input type="text" v-model="Item.Title">
      <select-category :id-category="Item.idCategory" @input="setCategory" />
      <no-ssr placeholder="Редактор загружается...">
        <div id="editorSmallArea"></div>
      </no-ssr>
      <no-ssr placeholder="Редактор загружается...">
        <div id="editorFullArea"></div>
      </no-ssr>
    </div>
  </card>
</template>

<script>
import SelectCategory from '~/components/SelectCategory.vue'

export default {
  name: 'TestEditInfo',
  props: {
    id: { type: Number, default: null },
    close: { type: Boolean, default: false },
    title: { type: String, default: "" },
  },
  data: () => ({
    Item: {},
    EditorSmall: {},
    EditorFull: {},
  }),
  async created() {
    this.Item = {...this.$store.getters.test(this.id)} || {};
    if (this.Item.Info === undefined) await this.$store.dispatch('GET_TEST_LIST');
    this.Item = {...this.$store.getters.test(this.id)};
  },
  async mounted() { 
    await this.$nextTick()
    let vueditor = require('vueditor')
    this.EditorSmall = vueditor.createEditor('#editorSmallArea', {
      uploadUrl: '',
      id: 'editorSmall',
      classList: []
    });//*/

    this.EditorFull = vueditor.createEditor('#editorFullArea', {
      uploadUrl: '',
      id: 'editorSmall',
      classList: []
    });//*/

    this.EditorSmall.setContent(this.Item.Info)
    this.EditorFull.setContent(this.Item.InfoFull)
  },
  methods: {
    setCategory(id) { this.Item.idCategory = id },
    EventClose() {
      this.Item.Info = this.EditorSmall.getContent()
      this.Item.InfoFull = this.EditorFull.getContent()
      if (this.close) this.$emit('close', this.Item)
      if (this.save) this.save(this.Item)
      return this.Item
    }
  },
  components: {
    SelectCategory
  }
}
</script>

<style lang="scss" scoped>
.TestEditInfo .content>div {
  display: grid; 
  grid-template-rows: auto auto 2fr 3fr;
  grid-gap: 1rem;
  min-height: 150vh;

  input { width: calc(100% - 4px -.4rem); padding: .2rem; }
}
</style>
