<template>
  <div class='sendBox'>
    <p>发件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <a slot="name" slot-scope="text" href="javascript:">{{text}}</a>
      <span slot="identify" slot-scope="text" class="content">{{identifyObj[text]}}</span>
      <span slot="content" slot-scope="text" class="content">{{text}}</span>
      <span slot="letterTitle" slot-scope="text" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressDel(record)">删除</a>
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <modal name="message-detail" height="auto" :scrollable="true">
      <div class="modal-box">
        <header>
          <p>发件人: {{modal.userName}}</p>
        </header>
        <main>
          <p>内容</p>
          <p style="font-weight: 400">{{modal.content}}</p>
        </main>
        <footer>
          <p class="p-time">{{modal.letterTime}}</p>
        </footer>
      </div>
    </modal>
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
  dataIndex: 'letterTime',
  key: 'letterTime',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.letterTime).getTime() - new Date(b.letterTime).getTime()
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
        letterTime: ''
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
        letterTime: e.letterTime
      }
      this.$modal.show('message-detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.sendBox
  width 8rem
  background-color #fff
  margin-bottom 55px
  border-radius 10px
  p
    margin-top 1em
    padding-left 1em
    font-weight 500
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
.p-time
  text-align right
  margin-right 30px
</style>
