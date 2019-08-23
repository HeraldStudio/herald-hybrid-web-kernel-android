<template lang='pug'>
  .tab
    dashboard(v-if='user' :user='user')
    .widget(v-if="needUpdate")
      .haveUpload(@click="downloadApk")
        .red-dot
        span.text 发现新版本，点击下载安装
    .todo
      toutiao
      exam(v-if='user && /^21/.test(user.cardnum)')
      curriculum
      experiment(v-if='user && /^21/.test(user.cardnum)')
</template>

<script>
  import exam from '@/components/Exam.vue'
  import login from '@/components/Login.vue'
  import dashboard from '@/components/Dashboard.vue'
  import curriculum from '@/components/Curriculum.vue'
  import experiment from '@/components/Experiment.vue'
  import banner from '@/components/Banner.vue'
  import toutiao from '@/components/TouTiao.vue'
  import api from '@/api'
  import goImg from 'static/images/go.png'

  export default {
    props:['user', 'versionInfo'],
    components: {
      login, dashboard, curriculum, experiment, exam, banner, goImg, toutiao
    },
    data () {
      return {
        
      }
    },
    created () {
      
    },
    computed: {
      needUpdate(){
          try {
            if (android.getVersionCode() < parseInt(this.versionInfo['android'])) {
              return true
            }
            if (!android.getVersionCode){
              return true
            }
          } catch(e) {
            return false
          }
      }
    },
    methods: {
      downloadApk() {
        if (android) {
          console.log(this.versionInfo)
          android.openURLinBrowser(this.versionInfo.androidApk)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .haveUpload
    display flex
    flex-direction row
    align-items center
    .red-dot
      width 10px
      height 10px
      border-radius 10px
      background-color #ff6666
      margin-right 5px
    .text
      flex-grow 1
    .go-icon
      width 15px
      height 15px
    
</style>
