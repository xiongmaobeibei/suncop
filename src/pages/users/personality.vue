<template>
    <div>
      <div class="wrapper">
        <div v-for="item in user" :key="item.id" class="item">
          <div class="itemtitle">{{list[item.id]}}</div>
          <div class="itemcontent">{{item}}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      credit: '',
      user: {
        'sex': 'FM',
        'citiname': '谭靖薇',
        'password': '123456',
        'nation': '汉族',
        'address': '四川省成都市'
      },
      list: ['姓名', '身份证号', '性别', '民族', '居住地址', '联系电话', '籍贯', '出生日期']
    }
  },
  created () {
    // let listname = ['姓名','身份证号','性别','民族','居住地址','联系电话','籍贯','出生日期']
    // this.credit = sessionStorage.getItem('user')
    // this.$http.get('/user',this.credit).then((res) => {
    //   if(res!==200){
    //     this.user = res.data
    //   }
    // })
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
