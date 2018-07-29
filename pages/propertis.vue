<template>
  <div>
    <card :title=true>Настройки</card>
    <card>
      <div slot="title"> Версия сайта </div>
      <div slot="content">
        <label><input name="site-version" type="radio" /> Полная версия </label>
        <label><input name="site-version" type="radio" /> Мобильная версия </label>
      </div>
    </card>
    <card>
      <div slot="title"> Какую страницу открывать по умолчанию? </div>
      <div slot="content">
        <label v-for="item in $store.getters.menu" :key="`page-${item.id}`"><input name="start-page" type="radio" /> {{item.Title}} </label>
      </div>
    </card>
    <card>
      <div slot="title"> Категории </div>
      <div slot="content">
        <p v-for="item in $store.getters.categoris" :key="`cat-${item.id}`"><b>{{item.Title}}</b> {{item.Info}}</p>
      </div>
    </card>
    <card>
      <div slot="title"> Общие </div>
      <div slot="content">
        <p>Размер шрифта</p>
        <p>Цвет шрифта</p>
        <p>Фоновое изображение</p>
        <p>Фоновый цвет</p>
      </div>
    </card>
  </div>
</template>

<script>
let layout = 'site'
export default {
  name: 'index',
  layout: layout,
  mounted() {
    this.$store.dispatch("GET_CATEGORIS")
  }
}
</script>

<style lang="scss" scoped>
#content {
  .content {
    label {
      display: block; padding-bottom: .5rem;
    }
  }
}
</style>
