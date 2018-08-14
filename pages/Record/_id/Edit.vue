<template>
  <div class="WrappRecordEdit">
    <card :save="close" :back="`/Record/${Record.id}/${Record.Path}`" title clings>Изменить запись</card>
    <card>
      <input type="text" v-model="Record.Title" />
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorSmall`" :value=Record.Info></textarea>
      </no-ssr>
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorFull`" :value=Record.Text></textarea>
      </no-ssr>
      <button @click="Remove">Удалить</button>
    </card>
  </div>
</template>

<script>
export default {
  name: 'Record-Edit',
  layout: 'document',
  computed: {
    id() { return this.$route.params.id },
    Category() { return this.$store.getters.CategoryById(this.Record.idCategory) },
    Page() { return this.$store.getters.PageById(this.Category.idPage) }
  },
  asyncData({app, params, store, route}) {
    return { Record: store.getters['Record'](route.params.id), EditorSmall: {}, EditorFull: {} }
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
        editor.on('change', function (e) { thisEditor.Record.Info = tinymce.get('EditorSmall').getContent(); thisEditor.EventInput() });
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
        editor.on('change', function (e) { thisEditor.Record.Text = tinymce.get('EditorFull').getContent(); thisEditor.EventInput() });
      }
    });
  },
  beforeDestroy() { tinymce.remove() },
  methods: {
    async close() {
      let answer = await this.$store.dispatch('SET_RECORD', this.Record)
      if (answer == true) this.$router.push(`/Record/${this.Record.id}/${this.Record.Path}`)
      else alert(answer.message + ' ' +JSON.stringify(answer.info))
    },
    async Remove() {
      let answer = await this.$store.dispatch('REMOVE_RECORD', this.Record)
      if (answer == true) this.$router.push(`/Page/${this.Page.Path}/${this.Category.Path}`)
      else alert(answer.message + ' ' +JSON.stringify(answer.info))
    }
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
