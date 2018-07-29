<template>
  <card close @close="close">
    <div slot="title">Изменить страницу</div>
    <template slot="content">
      <input type="text" v-model="Page.Title" />
      <no-ssr placeholder="Редактор загружается...">
        <!--wysiwyg v-model="Page.Text" :height="500" /-->
        <Vueditor ref="Vueditor"></Vueditor>
      </no-ssr>
    </template>
  </card>
</template>

<script>
export default {
  name: 'EditPage',
  layout: 'document',
  async asyncData({ app, params }) {
    return { Page: await app.$axios.$get(`/api/Page/${params.Path}`) }
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
    await this.$nextTick()
    let this_ = this; this_.$refs.Vueditor.setContent(this.Page.Text)
    setTimeout(() => {
      this_.$refs.Vueditor.setContent(this.Page.Text)
    }, 1000)
  },
  methods: {
    async close() {
      this.Page.Text = this.$refs.Vueditor.getContent()
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
