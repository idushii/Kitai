<template>
  <div class="WrappPageEdit">
    <card :save="close" :back="`/Page/${Page.Path}`" title clings>Изменить страницу</card>
    <card>
      <input type="text" v-model="Page.Title" />
      <no-ssr placeholder="Редактор загружается...">
        <textarea id="Editor" ref="Editor" :value=Page.Text></textarea>
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
    let thisEditor = this;

    thisEditor.Editor = tinymce.init({
      selector: '#Editor',
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
      ],
      toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
      images_upload_url: '/api/Img/Upload',
      images_upload_base_path: '/img',
      init_instance_callback: function (editor) {
        editor.on('change', function (e) { 
          thisEditor.Page.Text = tinymce.get('Editor').getContent()
        });
      }
    })
  },
  beforeDestroy() { tinymce.remove() },
  methods: {
    async close() {
      let answer = await this.$axios.$post(`/api/save/page/${this.Page.Path}`, this.Page)
      if (answer.result == true) this.$router.push(`/Page/${this.Page.Path}`)
      else alert(answer.message + ' ' +JSON.stringify(answer.info))
    },
  }
}
</script>

<style lang="scss">
.content {
  &>input { padding: .5rem; background: white; border: 1px solid grey; width: calc( 100% - 1rem); margin-bottom: 1rem; }

  .vueditor, #Editor { min-height: 50vh; width: 100%; border: 1px solid grey; }
}
</style>

<style lang="scss" scoped>
#content {
  display: grid; grid-gap: 1rem;
}
</style>

