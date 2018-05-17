<template>
  <!--<div style="display: inline-block; width: 100%; height: 100%;">-->
    <!--<div style="margin-left: 0%; margin-top: 0%; height: 100%; width: 100%">-->

  <div>
    <div style="width:100%; float: right; font-size:0" >
      <daohang></daohang>
    </div>
      <div style="margin-top: 0px;font-size:0">
        <!--<img src="../assets/background.jpg" width="333.4%" height="810px" >-->
        <!--width: 100%;-->
        <img src="../assets/background.jpg"  width="100%" height="739px">
        <img/>
      </div>
      <div style="width: 50%;margin-left: 25%;margin-top: -600px;">
        <p style="font-size: 400%; font-family:'Microsoft JhengHei UI';color:deepskyblue;text-align: center">欢迎来到，跳蚤市场</p>
      </div>
  </div>
    <!--</div>-->
  <!--</div>-->
</template>
<script>
  import axios from 'axios'
  import daohang from '../components/daohang.vue'
  import {setCookie } from '../utils/getidtoken.js'
  export default {
    components: {
      daohang
    },
    data () {
      return {
        formLogin:{
          user: '',
          password: ''
        },
        ruleInline: {
          user: {
            required: true,
            trigger: 'change',
            message: '用户名不为空'
          },
          password: {
            required: true,
            trigger: 'change',
            message: '密码不为空'
          }
        }
      }
    },
    created: function (){
      var tmp = this
      var loginResult = 0
      console.log('********* 登录: call *****************')
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
        if(!!e.data.data.neb_call){
          // console.log("登录页面接收到")
          var s = JSON.stringify(e.data.data.neb_call);
          var m = JSON.parse(s);
          var result  = m.result;
          console.log("接收到消息："+ result)
          var curPath = tmp.$route.path
          console.log("当前页面："+ curPath)
          if(result == '\"抱歉，您尚未注册账户。\"'&&curPath === '/') {
            alert('您尚未注册账户，即将跳转到注册页面。')
            tmp.$router.push({path: '/register'})
          }else{
            result = JSON.parse(result)
            if(curPath === '/'){
              tmp.$router.push({path: '/homepage'})
            }
          }
        }
      })
    },
    methods: {
    }
  }
</script>
