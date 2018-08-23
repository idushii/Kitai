<template>
<div class="container">
  <card>
    <div slot=title>Регистрация</div>
    <div slot=content>
      <form @submit.prevent="reg">
        <p v-if="formError" class="error">{{ formError }}</p>
        <label >Пользователь: <input v-model="formUsername" type="text" name="username" > </label> 
        <label >Пароль: <input v-model="formPassword" type="password" name="password" > </label> 
        <label >Пароль: <input v-model="formPassword2" type="password" name="password" > </label> 
        <button type="submit">Продолжить</button>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import mainMenu from "~/components/menu";
export default {
  name: 'reg',
  data() {
    return {
      formError: null,
      formUsername: 'User',
      formPassword: '123',
      formPassword2: '123',
    }
  },
  methods: {
    async reg() {
      if (this.password != this.password2) {
        this.formError = 'Пароли не совпадают'
        return;
      }
      try {
        await this.$store.dispatch('Reg', {
          Login: this.formUsername,
          Pass: this.formPassword,
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formPassword2 = ''
        this.formError = null
        this.$router.push('./reg2')
      } catch (e) {
        this.formError = e.message
      }
    },
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
