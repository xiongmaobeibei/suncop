<template>
  <a-table :dataSource="data" :columns="columns">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
      <a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type='primary'
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >Search</a-button>
      <a-button
        @click="() => handleReset(clearFilters)"
        size="small"
        style="width: 90px"
      >Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>
     <a-dropdown slot="action">
        <a class="ant-dropdown-link" href="#">
          Hover me <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
        <a-menu-item>
            <a href="javascript:;">片区管理员</a>
        </a-menu-item>
        <a-menu-item>
            <a href="javascript:;"></a>
        </a-menu-item>
        <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
        </a-menu>
  </a-dropdown>
  </a-table>
</template>

<script>
const data = [
  {
    key: '1',
    citiname: 'John Brown',
    citicreditid: '32231234'
  },
  {
    key: '2',
    citiname: 'Joe Black',
    citicreditid: '3223521234'
  },
  {
    key: '3',
    citiname: 'Jim Green',
    citicreditid: '3223231234'
  },
  {
    key: '4',
    citiname: 'Jim Red',
    citicreditid: '32213241234'
  }
]

export default {
  data () {
    return {
      data,
      searchText: '',
      searchInput: null,
      columns: [
        {
          title: '姓名',
          dataIndex: 'citiname',
          key: 'citiname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '身份证号码',
          dataIndex: 'citicreditid',
          key: 'citicreditid',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.age.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '身份',
          dataIndex: 'identity',
          key: 'identity',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    handleMenuClick (e) {
      console.log('click', e)
    },
    loadingdata () {
      this.$ajax({
        url: `/api/citizenMes/all`
      })
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  },
  mounted () {
    this.loadingdata()
  }
}
</script>
<style scoped>
.custom-filter-dropdown{
  padding:8px;
  border-radius:4px;
  background:#fff;
  box-shadow:0 2px 8px rgba(0, 0, 0, .15);
}
.highlight{
  background-color:rgb(255, 192, 105);
  padding:0px;
}
</style>
