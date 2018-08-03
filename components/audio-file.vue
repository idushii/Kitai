<template>
  <div @click="play" id="icon" :style="{width: this.width+'px', height: this.width+'px', margin: center ? '10px auto' : '10px'}"></div>
</template>

<script>
export default {
  name: 'audio-plaeeyr',
  props: {
    src: { type: String, default: "" },
    width: { type: [String, Number], default: "40" },
    center: { type: Boolean, default: false },
  },
  data: () => ({
    pleer: {}
  }),
  mounted() {
    this.pleer = new Audio(this.src)
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
  }
  #icon:hover { box-shadow: 0 0 5px black; }
</style>

