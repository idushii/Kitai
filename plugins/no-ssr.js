import Vue from 'vue'

Vue.mixin({
  mounted() { this.setVersionSite() },
  updated() { this.setVersionSite() },
  methods: {
    setVersionSite() {
      if (localStorage.layout) {
        if (this.setLayout) { 
          switch (localStorage.layout) {
            case 'desktop':  { this.setLayout('site'); this.layout_site = 'site'; break; }
            case 'tablet':  { this.setLayout('site-tablet'); this.layout_site = 'site-tablet'; break; }
            case 'mobile':  { this.setLayout('site-mobile'); this.layout_site = 'site-mobile'; break; }
            default: { this.setLayout('site'); this.layout_site = 'site'; break; }
          }
        }
      } else if (this.setLayout) {
        this.setLayout('site');
        this.layout_site = 'site';
      } 
    }
  }
})
