<template>
  <div class="MemberRole">
    <div class="member-desc">
      <div class="tit">会员介绍</div>
      <ul class="member-ls">
        <li>1、名字库更丰富，更有会员专属名字;</li>
        <li>2、汉字五行人工校对;</li>
        <li>3、强大的定制功能，满足各种起名需求;</li>
        <li>4、起名顾问在线答疑;</li>
        <li>5、永久使用，不限时间、姓氏;</li>
      </ul>
    </div>
    <div class="set-meal-wraper">
      <div class="num"><span>&yen;</span>{{(userData.openMemberFee/100).toFixed(2)}}</div>
      <div class="btn" @click="openMemberBtn">立即开通</div>
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

      userData : Util.authService().getLoginUser(),  
      appid :'', 
      timeStamp:'', 
      nonceStr:'',
      packageValue:'', 
      signType:'', 
      sign:'',
      orderNo:''
    }
  },
  methods: {
    openMemberBtn:function(){
      let that = this;
      MessageBox.confirm('是否确定开通价值'+(that.userData.openMemberFee/100).toFixed(2)+'元的普通会员？','').then(action => {
        Indicator.open({
          text : '请稍候，正在处理中...',
          spinnerType: 'fading-circle'
        });


        
        /*******微信充值 start********/

        if(Util.browser().canWechatWithDraw()) {
          if(that.packageValue) {
            that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
          } else {
            that.prepay();
          }
          return;
        }
        
      });
    },

    //记录在后台
    prepay () {
      let that = this;

      let orderIdParams = {
        
      }
      Indicator.open({
        text : '请稍候，正在支付中...',
        spinnerType: 'fading-circle'
      });



      API.openMember(orderIdParams).then(function (res) {
        that.loading = false;
        if (res && res.code==0) {
          Indicator.close();
          if(res.code == '0') {
            that.appid = res.data.appId;
            that.timeStamp = res.data.timeStamp;
            that.nonceStr = res.data.nonceStr;
            that.packageValue = res.data.packageValue;
            that.signType = res.data.signType;
            that.sign = res.data.paySign;
            that.orderNo = res.data.orderNo;

            that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
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
        that.jsApiCall(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
      }
    },
    //微信充值回调
    jsApiCall (appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo) {
      let that = this;
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

          if(res.err_msg == "get_brand_wcpay_request:ok") {

            //若开通会员成功，则在前端把用户类型先改为会员，并且更新缓存状态
            
            let userData = Util.authService().getLoginUser();
            let setLoginUser = {
              collectNum : userData.collectNum,
              giftNum    : userData.giftNum,
              headImage  : userData.headImage,
              id         : userData.id,
              nickName   : userData.nickName,
              openMemberFee:userData.openMemberFee,
              orderNum   : userData.orderNum,
              sex        : userData.sex,
              userType   : 1
            }

            Util.authService().cacheLoginUser(setLoginUser);

            //开通成功后，返回上一访问页面;
            
            that.$router.push({path: Util.sessionStorageService().get('b_URL')});


            //that.$router.push({path: '/MemberRole'});

          } else if(res.err_msg == "get_brand_wcpay_request:fail") {
            Indicator.close();
            WeixinJSBridge.log(res.err_msg);
            alert(res.err_code + res.err_desc + res.err_msg);
          } else { //get_brand_wcpay_request:cancel
            Indicator.close();
          }
        }
      );
    }
    /*******微信充值 end********/

  }
}
</script>
<style scoped>
.member-desc{
  margin:.15rem;
  padding:0 .12rem .2rem;
  border: 1px solid #F1E4D4;
  border-radius: 4px;
}
.member-desc .tit{
  height:.48rem;
  line-height:.48rem;
  font-size: 16px;
  color: #5D482E;
  border-bottom: 1px solid #F1E4D4;
}
.member-desc .member-ls{
  font-size: 14px;
  color: #A49F99;
  margin-top:.1rem;
}

.member-desc .member-ls li{
  height:.3rem;
  line-height:.3rem;
}

.set-meal-wraper{margin-top:.3rem;text-align:center;font-size:0}
.set-meal-wraper .num{
  font-size: 28px;
  color: #D2A871;
}
.set-meal-wraper .num span{
  font-size:16px;
}
.set-meal-wraper .btn{margin-top:.3rem;display:inline-block;width:2.89rem;height:.5rem;line-height:.5rem;text-align:center;color:#FFF;background:#D2A871;border-radius:4px;font-size:.16rem}



</style>
