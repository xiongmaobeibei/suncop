<template>
  <div class="write-box">
    <a-textarea
      placeholder="Basic usage"
      :value="inputValue"
      @change="e => this.inputValue = e.target.value"
      :rows="4" />
    <a-button
      type="primary"
      :loading="loading"
      @click="onPressSendBtn"
      class="send-btn">
      发送
    </a-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      inputValue: ''
    }
  },
  methods: {
    onPressSendBtn () {
      this.loading = true
      setTimeout(() => { this.loading = false }, 2000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.write-box
  width 8rem
  display flex
  flex-direction column
  align-items  flex-end
.send-btn
  margin-top 1em
</style>
