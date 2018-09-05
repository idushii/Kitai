<template>
  <card>
    <section>
      <div class="level"> L{{Word.Level}} </div>
      <div class="ieroglif">
        <div class="text">{{Word.Hieroglyph}}</div>
      </div>
      <div class="info">
        <div class="pinin"><b>Пиньин:</b> <span>{{Word.Pinyin}}</span> </div>
        <div class="translate"><b>Перевод:</b> {{Word.Translate}} </div>
        <div class="tags" v-if="Word.Sample"><b>Пример:</b> {{Word.Sample}} </div>
      </div>
      <div class="audio">
        <audio-file v-if="Word.Sound" :src="Word.Sound" center />
      </div>
    </section>
  </card>
</template>

<script>
export default {
  name: "ComponentWord",
  props: { Word: { type: Object, default: () => ({}) } }
}
</script>

<style lang="scss" scoped>
section {
  display: grid; 
  grid-template-areas: 
    "level  ieroglif  play" 
    ".      ieroglif  play" 
    "info   info      info";
  grid-template-columns: 10px 1fr auto;
  box-shadow: var(--section-shadow);

  .ieroglif {
    grid-area: ieroglif;
    text-align: center;
    min-width: 20rem;

    .text {
      font-size: 5rem;
    }

  }

  .level { grid-area: level; width: 1rem; background-color: lightgrey; padding: var(--gap); margin-left: -1rem; margin-top: -1rem; }
  .info { 
    grid-area: info; padding: var(--gap); 
  }

  .audio {
    text-align: right;
    grid-area: play;
  }
}

</style>
