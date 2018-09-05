<template>
<div>
    <div class="placeholder" v-if="isFloatToTop" :style="{width: `calc(${position.width}px - 2 * var(--gap))`, height: position.height+'px'}"></div>
    <div 
      class="card" :class="{'card-title': title, isFloatToTop}"
      :style="{backgroundColor: backgroundColor ? backgroundColor : '', left: position.left+'px', width: `calc(${position.width}px - 2rem)`}"
    >
      <div class="title" v-if="!title && $slots.title"><slot name="title">Заголовок</slot>
        <img class="icon" src="/close.svg" alt="" v-if="close" @click="EventClose">
        <img class="icon" src="/pen.svg" alt="" v-if="edit" @click="EventEdit">
        <img class="icon" src="/ok.svg" alt="" v-if="save" @click="save">
      </div>
      <div v-if="!title" class="content" :class="{'has-title': $slots.title}">
        <slot 
          name="content" 
          v-if="$slots.content"
        >
          Текст
        </slot>
        <slot> <div v-if="html" v-html="html"></div> </slot>
        <div class="link-wrapp" v-if="next">
          <nuxt-link :to=next> {{nextText}} </nuxt-link>
        </div>
      </div>
      <slot v-if="title">Заголовок</slot>
      <img class="icon" src="/pen.svg" alt="" v-if="edit && title" @click="EventEdit">
      <img class="icon left" src="/back.svg" alt="" v-if="back && title" @click="EventBack">
      <img class="icon" src="/ok.svg" alt="" v-if="save && title" @click="save">
    </div>

</div>
</template>

<script>
export default {
  name: 'card',
  props: { 
    clings: { type: Boolean, default: false },
    title: { type: Boolean, default: false }, 
    close: { type: [Function, String, Boolean], default: false }, 
    edit: { type: Boolean, default: false },
    editLink: { type: String, default: '' },
    next: { type: String, default: '' }, 
    nextText: { type: String, default: 'Дальше' }, 
    backgroundColor: { type: String, default: '' }, 
    back: { type: [Function, String, Boolean], default: '' },
    save: { type: [Function, Boolean], default: false },
    html: { type: String, default: '' }
  },
  data: () => ({
    isFloatToTop: false,
    position: {left: null, width: null, right: null, height: null}
  }),
  mounted() {
    if (this.clings) {
      let thisCard = this;
      let {width, top, left, height} = thisCard.$el.getBoundingClientRect()
      this.position = {width, height, left, top}
      if (window.pageYOffset > thisCard.$el.getBoundingClientRect().top) thisCard.isFloatToTop = true;
      window.onscroll = async function() {
        if (window.pageYOffset > thisCard.position.top) { thisCard.isFloatToTop = true }
        if (window.pageYOffset < thisCard.position.top) { thisCard.isFloatToTop = false }
      }
    }
  },
  methods: {
    EventEdit() {
      if (this.editLink) { this.$router.push(this.editLink); } else { this.$emit('edit'); }
    },
    EventClose() {
      if (typeof(this.close) == 'function') this.close()
      if (typeof(this.close) == 'boolean') this.$emit('close')
      if (typeof(this.close) == 'string') this.$router.push(this.close)
    },
    EventBack() {
      if (typeof(this.back) == 'function') this.back()
      if (typeof(this.back) == 'boolean') this.$emit('back')
      if (typeof(this.back) == 'string') this.$router.push(this.back)
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  background-color: var(--card-background);
  box-shadow: var(--card-shadow);

  .title {
    font-size: 1.2rem; font-style: italic; text-shadow: var(--card-title-text-shadow);

    .icon { width: 1rem; float: right; margin-top: -1.2rem; cursor: pointer; }
  }

  .has-title.content {
    padding-top: 0.8rem;
  }

  .link-wrapp {
    text-align: right;
    margin-top: 1rem;

    a {
      color: black;
      text-decoration: none;
      border: 1px solid grey;
      padding: .2rem 1rem;
      transition: all .2s;

      &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .5);        
        background-color: rgba(0, 0, 0, .05);
      }
    }
    
  }
}

.card-title {
  /*margin-bottom: 1rem;*/
  font-size: 1.5rem; font-style: italic; text-align: center; text-shadow: var(--card-title-text-shadow);
  .icon { 
    width: 1.5rem; float: right; cursor: pointer; 
    &.left { float: left; }
  }
}

.isFloatToTop {
  position: fixed; top: 0px; z-index: 100; /*width: calc(80vw - 2rem); min-width: calc(900px - 2rem);*/
}

.placeholder {
  margin-bottom: var(--gap);
}
</style>

<style lang=scss>
.card .content>div {
  &>p:first-child { margin-top: 0px; }
  &>p:last-child { margin-bottom: 0px; }
}
</style>
