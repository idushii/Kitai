<template>
  <div>
    <card title clings>Настройки</card>
    <card>
      <div slot="title">Информация</div>
      <div slot="content">Это просто заготовки, их функционал еще не разработан. </div>
    </card>
    <card>
      <div slot="title"> Версия сайта </div>
      <div slot="content">
        <label><input name="site-version" type="radio" value="desktop" v-model="layout" /> Полная версия </label>
        <label><input name="site-version" type="radio" value="table" v-model="layout" /> Планшетная версия </label>
        <label><input name="site-version" type="radio" value="mobile" v-model="layout" /> Мобильная версия </label>
        <i>Планирую сделать две или три отдельных версии сайта, а при открытии определять, на чем его открыли. Сложностей при разработке не будет, т.к. я просто буду перекомпоновывать уже готовые блоки, а не писать их заново.<br><br> Здесь же можно будет указать, какую версию лучше открыть. Ну мало ли, на планшете старый браузер и он плохо показывает версию для планшета ? Версий для телефона тоже можно сделать как современную и "точно точно работающую везде". Но это в последнюю очередь, понятное дело.</i>
      </div>
    </card>
    <card>
      <div slot="title"> Общие </div>
      <div slot="content">
        <p>Размер шрифта</p>
        <p>Цвет шрифта</p>
        <p>Фоновое изображение</p>
        <p>Фоновый цвет</p>
        <i>Эти параметры планирую првязать к аккаунту пользователя, а по умолчанию будет открываться существующий сейчас вид. <br> Еще было бы интересно сделать уникальную генерацию фона по параметрам вида "на фоне есть такие то слова, цвет фона такой то", но над этим стараюсь не увлекаться. Хотя, как ход для удержания пользователя на сайте может быть полезно, наверное. Но основной функционал явно важнее.</i>
      </div>
    </card>
    <card>
      <div slot="title"> Какую страницу открывать по умолчанию? </div>
      <div slot="content">
        <label v-for="item in $store.getters.menu" :key="`page-${item.id}`">
          <input name="start-page" type="radio" /> {{item.Title}} 
        </label>
        <i>Планирую прописать по умолчанию главную страницу. А потом ее можно будет поменять. Но вообще, можно этим не заморачиваться.</i>
      </div>
    </card>
    <card>
      <div slot="title"> Категории </div>
      <div slot="content">
        <select-tree :items=$store.getters.categoris is-not-select />
        Кнопка "Добавить". Кнопки изменить и удалить
        <br> <br>
        <i>Это нужно для отображения списка записей на странице. Т.е. если у записей указана какая то категория, то она будет показываться на определенной странице сайта.</i>
        <!--p v-for="item in $store.getters.categoris" :key="`cat-${item.id}`"><b>{{item.Title}}</b> {{item.Info}}</p-->
      </div>
    </card>
  </div>
</template>

<script>
let layout = 'site'
export default {
  name: 'index',
  layout: layout,
  data: () => ({
    layout: ''
  }),
  watch: {
    layout(value, oldValue) {
      if (oldValue == '') return;
      console.log(value, oldValue)
      localStorage.layout = value;
      location.reload()
    }
  },
  mounted() {
    this.$store.dispatch("GET_CATEGORIS")
    this.layout = localStorage.layout
  },
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
