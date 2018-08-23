import Vue from 'vue'

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
          }
        }
      }
    }
  }
})
