<template>
    <div class="wrapper">
        <form action="GET" class="form">
            <p v-show="showtip">{{showtip}}</p>
            <input type="text" v-model="citicreditid" placeholder="   请输入身份证号码"  class="inputtext"/><br>
            <input type="password" v-model="password" placeholder="   请输入密码" class="inputtext"/><br>
            <input type="button" value="登录" class="button" @click="login">
        </form>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
// import qs from 'qs'
export default {
  data () {
    return {
      showtip: '',
      citicreditid: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions({add_Routes: 'add_Routes'}),
    login () {
      this.loading = true
      this.$http.get('/api/user?citicreditid=' + this.citicreditid).then((res) => {
        console.log(res.body)
        var user = res.body[0]
        console.log(user)
        if (res) {
          this.$http.get('/api/permit?id=' + user.identity).then((re) => {
            // 将路由信息，用户信息存到sessionStorage里面
            console.log(re.data[0].permit_list)
            sessionStorage.setItem('menuData', JSON.stringify(re.data[0].permit_list))
            sessionStorage.setItem('user', this.citicreditid)
            this.$router.push('/user')
            // 触发vuex里面增加的路由
            // this.add_Routes(re.data[0].permit_list)
          })
        }
      }, (err) => {
        console.log(err)
      })
      // const sunCitizenmes = {
      //   citicreditid: this.citicreditid,
      //   password: this.password
      // }
      // console.log(sunCitizenmes)
      // const url = `api/citizenMes/sunCitizenmes` // `/api/citizenMes/login?${params}` // http://localhost:8080/api/citizenMes
      // this.$http.get('/api/citizenMes/login', sunCitizenmes).then((res) => {
      //   // 将路由信息，用户信息存到sessionStorage里面
      //   console.log(res.data[0].permit_list)
      //   sessionStorage.setItem('menuData', JSON.stringify(res.data[0].permit_list))
      //   sessionStorage.setItem('user', this.user.creditid)
      //   this.$router.push('/user')
      //   // 触发vuex里面增加的路由
      //   // this.add_Routes(re.data[0].permit_list)
      // })
      // const params = this.qs.stringify(sunCitizenmes)
      // this.$ajax({
      //   url: `/api/citizenMes/login?${params}`,
      //   methods: "get"
      // })
      //   .then((response) => {
      //     // 将路由信息，用户信息存到sessionStorage里面
      //     console.log(res.data[0].permit_list)
      //     sessionStorage.setItem('menuData', JSON.stringify(res.data[0].permit_list))
      //     sessionStorage.setItem('user', this.user.creditid)
      //     this.$router.push('/user')
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .wrapper
    background rgb(82,130,170)
    .form
      width 50%
      height 400px
      margin 150px auto 150px auto
      background white
      padding-top 80px
      border-radius 30px
      text-align center
      font-size 20px
      line-height 80px
      -webkit-box-shadow 14px 12px 16px #333333
      -moz-box-shadow 13px 12px 16px #333333
      .inputtext
        height 50px
        width 60%
      .button
        width 60%
        height 50px
        line-height 50px
        color blue
        border 0px
</style>
