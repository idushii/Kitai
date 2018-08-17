<template>
<div class="container">
  <card>
    <div slot=title>Дополнительная информация</div>
    <div slot=content>
      <form @submit.prevent="reg2">
        <p v-if="formError" class="error">{{ formError }}</p>
        <label >ФИО: <input v-model="User.FIO" type="text" name="FIO" > </label> 
        <label >Email: <input v-model="User.Email" type="Email" name="Email" > </label> 
        <button type="submit">Продолжить</button>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import mainMenu from "~/components/menu";
export default {
  name: 'reg2',
  data() {
    return {
      formError: null,
      User: {
        FIO: 'Иван Иванов',
        Email: 'ivan@mail.ru',
      }
    }
  },
  methods: {
    async reg2() {
      try {
        await this.$store.dispatch('Reg2', {...this.$data.User})
        this.formError = null;
        this.User.FIO = ''; this.User.email = '';
        this.$router.push('./')
      } catch (e) { this.formError = e.message }
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
