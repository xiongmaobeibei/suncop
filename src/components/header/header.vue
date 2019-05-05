<template>
    <div>
        <div class="top">
            <div class="search-wrapper">
                <div class="button"></div>
                <input class="text" type="text"/>
            </div>
            <div class="button-group">
                <input type="button" value="登录" @click="jumpLog"/>
                <input type="button" value="注册" @click="jumpLog"/>
            </div>
            <div class="time">
                <span>2019年3月26日</span>
            </div>
        </div>
        <div class="bottom">
            <div class="title">
                <div class="left-content">
                    <div class="title-icon"></div>
                    <div class="title-text">阳光警务</div>
                </div>
                <div class="right-content">
                    阳光精神：海纳百川 追求卓越 开明睿智 大气谦和
                </div>
            </div>
            <div class="image-wrapper"></div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    jumpLog () {
      this.$emit('jump', 'jumped')
      console.log('点击了')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin";
    .top
        margin 0
        padding 0
        width 100%
        height 50px
        line-height 50px
        background-color rgb(0,94,154)
        .search-wrapper
            width 25%
            margin-left 2%
            display inline-block
            margin-top 10px
            .button
                width 25px
                height 25px
                background-image url(u162.png)
                background-size 25px 25px
                background-repeat no-repeat
                float left
            .text
                width 70%
                height 25px
                border 0px
                border-radius 5px
                float left
                margin-left 5px
        .time
            display inline-block
            font-size 20px
            margin-right 2%
            float right
            color white
        .button-group
            margin-right 2%
            display inline-block
            margin-top 10px
            float right
            input
              font-size 15px
              display inline-block
              float right
              border 0px
              border-radius 15px
    .bottom
        background-color rgb(14,30,45)
        width 100%
        .title
            color:#99FFFF
            height 150px
            line-height 150px
            .left-content
                float left
                width 50%
                text-align center
                .title-icon
                    width 70px
                    height 70px
                    background-size 70px 70px
                    background-repeat no-repeat
                    bg-image('u10')
                    display inline-block
                .title-text
                    font-family '宋体'
                    font-weight bold
                    font-size 2.4em
                    display inline-block
                    margin-left 10px
                    letter-spacing 6px
            .right-content
                float right
                width 50%
                text-align left
                font-family '楷体'
                font-size 1.5em
        .image-wrapper
            height 350px
            bg-image('u2')
            background-size 100% 300px
            background-repeat no-repeat
</style>
