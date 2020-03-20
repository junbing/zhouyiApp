<template>
  <div class="Home">
    <div class="home-banner">
      <div class="user-msg">
        <span class="img" v-if="getUserData" v-bind:style="{backgroundImage: 'url(' + getUserData.headImage + ')'}"></span>
        <p v-if="getUserData">{{getUserData.nickName || '取个好名儿'}}</p>

        <span class="img" v-if="!getUserData" @click="getWXCode"></span>
        <p v-if="!getUserData" @click="getWXCode">未登录</p>

        <ul class="user-base-data clearfix">
          <!--<li @click="jumpTo('/OrderList')">
            <p class="num" >{{getUserData ? getUserData.orderNum?getUserData.orderNum: '0' :'0'}}</p>
            <p class="txt">我的订单</p>
          </li>-->

          <li  @click="jumpTo('/HighScoreCard')">
            <p class="num" >{{getUserData ? getUserData.cardNum?(getUserData.cardNum-getUserData.usedNum): '0' : '0'}}</p>
            <p class="txt">高分卡</p>
          </li>
          <li  @click="jumpTo('/UnlockHighScore')">
            <p class="num" style="font-size:.12rem;">{{getUserData ? getUserData.unLock==1?'已解锁': '未解锁' : '未解锁'}}</p>
            <p class="txt">解锁高分</p>
          </li>
          <li  @click="jumpTo('/NameCollect')">
            <p class="num" >{{getUserData ? getUserData.collectNum : '0'}}</p>
            <p class="txt">名字收藏</p>
          </li>


          <!--<li @click="jumpTo('/GiftList')">
            <p class="num" >{{getUserData ? getUserData.giftNum : '0'}}</p>
            <p class="txt">收到礼物</p>
          </li>-->
        </ul>
      </div>
    </div>

    <ul class="home-nav clearfix">
      <li @click="jumpTo('/IntelligentName')">
        <span></span>
        <p>智能起名</p>
      </li>
      <li @click="jumpTo('/NameScore')">
        <span></span>
        <p>姓名评分</p>
      </li>
      <li @click="jumpTo('/ArtificialName')">
        <span></span>
        <p>人工起名</p>
      </li>
      <li @click="goService('https://www.sobot.com/chat/h5/index.html?sysNum=830150dacf4842feb6d457bd7c8505c2')">
        <span></span>
        <p>在线客服</p>
      </li>
      
    </ul>

    <div class="name-child-wraper">
      <div class="name-child-title">
        起名学堂
      </div>
    </div>

    <ul class="name-child-list">
      <li v-for="item in articleList" @click="jumpTo('/Article?id=',item.id)">
        <span class="img" v-bind:style="{backgroundImage: 'url(' + item.thumbnail + ')'}"></span>
        <div class="txt">
          <p>{{item.title}}</p>
          <div class="desc">{{item.summary}}</div>
        </div>
        <i class="mint-cell-allow-right"></i>
      </li>

    </ul>
  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import { Indicator,Toast } from 'mint-ui'


