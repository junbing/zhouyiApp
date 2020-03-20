<template>
  <div class="Home">
    <div class="home-banner">
      <div class="user-msg">
        <span class="img" v-if="getUserData" v-bind:style="{backgroundImage: 'url(' + getUserData.headImage + ')'}"></span>
        <p v-if="getUserData">{{getUserData.nickName || '取个好名儿'}}</p>

        <span class="img" v-if="!getUserData" @click="getWXCode"></span>
        <p v-if="!getUserData" @click="getWXCode">未登录</p>

        <ul class="user-base-data clearfix">
          <li >
            <p class="num">起名姓氏</p>
            <p class="txt">{{orderData ? orderData.familyName:''}}</p>
          </li>
          <li>
            <p class="num" >订单编号</p>
            <p class="txt">{{orderData ? orderData.orderNo:''}}</p>
          </li>
          <li>
            <p class="num" >登记时间</p>
            <p class="txt">{{orderData ? orderData.submitTime:''}}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="name-child-wraper">
      <div class="name-child-title">
        历史记录({{articleList.length}})
      </div>
    </div>

    <ul class="name-child-list">
      <li v-for="item in articleList">
        <div class="txt">
          <p>回复时间：{{item.createTime}}</p>
          <p>推荐名字：{{item.nameList}}</p>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  import API from '../api/api_user'
  import Util from '../common/util'
  import { Indicator,Toast } from 'mint-ui'

  export default {
    name:'Progress',
    data() {
      return {
        getUserData : Util.authService().getLoginUser(),
        articleList:[],
        orderData:null,
        pNo: 0,
        pSize: 10,
      }
    },

    watch:{

      getUserData: {
        handler(newValue, oldValue) {
          console.log(newValue);
          console.log();
        },
        deep: true
      }

    },

    methods: {

      getWXCode(){
        let that = this;
        // 检测是线上还是本地，若为线上则需要授权登录，本地直接登录
        if(Util.browser().canWechatWithDraw() && !Util.authService().isLogin()){
          var href = window.location.href;
          var begin = href.indexOf('code=');
          var end = href.indexOf('#');
          var params = Util.getQueryParams(href.substring(begin, end));

          var authCode = params['code'];
          var state =  params['state'];

          if((!authCode || !state) && Util.shareManage.isStandardDomain()) {

            // 跳转到微信授权页面
            var scope = 'snsapi_userinfo'; //静默授权 snsapi_base  //非静默授权snsapi_userinfo
            var return_url = Util.baseConfig.zhouyilive_client + 'zhouyiApp/#/progress';
            console.log(encodeURIComponent(return_url));
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Util.baseConfig.zhouyilive_appId + "&redirect_uri=" + encodeURIComponent(return_url) + "&response_type=code&scope=" + scope + "&state=" + Util.baseConfig.wecharAuthState + "#wechat_redirect";
          }
        }else{
          that.login()
        }
      },

      checkLogin(){
        let that = this;
        var href = window.location.href;
        var begin = href.indexOf('code=');
        var end = href.indexOf('#');
        var params = Util.getQueryParams(href.substring(begin, end));

        var authCode = params['code'];
        var state =  params['state'];
        if((authCode || state) && !Util.authService().isLogin()){
          that.login()
        }
      },


      login() {
        var href = window.location.href;
        var begin = href.indexOf('code=');
        var end = href.indexOf('#');
        var params = Util.getQueryParams(href.substring(begin, end));

        var authCode = params['code'];
        var state =  params['state'];

        let that = this;
        let loginParams = {
          code:authCode || 'test' //'011EXYDC19Baa40FdiFC1ANiEC1EXYDH'
        };

        API.login(loginParams).then(function (result) {
          that.loading = false;
          Indicator.close();
          if (result && result.code==0) {
            Util.authService().cacheLoginUser(result.data);

            that.getUserData = result.data;
            //Toast('登录成功');

            that.queryOrder();
          }
        });
      },

      goBeforeLoginUrl : function() {
        var that = this;
        let url = Util.holdno().cookie.get('beforeLoginUrl');
        if(!url || url.indexOf('/progress') !== -1){
          that.$router.push({path: '/progress'});
        }
      },

      queryOrder() {
        let that = this;

        //若需要请求接口时，显示加载动画
        Indicator.open({
          text : '正在加载...',
          spinnerType: 'fading-circle'
        });

        API.queryOrder({}).then(function (result) {
          that.loading = false;
          Indicator.close();
          if (result && result.code==0) {
            that.orderData = result.data;
            that.articleList = result.data.batchList;
          } else if(result.code==1000) {
            Toast('请先登录');
          } else if(result.code==1021) {
            Toast('订单不存在');
          }else{
            Toast('登录异常');
          }
        });
      }
    },
    mounted() {
      this.checkLogin();
      this.queryOrder();

    }

  }
