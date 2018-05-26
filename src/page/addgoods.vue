<template>
  <div style="display: inline-block; width: 100%; height: 100%">
    <div style="background-color: #2d8cf0;width: 12%;height: 100%;float: left">
      <p style="font-size: 335%; font-family: 华文行楷"></p>
    </div>
    <div style="width: 100%; float: right">
      <daohang></daohang>
    </div>
    <div style="height:auto; width: 30%; margin-left: 32%; margin-top: 8%">
      <Form :label-width="80">
        <Form-item label="商品名称">
          <Input v-model="name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="价格">
          <Slider v-model="price" show-input max="2000"></Slider>
        </Form-item>
        <Form-item label="新旧程度">
          <Input v-model="state" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="描述">
          <Input v-model="info" type="info" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
        </Form-item>
      </Form>
    </div>
    <!--<div style="margin-left: 32%; margin-top: -1%; width: 30%">-->
      <!--<Form :label-width="80">-->
        <!--<Form-item label="商品图片">-->
          <!--<Input type="file" class="form-control" @change="onFileChange"></Input>-->
        <!--</Form-item>-->
      <!--</Form>-->
    <!--</div>-->
    <div style="margin-left: 40%;margin-top: 30px">
      <Button type="primary" @click="put">提交</Button>
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
        info: '',
        state: '',
        price: 0,
        // photo: '',
        theme3: 'light'
      }
    },
    methods: {
      put: function () {
        var tmp = this
        var name = this.name
        console.log(name)
        var state = this.state
        var info = this.info
        var price = this.price

        console.log('********* addToShelf: sendTransaction *****************')
        var to = global.contractAddress
        var funcName = "addToShelf"
        var para = "[\"" + name + "\",\"" + price + "\",\"" + state + "\",\"" + info + "\"]"
        // console.log(para)
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
        // tmp.$router.push({path: '/mygoods'})
        window.addEventListener('message', function(e) {
          var curPath = tmp.$route.path
          if(curPath !== '/addgoods')
            return
          if(!!e.data.data.txhash){
            if(!!e.data.data.txhash.txhash){
              // alert('注册成功！')
              tmp.$router.push({path: '/mygoods'})
            }
          }
        })
          // console.log("recived by 添加商品:" + e + ", e.data:"+ JSON.stringify(e.data))
        //   if(!!e.data.data.receipt){
        //
        //     console.log("添加成功")
        //     tmp.$router.push({path: '/mygoods'})
        //   }
        // })
        // var photo = this.photo
        // var url = global.url + 'photoUpload'
        // console.log(url)
        // axios.post(url, {
        //   'photo': photo
        // }).then(function (response) {
        //   if (response.data.data === null) {
        //     tmp.$router.push({path: '/mygoods'})
        //   }
        // }).catch(function (err) {
        //   console.log(err)
        // })
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
          this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
</script>
