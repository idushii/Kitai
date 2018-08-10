<template>
  <div class="WrappCategoryEdit">
    <card :save="close" :back="`/Page/${Page.Path}/${Category.Path}`" title clings>Изменить категорию</card>
    <card>
      <input type="text" v-model="Category.Title" />
      <no-ssr placeholder="Редактор загружается...">
        <textarea id="Editor" ref="Editor" :value=Category.Info></textarea>
      </no-ssr>
    </card>
  </div>
</template>

<script>
export default {
  name: 'EditCategory',
  layout: 'document',
  async asyncData({ app, params, store }) {
    return { Category: {...store.getters['CategoryById'](params.id)}, Editor: {} }
  },
  computed: {
    Page() {
      return this.$store.getters['PageById'](this.Category.idPage)
    }
  },
  async update() { 
    await this.$nextTick()
    await this.$nextTick()
    let this_ = this; this_.$refs.Vueditor.setContent(this.Category.Info)
    setTimeout(() => {
      this_.$refs.Vueditor.setContent(this.Category.Info)
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
          thisEditor.Category.Info = tinymce.get('Editor').getContent()
        });
      }
    })
  },
  beforeDestroy() { tinymce.remove() },
  methods: {
    async close() {
      let answer = await this.$store.dispatch('SET_CATEGORY', this.Category)
      if (answer == true) this.$router.push(`/Page/${this.Page.Path}/${this.Category.Path}`)
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

