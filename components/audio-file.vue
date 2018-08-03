<template>
  <div @click="play" id="icon"></div>
</template>

<script>
export default {
  name: 'audio-plaeeyr',
  props: {
    src: { type: String, default: "" }
  },
  data: () => ({
    pleer: {}
  }),
  mounted() {
    this.pleer = new Audio('/words/Airplane.mp3')
  },
  methods: {
    play() {
      this.pleer.play()
    }
  }
}
</script>

<style scoped>
  #icon { 
    width: 3rem; height: 3rem; 
    background: url('/play.svg'); background-size: 100%; 
    cursor: pointer; 
    box-shadow: 0 0 10px black;
    border-radius: 3rem;
    transition: all .2s;
    margin: 10px;
  }
  #icon:hover { box-shadow: 0 0 5px black; }
</style>

