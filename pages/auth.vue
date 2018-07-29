<template>
<div class="container">
  <card>
    <div slot=title>Авторизация</div>
    <div slot=content>
      <form @submit.prevent="login">
        <p v-if="formError" class="error">{{ formError }}</p>
        <label >Username: <input v-model="formUsername" type="text" name="username" > </label> 
        <label >Password: <input v-model="formPassword" type="password" name="password" > </label> 
        <button type="submit">Login</button>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import mainMenu from "~/components/menu";
import card from "~/components/card";
export default {
  name: 'auth',
  data() {
    return {
      formError: null,
      formUsername: 'User',
      formPassword: '123'
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
  components: {
    mainMenu,
    card
  },
  layout: 'site'
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
  grid-template-columns: 1fr 1fr;
  padding-bottom: .5rem;
}
</style>
