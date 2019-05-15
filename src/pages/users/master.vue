<template>
    <div class="wrapper">
        <ul class="tab">
            <li class="item-title">>>> 个人中心</li>
            <li v-for="item in (currentNavItem)" :key="item.name" class="tab-item">
              <router-link :to="item.path">{{item.name}}</router-link>
            </li>
            <li class="tab-item" @click="logout">注销</li>
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
    async getSessionStorage (key) {
      return new Promise((resolve, reject) => {
        resolve(sessionStorage.getItem('menuData'))
      })
    },
    async showMenu () {
      // console.log(await sessionStorage.getItem('menuData'))
      // console.log(JSON.parse(sessionStorage.getItem('menuData')))
      const menuData = await this.getSessionStorage('menuData')
      this.currentNavItem = JSON.parse(menuData)
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  width 80%
  margin auto
  margin-top -30px
  background rgb(248,242,242)
  .tab
    float left
    width 30%
    height 500px
    list-style none
    padding 0px
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
    float right
    width 70%
</style>
