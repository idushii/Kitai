<template>
  <div>
    <card>
      <div slot="title" close>Изменить описание теста</div>
      <div slot="content">
        <edit-info />
      </div>
    </card>
  </div>
</template>

<script>
//import EditInfo from "~/components/Test/EditInfo.vue";
export default {
  name: 'EditInfo',
  layout: 'document',
  components: {
    EditInfo
  }
}
</script>
