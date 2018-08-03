<template>
  <div @click="select" id="icon">
    <input type="file" ref="file" v-show="false" @change="upload" id="upload">
  </div>
</template>

<script>
export default {
  name: 'audio-upload',
  props: {
    name: { type: [String, Number], default: "name.mp3" }
  },
  methods: {
    select() {
      document.querySelector('#upload').click()
    },
    async upload(e) {
      var formData = new FormData();
      var fileUpload = this.$refs.file.files[0];
      formData.append("sound", fileUpload);
      let result = await this.$axios.$post(`/api/Words/Upload/${this.name}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

