<template>
  <div 
    @click.native="play" 
    id="icon" :style="{width: this.width+'px', height: this.width+'px', margin: center ? '10px auto' : '10px'}"
  ></div>
</template>

<script>

export default {
  name: 'Voice',
  props: {
    text: { type: String, default: '' },
    voice: { type: String, default: 'ru-RU' },
    width: { type: [String, Number], default: "40" },
    center: { type: Boolean, default: false },
  },
  data: () => ({
    ListVoice: []
  }),
  computed: {
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
  async mounted() {
    let thisB = this;

    window.speechSynthesis.onvoiceschanged = function() {
      thisB.$root.$emit( 'getVoices', speechSynthesis.getVoices() )
    }

    this.$root.$on('getVoices', function(ListVoice) {
      for (let voice of ListVoice) thisB.ListVoice.push( voice )
    })
  }

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
