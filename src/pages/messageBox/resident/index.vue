<template>
  <div class='residentBox'>
    <Receive />
    <Send />
  </div>
</template>
<script>
import Send from './components/send.vue'
import Receive from './components/receive.vue'
export default {
  components: {
    Receive,
    Send
  },
  data () {
    return {
      receiveData: null, // 收件箱数据
      sendData: null, // 已发送数据
      inputValue: '' // 输入内容
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.residentBox
  width 100%
  display flex
  flex-direction column
  align-items center
</style>
