<template>
  <div>
    <div style="margin: 6px 10px 6px 10px">
        <a-button
          type="primary"
          @click="deleteSelected()"
          :disabled="!hasSelected"
        >
          删除
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{`选择了 ${selectedRowKeys.length} 项`}}
          </template>
        </span>
    </div>
    <a-modal
        title="确认框"
        :visible="deletevisible"
        centered
        @ok="handleOk"
        @cancel="() => setModal1Visible(false)"
      >
        <p>你确定要删除这些投票吗？</p>
    </a-modal>
    <a-modal
      title="详情表"
      centered
      v-model="detailvisible"
    >
      <h1>{{ showdata.votename}}</h1>
      <h2>投票类型：{{ showdata.votetype}}</h2>
      <h2>投票介绍：{{ showdata.voteintro}}</h2>
      <h2>投票时间： {{ showdata.votetimebegin}} -- {{ showdata.votetimeend}}</h2>
      <h2>投票选项:
      <!-- <li v-for="tab in showdata.voteitems" :key="tab.id">
        {{ tab.itemid }}: {{ tab.itemname }} --- {{ tab.itemintro }}
        </li> -->
      <li v-for="item in showdata.voteitems" :key="item.id" class="tab-item">
        {{ item.itemid }}： &nbsp;&nbsp; {{ item.itemname }} --- 票数：{{ item.itemcount }}
        <br/> 介绍：{{ item.itemintro }}
      </li>
      </h2>
    </a-modal>
    <a-table :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :scroll="{ y: 800 }"
      @change="handleTableChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <template slot="name" slot-scope="name">
        {{name.first}} {{name.last}}
      </template>
      <!-- <a slot="action" @click="() => showDetail(record.key)">详情</a> -->
      <template slot="action" slot-scope="text, record">
        <a @click="() => showDetail(record)">详情</a>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '投票名称',
    dataIndex: 'votename',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'votename' }
  },
  {
    title: '投票类型',
    dataIndex: 'votetype',
    width: '20%',
    filters: [
      { text: '单选', value: '单选' },
      { text: '多选', value: '多选' }
    ]
  },
  {
    title: '投票介绍',
    dataIndex: 'voteintro',
    width: '40%'
  },
  {
    title: '查看详情',
    dataIndex: '',
    key: 'x',
    scopedSlots:
    {
      customRender: 'action'
    }
  }
]
export default {
  mounted () {
    this.fetch()
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  data () {
    return {
      data: [],
      showdata: {},
      pagination: {},
      loading: false,
      deletevisible: false,
      detailvisible: false,
      detailItem: 0,
      columns,
      selectedRowKeys: [],
      voteitems: []
    }
  },
  methods: {
    handleOk () {
      for (var i = 0; i < this.selectedRowKeys.length; i++) {
        var temp = {
          voteID: this.data[this.selectedRowKeys[i]].voteid
        }
        let param = this.qs.stringify(temp)
        this.$ajax({
          url: `/api/voteMes/delete?${param}`,
          methods: 'get'
        }).then((response) => {
          if (response.status === 200) {
            alert('删除成功！')
            this.$router.go(0)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      this.deletevisible = false
    },
    deleteSelected () {
      this.deletevisible = true
    },
    showDetail (e) {
      this.detailvisible = true
      this.showdata = {
        votename: e.votename,
        voteType: e.voteType,
        voteintro: e.voteintro,
        votetimebegin: e.votetimebegin,
        votetimeend: e.votetimeend,
        voteitems: e.sunVoteitems
      }
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      this.$ajax({
        url: '/api/voteDetail/all',
        methods: 'get'
      }).then((response) => {
        console.log(response)
        const pagination = { ...this.pagination }
        // Read total count from server
        pagination.total = response.data.length
        // pagination.total = 200
        this.loading = false
        this.data = response.data
        this.pagination = pagination
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
