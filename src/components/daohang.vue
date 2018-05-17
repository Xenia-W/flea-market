<template>
  <div>
    <Menu mode="horizontal" :theme="light" active-name="1" @on-select="idea">
      <MenuItem name="1">
        <Icon type="ios-paper"></Icon>
        跳蚤市场
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"></Icon>
        购物车
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-people"></Icon>
        货架
      </MenuItem>
      <Submenu name="4">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          订单
        </template>
        <MenuGroup >
          <MenuItem name="4-1">正在购买</MenuItem>
          <MenuItem name="4-2">购买历史</MenuItem>
          <MenuItem name="4-3">正在出售</MenuItem>
          <MenuItem name="4-4">出售历史</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="5">
        <Icon type="ios-people"></Icon>
        个人中心
      </MenuItem>
      <!--<Button style="float: right;margin-right: 1%;margin-top: 1%" @click="exit">注册</Button>-->
    </Menu>
    <br>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        theme: 'primary'
      }
    },
    methods: {
      idea: function (name) {
        if (name === '5') {
          console.log('2')
          this.$router.push({path: '/usermanage'})
        }
        if (name === '4-1') {
          console.log('2')
          this.$router.push({path: '/buynow'})
        }
        if (name === '4-3') {
          console.log('2')
          this.$router.push({path: '/salenow'})
        }
        if (name === '4-2') {
          console.log('2')
          this.$router.push({path: '/buyhistory'})
        }
        if (name === '4-4') {
          console.log('4-4')
          this.$router.push({path: '/salehistory'})
        }
        if (name === '3') {
          console.log('3')
          this.$router.push({path: '/mygoods'})
        }
        if (name === '2') {
          console.log('2')
          this.$router.push({path: '/shopcart'})
        }
        if (name === '1') {
          console.log('1')
          this.$router.push({path: '/homepage'})
        }
      },
      register: function (name, phone, country, province, city, address) {
        console.log('********* 注册: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "register"
        // : function(name,phone,country,province,city,address)
        var para = "[\"" + name + "\",\"" + phone + "\",\"" + country + "\",\"" + province + "\",\"" + city + "\",\"" + address + "\"]"
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

        window.addEventListener('message', function(e) {
          console.log("recived by page:" + e + ", e.data:"+ JSON.stringify(e.data))
          if(!!e.data.data.receipt) {
            alert('注册成功！');
          }
        })
      }
    }
  }
</script>
