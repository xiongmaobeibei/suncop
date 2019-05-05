<template>
  <div class="tab-box">
    <div class="tab-head">
      <a href="#" :class="{'now':index==1}" @click="index=1"></a>
      <a href="#" :class="{'now':index==2}" @click="index=2"></a>
      <a href="#" :class="{'now':index==3}" @click="index=3"></a>
      <a href="#" :class="{'now':index==4}" @click="index=4"></a>
      <a href="#" :class="{'now':index==5}" @click="index=5"></a>
    </div>
    <div class="tab-content">
      <div class="tab-item" v-show="index==1">1111111</div>
      <div class="tab-item" v-show="index==2">1111112</div>
      <div class="tab-item" v-show="index==3">1111113</div>
      <div class="tab-item" v-show="index==4">111114</div>
      <div class="tab-item" v-show="index==5">1111115</div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus">
.tab-box
  width 100%
  height 100%
  .tab-head
    position relative
    height 36px
    margin 15px 0
    border-bottom 1px solid #ddd
    a
      float left
      padding 8px 20px
      margin-right -1px
      background #fbfaf8
      border 1px solid #ddd
    &:hover
      background #ffffff
  .tab-content
  .now
    padding 8px 20px 7px
    border-top 2px solid #4998df
    border-bottom 1px solid #fff
    background #fff
    z-index 2

</style>
