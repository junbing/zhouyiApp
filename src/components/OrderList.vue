<template>
  <div class="OrderList">
    <div class="orderList" :style="{height: wrapperHeight + 'px'}">
      <mt-loadmore

        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 

        :auto-fill="false"
        :bottomPullText='bottomPullTextVal'
        :bottomDropText='bottomDropTextVal'
        :bottomLoadingText='bottomLoadingTextVal'
      >

        <ul class="order-list">
          <li v-for="(item,index) in orderList" :key="index">
            <div class="tit">
              <span class="order-number">订单号：{{item.orderNo}}</span>
              <span class="order-status">{{item.orderStatus==0?'待付款':item.orderStatus==1? '已付款' : item.orderStatus==2? '取消' : '超时关闭'}}</span>
            </div>
            <div class="order-detail">
              <span class="img" v-bind:style="{backgroundImage: 'url(' + item.headImage + ')'}"></span>
              <div class="txt">
                <p class="o-t">{{item.productName}}</p>
                <p class="o-d">{{item.createTime}}</p>
                <div class="o-m">订单金额：<span>{{item.actualAmount}}</span>元</div>
              </div>
              <span v-if="item.orderStatus==0" class="btn" @click="payBtn(item.id)">继续支付</span>
              <span v-if="item.orderStatus==1" class="btn" @click="jumpTo('/OrderProgress')">在线咨询</span>
            </div>
          </li>
        </ul>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'"
            :class="{'is-rotate': bottomStatus === 'drop'}"><mt-spinner type="snake"></mt-spinner></span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>

      </mt-loadmore>
      <div class="page-loaded" v-if="allLoaded && orderList.length!=0">没有更多数据咯~</div>
      <div class="common-null" v-if="orderList.length==0"><span class="n-icon"></span>暂无订单</div>
    </div>
  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import {Indicator,Loadmore,MessageBox,Toast} from 'mint-ui'

export default {
  name:'OrderList',
  data() {
    return {
      getUserData : Util.authService().getLoginUser(),
      orderList:[],
      pNo: 1,
      pSize: 5,

      bottomPullTextVal: '上划加载更多数据',
      bottomDropTextVal: '释放更新',
      bottomLoadingTextVal: '加载中...',

      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,

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
    jumpTo(url,el) {
      let that = this;
      //that.$router.push({path: '/Article',params: { userId: 2332 } });

      let URL = (el||el==0)? url+el : url;
      that.defaultActiveIndex = URL;
      that.$router.push(URL); //用go刷新
    },

    queryOrderPageListByUser() {
      let that = this;
      let orderParams = {
          pNo:that.pNo,
          pSize:that.pSize
      };
      API.queryOrderPageListByUser(orderParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {

          if(result.data.length == that.pSize) {
            console.log(222);
            that.orderList = that.orderList.concat(result.data);
            //[].push.apply(that.orderList, result.data);
            console.log(that.orderList);
          } else {
            that.orderList = that.orderList.concat(result.data);
            that.allLoaded = true;
          }
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    },

    loadBottom () {
      let that = this;
      that.pNo++;
      
      that.allLoaded = true;
      that.$refs.loadmore.onBottomLoaded();
      that.queryOrderPageListByUser();



    },

    handleBottomChange(status){
      this.bottomStatus = status;
    },


    payBtn(orderId){
      let that = this;
      /*******微信充值 start********/
      

      if(Util.browser().canWechatWithDraw()) {
        if(that.packageValue) {
          that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
        } else {
          that.prepay(orderId);
        }
        return;
      }
      /*******微信充值 end********/
    },

    //记录在后台
    prepay (orderId) {
      let that = this;

      let orderIdParams = {
        orderId : orderId
      }

      Indicator.open({
        text : '请稍候，正在支付中...',
        spinnerType: 'fading-circle'
      });



      API.payOrder(orderIdParams).then(function (res) {
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


  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();

    this.queryOrderPageListByUser();

    this.wrapperHeight = document.documentElement.clientHeight

  }
}
</script>
<style scoped>
.order-list{padding:.12rem .15rem 0}
.order-list li{margin-bottom:.15rem;padding:0 .15rem;border:1px solid #F1E4D4;border-radius:4px;}
.order-list li .tit{position:relative;height:.48rem;line-height:.48rem}
.order-list li .tit .order-number{float:left}
.order-list li .tit .order-status{float:right;color:#D2A871}
.order-list li .tit:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}

.order-detail{padding:.15rem 0 .15rem .6rem;position:relative}

.order-detail .img{position:absolute;left:0;top:.15rem;width:.5rem;height:.5rem;background-image:url(../assets/images/weixin_defalut_head.png);background-size:cover;border-radius:4px;}
.order-detail .txt .o-t{
  
  font-size: .14rem;
  color: #5D482E;
} 
.order-detail .txt .o-d{
  margin-top:.05rem;
}
.order-detail .txt .o-d,.order-detail .txt .o-m{
  font-size: .12rem;
  color: #A49F99;
}
.order-detail .txt .o-m {
  margin-top:.10rem;
}
.order-detail .txt .o-m span{
  font-size: .16rem;
  color: #D2A871;
}

.order-detail .btn{position:absolute;right:0;top:.25rem;background: #D2A871;border-radius: 4px;width:.64rem;height:.32rem;line-height:.32rem;color:#FFF;font-size:12px;text-align:center;}
</style>

<style>

/*空状态*/
.common-null{
  font-size: 16px;
  color: #5D482E;
  letter-spacing: 0;
  text-align: center;
}

.common-null .n-icon{
  margin:.8rem auto 10px;
  display:block;
  width:.68rem;
  height:.73rem;
  background-image: url(../assets/images/common-null.png);
  background-size: cover;
  background-repeat:no-repeat;

}
</style>