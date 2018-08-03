<template>
  <card class="EditItem" :save="save ? EventClose : false" :close="close ? EventClose : false" v-show="!isHide">
    <div v-if="title || close" slot="title">{{title}}</div>
    <input type="text" v-model="Item.Quest" placeholder="Вопрос">
    <div class="Info" :style="{'min-height': heightQuest}">
      <no-ssr placeholder="Редактор загружается...">
        <textarea :id="`Editor-${index}`" :ref="`Editor-${index}`" :value=Item.Info></textarea>
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
    close: { type: [Boolean, Function], default: false },
    save: { type: [Function, Boolean], default: false },
    title: { type: String, default: "Вопрос" },
    item: { type: [Object, Boolean], default: false },
    isHide: { type: Boolean, default: false },
    heightQuest: { type: [Boolean, String], default: false }
  },
  data: () => ({
    Item: {},
    Editor: {},
  }),
  computed: {
    Variants() {
      return [ this.Item.Variant_1, this.Item.Variant_2, this.Item.Variant_3, this.Item.Variant_4 ]
    }
  },
  async created() {
    await this.$nextTick()
    if (this.item) { this.Item = {...this.item}; return; }
    this.Item = this.$store.getters.test_item(this.id, this.index);
    if (this.Item.Quest === undefined)                    await this.$store.dispatch('GET_TEST_LIST');
    if (this.Item && this.Item.Variant_1 === undefined)   await this.$store.dispatch('GET_TEST_INFO', this.id);
    this.Item = {...this.$store.getters.test_item(this.id, this.index)};//*/
    if (this.Editor.setContent) this.Editor.setContent(this.Item.Info)
  },
  async mounted() { 
    await this.$nextTick()
    let thisEditor = this;

    this.Editor = tinymce.init({
      selector: `#Editor-${this.index}`,
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
        editor.on('change', function (e) { thisEditor.Item.Info = tinymce.get(`Editor-${index}`).getContent() });
      }
    });
  },
  methods: {
    EventClose() {
      this.Item.isHide = this.isHide
      if (this.save) this.save(this.Item)
      if (this.close) this.close(this.index)
      return this.Item
    }
  }
}
</script>

<style lang="scss" scoped>
  .EditItem .content {
    &>input, &>.Info { width: calc(100% - .5rem - 4px); margin: 0px; margin-bottom: 1rem; font-size: 1.2rem; padding: .2rem; }
    &>.Info { font-size: 1rem; min-height: 250px; }
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
