<template>
  <div class="UnlockHighScore">
    <a class="mint-cell" @click="addCard(10,12)"><span class="mint-cell-mask"></span>
     <div class="mint-cell-left"></div>
     <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
       <span class="mint-cell-text">高分卡 x10张</span>
      </div>
      <div class="mint-cell-value is-link">
       <span data-v-5393df1e="" style="color: rgb(93, 72, 46); font-size: 13px;">&yen; 12.00 点击购买</span>
      </div>
      <i class="mint-cell-allow-right"></i>
     </div>
     <div class="mint-cell-right"></div>
    </a>

    <a class="mint-cell" @click="addCard(25,18)"><span class="mint-cell-mask"></span>
     <div class="mint-cell-left"></div>
     <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
       <span class="mint-cell-text">高分卡 x25张</span>
      </div>
      <div class="mint-cell-value is-link">
       <span data-v-5393df1e="" style="color: rgb(93, 72, 46); font-size: 13px;">&yen; 18.00 点击购买</span>
      </div>
      <i class="mint-cell-allow-right"></i>
     </div>
     <div class="mint-cell-right"></div>
    </a>

    <a class="mint-cell" @click="addCard(45,25)"><span class="mint-cell-mask"></span>
     <div class="mint-cell-left"></div>
     <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
       <span class="mint-cell-text">高分卡 x45张</span>
      </div>
      <div class="mint-cell-value is-link">
       <span data-v-5393df1e="" style="color: rgb(93, 72, 46); font-size: 13px;">&yen; 25.00 点击购买</span>
      </div>
      <i class="mint-cell-allow-right"></i>
     </div>
     <div class="mint-cell-right"></div>
    </a>

    <a class="mint-cell" @click="unlock" style="margin:.15rem 0"><span class="mint-cell-mask"></span>
     <div class="mint-cell-left"></div>
     <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
       <span class="mint-cell-text">解锁高分模式</span>
      </div>
      <div class="mint-cell-value is-link">
       <span data-v-5393df1e="" style="color: rgb(93, 72, 46); font-size: 13px;">&yen; 68.00 点击购买</span>
      </div>
      <i class="mint-cell-allow-right"></i>
     </div>
     <div class="mint-cell-right"></div>
    </a>

    <div style="padding:.15rem;background-color:#FFF"> 


      <p style="font-weight: bold;margin-bottom:5px;">什么是高分模式？高分卡有何用途？</p>

      <p style="line-height:22px;">高分模式是指系统所生成的名字综合评分均在80分以上，相比普通模式80分以下的名字更适合用于宝宝起名；解锁以后系统所生成的名字都是高分吉名。高分卡是指可在未解锁高分模式的情况下获取高分名字。每次使用消耗一张高分卡，可生成20个高分名字。</p>

    </div>

    <div style="margin-top:.15rem;padding:.15rem;background-color:#FFF"> 

      <p style="font-weight: bold;margin-bottom:5px;">综合评分是如何计算的？</p>
      <p style="line-height:22px;">综合评分主要从四个方面来评判：1、文化印象；2、周易数理；3、生肖宜忌；4、五格数理；其中传统周易命理的八字五行所占比分权重最大。相比其他软件仅以五格数理作为唯一评断标准,综合评分更加全面、准确。</p>

    </div>

    <div style="margin-top:.15rem;padding:.15rem;background-color:#FFF"> 

      <p style="font-weight: bold;margin-bottom:5px;">软件最多能提供多少个名字？</p>
      <p style="line-height:22px;">常用汉字大概3～4千个，其中适用于起名的汉字在2千个以内。我们挑选了其中约1400多个音、形、意俱佳的汉字用作起名用字。因此理论上最多能提供近20万个名字以供选择。排除谐音、同音等条件，大概有16～18万。高分名字数量根据命局不同数量也会有所不同。</p>

    </div>

  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import { Toast,MessageBox,Indicator } from 'mint-ui'



export default {
  data() {
    return {
      cardList:[],
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

    addCard(type,yen){
      let that = this;
      MessageBox.confirm('是否确定购买价值'+yen+'元的高分卡？','').then(action => {

        //若需要请求接口时，显示加载动画
        Indicator.open({
          text : '正在加载,请稍候...',
          spinnerType: 'fading-circle'
        });
        
        /*******微信充值 start********/

        if(Util.browser().canWechatWithDraw()) {
          that.prepay(type);
          // if(that.packageValue) {
          //   that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
          // } else {
          //   that.prepay(type);
          // }
          return;
        }
      });
    },
    unlock(){
      let that = this;
      MessageBox.confirm('是否解锁高分模式？','').then(action => {
        //若需要请求接口时，显示加载动画
        Indicator.open({
          text : '正在加载,请稍候...',
          spinnerType: 'fading-circle'
        });

        /*******微信充值 start********/

        if(Util.browser().canWechatWithDraw()) {
          that.unlockPrepay();
          // if(that.packageValue) {
          //   that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
          // } else {
          //   that.unlockPrepay();
          // }
          return;
        }

      });
    },

    //购买高分卡
    prepay (type) {
      let that = this;

      let orderIdParams = {
        
      }
      Indicator.open({
        text : '请稍候，正在支付中...',
        spinnerType: 'fading-circle'
      });
      API.addCard({cardNum:type}).then(function (res) {
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

    //解锁高分模式
    unlockPrepay () {
      let that = this;

      let orderIdParams = {
        
      }
      Indicator.open({
        text : '请稍候，正在支付中...',
        spinnerType: 'fading-circle'
      });
      API.unlock({}).then(function (res) {
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
          Indicator.close();
          if(res.err_msg == "get_brand_wcpay_request:ok") {
            let getUserData = Util.authService().getLoginUser();
            let setLoginUser = {
              giftNum    : getUserData.giftNum,
              headImage  : getUserData.headImage,
              id         : getUserData.id,
              nickName   : getUserData.nickName,
              openMemberFee: getUserData.openMemberFee,
              orderNum   : getUserData.orderNum,
              sex        : getUserData.sex,
              userType   : 1,
              cardNum  : getUserData.cardNum,
              collectNum : getUserData.collectNum,
              unLock : 1,
              usedNum : getUserData.usedNum
            }
            Util.authService().cacheLoginUser(setLoginUser);
            that.userData = Util.authService().getLoginUser();
            MessageBox.alert('购买成功','').then(action => {
                that.$router.push({path: '/IntelligentName'});
            });

          } else if(res.err_msg == "get_brand_wcpay_request:fail") {
            WeixinJSBridge.log(res.err_msg);
            alert(res.err_code + res.err_desc + res.err_msg);
          } else { //get_brand_wcpay_request:cancel

          }
        }
      );
    }
    /*******微信充值 end********/

  },

  mounted() {

  }
}
</script>
<style scoped>
.UnlockHighScore{
  background-color:#F7F5F3;
}
.mint-cell{
  background-image:none;
  border-bottom:1px solid #eee;
}
.mint-cell-wrapper{
  background:none;
}
</style>
