<template>
  <div class='sendBox'>
    <p>发件箱</p>
    <a-table :columns="columns" :dataSource="data" size='small'>
      <a slot="name" slot-scope="text" href="javascript:">{{text}}</a>
      <span slot="source">To.</span>
      <span slot="content" slot-scope="text, record" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <v-dialog/>
  </div>
</template>
<script>
const columns = [{
  dataIndex: 'source',
  key: 'source',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'source' }
}, {
  title: '收件人',
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
  name: 'admin',
  content: 'New York No. 1 Lake Park'
}, {
  key: '2',
  source: 'user',
  name: 'admin',
  content: 'London No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake Park'
}, {
  key: '3',
  source: 'user',
  name: 'admin',
  content: 'Sidney No. 1 Lake Park'
}]

export default {
  data () {
    return {
      data,
      columns,
      modal: {
        title: '',
        content: '',
        userName: ''
      }
    }
  },
  methods: {
    onPressCheck (e) {
      this.$modal.show('dialog', {
        title: `From. ${e.name} (${e.source})`,
        text: e.content,
        buttons: [
          {
            title: 'Close'
          }
        ]
      })
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
</style>
