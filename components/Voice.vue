<template>
  <div 
    @click="play" 
    id="icon" :style="{width: this.width+'px', height: this.width+'px', margin: center ? '10px auto' : '10px'}"
  ></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'Voice',
  props: {
    text: { type: String, default: '' },
    voice: { type: String, default: 'ru-RU' },
    width: { type: [String, Number], default: "40" },
    center: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(['ListVoice']),
    indexVoice() {
      for (let index = 0; index < this.ListVoice.length; index++) {
        let ItemVoice = this.ListVoice[index]
        if ( ItemVoice.lang == this.voice ) return Number(index)
      }
      return 0; 
    }
  },
  methods: {
    play() {
      console.log(this.text)
      let t = new SpeechSynthesisUtterance( this.text )
      t.voice = this.ListVoice[this.indexVoice];
      let v = speechSynthesis.speak( t )
    }
  },
}


</script>

<style lang="scss" scoped>
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
