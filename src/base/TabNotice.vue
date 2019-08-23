<template lang='pug'>
  .tab
    notice(:user='user')
</template>

<script>
  import notice from '@/components/Notice.vue'
  import api from '@/api'
  export default {
    components: {
      notice
    },
    data () {
      return {
        user:{}
      }
    },
    presist:{
      user:'herald-default-user'
    },
    async created () {
      let that = this
      this.user = await api.get('/api/user')
    },
    methods: {

    }
  }
</script>