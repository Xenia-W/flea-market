<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width: 100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height: 150px; width: 90%; margin-left: 5%; margin-top: 6%">
      <Form ref="formValidate" :rules="ruleValidate" inline :label-width="80">
        <FormItem>
        </FormItem>
      </Form>
    </div>
    <div style="width: 96%;margin-left: 2%;margin-right: 2%; margin-top: -5%">
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
        name: '',
        type: '' + 0,
        selected: [],
        columns7: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center'
          // },
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.buyProduct(params.row.id,params.index)
                    }
                  }
                }, '购买'),
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

      console.log('********* 查询购物车: call *****************')
      var to = global.contractAddress
      var funcName = "getCart"
      var para = ""
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
        "method": "neb_call"
      }, "*")

      window.addEventListener('message', function(e) {
        var curPath = tmp.$route.path
        if(curPath !== '/shopcart')
          return
        if(!!e.data.data.neb_call){
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)

          result = result.split('#')
          console.log("recived by 查询购物车:" + result)
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
    },
    methods: {
      buyProduct: function (shopcart_id, index) {
        console.log('购买产品id:' + shopcart_id)

        console.log('********* 购买商品: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "orderBuy"
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
      },
      select: function (selection) {
        console.log(selection)
        this.selected.splice(0, this.selected.length)
        this.selected.push(selection)
        console.log(this.selected)
      },
      selectcancel: function (selection) {
        console.log(selection)
        this.selected.splice(0, this.selected.length)
        this.selected.push(selection)
        console.log(this.selected)
      },
      remove: function (shopcart_id, index) {
        console.log('删除产品id:' + shopcart_id)

        console.log('********* 删除购物车商品: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "removeFromCart"
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
