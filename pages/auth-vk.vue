<template>
<div class="container">
  <card>
    <div slot=title>Авторизация</div>
    <div slot=content>
    </div>
  </card>
</div>
</template>

<script>
//

import mainMenu from "~/components/menu";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: 'auth-vk',
  data() {
    return {
      isSendCode: false,
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.$router.push('./')

      } catch (e) {
        this.formError = e.message
      }
    },
  },
  computed: {
    ...mapGetters('User', ['isAuth']),
    ...mapState(['config']),
  },
  async mounted() {
    if ( !this.$route.query.code ) {
      console.log(`redirect_uri=${this.config.host}/auth-vk`)
      location.href = `https://oauth.vk.com/authorize?client_id=${this.config.app_id}&display=popup&redirect_uri=${this.config.host}auth-vk&scope=email&response_type=code&v=5.85`
    } else { 
      if (await this.SendCodeVK(this.$route.query.code)) this.$router.push('./')
    } 
  },
  methods: {
    ...mapActions('User', ['SendCodeVK'])
  },
  components: {
    mainMenu
  },
  
}
</script>

<style scoped>
.container {
  /*padding: 100px;*/
}
.error {
  color: red;
}

.card .content label {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-bottom: .5rem;
}
</style>
