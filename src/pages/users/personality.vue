<template>
    <div>
      <div class="wrapper">
        <div class="item">
          <div class="item-title">姓名</div>
          <div class="item-content">{{user.citiname}}</div>
        </div>
        <div class="item">
          <div class="item-title">身份证号码</div>
          <div class="item-content">{{user.citicreditid}}</div>
        </div>
        <div class="item">
          <div class="item-title">性别</div>
          <div class="item-content">{{user.sex}}</div>
        </div>
        <div class="item">
          <div class="item-title">民族</div>
          <div class="item-content">{{user.nation}}</div>
        </div>
        <div class="item">
          <div class="item-title">出生日期</div>
          <div class="item-content">{{user.birthday}}</div>
        </div>
        <div class="item">
          <div class="item-title">联系电话</div>
          <div class="item-content">{{user.phonenumber}}</div>
        </div>
        <div class="item">
          <div class="item-title">电子邮箱</div>
          <div class="item-content">{{user.email}}</div>
        </div>
        <div class="item">
          <div class="item-title">居住地址</div>
          <div class="item-content">{{user.address}}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      creditid: '',
      user: {
        'sex': '女',
        'citiname': '谭靖薇',
        'citicreditid': '512000328',
        'password': '123456',
        'nation': '汉族',
        'address': '四川省成都市',
        'email': '12312@126.com',
        'birthday': '1998年X年X月',
        'phonenumber': '37647263'
      }
    }
  },
  mounted () {
    this.showMes()
  },
  methods: {
    showMes () {
      // this.creditid = sessionStorage.getItem('user')
      // this.$ajax({
      //     url: `/api/citizenMes/checkOne?${params}`,
      //     methods: "get"
      //   })
      //     .then((response) => {
      //       this.user = response.data
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  width 80%
  margin 50px auto 80px auto
  .item
    width 100%
    line-height 70px
    height 70px
    font-size 24px
    .item-title
      float left
      width 30%
    .item-content
      width 70%
      float right
      height 90%
      text-align center
      border 2px dashed black
</style>
