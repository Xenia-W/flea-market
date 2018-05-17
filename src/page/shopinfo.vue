<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width: 100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height:auto; width: 32%; margin-left: 32%; margin-top: 8%">
      <!--<i-table :columns="columns1" :data="data1"></i-table>-->
      <Table border :columns="columns7" :data="data6" ></Table>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import daohang from '../components/daohang.vue'
  import { getUrlEnd, getIdByCookie } from '../utils/getidtoken.js'
  export default {
    components: {
      daohang
    },
    data () {
      return {
        columns7: [
          {
            title: '图片一',
            key: 'photo',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.photo, style: 'width: 65px; height: 65px'
                }
              })
            }
          },
          {
            title: '图片二',
            key: 'photo',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.photo, style: 'width: 65px; height: 65px'
                }
              })
            }
          },
          {
            title: '图片三',
            key: 'photo',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.photo, style: 'width: 65px; height: 65px'
                }
              })
            }
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addshopcart(params.index)
                    }
                  }
                }, '加入购物车')
              ])
            }
          }
        ],
        data6: [
        ]
      }
    },
    created: function () {
      this.data6.splice(0, this.data6.length)
      var tmp = this
      console.log('名字:' + tmp.name)
      var url = global.url + ''
      console.log(url)
      axios.post(url, {
        'id': tmp.$route.query.id,
      }).then(function (response) {
        console.log(response)
        if (response.data.data === null) {
          alert('查询失败')
        } else {
          console.log(response.data.data.length)
          console.log(response.data.data)
          tmp.data6.push(response.data.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    methods: {
      addshopcart (index) {
        var tmp = this
        console.log(this.data6[index])
        var url = global.url + ''
        console.log(url)
        axios.post(url, {
          'productId': tmp.$route.query.id,
          'userId': getIdByCookie()
        }).then(function (response) {
          console.log(response)
          if (response.data.code === 0) {
            alert('添加成功')
          } else {
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
