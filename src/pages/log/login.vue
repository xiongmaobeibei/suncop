<template>
<div class="wrapper">
        <!-- <form action="GET" class="form">
            <p v-show="showtip">{{showtip}}</p>
            <input type="text" v-model="citicreditid" placeholder="   请输入身份证号码"  class="inputtext"/><br>
            <input type="password" v-model="password" placeholder="   请输入密码" class="inputtext"/><br>
            <input type="button" value="登录" class="button" @click="login">
        </form> -->
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
         v-decorator="[
          'creditid',
          { rules: [{ required: true, message: '请输入你的身份证号码!' }] }
        ]"
        placeholder="身份证号码" v-model="citicreditid">
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入你的密码!' }] }
        ]"
        type="password"
        v-model="password"
        placeholder="密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      showtip: '',
      value: '',
      citicreditid: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions({add_Routes: 'add_Routes'}),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.login()
        }
      })
    },
    login () {
      this.loading = true
      // this.$http.get('http://localhost:3008/user?citicreditid=' + this.citicreditid).then((res) => {
      //   console.log(res.body)
      //   var user = res.body[0]
      //   console.log(user)
      //   if (res) {
      //     this.$http.get('http://localhost:3008/permit?id=' + user.identity).then((re) => {
      //       // 将路由信息，用户信息存到sessionStorage里面
      //       console.log(re.data[0].permit_list)
      //       sessionStorage.setItem('menuData', JSON.stringify(re.data[0].permit_list))
      //       sessionStorage.setItem('user', this.citicreditid)
      //       this.$router.push('/user')
      //       // 触发vuex里面增加的路由
      //       // this.add_Routes(re.data[0].permit_list)
      //     })
      //   }
      // }, (err) => {
      //   console.log(err)
      // })
      // const { citicreditid, password } = this
      // const params = qs.stringify({citicreditid, password})
      const sunCitizenmes = {
        citicreditid: this.citicreditid,
        password: this.password
      }
      console.log(sunCitizenmes)
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/citizenMes/login?${params}`
      })
        .then((response) => {
          console.log(response)
          sessionStorage.setItem('menuData', JSON.stringify(response.data))
          sessionStorage.setItem('user', this.citicreditid)
          this.$router.push('/user')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.ant-form {
  width: 65%;
  margin: auto;
  height: 400px;
  line-height: 50px;
  margin-top: 180px;
  padding-top: 80px;
}
#components-form-demo-normal-login .login-form {
  max-width: 200px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.wrapper {
    background: white;
    margin: auto;
}
.ant-input {
  height: 0.656667rem;
}
.ant-btn {
  height: 0.656667rem;
}
</style>
