import cookie from 'js-cookie'
import axios from 'axios'
import Vue from 'vue'
import qs from 'querystring'
import { resolve } from 'url';

const sleep = t => new Promise ( r => setTimeout(r, t) ) 

// 用 Vue 做一个状态机来充当 api 接口
export default new Vue({
  data: {
    token: '',
    axios: axios.create({
      baseURL: 'https://myseu.cn/ws3/',
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true
    })
  },
  created() {
    let that = this
    // 定时刷新token
    setInterval( ()=>{
      that.axios.defaults.headers.token = that.token = window.heraldToken
    }, 1000);
  },
  watch: {
    token() {
      this.axios.defaults.headers.token = this.token
    }
  },
  computed: {
    isLogin() {
      return !!this.token
    }
  },
  methods: {
    async get(route = '/', data = {}) {
      while(!window.heraldToken){
        await sleep(500)
      } // token 不存在时睡0.5s再来请求
      this.axios.defaults.headers.token = this.token = window.heraldToken
      let params = qs.stringify(data)
      if (params) params = '?' + params
      return this.handleResponse(await this.axios.get(route + params))
    },
    async post(route = '/', data = {}) {
      while(!window.heraldToken){
        await sleep(500)
      } // token 不存在时睡0.5s再来请求
      this.axios.defaults.headers.token = this.token = window.heraldToken
      return this.handleResponse(await this.axios.post(route, data))
    },
    async put(route = '/', data = {}) {
      while(!window.heraldToken){
        await sleep(500)
      } // token 不存在时睡0.5s再来请求
      this.axios.defaults.headers.token = this.token = window.heraldToken
      return this.handleResponse(await this.axios.put(route, data))
    },
    async delete(route = '/', data = {}) {
      while(!window.heraldToken){
        await sleep(500)
      } // token 不存在时睡0.5s再来请求
      this.axios.defaults.headers.token = this.token = window.heraldToken
      let params = qs.stringify(data)
      if (params) params = '?' + params
      return this.handleResponse(await this.axios.delete(route + params))
    },
    handleResponse(response) {
      let { status, data } = response
      if (status < 400) {
        let { code, result, reason } = data
        status = code
        data = reason

        if (status < 400) {
          if (status === 203) {
            result.isStale = true
          }
          return result
        }
      }

      // 出错时的处理
      if (status === 401) {
        if (this.isLogin) {
          this.token = ''
          Vue.toasted.show('登录已失效，请重新登录')
          if(window.webkit){
            window.webkit.messageHandlers.logout.postMessage({"log": "logout"})
          }
          else if (android) {
            android.authFail()
          }
        }
      } else {
        //Vue.toasted.show('部分接口请求失败')
      }

      throw new Error(data)
    }
  }
})