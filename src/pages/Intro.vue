<template lang="pug">

  .page.intro
    ul.detail-list
      li
        .top
          .left 一卡通号
          .right {{ user.cardnum }}
      li
        .top
          .left 学号
          .right(v-if='user.schoolnum') {{ user.schoolnum }}
          .right(v-else) 暂未分配学号
        .bottom
          //- 为本科生解释学号，研究生学号太简单不用解释
          .left(v-if='user.schoolnum && user.identity === "本科生"').
          
            {{ user.schoolnum.substr(user.schoolnum.length-5, 2) }} 年级 /
            {{ user.schoolnum.substr(user.schoolnum.length-3, 1) }} 班 /
            {{ user.schoolnum.substr(user.schoolnum.length-2, 2) }} 号
          .left(v-if='!user.schoolnum') 待分配班级学号中，请留意院系新生群通知
      li
        .top
          .left 宿舍
          .right(v-if='dorm && dorm.building') {{ dorm.campus }} {{ dorm.building }} {{ dorm.room }} {{ dorm.bed }}号床
          .right(v-else) 暂未分配宿舍
        .bottom
          .left(v-if='dorm && dorm.building') 可到<a href='http://map.seu.edu.cn/#/home'>校园地图服务系统</a>查看宿舍楼所在位置。
          .left(v-else) 待分配宿舍中，请留意班级群通知

</template>
<script>

  import api from '@/api'

  export default {
    props: ['user'],
    data() {
      return {
        dorm: null
      }
    },
    persist: {
      dorm: 'herald-default-dorm'
    },
    async created() {
      this.dorm = await api.get('/api/dorm')
    }
  }

</script>