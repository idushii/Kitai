import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from "vuex";

import Voice from '~/components/Voice.vue'
Vue.component('Voice', Voice)

Vue.mixin({
  mounted() { this.setVersionSite() },
  updated() { this.setVersionSite() },
  methods: {
    setVersionSite() {
      if (localStorage.layout) {
        if (this.setLayout) { 
          switch (localStorage.layout) {
            case 'desktop':  { this.setLayout('site'); break; }
            case 'tablet':  { this.setLayout('site-tablet'); break; }
            case 'mobile':  { this.setLayout('site-mobile'); break; }
            default: { this.setLayout('site'); break; }
          }
        }
      } else if (this.setLayout) {
        this.setLayout('site');
      } 

      if (localStorage && localStorage.user) { 
        //
        //console.log(localStorage.user)
        if ( ! this.$store.getters["User/USER"].Login ) {
          this.$store.commit('User/SET_USER', JSON.parse(localStorage.user))
        }
      }
      if (localStorage && localStorage.CurrentTest && this.$store.getters.CurrentTest.idTest == null) {
        this.$store.commit('SET_CURRENT_TEST', JSON.parse(localStorage.CurrentTest))
      }
      
      let thisB = this;
      window.speechSynthesis.onvoiceschanged = function() {
        thisB.SET_VOICES( speechSynthesis.getVoices() )
      }

    },
    ...mapMutations(['SET_VOICES'])
  }
})
