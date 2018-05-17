<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width: 100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height: 150px; width: 90%; margin-left: 5%; margin-top: 6%">
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
        data6: [],
        theme3: 'light'
      }
    },
    created: function () {
      this.data6.splice(0, this.data6.length)
      var tmp = this

      console.log('********* 查询所有商品: nebCall *****************')
      var to = global.contractAddress
      console.log(to)
      var funcName = "displayAllGoods"
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
        if(!!e.data.data.neb_call){
          console.log("recived by 查询所有商品:" + e + ", e.data:"+ JSON.stringify(e.data))
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)
          result = result.split('#')

          for (var i = 0; i < result.length; i++) {
            var  tmpGood = JSON.parse(result[i])
            var a = {
              'id': tmpGood.id,
              'name': tmpGood.name,
              'info': tmpGood.description,
              'state': tmpGood.useCondition,
              'price': tmpGood.price
            }
            tmp.data6.push(a)
          }
        }
      })
    },
    methods: {
      addshopcart (index) {
        var tmp = this

        var goodId = parseInt(tmp.data6[parseInt(index)].id)
        console.log('********* 添加到购物车: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "addToCart"
        var para = "[\"" + goodId + "\"]"
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
      photo (index) {
        var tmp = this
        console.log(this.data6[index])
        this.$router.push({path: '/shopinfo', query: this.data6[index]})
      }
    }
  }
</script>
