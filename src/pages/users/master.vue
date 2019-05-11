<template>
    <div class="wrapper">
        <ul class="tab">
            <li class="item-title">用户界面</li>
            <li v-for="item in currentNavItem" :key="item" class="tab-item">
              <router-link :to="item.path">{{item.name}}</router-link>
              </li>
            <li class="tab-item">注销</li>
            <li class="tab-item" @click="backToindex">返回首页</li>
        </ul>
        <router-view class="right-wrapper"></router-view>
    </div>
</template>
<script>
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  data () {
    return {
      user: '',
      currentNavItem: []
    }
  },
  mounted: function () {
    this.showMenu()
  },
  methods: {
    backToindex () {
      this.$router.push('/index')
    },
    showMenu () {
      console.log(sessionStorage.getItem('menuData'))
      this.currentNavItem = JSON.parse(sessionStorage.getItem('menuData'))
    }
    // created () {
    //   this.user = sessionStorage.getItem('user')
    //   console.log(sessionStorage.getItem('menuData'))
    //   this.currentNavItem = JSON.parse(sessionStorage.getItem('menuData'))
    // }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  width 100%
  background rgb(248,242,242)
  .tab
    float left
    width 30%
    height 500px
    list-style none
    .item-title
      height 80px
      line-height 70px
      font-size 35px
      text-align center
      background rgb(33,82,126)
    .tab-item
      height 50px
      line-height 50px
      font-size 23px
      text-align center
      background rgb(242,242,242)
      &:active
        background rgb(255,255,255)
  .right-wrapper
    float left
    width 70%
    height 500px
    background rgb(82,130,170)
</style>
