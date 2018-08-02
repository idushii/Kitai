<template>
  <div class="WrappPageEdit">
    <card :save="close" :back="`/Page/${Page.Path}`" title clings>Изменить страницу</card>
    <card>
      <input type="text" v-model="Page.Title" />
      <no-ssr placeholder="Редактор загружается...">
        <!--wysiwyg v-model="Page.Text" :height="500" /-->
        <!--Vueditor ref="Vueditor"></Vueditor-->
        <div id="Editor"></div>
      </no-ssr>
    </card>

  </div>
</template>

<script>
export default {
  name: 'EditPage',
  layout: 'document',
  async asyncData({ app, params }) {
    return { Page: await app.$axios.$get(`/api/Page/${params.Path}`), Editor: {} }
  },
  async update() { 
    await this.$nextTick()
    await this.$nextTick()
    let this_ = this; this_.$refs.Vueditor.setContent(this.Page.Text)
    setTimeout(() => {
      this_.$refs.Vueditor.setContent(this.Page.Text)
    }, 1000)
  },
  async mounted() { 
    await this.$nextTick()
    let vueditor = require('vueditor')
    this.Editor = vueditor.createEditor('#Editor', {
      uploadUrl: '',
      id: 'Editor',
      classList: []
    });//*/
    this.Editor.setContent(this.Page.Text)
  },
  methods: {
    async close() {
      this.Page.Text = this.Editor.getContent()
      let answer = await this.$axios.$post(`/api/save/page/${this.Page.Path}`, this.Page)
      if (answer.result == true) this.$router.push(`/Page/${this.Page.Path}`)
      else alert(answer.message + ' ' +JSON.stringify(answer.info))
    }
  }
}
</script>

<style lang="scss">
@import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

.content {
  &>input { padding: .5rem; background: white; border: 1px solid grey; width: calc( 100% - 1rem); margin-bottom: 1rem; }

  .vueditor { min-height: 75vh; border: 1px solid grey; }
}
</style>

<style lang="scss" scoped>
#content {
  display: grid; grid-gap: 1rem;
}
</style>