export default {
  name:'Home',
  data() {
    return {
      getUserData : Util.authService().getLoginUser(),
      articleList:[],
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
            var return_url = Util.baseConfig.zhouyilive_client + 'zhouyiApp/#/Home';
            console.log(encodeURIComponent(return_url));
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Util.baseConfig.zhouyilive_appId + "&redirect_uri=" + encodeURIComponent(return_url) + "&response_type=code&scope=" + scope + "&state=" + Util.baseConfig.wecharAuthState + "#wechat_redirect";
          }
          return;
      }else{
        //var return_url = 'https://www.zhouyilive.com/zhouyiApp/#/Home';
        //encodeURIComponent(return_url)
        // 如果有token 但是vuex中没有用户登录信息则做登录操作
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
      }else{
        that.updateUserData();
      }
    },

    updateUserData(){
      API.getStatisData({}).then(function(res){
        if(res.code==0){

          let userData = Util.authService().getLoginUser();



          let setLoginUser = {

            giftNum    : userData.giftNum,
            headImage  : userData.headImage,
            id         : userData.id,
            nickName   : userData.nickName,
            openMemberFee:userData.openMemberFee,
            orderNum   : userData.orderNum,
            sex        : userData.sex,
            userType   : userData.userType,

            cardNum  : res.data.cardNum,
            collectNum : res.data.collectNum,
            unLock : res.data.unLock,
            usedNum : res.data.usedNum

          }

          

          Util.authService().cacheLoginUser(setLoginUser);

        }

      })
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
      //Util.authService().cacheLoginUser(loginParams);
      if(Util.authService().isLogin()){
        that.$router.push({path: '/Home'});
        return;
      }
      API.login(loginParams).then(function (result) {
        that.loading = false;
        Indicator.close();
        if (result && result.code==0) {
          Util.authService().cacheLoginUser(result.data);

          console.log(Util.authService().getLoginUser());
          
          that.getUserData = result.data;
          //Toast('登录成功');

          //that.$router.push({path: '/'});

          var scope = 'snsapi_userinfo'; //静默授权 snsapi_base  //非静默授权snsapi_userinfo
          var return_url = Util.baseConfig.zhouyilive_client + 'zhouyiApp/#/Home'

          if(result.data.hasOwnProperty('headImage') && result.data.headImage!=''){
              setTimeout(() => {
                that.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
              }, 1000);
          }else{

              window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Util.baseConfig.zhouyilive_appId + "&redirect_uri=" + encodeURIComponent(return_url) + "&response_type=code&scope=snsapi_userinfo&state=" + Util.baseConfig.wecharAuthState + "#wechat_redirect";
          }

        }else{
          if(!Util.authService().isLogin()){
            // 跳转到微信授权页面
            
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Util.baseConfig.zhouyilive_appId + "&redirect_uri=" + encodeURIComponent(return_url) + "&response_type=code&scope=snsapi_userinfo&state=" + Util.baseConfig.wecharAuthState + "#wechat_redirect";
          }
        }
      });
    },

    goBeforeLoginUrl : function() {
      var that = this;
      let url = Util.holdno().cookie.get('beforeLoginUrl');
      if(!url || url.indexOf('/Home') != -1){
        that.$router.push({path: '/Home'});
        //router.push('/Home')
      }else{
        if(url == '/'){
          url = '/Home'
        }
        console.log(that);
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新

        Util.holdno().cookie.set('beforeLoginUrl', '')
      }
    },

    queryArticlePageList() {
      
      
      let that = this;
      if(!!Util.sessionStorageService().getObject("queryArticlePageList")){
        setTimeout(function(){
          Indicator.close();
        },200)
        that.articleList = Util.sessionStorageService().getObject("queryArticlePageList");
        return;
      }

      //若需要请求接口时，显示加载动画
      Indicator.open({
        text : '正在加载...',
        spinnerType: 'fading-circle'
      });
      
      let articleParams = {
          pNo:++that.pNo,
          pSize:that.pSize
      };
      API.queryArticlePageList(articleParams).then(function (result) {
        that.loading = false;
        Indicator.close();
        if (result && result.code==0) {
          that.articleList = result.data;
          Util.sessionStorageService().setObject("queryArticlePageList",that.articleList);
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    },
    jumpTo(url,el) {
      let that = this;
      if(!url){
        Toast('此功能完善中，请期待。');
        return false;
      }
      
      that.getWXCode();

      
      //that.$router.push({path: '/Article',params: { userId: 2332 } });

      let URL = (el||el==0)? url+el : url;
      that.defaultActiveIndex = URL;
      that.$router.push(URL); //用go刷新
    },

    goService(url) {
       window.location.href=url;
    }
  },
  mounted() {
    
    this.checkLogin();
    this.queryArticlePageList();

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
  font-size:.2rem;
  height:24px;
  line-height:24px;
}
.user-base-data li .txt{
  color:#A49F99;
  font-size:.12rem;
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
  padding:.2rem 0 .2rem .75rem;
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
  font-size:#5D482E;
  font-size:.16rem;
}
.name-child-list li .txt .desc{
  margin-top:.05rem;
  font-size:.14rem;
  color:#A49F99;
}

</style>