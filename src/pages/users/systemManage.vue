<template>
  <div class="log-box">
    <a-collapse accordion>
      <a-collapse-panel header="登录日志管理" key="1">
        <div class="alog-box">
          <a-table :columns="columns1" :dataSource="ldata" :pagination="pagination" :scroll="{ x: 1300 }" size='middle'>
            <span slot="time" slot-scope="text" class="content">{{text}}</span>
            <span slot="ip" slot-scope="text" class="content">{{text}}</span>
            <span slot="url" slot-scope="text" class="content">{{text}}</span>
            <span slot="param" slot-scope="text" class="content">{{text}}</span>
            <span slot="class" slot-scope="text" class="content">{{text}}</span>
            <span slot="way" slot-scope="text" class="content">{{text}}</span>
          </a-table>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="系统日志管理" key="2" :disabled='false'>
        <div class="alog-box">
          <a-table :columns="columns2" :dataSource="sdata" :pagination="pagination"  :scroll="{ x: 1300 }" size='middle'>
            <span slot="level" slot-scope="text" class="content">{{identifyObj[text]}}</span>
            <span slot="logger" slot-scope="text" class="content">{{text}}</span>
            <span slot="time" slot-scope="text" class="content">{{text}}</span>
            <span slot="message" slot-scope="text" class="content">{{text}}</span>
          </a-table>
        </div>
      </a-collapse-panel>
      <a-collapse-panel header="操作日志管理" key="3">
        <div class="alog-box">
          <a-table :columns="columns3" :dataSource="odata" :pagination="pagination"  :scroll="{ x: 1300 }" size='middle'>
            <span slot="time" slot-scope="text" class="content">{{identifyObj[text]}}</span>
            <span slot="ip" slot-scope="text" class="content">{{text}}</span>
            <span slot="url" slot-scope="text" class="content">{{text}}</span>
            <span slot="params" slot-scope="text" class="content">{{text}}</span>
            <span slot="class" slot-scope="text" class="content">{{text}}</span>
            <span slot="way" slot-scope="text" class="content">{{text}}</span>
          </a-table>
        </div>
        </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>

const columns1 = [{
  title: '触发时间',
  dataIndex: 'date',
  key: 'time',
  fixed: 'left',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
}, {
  title: 'ip',
  dataIndex: 'ip',
  key: 'ip'
}, {
  title: '路径',
  dataIndex: 'url',
  key: 'url'
}, {
  title: '参数',
  dataIndex: 'param',
  key: 'param'
}, {
  title: '方法路径',
  dataIndex: 'class_method',
  key: 'class'
}, {
  title: '请求方式',
  dataIndex: 'http_method',
  key: 'way'
}]

const columns2 = [{
  title: '等级',
  dataIndex: 'level',
  key: 'level',
  fixed: 'left',
  sorter: (a, b) => a.level - b.level
}, {
  title: '日志',
  dataIndex: 'logger',
  key: 'logger'
}, {
  title: '触发时间',
  dataIndex: 'time',
  key: 'time',
  sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
}, {
  title: '提示信息',
  dataIndex: 'message',
  key: 'message'
}]

const columns3 = [{
  title: '触发时间',
  dataIndex: 'date',
  key: 'time',
  fixed: 'left',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
}, {
  title: 'ip',
  dataIndex: 'ip',
  key: 'ip'
}, {
  title: '路径',
  dataIndex: 'url',
  key: 'url'
}, {
  title: '参数',
  dataIndex: 'param',
  key: 'param'
}, {
  title: '方法路径',
  dataIndex: 'class_method',
  key: 'class'
}, {
  title: '请求方式',
  dataIndex: 'http_method',
  key: 'way'
}]

export default {
  mounted: function () {
    this.getOperateLog()
    this.getSystemLog()
    this.getLoginLog()
  },
  data () {
    return {
      ldata: [],
      odata: [],
      sdata: [],
      columns1,
      columns2,
      columns3,
      visible: false,
      loading: false
    }
  },
  methods: {
    getLoginLog () {
      this.$ajax({
        url: `/api/log/getlogin_log`
      })
        .then((response) => {
          console.log(response.data)
          this.ldata = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getSystemLog () {
      this.$ajax({
        url: `/api/log/getsystemlog`
      })
        .then((response) => {
          console.log(response.data)
          this.sdata = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOperateLog () {
      this.$ajax({
        url: `/api/log/getoperate_log`
      })
        .then((response) => {
          console.log(response.data)
          this.odata = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.alog-box
  min-height auto
  width 90%
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  padding-top 1em
  p
    font-weight 600
</style>
