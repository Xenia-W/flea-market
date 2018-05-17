<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="width:100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height: 150px; width: 90%; margin-left: 5%; margin-top: 6%">
      <Form ref="formValidate" :rules="ruleValidate" inline :label-width="80">
        <FormItem>
        </FormItem>
      </Form>
    </div>
    <div style="width: 96%;margin-left: 2%;margin-right: 2%; margin-top: -5%">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
      <Button type="primary" @click="add" style="margin-top: 20px; float:right;">添加新商品</Button>
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
        name: '',
        type: '' + 0,
        selected: [],
        columns7: [
          {
            width: 50,
            title: 'ID',
            key: 'id'
          },
          // {
          //   width: 100,
          //   title: '图片',
          //   key: 'photo',
          //   render: (h, params) => {
          //     return h('img', {
          //       attrs: {
          //         src: params.row.photo, style: 'width: 65px; height: 65px'
          //       }
          //     })
          //   }
          // },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '商品详情',
            key: 'info'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '折旧情况',
            key: 'state'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id, params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data6: [
        ],
        theme3: 'light'
      }
    },
    created: function () {

      this.data6.splice(0, this.data6.length)
      var tmp = this

      console.log('********* 查询货架: call *****************')
      var to = global.contractAddress
      var funcName = "getShelf"
      var para = ""

      window.postMessage({
        "target": "contentscript",
        "data":{
          "to": to,
          "value": "0",
          "contract":{
            "function":funcName,
            "args":para
          }
        },
        "method": "neb_call"
      }, "*")

      window.addEventListener('message', function(e) {
        var curPath = tmp.$route.path
        if(curPath !== '/mygoods')
          return
        if(!!e.data.data.neb_call){
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)

          console.log("recived by 查询货架:" +"result:"+ result)
          result = result.split('#')
          for (var i = 0; i < result.length; i++) {
            var  tmpGood = JSON.parse(result[i])
            var a = {
              'id': tmpGood.id,
              // 'photo': tmpGood.id,
              'name': tmpGood.name,
              'price': tmpGood.price,
              'info': tmpGood.description,
              'state': tmpGood.useCondition,
              'time': tmpGood.time
            }
            tmp.data6.push(a)
          }
        }
      })
      //
      // var url = global.url + '/snack/shopcart/get'
      // console.log(url)
      // axios.post(url, {
      //   'userId': parseInt(getIdByCookie()),
      // }).then(function (response) {
      //   console.log(response)
      //   if (response.data.data === null) {
      //     alert('查询失败')
      //   } else {
      //     console.log(response.data.data.products)
      //     for (var i = 0; i < response.data.data.products.length; i++) {
      //       console.log(response.data.data.products[i])
      //       tmp.data6.push(response.data.data.products[i])
      //     }
      //   }
      // }).catch(function (err) {
      //   console.log(err)
      // })
    },
    methods: {
      add: function () {
        this.$router.push({ path: '/addgoods' })
      },
      remove: function (shopcart_id, index) {
        console.log('删除产品id:' + shopcart_id)

        console.log('********* 删除货架商品: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "removeFromShelf"
        var para = "[\"" + shopcart_id + "\"]"
        console.log(para)
        window.postMessage({
          "target": "contentscript",
          "data":{
            "to": to,
            "value": "0",
            "contract":{
              "function":funcName,
              "args":para
            }
          },
          "method": "neb_sendTransaction"
        }, "*")
      }
    }
  }
</script>
