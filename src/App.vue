<template lang='pug'>
  #app(:class='env')
    router-view(:user='user' :version-info='versionInfo')
</template>

<script>
  import Vue from 'vue'
  import { xhook } from 'xhook'
  //import { Loading } from 'element-ui'
  //Vue.use(Loading)

    // 注册 Service Worker
  // Service Worker 由 parcel-plugin-sw-cache 包自动生成
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // 隔开字符串防止被 parcel 探测
      navigator.serviceWorker.register('/' + 'sw.js');
    });
  }

  import api from './api'
  import router from './router'
  import tabs from './base/Tabs.vue'

  export default {
    name: 'app',
    components: { 
    },
    data() {
      return {
        user: null,
        env: window.__herald_env,
        isLoading: false,
        title: '',
        isHome: true,
        versionInfo: null
      }
    },
    persist: {
      user: 'herald-default-user'
    },
    async created() {
        api.get('/api/user').then(res => {this.user = res; window.user=res})
        api.get('/api/admin/admin').then(res => this.user.admin = res)
        api.get('/api/version').then(res => this.versionInfo = res)
    }
  }
</script>

<style lang='stylus'>
  :root
    --color-text-regular   #333333
    --color-text-bold      #555555
    --color-text-secondary #888888
    --color-divider        #eeeeee
    --color-tool-bg        #f0f0f0
    --color-primary-dark   #237a86
    --color-primary        #00a4ca
    --color-primary-light  #70eafa
    --color-primary-bg     #ddfbff
    --color-success-dark   #648723
    --color-success        #7ec200
    --color-success-light  #cafa70
    --color-success-bg     #f3ffde
    --color-warning-dark   #876b23
    --color-warning        #f49c13
    --color-warning-light  #fad370
    --color-warning-bg     #fff6de
    --color-error-dark     #872f23
    --color-error          #ed3f1f
    --color-error-light    #fa8070
    --color-error-bg       #ffe2de
    -webkit-tap-highlight-color transparent
    font-size 13px
    color var(--color-text-regular)
  ::selection
    background var(--color-primary-bg)
  *
    font-family -apple-system, BlinkMacSystemFont, 'Noble Scarlet', 'PingFang SC', 'Noto Sans CJK SC', 'Source Han Sans CN', 'Microsoft YaHei UI', sans-serif
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -ms-overflow-style none
  ::-webkit-scrollbar
    display: none
  html, body
    margin 0
    padding 0
    background var(--color-tool-bg)
  p, input, textarea
    margin-top 0
    margin-bottom 0
    line-height 1.65em
    vertical-align middle
  a, a:link, a:hover, a:active, a:focus, a:visited
    color var(--color-primary)
    text-decoration none
    -webkit-appearance none
    -moz-appearance none
    appearance none
  button, input
    outline none
    border none
    border-radius 15px
    margin 0
    font-size 13px
    box-sizing border-box
    vertical-align middle
  button
    padding 2px 10px
    background var(--color-primary)
    color #fff
    font-size 13px
    font-weight bold
    white-space nowrap
    overflow hidden
    cursor pointer
    border 1px solid var(--color-primary)
    box-shadow 0 10px 10px -10px var(--color-primary)
    transition .3s
    &:active
      filter brightness(.8)
    &.info:not(.selected), &.disabled
      background none 
      color var(--color-primary)
      border 1px solid var(--color-primary)
    &+button
      margin-left 5px
  .bubble
    padding 0 7px
    text-align left
    border-radius 3px
    font-weight bold
    background var(--color-text-bold)
    color #fff
    margin-bottom 20px
    display flex
    flex-direction row
    align-items center
  input, textarea
    color var(--color-text-bold)
    background var(--color-tool-bg)
    width 180px
    box-sizing border-box
    padding 6px 10px
    border-radius 15px
  // 密码框大圆圈改成小圆点
  input[type="password"]
    font-family Verdana, sans-serif
  input, textarea, input:focus, textarea:focus
    -webkit-appearance none
    -moz-appearance none
    appearance none
    border none
    outline none
    resize none
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill
    -webkit-box-shadow inset 0 0 0 100px var(--color-tool-bg)
  hr
    border 0 none
    height 1px
    width 100%
    background var(--color-divider)
    margin 25px 0
    transform scaleY(0.5)
    transform-origin top
  .border-top
    position relative
    &::after
      content ''
      position absolute
      top 0
      left 0
      right 0
      height 1px
      transform scaleY(0.5)
      transform-origin top
      background var(--color-divider)
  .border-bottom
    position relative
    &::after
      content ''
      position absolute
      bottom 0
      left 0
      right 0
      height 1px
      transform scaleY(0.5)
      transform-origin bottom
      background var(--color-divider)
  .border-left
    position relative
    &::after
      content ''
      position absolute
      top 0
      left 0
      bottom 0
      width 1px
      transform scaleX(0.5)
      transform-origin left
      background var(--color-divider)
  .border-left
    position relative
    &::after
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      width 1px
      transform scaleX(0.5)
      transform-origin right
      background var(--color-divider)
  img:not([src]), img[src=""]
    opacity 0
  ::-webkit-scrollbar
    display none !important
  .stale
    position relative
  .stale::before
    content ''
    display block
    position absolute
    right 3px
    top 3px
    min-width 6px
    max-width 6px
    min-height 6px
    max-height 6px
    border-radius 3px
    box-sizing border-box
    background var(--color-warning-light)
    padding 0
    color var(--color-warning-dark)
    font-size 10px
    transition .5s
    transition-property max-width, max-height
    overflow hidden
  .stale:hover::before
    border-left-width 0
    border-top-width 0
    padding 0 3px
    background var(--color-warning-light)
    content '缓存'
    max-width 100px 
    max-height 30px
  .toasted-container.top-center
    // 覆盖vendor原有属性，由于webpack资源重排，不加important覆盖不上
    -webkit-transform none !important
    transform none !important
    // 浮于抽屉上层
    z-index 99999 !important
    top 0 !important
    left 0 !important
    right 0
    margin-left auto
    padding 25px 0
    pointer-events none
    .toasted
      margin 0 auto 10px
      cursor default
      border-radius 20px
      pointer-events all
      font-weight normal
      min-height 0
      padding 4px 10px
      font-size 13px
      font-weight bold
      text-align justify
      background var(--color-primary)
      box-shadow none
      border 1px solid var(--color-primary)
      box-shadow 0 8px 10px -10px var(--color-primary)
      .action
        color #fff
        white-space nowrap
        text-decoration none
        padding 0
        margin 0
        font-weight bold
        font-size inherit
        pointer-events auto
  #app
    padding 0
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none
    &[is-loading="true"]::before
      content ''
      position fixed
      top 0
      height 1px
      background var(--color-primary)
      animation loading 2s linear infinite
      z-index 9999
    @keyframes loading
      0%
        left 0%
        width 0
      10%
        left 0%
        width 50px
      50%
        left calc(50% - 75px)
        width 150px
      90%
        left calc(100% - 50px)
        width 50px
      100%
        left 100%
        width 0
    .app-container
      position fixed
      top 0
      top constant(safe-area-inset-top)
      top env(safe-area-inset-top)
      left 0
      left constant(safe-area-inset-left)
      left env(safe-area-inset-left)
      right 0
      right constant(safe-area-inset-right)
      right env(safe-area-inset-right)
      bottom 0
      bottom constant(safe-area-inset-bottom)
      bottom env(safe-area-inset-bottom)
      margin 0 auto
      display flex
      flex-direction row
      overflow hidden
      @media screen and (max-width: 600px)
        display block
      .overlay-header
        margin 15px
        height 40px
        flex 0 0 40px
        box-sizing border-box
        padding 0 15px
        display flex
        flex-direction row
        align-items center
        justify-content center
        z-index 999
        .live2d-wrapper
          display flex
          flex-direction row
          align-items center
          padding 0 10px
          .live2d-container
            width 48px
            height 48px
            position relative
        .spacing
          flex 1 1 0
            
        img.download
          margin-right 10px
          width 24px
          height 24px
      .base-page
        width 40%
        min-width 320px
        max-width 400px
        overflow hidden
        display flex
        flex-direction column
        @media screen and (max-width: 600px)
          position absolute
          min-width none
          max-width none
          width 100%
          height 100%
      .overlay-page
        flex 1 1 0
        overflow hidden
        margin-left -15px
        background var(--color-divider)
        display flex
        flex-direction column
        transition .3s
        z-index 100000
        @media screen and (max-width: 600px)
          position absolute
          margin-left 0
          min-width none
          max-width none
          width 100%
          height 100%
          .overlay-header
            transition .3s
          .overlay-router
            transition .3s
          &.home
            transition .3s
            background transparent
            pointer-events none
            .overlay-header
              opacity 0
            .overlay-router
              background transparent
        .overlay-header .title-bar
          display flex
          flex-direction row
          align-items center
          flex 1 1 0
          .back
            display block
            font-size 26px
            vertical-align middle
            text-align center
            width 40px
            height 40px
            line-height 40px
            cursor pointer
            
            &:hover
              color var(--color-text-bold)
          .current
            flex 1 1 0
            font-size 15px
            font-weight bold
            color var(--color-text-bold)
            text-align center
            padding-right 40px
            line-height 40px
        .overlay-router
          flex 1 1 0
          position relative
          .scroll-content > *
            position relative
            min-height 100vh
            min-height calc(100vh - 100px)
            box-sizing border-box
          .page-enter-active, .page-leave-active
            transition .3s !important
            position absolute !important
            overflow hidden !important
            width calc(100% - 30px) !important
            z-index 9999 !important
            transform translateZ(0px)
            transform-origin var(--mouse-x, 50%) var(--mouse-y, 400px) !important
          .page-leave-active
            transition .3s !important
            filter brightness(0.9) !important
            opacity 0 !important
          .page-enter
            min-height 0
            transform scale(0.2) translateZ(0px) !important
            box-shadow 0 0 25px rgba(0, 0, 0, .1) !important
            border-radius 20px !important
            overflow hidden !important
        @media screen and (max-width: 600px)
          position absolute
          width 100%
          height 100%
    //   // 强制加固定灰底，尤其在微信和小程序中用于屏蔽黑底和微信的提示文字
    //   @media screen and (max-width: 600px)
    //     &::before
    //       content '专注公益更懂你'
    //       padding 20px 0
    //       text-align center
    //       position fixed
    //       font-size 13px
    //       color #aaa
    //       letter-spacing 1px
    //       top 0
    //       left 0
    //       right 0
    //       bottom 0
    //       z-index -999
    //       background var(--color-divider)
    // &.mina .app-container::before
    //   content '访问 myseu.cn 使用 PWA 版完整功能'
  .widget, .page, .admin-page
    position relative
    box-sizing border-box
    -webkit-transition: .3s
    -moz-transition: .3s
    -ms-transition: .3s
    -o-transition: .3s
    transition: .3s
    display flex
    flex-direction column
    padding 20px 20px 15px
    margin 15px
    border-radius 5px
    background #fff
    box-shadow 0 0 1px rgba(0, 0, 0, .05)
    & + .widget, .page, .admin-page
      margin-top 0
    li.empty
      display block
      text-align center
      color #888
      font-size 14px
      line-height 3em
    .info-bar
      width 100%
      box-sizing border-box
      margin 0
      padding 5px 0 0 5px
      display flex
      flex-direction row
      justify-content center
      flex-wrap wrap
      button.info
        flex 0 1 auto
        display flex
        flex-direction row
        align-items baseline
        justify-content center
        .title
          font-weight bold
          + .content
            margin-left 5px
      +ul.detail-list>*:first-child
        @extend .border-top
        margin-top 15px
        padding-top 10px
    ul.detail-list
      width 100%
      margin 0
      padding 0
      box-sizing border-box
      display flex
      flex-direction column
      white-space normal
      line-height 1.7em
      > li + li
        @extend .border-top
      > li
        list-style none
        flex 1 1 auto
        padding 10px 0
        display flex
        flex-direction column
        text-align justify
        word-break break-all
        color var(--color-text-bold)
        &.section
          @extend .border-top
          margin-top 10px
          padding-top 10px !important
          font-weight bold
        .tag
          display inline-block
          border-radius 3px
          height 16px
          line-height 16px
          padding 3px 8px
          border-radius 11px
          margin-right 8px
          margin-bottom 2px
          background var(--color-primary)
          color #fff
          font-size 12px
          font-weight bold
          + .tag
            margin-left -3px
        .top, .bottom
          display flex
          flex-direction row
          // align-items center
        .top + .bottom
          margin-top 2px
        .left
          flex 1 1 auto
        .right
          flex 0 0 auto
          margin-left 20px
        .top .left
          font-size 16px
          color var(--color-text-regular)
        .top .right, .bottom .left
          font-size 13px
        .top .right
          font-weight bold
          color var(--color-text-bold)
        .bottom .right
          font-size 13px
          color #888
        &:last-child
          padding-bottom 0
        &.empty
          display block
          text-align center
          color #888
          font-size 14px
        &:first-child
          padding-top 0
  .admin-page
    .title
      font-size 22px
      margin-bottom 20px
    .subcontainer
      text-align center
      overflow-x scroll
      + .subcontainer
        @extend .border-top
        padding-top 20px
        margin-top 20px
    .subtitle
      padding 0 7px
      text-align center
      font-size 16px
      font-weight bold
      color var(--color-text-bold)
      margin-bottom 20px
    .summary
      display inline-block
      font-size 13px
      color var(--color-text-secondary)
      margin 0 5px 20px
    table
      max-width 100%
      th, td
        white-space nowrap
        .vdatetime
          white-space normal
    
    input
      min-width 100px
      
      &.vdatetime-input
        min-width 115px
</style>