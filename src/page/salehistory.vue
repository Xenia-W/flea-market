<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width:100%; float: right">
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

      console.log('********* 查询历史出售: call *****************')
      var to = global.contractAddress
      var funcName = "getSaleHistory"
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
        if(curPath !== '/salehistory')
          return
        // console.log("recived by 查询出售历史:" + e + ", e.data:"+ JSON.stringify(e.data))
        if(!!e.data.data.neb_call){
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)

          var saleHistory = result.split('#')
          // console.log(saleHistory.length)
          for (var i = 0; i < saleHistory.length; i++) {
            // console.log('本次循环i=' + i + '历史订单信息：'+ saleHistory[i])
            try{
              var tmpOrder = JSON.parse(saleHistory[i])
              var tmpGood = JSON.parse(tmpOrder.good)
              if(!tmpGood)
                continue
              var a = {
                'orderId': tmpOrder.id,
                // 'photo': tmpOrder.id,
                'goodName': tmpGood.name,
                'price': tmpOrder.price,
                'state': tmpOrder.status,
                'time': tmpOrder.time
              }
              tmp.data6.push(a)
            }catch(e){
              continue
            }

          }
        }
      })
    },
    methods: {
    }
  }
</script>
