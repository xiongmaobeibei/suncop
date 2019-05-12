<template>
  <div class='receiveBox'>
    <p>收件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <a slot="name" slot-scope="text" href="javascript:">{{text}}</a>
      <span slot="returnTime" slot-scope="text" class="content">{{text}}</span>
      <span slot="letterTitle" slot-scope="text" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressDel(record)">删除</a>
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <modal name="message-detail" height="auto" :scrollable="true">
      <div class="modal-box">
        <header>
          <p>dear {{modal.userName}}</p>
        </header>
        <main class="origin-box">
          <p>原信件内容:</p>
          <p style="font-weight: 400;text-indent: 2em;">{{modal.content}}</p>
          <p class="time-box">{{modal.letterTime}}</p>
        </main>
        <main class="back-box">
          <p>回复内容:</p>
          <p style="font-weight: 400;text-indent: 2em;">{{modal.returnMessage}}</p>
          <p class="time-box">{{modal.returnTime}}</p>
        </main>
        <footer>
          <p>from 局长</p>
        </footer>
      </div>
    </modal>
    <v-dialog/>
  </div>
</template>
<script>
const columns = [{
  title: '发件人',
  dataIndex: 'ownerEmail',
  key: 'ownerEmail',
  // 按名字长度排序
  sorter: (a, b) => a.ownerEmail.length - b.ownerEmail.length
}, {
  title: '日期',
  dataIndex: 'returnTime',
  key: 'returnTime',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.returnTime).getTime() - new Date(b.returnTime).getTime()
}, {
  title: '简要内容',
  dataIndex: 'letterTitle',
  key: 'letterTitle',
  scopedSlots: { customRender: 'letterTitle' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  mounted: function () {
    this.getLetters()
  },
  data () {
    return {
      data: [],
      columns,
      modal: {
        title: '',
        content: '',
        userName: '',
        returnMessage: '',
        letterTime: '',
        returnTime: ''
      }
    }
  },
  methods: {
    getLetters () {
      this.$ajax.get('http://localhost:3003/letters').then((res) => {
        this.data = res.data
      })
    },
    onPressDel (e) {
      const i = this.data.findIndex(item => item.key === e.key)
      // TODO: 这里需要后端提供方法真正的删除数据
      this.data.splice(i, 1)
    },
    onPressCheck (e) {
      this.modal = {
        source: e.identify,
        content: e.letterContent,
        userName: e.ownerEmail,
        returnMessage: e.backMessage,
        returnTime: e.returnTime,
        letterTime: e.letterTime
      }
      this.$modal.show('message-detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.receiveBox
  width 8rem
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  min-height 600px
  p
    margin-top 1em
    padding-left 1em
    font-weight 500
footer
  margin-top 50px
  text-align right
  border-top #416786 1px solid
.origin-box
  background-color #416786
  padding 3px 0
  color white
  border-radius 15px
.back-box
  margin-top 40px
.detailBox
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
.content
  overflow hidden
  text-overflow ellipsis
  max-width 200px
  max-height 53px
  white-space nowrap
  display block
.modal-box
  padding 1.6em
.time-box
  margin-left 600px
</style>
