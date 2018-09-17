<template>
<div>
  <card title back="/Page/Words" :edit=isAuth :edit-link="`/Edit/Word/${Word.Translate}`">Слово "{{Word.Translate}}"</card>
  <card>
    <section>
      <div class="level"> L{{Word.Level}} </div>
      <div class="ieroglif">
        <div class="text">{{Word.Hieroglyph}}</div>
      </div>
      <div class="info">
        <div class="pinin">Пиньин: <span>{{Word.Pinyin}}</span> </div>
        <div class="translate">Перевод: {{Word.Translate}} </div>
        <div class="tags">Категория: {{tags}} </div>
        <div class="audio">
          <audio-file v-if="Word.Sound" :src="Word.Sound" center />
          <no-ssr v-else>
            <voice :text="Word.Hieroglyph" voice="zh-CN" />
          </no-ssr>
        </div>
      </div>
    </section>
  </card>

</div>
</template>

<script>
export default {
  name: 'Word',
  computed: {
    Word() {
      return this.$store.getters.WordsByUser
    }
  },
}
</script>

<style scoped lang=scss>
section {
  display: grid; 
  grid-template-areas: "level ieroglif info" ". ieroglif info" ". ieroglif info" ". ieroglif .";
  grid-template-columns: 10px 1fr auto;
  box-shadow: var(--section-shadow);

  .ieroglif {
    grid-area: ieroglif;
    text-align: center;
    min-width: 20rem;

    .text {
      font-size: 10rem;
    }

  }

  .level { grid-area: level; width: 1rem; background-color: lightgrey; padding: var(--gap); margin-left: -1rem; margin-top: -1rem; }
  .info { 
    grid-area: info; padding: var(--gap); 
  }

  .audio {
    margin: 2rem;
  }
}
</style>
