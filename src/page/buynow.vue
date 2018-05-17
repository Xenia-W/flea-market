<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width: 100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height: 150px; width: 88%; margin-left: 5.5%; margin-top: 6%">
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
            title: '订单编号',
            key: 'orderId'
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
            title: '商品名称',
            key: 'goodName'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '订单状态',
            key: 'state'
          },
          {
            title: '下单时间',
            key: 'time'
          },
          {
            title: '操作',
            key: 'action',
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
                      this.receive(params.row.orderId,params.index)
                    }
                  }
                }, '确认收货'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.orderId, params.index)
                    }
                  }
                }, '取消')
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

      console.log('********* 查询未完成订单: nebCall *****************')
      var to = global.contractAddress
      var funcName = "getOrderingRecord"
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
      console.log('查询已经发送，等待中')

      window.addEventListener('message', function(e) {
        var curPath = tmp.$route.path
        if(curPath !== '/buynow')
          return
        if(!!e.data.data.neb_call){
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)

          console.log("recived by 查询未完成订单:" + "result:"+ result)
          var orderingRecords = result.split('#')
          console.log(orderingRecords.length)
          for (var i = 0; i < orderingRecords.length; i++) {
            try{
              var  tmpOrder = JSON.parse(orderingRecords[i])
              var tmpGood = JSON.parse(tmpOrder.good)
              var a = {
                'orderId': tmpOrder.id,
                // 'photo': tmpOrder.id,
                'goodName': tmpGood.name,
                'price': tmpOrder.price,
                'state': tmpOrder.status,
                'time': tmpOrder.time
              }
              console.log('本次条目；' + a);
              tmp.data6.push(a)
            }catch(e){
              continue
            }
            }

        }
      })
    },
    methods: {
      receive: function(orderId,index) {
        console.log('确认收货的orderId:' + orderId)
        var tmp = this

        console.log('********* 确认收货: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "orderReceive"
        var para = "[\"" + orderId + "\"]"
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
      cancel: function (orderId, index) {
        console.log('取消订单id:' + orderId)
        var tmp = this

        console.log('********* 删除已经购买订单: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "buyerOrderCancel"
        var para = "[\"" + orderId + "\"]"
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

        // window.addEventListener('message', function(e) {
        //   console.log("recived by page:" + e + ", e.data:"+ JSON.stringify(e.data))
        //   if(!!e.data.data.receipt) {
        //     alert('成功取消未完成购买订单')
        //   }
        // })
      }
    }
  }
</script>
