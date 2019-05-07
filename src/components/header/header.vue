<template>
    <div class="wrapper">
        <div class="top">
            <div class="search-wrapper">
                <div class="button"></div>
                <input class="text" type="text"/>
            </div>
            <div class="time">
                <span>2019年3月26日</span>
            </div>
            <div class="button-group">
                <input type="button" value="登录" @click="jumpLog"/>
                <input type="button" value="注册" @click="jumpLog"/>
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
        height 80px
        line-height 80px
        background-color rgb(0,94,154)
        .search-wrapper
            width 400px
            margin-left 10px
            float left
            display inline-block
            .button
                width 40px
                height 38px
                background-image url(u162.png)
                background-size 40px 38px
                background-repeat no-repeat
                float left
                margin 18px 5px 9px 35px
            .text
                width 250px
                height 40px
                border 0px
                border-radius 5px
                float left
                margin 20px 3px 13px 13px
        .time
            display inline-block
            width 220px
            font-size 24px
            position absolute
            right 168px
            color white
        .button-group
            right 15px
            position absolute
            input
              font-size 25px
              display inline-block
              border 0px
              text-align center
              border-radius 15px
    .bottom
        background-color rgb(14,30,45)
        width 100%
        height 680px
        .title
            color:#99FFFF
            height 150px
            line-height 170px
<<<<<<< HEAD
            overflow hidden
            .left-content
                width 50%
                float left
=======
            width 100%
            display flex
            justify-content center
            .left-content
                float left
                width 800px
>>>>>>> 4f26062dbd74f91e2f6c8063ef9552e60faa2ad4
                text-align center
                .title-icon
                    width 90px
                    height 90px
                    background-size 90px 90px
                    background-repeat no-repeat
                    bg-image('u10')
                    display inline-block
                .title-text
                    font-family '宋体'
                    font-weight 1000
                    font-size 45px
                    display inline-block
                    margin-left 10px
                    letter-spacing 6px
            .right-content
<<<<<<< HEAD
                width 50%
=======
                float right
                width 1000px
>>>>>>> 4f26062dbd74f91e2f6c8063ef9552e60faa2ad4
                float right
                font-family '楷体'
                font-size 25px
                text-align left
                overflow hidden
        .image-wrapper
            height 650px
            bg-image('u2')
            background-size 100% 430px
            background-repeat no-repeat
</style>
