<template>
  <div class="card" :class="{'card-title': title, isFloatToTop}" :style="{backgroundColor: backgroundColor ? backgroundColor : ''}">
    <div class="title" v-if="!title && $slots.title"><slot name="title">Заголовок</slot>
      <img class="icon" src="/close.svg" alt="" v-if="close" @click="$emit('close')">
      <img class="icon" src="/pen.svg" alt="" v-if="edit" @click="actionEdit">
      <img class="icon" src="/ok.svg" alt="" v-if="save" @click="save">
    </div>
    <div v-if="!title" class="content" :class="{'has-title': $slots.title}">
      <slot 
        name="content" 
        v-if="$slots.content"
      >
        Текст
      </slot>
      <slot></slot>
      <div class="link-wrapp" v-if="next">
        <nuxt-link :to=next> {{nextText}} </nuxt-link>
      </div>
    </div>
    <slot v-if="title">Заголовок</slot>
    <img class="icon" src="/pen.svg" alt="" v-if="edit && title" @click="$emit('edit')">
    <img class="icon left" src="/back.svg" alt="" v-if="back && title" @click="$router.push(back)">
    <img class="icon" src="/ok.svg" alt="" v-if="save && title" @click="save">
  </div>
</template>

<script>
export default {
  name: 'card',
  props: { 
    title: { type: Boolean, default: false }, 
    close: { type: Boolean, default: false }, 
    edit: { type: Boolean, default: false },
    editLink: { type: String, default: '' },
    next: { type: String, default: '' }, 
    nextText: { type: String, default: 'Дальше' }, 
    backgroundColor: { type: String, default: '' }, 
    back: { type: String, default: '' },
    save: { type: [Function, Boolean], default: false },
  },
  data: () => ({
    isFloatToTop: false,
  }),
  mounted() {
    if (this.title) {
      let thisCard = this;
      if (window.pageYOffset > thisCard.$el.getBoundingClientRect().top) thisCard.isFloatToTop = true;
      window.onscroll = function() {
        if (Math.abs(thisCard.$el.getBoundingClientRect().top - window.pageYOffset) < 10) {
          thisCard.isFloatToTop = !thisCard.isFloatToTop;
        }
      }
    }
  },
  methods: {
    actionEdit() {
      if (this.editLink) {
        this.$router.push(this.editLink)
      } else {
        this.$emit('edit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);

  .title {
    font-size: 1.2rem; font-style: italic; text-shadow: 5px 5px 10px grey;

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
  font-size: 1.5rem; font-style: italic; text-align: center; text-shadow: 5px 5px 10px grey;
  .icon { 
    width: 1.5rem; float: right; cursor: pointer; 
    &.left { float: left; }
  }
}

.isFloatToTop {
  position: fixed; top: 0px; z-index: 100; width: calc(80vw - 2rem); min-width: calc(900px - 2rem);
}

</style>
