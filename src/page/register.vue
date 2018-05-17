<template>
  <div>
  <!--<div style="display: inline-block; width: 100%; height: 100%;margin-left: 40%;margin-top: 3%;">-->
    <!--<div style="background-color: #2d8cf0;width: 20%;height: 100%;">-->
    <div style="margin-top: 0px;font-size:0">
      <!--<img src="../assets/background.jpg" width="333.4%" height="810px" >-->
      <!--width: 100%;-->
      <img src="../assets/background.jpg"  width="100%" height="798px">
      <img/>
    </div>
    <div style="width: 50%;margin-left: 25%;margin-top: -600px;">
      <p style="font-size: 400%; font-family:'Microsoft JhengHei UI';color:deepskyblue;text-align: center">欢迎注册</p>
    </div>
    <!--<div style="width: 20%;height: 100%;">-->
      <!--<p style="font-size: 335%; font-family:'Microsoft JhengHei UI';color:deepskyblue;text-align: center">欢迎注册</p >-->
    <!--</div>-->
    <div style="width: 20%;margin-top: 20px;margin-left: 40%;">
      <Form ref="formInline" :rules="ruleInline" :model="formLogin">
        <FormItem prop="user">
          <Input type="text" v-model="formLogin.user" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="formLogin.phone" placeholder="手机">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="country">
          <Input type="text" v-model="formLogin.country" placeholder="国家">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="province">
          <Input type="text" v-model="formLogin.province" placeholder="省份">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="city">
          <Input type="text" v-model="formLogin.city" placeholder="城市">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="address">
          <Input type="text" v-model="formLogin.address" placeholder="详细地址">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="register" style="margin-left: 25%;width: 50%">注册</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import daohang from '../components/daohang.vue'
  export default {
    data () {
      return {
        formLogin: {
          user: '',
          phone: '',
          country: '',
          province:'',
          city:'',
          address:''
        },
        ruleInline: {
          phone: {
            required: true,
            trigger: 'change',
            message: '请输入手机号',
          },
          user: {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          },
          password: {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        }
      }
    },
    methods: {
      register: function () {
        var phone = this.formLogin.phone
        var user = this.formLogin.user
        var country = this.formLogin.country
        var province = this.formLogin.province
        var city = this.formLogin.city
        var address = this.formLogin.address

        var tmp = this
        if(user === '' || phone === '' || country === '' || province === '' || city === '' || address === ''){
          alert('请输入完整信息')
          return
        }
        console.log('********* 注册: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "register"
        var para = "[\"" + user + "\",\"" + phone + "\",\"" + country + "\",\"" + province + "\",\"" + city + "\",\"" + address + "\"]"
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
