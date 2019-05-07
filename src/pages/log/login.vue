<template>
    <div class="wrapper">
        <form action="GET" class="form">
            <p v-show="showtip">{{showtip}}</p>
            <input type="text" v-model="creditid" placeholder="   请输入身份证号码"  class="inputtext"/><br>
            <input type="password" v-model="password" placeholder="   请输入密码" class="inputtext"/><br>
            <input type="button" value="登录" class="button" @click="login">
        </form>
    </div>
</template>
<script>
// const ERR_OK = 0
export default {
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {
      showtip: '',
      creditid: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http.get('/api/data')// 代替http://localhost:3000/getNewsList
        .then((res) => {
          console.log(res.data)
        }, (err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .wrapper
    background rgb(82,130,170)
<<<<<<< HEAD
=======
    height 600px
    width 100%
>>>>>>> 5293695edd1ad8b60cc8fe38141c44b8cb54b065
    .form
      width 50%
      height 400px
      margin 150px auto 150px auto
      padding-top 60px
      background white
      border-radius 30px
      text-align center
      line-height 80px
      font-size 18px
      -webkit-box-shadow 14px 12px 16px #333333
      -moz-box-shadow 13px 12px 16px #333333
      .inputtext
        height 40px
        width 60%
      .button
        height 50px
        width 60%
        font-size 20px
        color blue
        border 0px
</style>
