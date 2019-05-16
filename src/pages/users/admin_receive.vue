<template>
  <div class='receiveBox'>
    <p style="padding-left: 1em">收件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <span slot="identify" slot-scope="text" class="content">{{identifyObj[text]}}</span>
      <span slot="owneremail" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertime" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertitle" slot-scope="text" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressDel(record)">删除</a>
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <a-modal name="message-detail" height="auto" :scrollable="true" :visible="isShow">
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
    </a-modal>
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>
<script>
const identifyObj = {
  '系统管理员': '系统管理员',
  '片区管理员': '片区管理员',
  '警察': '警察',
  '居民': '居民'
}
const columns = [{
  dataIndex: 'sunCitizenmes.identity',
  title: '身份',
  key: 'identify',
  scopedSlots: { customRender: 'identify' },
  // 筛选发件人的身份
  filters: [
    { text: '系统管理员', value: '系统管理员' },
    { text: '片区管理员', value: '片区管理员' },
    { text: '警察', value: '警察' },
    { text: '居民', value: '居民' }
  ],
  onFilter: (value, record) => record.identify.indexOf(value) === 0
}, {
  title: '发件人',
  dataIndex: 'sunCitizenmes.citiname',
  key: 'owneremail',
  // 按名字长度排序
  sorter: (a, b) => a.owneremail.length - b.owneremail.length
}, {
  title: '日期',
  dataIndex: 'lettertime',
  key: 'lettertime',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.lettertime).getTime() - new Date(b.lettertime).getTime()
}, {
  title: '简要内容',
  dataIndex: 'lettertitle',
  key: 'lettertitle',
  scopedSlots: { customRender: 'lettertitle' }
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
      isShow: false,
      inputValue: '',
      loading: false,
      modal: {
        letterid: '',
        source: '',
        content: '',
        userName: ''
      },
      identifyObj,
      visible: false,
      ModalText: '',
      isDel: true,
      id: ''
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      if (this.isDel === true) {
        const sunCitizenmes = {
          letterid: this.data[this.id].letterid
        }
        const params = this.qs.stringify(sunCitizenmes)
        this.$ajax({
          url: `/api/letters/deleteByletterid?${params}`
        })
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
        this.visible = false
        this.data.splice(this.id, 1)
      } else {
        const sunCitizenmes = {
          id: this.data[this.id].letterid,
          returnText: this.inputValue
        }
        const params = this.qs.stringify(sunCitizenmes)
        this.$ajax({
          url: `/api/letter/return?${params}`
        })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error)
          })
        this.data.splice(this.id, 1)
        this.visible = false
        this.isShow = false
        this.inputValue = ''
      }
    },
    handleCancel (e) {
      this.visible = false
    },
    getLetters () {
      this.$ajax({
        url: `/api/letter/capitalseeletters`
      })
        .then((response) => {
          var i = 0
          var j = 0
          var ming = []
          while (i < response.data.length) {
            var temp = response.data[i].returninfo
            console.log()
            if (temp === null || temp === undefined || temp === '') {
              ming[j] = response.data[i]
              i++
              j++
            } else {
              i++
            }
          }
          this.data = ming
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onPressDel (e) {
      const i = this.data.findIndex(item => item.key === e.key)
      this.ModalText = '确认删除该条信件？'
      this.id = i + 1
      this.visible = true
      this.isDel = true
      this.showModal()
    },
    onPressCheck (e) {
      const i = this.data.findIndex(item => item.key === e.key)
      this.id = i
      this.modal = {
        letterid: e.letterid,
        source: e.sunCitizenmes.identity,
        content: e.lettercontent,
        userName: e.sunCitizenmes.citiname
      }
      this.isShow = true
      this.isDel = false
    },
    onPressSendBtn () {
      // TODO: 这里需要后端提供方法发送信息
      this.ModalText = '确认回复该条信件？'
      this.showModal()
    }
  }
}
</script>
<style lang="stylus" scoped>
.receiveBox
  width 80%
  margin 50px auto
  background-color #fff
  min-height 600px
  p
    margin-top 1em
    padding-left 1em
    font-weight 500
    font-size 22px
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
