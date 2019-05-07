<template>
  <div class='receiveBox'>
    <p style="padding-left: 1em">收件箱</p>
    <a-table :columns="columns" :dataSource="data" size='small'>
      <a slot="name" slot-scope="text" href="javascript:">{{text}}</a>
      <span slot="customTitle">来源</span>
      <span slot="content" slot-scope="text, record" class="content">{{text}}</span>
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
          <p>回复</p>
          <div class="footer-form">
            <a-textarea
              placeholder="Basic usage"
              :value="inputValue"
              @change="e => this.inputValue = e.target.value"
              :rows="4" />
            <a-button
                type="primary"
                :loading="loading"
                @click="onPressSendBtn"
                class="btn-form">
                发送
              </a-button>
          </div>
        </footer>
      </div>
    </modal>
  </div>
</template>
<script>
const columns = [{
  dataIndex: 'source',
  key: 'source',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'source' }
}, {
  title: '发件人',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '简要内容',
  dataIndex: 'content',
  key: 'content',
  scopedSlots: { customRender: 'content' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  key: '1',
  source: 'admin',
  name: 'John Brown',
  content: 'New York No. 1 Lake Park'
}, {
  key: '2',
  source: 'user',
  name: 'Jim Green',
  content: 'London No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake Park'
}, {
  key: '3',
  source: 'user',
  name: 'Joe Black',
  content: 'Sidney No. 1 Lake Park'
}]

export default {
  data () {
    return {
      data,
      columns,
      visible: false,
      inputValue: '',
      loading: false,
      modal: {
        title: '',
        content: '',
        userName: ''
      }
    }
  },
  methods: {
    onPressDel (e) {
      const i = this.data.findIndex(item => item.key === e.key)
      // TODO: 这里需要后端提供方法真正的删除数据
      this.data.splice(i, 1)
    },
    onPressCheck (e) {
      this.modal = {
        title: e.source,
        content: e.content,
        userName: e.name
      }
      this.$modal.show('message-detail')
    },
    onPressSendBtn () {
      // TODO: 这里需要后端提供方法发送信息
      this.loading = true
      setTimeout(() => { this.loading = false }, 2000)
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
  padding-top 1em
  p
    font-weight 600
  main
    // min-height 10em
  .footer-form
    display flex
    flex-direction column
    align-items flex-end
    .btn-form
      margin-top 1em
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
</style>
