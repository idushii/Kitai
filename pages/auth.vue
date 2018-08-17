<template>
<div class="container">
  <card>
    <div slot=title>Авторизация</div>
    <div slot=content>
      <form @submit.prevent="login">
        <p v-if="formError" class="error">{{ formError }}</p>
        <label >Пользователь: <input v-model="formUsername" type="text" name="username" > </label> 
        <label >Пароль: <input v-model="formPassword" type="password" name="password" > </label> 
        <button type="submit">Войти</button>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import mainMenu from "~/components/menu";
export default {
  name: 'auth',
  data() {
    return {
      formError: null,
      formUsername: 'User',
      formPassword: '123',
      formPassword2: '123',
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
    mainMenu
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
  grid-template-columns: 1fr 2fr;
  padding-bottom: .5rem;
}
</style>
