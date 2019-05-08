<template>
  <div class="interact-container">
    <div class="inter-btn">
      <div v-for="(item,index) in aArr" :key="index" >
        <a href="item.ahref"><img :src="item.images"></a>
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="inter-tab">
      <a-tabs class="tab-btn" type="card" tabPosition="left">
        <a-tab-pane class="tab-content" tab="我要看" tabBarStyle="background-color:'red';" key="1">
          <ul>
            <li><a href="#">行政规范性文件</a></li>
            <li><a href="#">公开公示</a></li>
            <li><a href="#">政策法规</a></li>
          </ul>
        </a-tab-pane>
        <a-tab-pane class="tab-content" tab="我要评" key="2">
          <ul>
            <li><a href="#">在线访谈</a></li>
            <li><a href="#">热点答复</a></li>
            <li><a href="#">局长信箱</a></li>
            <li><a href="#">投票通道</a></li>
            <li><a href="#">意见征集</a></li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import i1 from './i1.png'
import i2 from './i2.png'
import i3 from './i3.png'
import i4 from './i4.png'
export default {
  data () {
    return {
      aArr: [
        {
          images: i1,
          title: '投票通道',
          ahref: '#'
        },
        {
          images: i2,
          title: '局长信箱',
          ahref: '#'
        },
        {
          images: i3,
          title: '热点答复',
          ahref: '#'
        },
        {
          images: i4,
          title: '意见征集',
          ahref: '#'
        }
      ]
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>

<style lang="stylus">
.interact-container
  width 100%
  height 100%
  .inter-btn
    width 20%
    height 100%
    display inline-block
    text-align center
    img
      width 100px
      height 100px
  .inter-tab
    display inline-block
    width 75%
    height 100%
    background-image url('./back-tabs.png')
    background-size 100% auto
    background-repeat no-repeat
    top 5%
    .tab-btn
      width 80%
      margin 20% 7%
      .tabBarStyle
        background-color red
      .tab-content
        background-color red
</style>
