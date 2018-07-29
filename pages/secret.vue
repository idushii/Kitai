<template>
  <card>
    <div slot="title">Super secret page</div>
    <div slot="content">
      <p>If you try to access this URL not connected, you will see the error page telling your that you are not connected.</p>
      <nuxt-link to="/">Back to the home page</nuxt-link>
    </div>
  </card>
</template>

<script>
import card from "~/components/card.vue";
let layout = 'site'
export default {
  middleware: 'auth',
  layout: layout,
  components: { card }
}
</script>
