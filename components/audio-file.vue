<template>
  <audio class="audio-file" :src=src controls></audio>
</template>

<script>
export default {
  name: 'audio-plaeeyr',
  props: {
    src: { type: String, default: "" }
  }
}
</script>

<style scoped>

</style>

