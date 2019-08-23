<template lang='pug'>
  .tab
    activity
</template>

<script>
  import activity from '@/components/Activity.vue'
  import banner from '@/components/Banner.vue'

  export default {
    props: ['user'],
    components: {
      banner, activity
    },
    data () {
      return {
        user:{}
      }
    },
    async created () {

    },
    methods: {

    }
  }
</script>

<style lang="stylus" scoped>
  .hint
    padding 10px 15px
    background var(--color-warning-bg)
    color var(--color-warning-dark)
</style>
