<template>
    <div class="add-box">
        <div class="add-head">添加工作动态</div>
        <div class="add-input">
            <a-form
                :form="form"
                @submit="handleSubmit"
            >
                <a-form-item
                v-bind="formItemLayout"
                label="选择发布板块"
                >
                    <a-select
                      v-decorator="[
                        'type',
                        {
                            rules: [{
                            required: true, message: '请选择模块!',
                            }]
                        }
                      ]">
                        <a-select-option value="0">
                            警务报道
                        </a-select-option>
                        <a-select-option value="1">
                            通知公告
                        </a-select-option>
                        <a-select-option value="2">
                            警方提示
                        </a-select-option>
                        <a-select-option value="3">
                            分局警讯
                        </a-select-option>
                        <a-select-option value="4">
                            国务院信息
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                v-bind="formItemLayout"
                label="标题："
                >
                    <a-input
                        v-decorator="[
                        'title',
                        {
                            rules: [{
                            required: true, message: '请输入标题!',
                            }]
                        }
                        ]"
                    />
                </a-form-item>
                <a-form-item
                v-bind="formItemLayout"
                label="发布时间"
                >
                    <a-date-picker
                        v-decorator="[
                        'time',
                        {
                            rules: [{ required: true, message: '请选择时间!' }]
                        }
                        ]"
                        show-time
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </a-form-item>
                <a-form-item
                v-bind="formItemLayout"
                label="新闻内容"
                >
                    <a-textarea
                        v-decorator="[
                        'content',
                        {
                            rules: [{ required: true, message: '内容不得为空!' }],
                        }
                        ]"
                        :rows="10"/>
                </a-form-item>
                <a-form-item style="text-align:center;">
                    <a-button
                        type="primary"
                        html-type="submit"
                    >
                        添加
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 4
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          console.log(err)
        } else {
          const sunCitizenmes = {
            newtype: values.type,
            newtitle: values.title,
            newcontent: values.content,
            newdate: values.time.format('YYYY-MM-DD HH:mm:ss')
          }
          console.log(sunCitizenmes)
          const params = this.qs.stringify(sunCitizenmes)
          this.$ajax({
            url: `/api/policenews/release?${params}`
          })
            .then((response) => {
              console.log(response.data)
            })
            .catch((error) => {
              console.log(error)
            })
        //   const addnews = {
        //     // 'newtitle': fieldsValue.time
        //     // 'newdate': fieldsValue['time'].format('YYYY-MM-DD HH:mm:ss')
        //   }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.add-box
    width 50%
    height auto
    background-color #F4F4F4
    padding 5px 10px
.add-head
    width 150px
    height auto
    padding 10px 10px
    border-radius 8px
    background-color #5282AA
    text-align center
    font-size 20px
    color white
.add-input
    margin 30px 0
</style>
