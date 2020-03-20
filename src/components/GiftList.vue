<template>
  <div class="GiftList">
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
        <li  v-for="(item,index) in giftList" :key="index">
          <div class="tit">
            <span class="img" v-bind:style="{backgroundImage: 'url(' + item.images + ')'}"></span>
            <div class="order-number">
              <p class="name">{{item.productName}}</p>
              <p class="desc">{{item.description}}</p>
            </div>
            <div class="order-status">
              <p class="t">单价(元)</p>
              <p class="b">{{item.amount}}</p>
            </div>
          </div>
          <div class="order-detail">
            共有{{item.productUserList.length}}位好友给你赠送了此礼物
            <ol class="col-handdle clearfix">
              <li v-for="(items,indexs) in item.productUserList" v-bind:style="{backgroundImage: 'url(' + items.headImage + ')'}"></li>
            </ol>
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

    <div class="page-loaded" v-if="allLoaded && giftList.length!=0">没有更多数据咯~</div>


    <div class="gift-null-wraper" v-if="giftList.length==0">
      <span class="img"></span>
      <p class="tit">暂未收到礼物</p>
      <!--<p class="desc">制作喜报并分享给亲友就能收到礼物哟~</p>
      <span class="btn">马上制作</span>-->
    </div>


    <mt-tabbar>
      <div class="gif-footer clearfix">
        <span class="what-icon-bg"></span>可提现金额：<span class="num">{{totalAmoumt.num}}</span>元
        <span class="btn" @click="toWithdrawBtn">提现</span>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>

import API from '../api/api_user'
import Util from '../common/util'
import {Indicator,Loadmore,MessageBox,Toast} from 'mint-ui'

export default {
  name:'GiftList',
  data() {
    return {
      getUserData : Util.authService().getLoginUser(),
      giftList:[],
      pNo: 1,
      pSize: 5,

      bottomPullTextVal: '上划加载更多数据',
      bottomDropTextVal: '释放更新',
      bottomLoadingTextVal: '加载中...',

      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,

      totalAmoumt:{
        num:0
      }
    }
  },

  watch:{
    'totalAmoumt.num' : function(val,oldvalue) {
      console.log(val);
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

    queryUserGiftList() {
      let that = this;
      let orderParams = {
          pNo:that.pNo,
          pSize:that.pSize
      };
      API.queryUserGiftList(orderParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {

          if(result.data.length == that.pSize) {
            that.giftList = that.giftList.concat(result.data);
            console.log(that.giftList);
          } else {
            that.giftList = that.giftList.concat(result.data);
            that.allLoaded = true;
          }


          for(let i=0;i<that.giftList.length;i++){
            that.totalAmoumt.num = that.totalAmoumt.num + that.giftList[i].amount
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
      that.queryUserGiftList();

    },

    handleBottomChange(status){
      this.bottomStatus = status;
    },

    toWithdrawBtn(){

      Indicator.open({
        text : '请稍候，提现中...',
        spinnerType: 'fading-circle'
      });


      let that = this;
      let totalAmoumt = {
          totalAmount:that.totalAmoumt.num * 100
      };
      MessageBox.confirm('是否提现？','').then(action => {
        API.toWithdrawals(totalAmoumt).then(function (result) {
          that.loading = false;
          
          if (result && result.code==0) {
            Indicator.close();
            let URL = '/DrawSuc';
            that.defaultActiveIndex = URL;
            that.$router.push(URL); //用go刷新
            
          } else if(result.code==1000) {
            Toast('请先登录');
          }else{
            Toast('登录异常');
          }
        });
      });
    }

  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();

    this.queryUserGiftList();

    this.wrapperHeight = document.documentElement.clientHeight

  }
}
</script>
<style scoped>
.order-list{padding:.12rem .15rem 0}
.order-list>li{margin-bottom:.15rem;border:1px solid #F1E4D4;border-radius:4px}
.order-list>li .tit{position:relative;margin:0 .15rem;height:.7rem;padding-left:.6rem}
.order-list>li .tit .img{position:absolute;left:0;top:50%;margin-top:-.22rem;width:.44rem;height:.44rem;background-image:url(../assets/images/weixin_defalut_head.png);background-size:cover;border-radius:.22rem;}
.order-list>li .tit .order-number{float:left;margin-top:.15rem}
.order-list>li .tit .order-number .name{color:#5D482E;font-weight:600}
.order-list>li .tit .order-number .desc{padding-top:5px;color:#A49F99}
.order-list>li .tit .order-status{float:right;margin-top:.18rem;text-align:center}
.order-list>li .tit .order-status .t{font-size:12px;color:#A49F99}
.order-list>li .tit .order-status .b{font-size:18px;color:#D2A871}
.order-list>li .tit:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}

.order-detail{margin:0 .15rem;padding:.1rem 0;color:#A49F99}
.order-detail .col-handdle{padding-top:.15rem}
.order-detail .col-handdle li{float:left;margin-right:.08rem;margin-bottom:.08rem;background-image:url(../assets/images/weixin_defalut_head.png);background-size:cover;width:.36rem;height:.36rem;border-radius:.18rem}

.GiftList{padding-bottom:.4rem}
.GiftList .mint-tabbar{position:fixed;height:.5rem;line-height:.5rem;background-image:none;box-shadow:0 -1px 2px 0 rgba(93,72,46,.1);}
.GiftList .mint-tabbar .gif-footer .what-icon-bg{display:inline-block;width:.24rem;height:.24rem;background-image:url(../assets/images/what-icon-bg.png);background-size:cover;vertical-align:middle;margin-left:.1rem}
.GiftList .mint-tabbar .gif-footer{color:#A49F99;width:100%;text-align:left}
.GiftList .mint-tabbar .gif-footer .num{color:#D2A871;font-size:20px}
.GiftList .mint-tabbar .gif-footer .btn{float:right;width:120px;height:100%;line-height:49px;text-align:center;background-color:#D2A871;color:#FFF}

.gift-null-wraper{text-align:center}
.gift-null-wraper .img{margin-top:.8rem;display:inline-block;width:.8rem;height:.8rem;background-image:url(../assets/images/gift-null-bg.png);background-size:cover}
.gift-null-wraper .tit{margin-top:.15rem;color:#5D482E}
.gift-null-wraper .desc{margin-top:.05rem;color:#A49F99}
.gift-null-wraper .btn{background-color:#D2A871;width:80%;display:inline-block;height:.5rem;line-height:.5rem;text-align:center;color:#FFF;border-radius:4px;margin-top:.6rem}


</style>