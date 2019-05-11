<template>
    <div class="wrapper">
        <form action="" class="formbox">
            <span class="title">姓名:</span><input class="input-box" type="text"><br/>
            <span class="title">身份证号:</span><input class="input-box" type="text"><br/>
            <span class="title">密码:</span><input class="input-box" type="password"><br/>
            <span class="title">确认密码:</span><input class="input-box" type="password"><br/>
            <span class="title">性别:</span>男<input type="radio">&nbsp;女<input type="radio"><br/>
            <span class="title">民族:</span><input class="input-box" type="text"><br/>
            <span class="title">出生日期:</span><input class="input-box" type="text"><br/>
            <span class="title">电话号码:</span><input class="input-box" type="text"><br/>
            <span class="title">备用号码:</span><input class="input-box" type="text"><br/>
            <span class="title">电子邮箱:</span><input class="input-box" type="text"><br/>
            <span class="title">常住地址:</span><input class="input-box" type="text"><br/>
            <input class="button" type="button" value="注册">
        </form>
    </div>
</template>
<script>
export default {
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
            padding 20px 40px 20px 40px
            font-size 22px
            line-height 60px
            .title
                display inline-block
                width 30%
            .input-box
                width 60%
                height 40px
            .button
                width 80%
                margin-left 5%
                font-size 26px
                color white
                background rgb(82,130,170)
                border 0
</style>
