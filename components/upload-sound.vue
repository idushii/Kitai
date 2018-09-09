<template>
  <div @click="select" id="icon" :style="{width: this.width+'px', height: this.width+'px' }" >
    <input type="file" ref="file" v-show="false" @change="upload" id="upload">
  </div>
</template>

<script>
export default {
  name: 'audio-upload',
  props: {
    name: { type: [String, Number], default: "name.mp3" },
    type: { type: String, default: "Word" },
    width: { type: [String, Number], default: "40" },
  },
  computed: {
    link() { 
      if (this.type == 'Word') return `/api/Words/Upload/${this.name}`
      if (this.type == 'Quest') return `/api/Save/TestItem/Upload/${this.name}`
    }
  },
  methods: {
    select() {
      document.querySelector('#upload').click()
    },
    async upload(e) {
      var formData = new FormData();
      var fileUpload = this.$refs.file.files[0];
      formData.append("sound", fileUpload);
      let result = await this.$axios.$post(this.link, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (result.result) {
        this.$emit('input', result.Path)
      } else window.alert(result.message)
    }
  }
}
</script>

<style scoped>
  #icon { 
    width: 3rem; height: 3rem; 
    background: url('/upload-sound.svg'); background-size: 100%; 
    cursor: pointer; 
    box-shadow: 0 0 10px black;
    border-radius: 3rem;
    transition: all .2s;
    margin: 10px;
  }
  #icon:hover { box-shadow: 0 0 5px black; }
</style>

