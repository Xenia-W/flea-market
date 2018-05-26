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
      <Form :label-width="90">
        <Form-item label="用户名">
          <Input v-model="name" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="手机号">
          <Input v-model="phone" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="国家">
          <Input v-model="country" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="省份">
          <Input v-model="province" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="城市">
          <Input v-model="city" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="详细地址">
          <Input v-model="address" disabled placeholder=""></Input>
        </Form-item>
        <Form-item label="账户余额">
          <Input v-model="money" disabled placeholder=""></Input>
        </Form-item>
      </Form>
    </div>
    <div style="height:auto; width: 32%; margin-left: 37%; margin-top: 3%">
      <Form ref="formInline" :rules="ruleInline" :model="formLogin">
        <FormItem prop="topUpValue">
          <Input type="text" v-model="formLogin.topUpValue" placeholder="充值金额">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <Form-item>
          <Button type="primary" @click="topUpBalance">充值</Button>
        </Form-item>
        <FormItem prop="withdrawValue">
          <Input type="text" v-model="formLogin.withdrawValue" placeholder="提现余额">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <Form-item>
          <Button type="ghost" style="margin-left: 8px" @click="withdrawBalance">提现</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import daohang from '../components/daohang.vue'
  import { getUrlEnd } from '../utils/getidtoken.js'
  export default {
    components: {
      daohang
    },
    data () {
      return {
        name: '',
        phone: '',
        contry:'',
        province:'',
        city:'',
        address:'',
        location: '',
        money: '',
        theme3: 'light',
        formLogin: {
          topUpValue: '',
          withdrawValue: ''
        },
        ruleInline: {
          topUpValue: {
            required: true,
            trigger: 'change',
            message: '请输入充值的NAS金额',
          },
          withdrawValue: {
            required: true,
            message: '请输入提现的账户余额',
            trigger: 'change'
          }
        }
      }
    },
    created: function () {
      var tmp = this

      console.log('********* 查询用户信息: sendTransaction *****************')
      var to = global.contractAddress
      var funcName = "login"
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
        if(curPath !== '/usermanage')
          return
        // console.log("recived by 用户信息界面:" + e + ", e.data:"+ JSON.stringify(e.data))
        if(!!e.data.data.neb_call) {
          // console.log('已经开始处理')
          var s = JSON.stringify(e.data.data.neb_call)
          var m = JSON.parse(s)
          var result  = m.result
          result = JSON.parse(result)
          tmp.name = result.name
          tmp.phone = result.phone
          tmp.country = result.country
          tmp.province = result.province
          tmp.city = result.city
          tmp.address = result.address
          tmp.money = result.balance
          return
        }
        if(!!e.data.data.txhash){
          if(!!e.data.data.txhash.txhash){
            tmp.$router.push({path: '/usermanage'})
          }
        }
      })
    },
    methods: {
      topUpBalance: function () {
        var topUpValue = this.formLogin.topUpValue
        console.log('********* 充值: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "topUpBalance"
        var para = ""
        console.log(topUpValue)
        window.postMessage({
          "target": "contentscript",
          "data":{
            "to": to,
            "value": topUpValue,
            "contract":{
              "function":funcName,
              "args":para
            }
          },
          "method": "neb_sendTransaction"
        }, "*")
      },
      withdrawBalance: function () {
        var amount = this.formLogin.withdrawValue
        console.log('********* 提现: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "withdrawBalance"
        var para = "[\"" + amount + "\"]"
        console.log("提现余额："+para)
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
