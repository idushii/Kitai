<template>
  <card class="TestEditInfo" :close=close @close="EventClose">
    <div v-if="title" slot="title">{{title}}</div>
    <div slot="content">
      <input type="text" :value="Item.Title" @input="setTitle">
      <select-category :id-category="Item.idCategory" @input="setCategory" />
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorSmall`" :value=Item.Info></textarea>
      </no-ssr>
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`EditorFull`" :value=Item.InfoFull></textarea>
      </no-ssr>
    </div>
  </card>
</template>

<script>
export default {
  name: 'TestEditInfo',
  props: {
    id: { type: Number, default: null },
    close: { type: Boolean, default: false },
    title: { type: String, default: "" },
    Value: { type: [Boolean, Object], default: false }
  },
  data: () => ({
    Item: {},
    EditorSmall: {},
    EditorFull: {},
  }),
  async created() {
    if (this.Value) {
      this.Item = {...this.Value}
    } else {
      this.Item = {...this.$store.getters.test(this.id)} || {};
      if (this.Item.Info === undefined) await this.$store.dispatch('GET_TEST_LIST');
      this.Item = {...this.$store.getters.test(this.id)};
    }
  },
  async mounted() { 
    await this.$nextTick()
    let thisEditor = this;

    this.EditorSmall = tinymce.init({
      selector: `#EditorSmall`,
      menubar: false,
      height: this.$el.querySelector("#EditorSmall").getBoundingClientRect().height-70,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
      ],
      toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
      images_upload_url: '/api/Img/Upload',
      images_upload_base_path: '/img',
      init_instance_callback: function (editor) {
        editor.on('change', function (e) { thisEditor.Item.Info = tinymce.get('EditorSmall').getContent(); thisEditor.EventInput() });
      }
    });

    this.EditorSmall = tinymce.init({
      selector: `#EditorFull`,
      height: this.$el.querySelector("#EditorFull").getBoundingClientRect().height-70,
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
        editor.on('change', function (e) { thisEditor.Item.InfoFull = tinymce.get('EditorFull').getContent(); thisEditor.EventInput() });
      }
    });
  },
  beforeDestroy() { tinymce.remove() },
  methods: {
    setCategory(id) { this.Item.idCategory = id; this.EventInput(); },
    setTitle(e) { this.Item.Title = e.target.value; this.EventInput(); },
    EventClose() {
      if (this.close) this.$emit('close', this.Item)
      if (this.save) this.save(this.Item)
      return this.Item
    },
    EventInput() {
      this.$emit('input', this.Item)
    }
  },
}
</script>

<style lang="scss" scoped>
.TestEditInfo .content>div {
  display: grid; 
  grid-template-rows: auto auto 40vh 70vh;
  grid-gap: 1rem;

  input { width: calc(100% - 4px -.4rem); padding: .2rem; }
}
</style>
