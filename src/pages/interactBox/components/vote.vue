<template>
<div class="wrapper">
  <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.votename"><a-button type="primary" block @click="showVoteDetail(index)">进入投票</a-button></a-card>
    </a-list-item>
  </a-list>
  <a-modal v-model="visible" title="投票详情" onOk="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          提交
        </a-button>
      </template>
      <h1>{{data[choiceindex].vitename}}</h1>
      <h2>{{data[choiceindex].voteintro}}</h2>
      <p>选项</p>
      <!-- <a-list itemLayout="horizontal" :dataSource="itemdata">
        <a-list-item slot="renderItem" slot-scope="">
          <a-list-item-meta
            description=item.itemIntro
          >
            <a slot="title" href="https://vue.ant.design/">item.itemName</a>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-list-item-meta>
        </a-list-item>
      </a-list> -->
      <li v-for="item in itemdata" :key="item.itemid">
        <p>选项：{{item.itemid}}&nbsp;&nbsp;&nbsp;{{item.itemname}}</p>
        <p>介绍：{{item.itemintro}}</p>
        <p>目前票数：{{item.itemcount}}</p>
        <p>选他/她<input type="radio" name="radios" value="" @click="choosed(item.itemid)"/></p>
      </li><br/>
      请输入您的身份证号码：<input type="text" v-model="creditid" placeholder="身份证号码">
    </a-modal>
</div>
</template>
<script>
const data = []
// const itemdata = []
export default {
  data () {
    return {
      data,
      itemdata: [],
      loading: false,
      visible: false,
      choiceindex: 0,
      creditid: '',
      choosedItem: 0
    }
  },
  mounted () {
    this.loadingdata()
  },
  methods: {
    loadingdata () {
      this.$http.get('api/voteDetail/all').then((res) => {
        if (res) {
          console.log(res.body)
          this.data = res.body
        }
      })
    },
    choosed (index) {
      this.choosedItem = index
    },
    showVoteDetail (index) {
      this.visible = true
      this.itemdata = this.data[index].sunVoteitems
      this.choiceindex = this.choosedItem
    },
    confirm () {
      const sunCitizenmes = {
        citicreditid: this.creditid
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$http.get(`api/citizenmes/ishave?${params}`).then((res) => {
        if (res.data === 1) {
          const sunCitizenmes = {
            citicreditid: this.creditid,
            itemid: this.choosedItem
          }
          console.log(this.choiceindex)
          const params = this.qs.stringify(sunCitizenmes)
          this.$http.get(`api/voteDetail/select?${params}`).then((res) => {
            if (res) {
              alert('投票成功')
            }
          })
        } else {
          alert('请注册或者登录！')
          this.visible = false
        }
      })
    },
    handleOk (e) {
      this.confirm()
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  margin 80px auto 50px auto
  width 100%
  min-height 600px
  background-color white
</style>
