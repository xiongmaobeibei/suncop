<template>
<div>
  <div style="margin: 6px 10px 6px 10px">
      <a-button
        type="primary"
        @click="deleteSelected()"
        :disabled="!hasSelected"
        :loading="loading"
      >
        删除
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`选择了 ${selectedRowKeys.length} 项`}}
        </template>
      </span>
  </div>
  <!-- <a-modal
      title="详情界面"
      v-model="visible"
      @ok="handleOk"
    >
      <h1></h1>
      <p>Some contents...</p>
      <p>Some contents...</p>
  </a-modal> -->
  <a-table :columns="columns"
    :rowKey="record => record.login.uuid"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
  >
    <!-- <template slot="operation" slot-scope="text, record">
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="() => onDelete(record.key)">
        <a href="javascript:;">Delete</a>
      </a-popconfirm>
     </template> -->
     <template slot="name" slot-scope="name">
      {{name.first}} {{name.last}}
    </template>
    <a slot="action" @click="() => showDetail(selectedRowKeys)">详情</a>
    <!-- <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>
    <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template> -->
  </a-table>
</div>
</template>
<script>
import reqwest from 'reqwest'
const columns = [
  {
    title: '投票名称',
    dataIndex: 'name',
    // dataIndex: 'votename',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '投票类型',
    dataIndex: 'gender',
    // dataIndex: 'voteType',
    // filters: [
    //   { text: '单选', value: '单选' },
    //   { text: '多选', value: '多选' }
    // ],
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: '投票介绍',
    // dataIndex: 'voteintro',
    dataIndex: 'email'
  },
  {
    title: '查看详情',
    dataIndex: 'action',
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
      pagination: {},
      loading: false,
      visible: false,
      columns,
      selectedRowKeys: []
    }
  },
  methods: {
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleOk () {
    },
    deleteSelected () {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    showDetail (key) {
      this.visible = true
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
      // this.$ajax({
      //   url: 'api/voteMes',
      //   methods: "get"
      // }).then((response) => {
      //     const pagination = { ...this.pagination }
      //     // Read total count from server
      //     pagination.total = data.totalCount
      //     // pagination.total = 200
      //     this.loading = false
      //     this.data = response.results
      //     this.pagination = pagination
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 10,
          ...params
        },
        type: 'json'
      }).then((data) => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount
        pagination.total = 200
        this.loading = false
        this.data = data.results
        this.pagination = pagination
      })
    }
  }
}
</script>
