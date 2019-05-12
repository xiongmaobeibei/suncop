<template>
  <div class='receiveBox'>
    <p style="padding-left: 1em">收件箱</p>
    <div style="margin-bottom: 16px">
    <a-button
        type="primary"
        @click="startDel"
        :disabled="!hasSelected"
      >
        删除
      </a-button>
    <a-button
        type="primary"
        @click="startPass"
        :disabled="!hasSelected"
      >
        通过
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </span>
    </div>
    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
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
const identifyObj = {
  'admin': '管理员',
  'police': '警察',
  'resident': '居民'
}
const columns = [{
  dataIndex: 'identify',
  title: '身份',
  key: 'identify',
  scopedSlots: { customRender: 'identify' },
  // 筛选发件人的身份
  filters: [
    { text: '管理员', value: 'admin' },
    { text: '警察', value: 'police' },
    { text: '居民', value: 'resident' }
  ],
  onFilter: (value, record) => record.identify.indexOf(value) === 0
}, {
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
      visible: false,
      inputValue: '',
      loading: false,
      selectedRowKeys: [],
      modal: {
        source: '',
        content: '',
        userName: ''
      },
      identifyObj
    }
  },
  computed: {
    rowSelection () {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [{
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
          // this.selectedRowKeys = [0] // 0...45
          }
        }],
        onSelection: this.onSelection
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
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
        userName: e.ownerEmail
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
  min-height 600px
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
