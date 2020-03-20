<template>
  
</template>

<script>
import API from '../api/api_user'
import { Indicator } from 'mint-ui'
import Util from '../common/util'
export default {
  data() {
    return {
      
    }
  },
  created () {

      // 检测会员有没有登录
      if(Util.browser().canWechatWithDraw() && !Util.authService().isLogin()){
          var href = window.location.href;
          var begin = href.indexOf('code=');
          var end = href.indexOf('#');
          var params = Util.getQueryParams(href.substring(begin, end));

          var authCode = params['code'];
          var state =  params['state'];

          if((!authCode || !state) && Util.shareManage.isStandardDomain()) {

            // 跳转到微信授权页面
            var scope = 'snsapi_base'; //静默授权 snsapi_base  //非静默授权snsapi_userinfo
            var return_url = Util.baseConfig.zhouyilive_client + 'zhouyiApp/#/Author'
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Util.baseConfig.zhouyilive_appId + "&redirect_uri=" + encodeURIComponent(return_url) + "&response_type=code&scope=" + scope + "&state=" + Util.baseConfig.wecharAuthState + "#wechat_redirect";
          }else{
            //本地测试
            this.login()
          }
      }else{
        // 如果有token 但是vuex中没有用户登录信息则做登录操作
        this.login()
      }
  },
  methods: {
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
        if (result && result.code==0) {
          Util.authService().cacheLoginUser(result.data);
          

          //that.$router.push({path: '/'});

          var scope = 'snsapi_base'; //静默授权 snsapi_base  //非静默授权snsapi_userinfo
          var return_url = Util.baseConfig.zhouyilive_client + 'zhouyiApp/#/Author'

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
      console.log(that);
      if(!url || url.indexOf('/Author') != -1){
        console.log(that);
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
    }

  },
  mounted() {
    Indicator.open({
      text : '正在加载...',
      spinnerType: 'fading-circle'
    });
  }
}
</script>
<style>
.mint-indicator .mint-indicator-mask{background:rgba(0,0,0,0.4);opacity:.4;}
.mint-indicator .mint-indicator-wrapper{z-index:3}
</style>