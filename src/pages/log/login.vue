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
  <el-form-item label="验证">
    <div class="form-inline-input">
      <div class="code-box" id="code-box">
        <input type="text" name="code" class="code-input" />
        <p></p>
        <span>>>></span>
      </div>
    </div>
  </el-form-item>
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
    getOffset (box, direction) {
      var setDirection = (direction === 'top') ? 'offsetTop' : 'offsetLeft'
      var offset = box[setDirection]
      var parentBox = box.offsetParent
      while (parentBox) {
        offset += parentBox[setDirection]
        parentBox = parentBox.offsetParent
      }
      parentBox = null
      return parseInt(offset)
    },
    moveCode (code, _this) {
      var fn = { codeVluae : code }
      let box = document.querySelector('#code-box')
      let progress = box.querySelector('p')
      let codeInput = box.querySelector('.code-input')
      let evenBox = box.querySelector('span')
      // 默认事件
      var boxEven = ['mousedown', 'mousemove', 'mouseup']
      // 改变手机端与pc事件类型
      if (typeof document.ontouchstart === 'object') {
        boxEven = ['touchstart', 'touchmove', 'touchend']
      }
      var goX, offsetLeft, deviation, evenWidth, endX
      function moveFn (e) {
        e.preventDefault()
        e = (boxEven['0'] === 'touchstart') ? e.touches[0] : e || window.event
        endX = e.clientX - goX
        endX = (endX > 0) ? (endX > evenWidth) ? evenWidth : endX : 0
        if (endX > evenWidth * 0.7) {
          progress.innerText = '松开验证'
          progress.style.backgroundColor = '#66CC66'
        } else {
          progress.innerText = ''
          progress.style.backgroundColor = '#FFFF99'
        }
        progress.style.width = endX + deviation + 'px'
        evenBox.style.left = endX + 'px'
      }
      function removeFn () {
        document.removeEventListener(boxEven['2'], removeFn, false)
        document.removeEventListener(boxEven['1'], moveFn, false)
        if (endX > evenWidth * 0.7) {
          progress.innerText = '验证成功'
          progress.style.width = evenWidth + deviation + 'px'
          evenBox.style.left = evenWidth + 'px'
          codeInput.value = fn.codeVluae
          evenBox.onmousedown = null
          _this.ruleForm.verification = true
        } else {
          progress.style.width = '0px'
          evenBox.style.left = '0px'
        }
      };
      function getOffset (box, direction) {
        var setDirection = (direction === 'top') ? 'offsetTop' : 'offsetLeft' 
        var offset = box[setDirection]
        var parentBox = box.offsetParent
        while (parentBox) {
          offset += parentBox[setDirection]
          parentBox = parentBox.offsetParent
        }
        parentBox = null
        return parseInt(offset)
      };
      evenBox.addEventListener(boxEven['0'], function (e) {
        e = (boxEven['0'] === 'touchstart') ? e.touches[0] : e || window.event
        goX = e.clientX,
        offsetLeft = getOffset(box, 'left'),
        deviation = this.clientWidth,
        evenWidth = box.clientWidth - deviation,
        endX
        document.addEventListener(boxEven['1'], moveFn, false)
        document.addEventListener(boxEven['2'], removeFn, false)
      }, false)
      fn.setCode = function (code) {
        if (code) {
          fn.codeVluae = code
        }
      }
      fn.getCode = function () {
        return fn.codeVluae
      }
      fn.resetCode = function () {
        evenBox.removeAttribute('style')
        progress.removeAttribute('style')
        codeInput.value = ''
      }
      return fn
    },
    mounted () {
      // var _this = this
      // window.addEventListener('load',function(){
      // code是后台传入的验证字符串
      let code = 'jsaidaisd656'
      let codeFn = new this.moveCode(code, this)
      // });
    },
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
/* 登录样式 */
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
form-inline-input{
  border:1px solid #dadada;
  border-radius:5px;
}
/* 滑块样式 */
.form-inline-input input,
.code-box{
  padding: 0 3px;
    width: 298px;
    height: 40px;
    color: #fff;
    text-shadow: 1px 1px 1px black;
    background: #efefef;
    border: 0;
    border-radius: 5px;
  outline: none;
}
.code-box{
  position: relative;
}
.code-box p,
.code-box span{
  display:block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding:0;
  margin:0;
}
.code-box span{
  width: 40px;
  background-color:#fff;
  font-size: 16px;
  cursor: pointer;
  margin-right:1px;
}
.code-box p{
  width: 0;
  background-color: #FFFF99;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input{
  display: none;
}
.code-box .code-input{
  display: none;
}

.form-inline-input{
  border:1px solid #dadada;
  border-radius:5px;
}
.form-inline-input input,
.code-box{
  padding: 0 3px;
    width: 298px;
    height: 40px;
    color: #fff;
    text-shadow: 1px 1px 1px black;
    background: #efefef;
    border: 0;
    border-radius: 5px;
  outline: none;
}
.code-box{
  position: relative;
}
.code-box p,
.code-box span{
  display:block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding:0;
  margin:0;
}
.code-box span{
  width: 40px;
  background-color:#fff;
  font-size: 16px;
  cursor: pointer;
  margin-right:1px;
}
.code-box p{
  width: 0;
  background-color: #FFFF99;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input{
  display: none;
}
.code-box .code-input{
  display: none;
}
</style>
