<template>
  <div class="MemberRole">
    <ul>
      <li>姓名库</li>
      <li>基础库</li>
      <li>高级库</li>
      <li>专属库</li>
    </ul>


    <ul>
      <li>精选汉字</li>
      <li>111</li>
      <li>222</li>
      <li>333</li>
    </ul>

    <ul>
      <li>名字组合</li>
      <li>111</li>
      <li>222</li>
      <li>333</li>
    </ul>

    <ul>
      <li>名字数量</li>
      <li>111</li>
      <li>222</li>
      <li>333</li>
    </ul>

    <ul>
      <li>价格</li>
      <li>免费</li>
      <li>&yen;18.00</li>
      <li>&yen;28.00</li>
    </ul>

    <ul style="background:#FFF;padding-bottom:.1rem;height:auto;" class="clearfix">
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li><a class="btn"  @click="promoteBtn(1)">立即升级</a></li>
      <li><a class="btn"  @click="promoteBtn(2)">立即升级</a></li>
    </ul>

    <!--div class="set-meal-wraper">
      <div class="btn" @click="promoteBtn">立即升级</div>
    </div-->

    <div class="draw-tit">常见问题</div>

    <div class="draw-desc">
      <div class="conbox">
        <p class="que">姓名库高级版如何升级到专业版？</p>
        <p class="ans">补交差价即可，系统会自动折算差价。</p>
      </div>
      <div class="conbox">
        <p class="que">什么是精选汉字？</p>
        <p class="ans">精选汉字是指通用汉字规范基础之上，从字意、书写便利、流行度等维度进行筛选的适合起名的汉字。</p>
      </div>
    </div>



  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import {Indicator,MessageBox} from 'mint-ui'

export default {
  name:'MemberRole',
  data() {
    return {
      
    }
  },
  methods: {
    promoteBtn:function(type){
      let that = this;
      let txt="";
      txt = type==1?'高级库':'专属库';
      MessageBox.confirm('确定升级为'+txt,'').then(action => {
        let that = this;


        
        /*******微信充值 start********/
        var appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo;

        if(Util.browser().canWechatWithDraw()) {
          if(packageValue) {
            that.callpay(appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo);
          } else {
            that.prepay(type);
          }
          return;
        }

      });
    },

    //记录在后台
    prepay (type) {
      let that = this;

      let nameLibParams = {
        nameLib:type
      }

      Indicator.open({
        text : '请稍候，正在支付中...',
        spinnerType: 'fading-circle'
      });



      API.upgradeNameLib(nameLibParams).then(function (res) {
        that.loading = false;
        if (res && res.code==0) {
          Indicator.close();
          if(res.code == '0') {
            appid = res.data.appId;
            timeStamp = res.data.timeStamp;
            nonceStr = res.data.nonceStr;
            packageValue = res.data.packageValue;
            signType = res.data.signType;
            sign = res.data.paySign;
            orderNo = res.data.orderNo;

            that.callpay(appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo);
            // $scope.queryOrder(orderNo);
          } else {
            MessageBox.alert(res.msg);
          }
        }
      })
    },

    //真正的充值
    callpay (appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo) {
      let that = this;
      if(typeof WeixinJSBridge == "undefined") {
        if(document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        } else if(document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', jsApiCall);
          document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
      } else {
        that.jsApiCall(appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo);
      }
    },
    //微信充值回调
    jsApiCall (appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": appid,
          "timeStamp": timeStamp,
          "nonceStr": nonceStr,
          "package": packageValue,
          "signType": signType,
          "paySign": sign
        },
        function(res) {
          Indicator.close();
          if(res.err_msg == "get_brand_wcpay_request:ok") {

          } else if(res.err_msg == "get_brand_wcpay_request:fail") {
            WeixinJSBridge.log(res.err_msg);
            alert(res.err_code + res.err_desc + res.err_msg);
          } else { //get_brand_wcpay_request:cancel

          }
        }
      );
    }
    /*******微信充值 end********/
  }
}
</script>
<style scoped>
.MemberRole ul{
  height:.5rem;
  line-height:.5rem;
  padding-left:.15rem;
}
.MemberRole ul li{
  float:left;
  text-align:center;
}

.MemberRole ul li:nth-child(1){
  width:28%;
  text-align:left;
}
.MemberRole ul li:nth-child(2){
  width:24%;
}
.MemberRole ul li:nth-child(3){
  width:24%;
}
.MemberRole ul li:nth-child(4){
  width:24%;
}
.MemberRole ul:nth-child(2n){
  background-color:#F7F5F3
}
.MemberRole ul li a{
  display:inline-block;
  vertical-align:middle;
  border:1px solid #D2A871;
  height:.35rem;
  line-height:.35rem;
  padding:0 .08rem;
  border-radius:4px;
}

.set-meal-wraper{
  margin:.3rem 0;
  text-align:center;
  font-size:0px;
}
.set-meal-wraper .meal{
  display:inline-block;
  border: 1px solid #F1E4D4;
  border-radius: 4px;
  width:1.35rem;
  height:.9rem;
  color:#A49F99 ;

}

.set-meal-wraper .meal .txt{
  margin-top:.15rem;
  font-size:.14rem;
}
.set-meal-wraper .meal .num{
  margin-top:.08rem;
  font-size:.28rem;
}
.set-meal-wraper .meal.ml{
  margin-left:.15rem;
}
.set-meal-wraper .meal.cur{
  border: 1px solid #D2A871;
}
.set-meal-wraper .meal.cur .txt{
  color:#5D482E
}
.set-meal-wraper .meal.cur .num{
  color:#D2A871
}

.set-meal-wraper .btn{
  margin-top:.3rem;
  display:inline-block;
  width:2.89rem;
  height:.5rem;
  line-height:.5rem;
  text-align:center;
  color:#FFF;
  background: #D2A871;
  border-radius: 4px;
  font-size:.16rem;
}


.draw-tit{
  padding-left:.15rem;
  height:.3rem;
  line-height:.3rem;
  background: #F7F5F3;
  font-size: 12px;
  color: #A49F99;
}
.draw-desc{
  padding-left:.15rem;
}
.draw-desc .conbox{
  padding:.2rem 0;
  position:relative;
}
.draw-desc .conbox:after{
  position:absolute;
  content:" ";
  bottom:0;
  left:0;
  height:1px;
  width:100%;
  background-color:#F1E4D4;
  -webkit-transform: scale(1,.5);
  transform: scale(1,.5);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom
}
.draw-desc .conbox:last-child:after{
  display:none;
}
.draw-desc .conbox .que{
  font-size: 16px;
  color: #5D482E;
}
.draw-desc .conbox .ans{
  margin-top:.05rem;
  padding-right:.15rem;
  font-size: 14px;
  color: #A49F99;
}


</style>