</script>

<style scoped>
  .home-banner{
    height:2rem;
    background-image:url(../assets/images/home-banner.png);
    background-size:100% 100%;
  }
  .home-banner .user-msg{
    text-align:center;
    padding-top:.2rem;
  }
  .home-banner .user-msg .img{
    display:inline-block;
    width:.6rem;
    height:.6rem;
    background-image:url(../assets/images/weixin_defalut_head.png);
    background-size:cover;
    border-radius:50%
  }
  .home-banner .user-msg p{
    padding-top:.02rem;
  }
  .user-base-data li{
    float:left;
    width:33.33%;
    text-align:center;
  }
  .user-base-data {
    margin-top:.3rem;
  }
  .user-base-data li .num{
    color:#5D482E;
    font-size:.14rem;
  }
  .user-base-data li .txt{
    color:#A49F99;
    font-size:.1rem;
  }
  .home-nav{
    padding:.1rem 0;
  }
  .home-nav li{
    float:left;
    width:25%;
    text-align:center;
  }
  .home-nav li span{
    display:inline-block;
    width:.5rem;
    height:.5rem;
  }
  .home-nav li:nth-child(1) span{
    background-image:url(../assets/images/nav-1.png);
    background-size:cover;
  }
  .home-nav li:nth-child(2) span{
    background-image:url(../assets/images/nav-4.png);
    background-size:cover;
  }
  .home-nav li:nth-child(3) span{
    background-image:url(../assets/images/nav-2.png);
    background-size:cover;
  }
  .home-nav li:nth-child(4) span{
    background-image:url(../assets/images/nav-3.png);
    background-size:cover;
  }

  .name-child-wraper{
    padding:0 .15rem;
  }
  .name-child-title{
    margin-top:.1rem;
    position:relative;
    text-align:left;
    padding-left:.3rem;
    font-size:.16rem;
  }

  .name-child-title:before{
    position:absolute;
    content:" ";
    left:0;
    top:50%;
    width:.22rem;
    height:.22rem;
    margin-top:-.11rem;
    background-image:url(../assets/images/name-child-icon.png);
    background-size:cover;
  }
  .name-child-list{
    text-align:left;
  }
  .name-child-list li{
    overflow:hidden;
    position:relative;
    padding:.2rem 0 .2rem .2rem;
  }
  .name-child-list li:after{
    position:absolute;
    content:" ";
    bottom:0;
    left:.15rem;
    height:2px;
    width:100%;
    background-color:#F1E4D4;
    -webkit-transform: scale(1,.5);
    transform: scale(1,.3);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom
  }
  .name-child-list li .mint-cell-allow-right::after{
    border-color:#F1E4D4
  }
  .name-child-list li .img{
    position:absolute;
    left:.15rem;
    top:.2rem;
    width:.5rem;
    height:.5rem;
    border-radius:4px;
    background-image:url(../assets/images/weixin_defalut_head.png);
    background-size:cover;
  }
  .name-child-list li .txt{
    padding-right:.15rem;
  }
  .name-child-list li .txt p{
    font-size:#A49F99;
    font-size:.14rem;
  }
  .name-child-list li .txt .desc{
    margin-top:.05rem;
    font-size:.14rem;
    color:#A49F99;
  }

</style>
