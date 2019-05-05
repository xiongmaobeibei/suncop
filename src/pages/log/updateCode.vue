<template>
    <div>
        <div class="wrapper">
            <form action="" class="formbox">
                <span class="title">身份证号:</span><input class="input-box" type="text"><br/>
                <span class="title">电话号码:</span><input class="input-box" type="text"><br/>
                <span class="title">验证码:</span><input class="input-box-confirm" type="text"><input type="button" class="confirm-button" value="获取验证码"/><br/>
                <span class="title">新密码:</span><input class="input-box" type="text"><br/>
                <input class="button" type="button" value="确认">
            </form>
        </div>
    </div>
</template>
<script>
export default {
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  background white
  width 80%
  height 500px
  margin 80px auto 40px auto
  .formbox
    padding-top 80px
    width 60%
    font-size 24px
    line-height 60px
    margin auto
    .title
        display inline-block
        width 30%
    .input-box
        width 60%
    .input-box-confirm
        width 25%
    .confirm-button
        margin-left 40px
    .button
        width 80%
        margin-left 5%
        font-size 26px
        color white
        background rgb(82,130,170)
        border 0
</style>
