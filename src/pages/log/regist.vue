<template>
    <div class="wrapper">
        <form action="" class="formbox">
            <span class="title">姓名:</span><input class="input-box" v-model="citiname" type="text"><br/>
            <span class="title">身份证号:</span><input class="input-box" v-model="citicreditid" type="text"><br/>
            <span class="title">密码:</span><input class="input-box" type="password"><br/>
            <span class="title">确认密码:</span><input class="input-box" v-model="password" type="password"><br/>
            <span class="title">性别:</span>男<input type="radio" @click="choose1">&nbsp;女<input type="radio" @click="choose2"><br/>
            <span class="title">民族:</span><input class="input-box" type="text" v-model="nation"><br/>
            <span class="title">出生日期:</span>
            <a-date-picker>
                <template slot="dateRender" slot-scope="current, today">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
                    {{current.date()}}
                    </div>
                </template>
                </a-date-picker>
            <br/>
            <span class="title">电话号码:</span><input class="input-box" type="text" v-model="phonenumber"><br/>
            <span class="title">常住地址:</span><input class="input-box" type="text" v-model="nativeaddress"><br/>
            <input class="button" type="button" value="注册" @click="doRegist">
        </form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      citiname: '',
      citicreditid: '',
      password: '',
      sex: '',
      phonenumber: '',
      nativeaddress: '',
      birthdat: ''
    }
  },
  methods: {
    choose1 () {
      this.sex = 'M'
    },
    choose2 () {
      this.sex = 'FM'
    },
    doRegist () {
      const sunCitizenmes = {
        citicreditid: this.citicreditid,
        citiname: this.citiname,
        sex: this.sex,
        nation: this.nation,
        phonenumber: this.phonenumber,
        nativeaddress: this.nativeaddress,
        birthdat: this.birthdat,
        password: this.password
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/citizenMes/register?${params}`,
        methods: 'get'
      })
        .then((response) => {
          if (response.state !== 200) {
            alert('注册成功OK')
            this.$router.push('/log')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCurrentStyle (current, today) {
      const style = {}
      this.birthdat = current.date()
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    .wrapper
        background rgb(82,130,170)
        .formbox
            width 80%
            height 800px
            margin 120px auto 120px auto
            background white
            padding 80px 150px 20px 150px
            border-radius 30px
            font-size 22px
            line-height 60px
            .title
                display inline-block
                width 30%
            .input-box
                width 60%
                height 40px
                border-radius 10px
                border 1px solid #c8cccf
            .button
                width 80%
                font-size 26px
                color white
                height 60px
                margin-top 15px
                margin-left 25px
                line-height 60px
                background rgb(82,130,170)
                border 0
</style>
