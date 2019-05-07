<template>
  <div class='residentBox'>
    <Receive />
  </div>
</template>
<script>
import Receive from './components/receive.vue'
export default {
  components: {
    Receive
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
