<template>
  <div class="WrappRecordEdit">
    <card :save="close" :back="`Page/${pathPage}/${pathCategory}`" title clings>Добавить запись</card>
    <card>
      <input type="text" v-model="Record.Title" />
      <input type="text" v-model="Record.Path" />
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorSmall`"></textarea>
      </no-ssr>
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorFull`"></textarea>
      </no-ssr>
    </card>
  </div>
</template>

<script>
export default {
  name: 'Record-Add',
  layout: 'document',
  computed: {
    pathPage() { return this.$route.params.PathPage },
    pathCategory() { return this.$route.params.PathCategory },
    Category() { return this.$store.getters.Category(this.pathCategory) }
  },
  asyncData({app, params, store, route}) {
    return { Record: {Info: "", Text: "", Path: "new-record", Title: "Новая запись", idCategory: null}, EditorSmall: {}, EditorFull: {} }
  },
  async mounted() { 
    await this.$nextTick()
    let thisEditor = this;

    this.EditorSmall = tinymce.init({
      selector: `#EditorSmall`,
      menubar: false,
      height: 250, //this.$el.querySelector("#EditorSmall").getBoundingClientRect().height-70,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
      ],
      toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
      images_upload_url: '/api/Img/Upload',
      images_upload_base_path: '/img',
      init_instance_callback: function (editor) {
        editor.on('change', function (e) { thisEditor.Record.Info = tinymce.get('EditorSmall').getContent(); });
      }
    });

    this.EditorFull = tinymce.init({
      selector: `#EditorFull`,
      height: 400,//this.$el.querySelector("#EditorFull").getBoundingClientRect().height-70,
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
        editor.on('change', function (e) { thisEditor.Record.Text = tinymce.get('EditorFull').getContent(); });
      }
    });
  },
  beforeDestroy() { tinymce.remove() },
  methods: {
    async close() {
      this.Record.idCategory = this.Category.id
      let answer = await this.$store.dispatch('NEW_RECORD', this.Record)
      if (answer == true) this.$router.push(`/Page/${this.pathPage}/${this.pathCategory}`)
      else alert(answer.message + ' ' +JSON.stringify(answer.info))
    },
  }
}
</script>

<style lang="scss">
.WrappRecordEdit .content {
  display: grid; 
  grid-template-rows: auto auto auto auto;
  grid-gap: 1rem;

  input { width: calc(100% - 4px -.4rem); padding: .2rem; }
}
</style>

<style lang="scss" scoped>
#content {
  display: grid; grid-gap: 1rem;
}
</style>
