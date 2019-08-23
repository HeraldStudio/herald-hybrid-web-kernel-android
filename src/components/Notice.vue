<template lang="pug">

  .page.notice
    .info-bar
      button.info(v-for='site in sites' @click='currentSite = site' :class='{ selected: currentSite == site }')
        .title {{ site }}
    ul.detail-list
      li(v-for='item in filteredNotice' :key='item.title' :class='{ important: item.isImportant }')
        div(@click='viewLink(item)')
          .top
            .left
              .tag.important(v-if='item.isImportant') 重要
              .tag.attachment(v-if='item.isAttachment') 附件
              span {{ item.title }}
            .right {{ formatDateNatural(item.time) }}
          .bottom(v-if='item.category')
            .left {{ item.category }}
    .empty(v-if='!filteredNotice || !filteredNotice.length') 暂无通知

</template>
<script>

  import api from '@/api'
  import Vue from 'vue'
  import formatter from '@/util/formatter'
  import markdown from '@/components/Markdown'

  // const RouterLink = Vue.component('router-link')
  // const NoticeLink = {
  //   props: ['notice'],
  //   render() {
  //     let slot = this.$slots.default
  //     if (this.notice.isAttachment) {
  //       return <a href={ this.notice.url }>{ slot }</a>
  //     }
  //     if (this.notice.site === 'SRTP') {
  //       return <RouterLink to={ '/notice/competition/' + this.notice.srtpId }>{ slot }</RouterLink>
  //     }
  //     if (this.notice.nid != null) {
  //       return <RouterLink to={ '/notice/' + this.notice.nid }>{ slot }</RouterLink>
  //     }
  //     return <RouterLink to={ '/notice/url/' + encodeURIComponent(this.notice.url) }>{ slot }</RouterLink>
  //   },
  //   methods
  // }

  export default {
    props: ['user'],
    components: { markdown },
    data() {
      return {
        notice: [],
        markdown: '',
        currentSite: null,
      }
    },
    persist: {
      notice: 'herald-default-notice'
    },
    created() {
      this.reload()
      if (/[?&]nid=(\d+)/.test(window.location.search)) {
        this.loadMarkdown({ nid: RegExp.$1 })
      }
    },
    watch: {
      user () {
        this.reload()
      }
    },
    computed: {
      sites() {
        return this.notice.map(k => k.site)
          .sort().filter((k, i, a) => a.indexOf(k) === i)
          .sort((a, b) => {
            let predef = ['教务处', '总务处', 'SRTP'].reverse()
            a = ~predef.indexOf(a)
            b = ~predef.indexOf(b)
            return a - b
          })
          .reduce((a, b) => a.slice(-1)[0] === b ? a : a.concat(b), [])
      },
      filteredNotice() {
        if (this.sites.length === 0) {
          return []
        }
        if (!this.currentSite) {
          this.currentSite = this.sites[0]
        }
        return this.notice.filter(k => k.site === this.currentSite)
      }
    },
    methods: {
      ...formatter,
      async reload() {
        let notice = await api.get('/api/notice')
        let competition = await api.get('/api/srtp/competition')
        this.notice = notice.concat(competition.map(k => ({
          title: k.name,
          site: 'SRTP',
          time: k.startTime,
          srtpId: k.id
        }))).sort((a, b) => b.time - a.time)
      },
      viewLink(notice) {
        let route
        if (notice.isAttachment) {
          if(window.webkit){
            window.webkit.messageHandlers.openURL.postMessage({"url": notice.url})
          }
          else if (android) {
            android.openURLinBrowser(notice.url)
          }
        } else {
          if (notice.site === 'SRTP') {
            route = '/notice/competition/' + notice.srtpId
          } else if (notice.nid != null) {
            route = '/notice/' + notice.nid
          } else {
            route = '/notice/url/' + encodeURIComponent(notice.url)
          }
          if(window.webkit){
            window.webkit.messageHandlers.pushRoute.postMessage({"route": route, "title": "通知公告"})
          }
          else if (android) {
            android.pushRoute(route, "通知公告")
          }

        }
      }
    }
  }

</script>