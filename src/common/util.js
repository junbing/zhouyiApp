/**
 * Created by chenjunbing on 2018/5/23.
 */
import Vue from 'vue'
import API from '../api/api_user'

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

var baseConfig = {
    zhouyilive_domain : 'www.zhouyilive.com',
    zhouyilive_client : window.location.protocol + '//' + window.location.host +'/',
    zhouyilive_appId  : 'wx7abd963e43f0d6e5',
    wecharAuthState   : 'd5172e54'
};



function padding (s, len) {
  let l = len - (s + '').length
  for (var i = 0; i < l; i++) { s = '0' + s }
  return s
};

export default {
  //曝露公用配置
  baseConfig:baseConfig,

  holdno : function() {
    return{
      cookie: {
        set: function(name, value){
          // 缓存过期时间
          let Days = 30
          let exp = new Date()
          exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
          document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
        },
        get: function(name){
          let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
          let reg = arr
          arr = document.cookie.match(reg)
          if (arr) {
            return unescape(arr[2])
          }else{
            return null
          }
        },
        del: function(name){
          let exp = new Date()
          exp.setTime(exp.getTime() - 1)
          let cval = this.cookie.get(name)
          if (cval != null) {
            document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
          }
        }
      }
    }
  },
  shareManage:{
    isStandardDomain:function(){
      return window.location.host === baseConfig.zhouyilive_domain;
    }
  },
  browser: function(){
    var that =this;
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                ver = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.indexOf('QQBrowser') !== -1 //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return {
      versions:browser.versions,

      isMobile:function(){
        return browser.versions.mobile;
      },
      isAndroid: function () {
          return browser.versions.mobile && browser.versions.android
      },
      isiPhone: function () {
          return browser.versions.mobile && browser.versions.iPhone
      },
      isWeixinBrowser: function () {
          return browser.versions.mobile && browser.versions.weixin
      },
      // 是否支持微信分享/支付
      canWechatWithDraw: function () {
          return browser.versions.mobile && browser.versions.weixin && that.shareManage.isStandardDomain()
      }
    }
  },

  //获取#后的参数 
  //#/Article?id=3
  getRequest :function() {   

    if(window.location.href.substring(window.location.href.indexOf("#")).indexOf("?")==-1) return false;

    var qs = window.location.href.substring(window.location.href.indexOf("#")).split('?'), // 获取url中"?"符后的字串
      
    args = {}, // 保存参数数据的对象
    items = qs[1].split("&"), // 取得每一个参数项,
    item = null,
    len = items.length;
    for(var i = 0; i < len; i++) {
      item = items[i].split("=");
      var name = decodeURIComponent(item[0]),
        value = decodeURIComponent(item[1]);
      if(name) {
        args[name] = value;
      }
    }
    return args;
  },
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) { context = r[2] }
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  getQueryParams : function(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  },

  formatDate: {

    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length)
          case 'M': return padding(date.getMonth() + 1, $0.length)
          case 'd': return padding(date.getDate(), $0.length)
          case 'w': return date.getDay() + 1
          case 'h': return padding(date.getHours(), $0.length)
          case 'm': return padding(date.getMinutes(), $0.length)
          case 's': return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y': _date.setFullYear(_int); break
            case 'M': _date.setMonth(_int - 1); break
            case 'd': _date.setDate(_int); break
            case 'h': _date.setHours(_int); break
            case 'm': _date.setMinutes(_int); break
            case 's': _date.setSeconds(_int); break
          }
        }
        return _date
      }
      return null
    }

  },

  localStorageService:function(){
    return{
      //存储单个属性
      set: function (key, value) {
          window.localStorage[key] = value;
      },
      //读取单个属性
      get: function (key, defaultValue) {
          return window.localStorage[key] || defaultValue;
      },
      //存储对象，以JSON格式存储
      setObject: function (key, value) {
          window.localStorage[key] = JSON.stringify(value);
      },
      //读取对象
      getObject: function (key) {
          var json = window.localStorage[key];
          if (json) {
              try {
                  return JSON.parse(json);
              } catch (err) {
                  return null
              }
          }
          return null;
      },
      //删除对象
      remove: function (key) {
          return window.localStorage.removeItem(key);
      }
    }

  },

  sessionStorageService : function(){
    return{
      //存储单个属性
      set: function (key, value) {
          window.sessionStorage[key] = value;
      },
      //读取单个属性
      get: function (key, defaultValue) {
          return window.sessionStorage[key] || defaultValue;
      },
      //存储对象，以JSON格式存储
      setObject: function (key, value) {
          window.sessionStorage[key] = JSON.stringify(value);
      },
      //读取对象
      getObject: function (key) {
          var json = window.sessionStorage[key];
          if (json) {
              try {
                  return JSON.parse(json);
              } catch (err) {
                  return null
              }
          }
          return null;
      },
      //删除对象
      remove: function (key) {
          return window.sessionStorage.removeItem(key);
      }
    }
  },

  authService : function(){
    let that = this;
    return{
      isLogin: function () {
          return !!that.sessionStorageService().getObject('login-user');
      },
      getLoginUser: function () {
          return that.sessionStorageService().getObject('login-user');
      },
      cacheLoginUser: function (loginUser) {
          that.sessionStorageService().setObject('login-user', loginUser);
      },
      logout: function () {
          that.sessionStorageService().remove('login-user');
      },
      isAttention: function () {
          var userAttention = that.sessionStorageService.get('isAttention');
          if (typeof userAttention != 'undefined') {
              return parseInt(userAttention) === 1;
          } else {
              var loginUser = that.sessionStorageService().getObject('login-user');
              if (loginUser !=null && typeof loginUser != 'undefined' && typeof loginUser['isAttention'] != 'undefined') {
                  return parseInt(loginUser['isAttention']||0) === 1;
              }
          }
          return false;
      }
    }
    
  },

  reg : function(){
      var regs={
        mobileNo:/^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/, // --手机号码,
            mail: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

      };
      return regs;
  },


  wxShareService : function(){
    var defaultShareInfo={
      title:'周易生活',
      desc:'智能取名',
      link:'https://www.zhouyilive.com/zhouyiApp/#/Home',
      imgUrl:'../assets/images/logo.png',
      success:null,
      cancel:null
      //type: '', // 分享类型,music、video或link，不填默认为link
      //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    },
    shareInfo={};
    var setDefaultShareInfo=function(){//设置默认信息
      shareInfo=defaultShareInfo;
    };
    setDefaultShareInfo();
    var config=null,isQuestingConfig=false;
    var tryTimes = 0, maxTry = 3;
    var init=function () {//初始化
      API.getWXShareSign({}).then(function(res) {
        //res.data=JSON.parse(res.data);
        if (res && res.code == 0) { //res && res.code == 0
            isQuestingConfig=true;
            var config={
                debug:false,
                appId:res.data.appId, // 必填，公众号的唯一标识
                timestamp:res.data.timestamp , // 必填，生成签名的时间戳
                nonceStr:res.data.nonceStr , // 必填，生成签名的随机串
                signature:res.data.signature ,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            wx.config(config);
            wx.ready(function(){
                wx.onMenuShareQQ(shareInfo);
                wx.onMenuShareQZone(shareInfo);
                wx.onMenuShareAppMessage(shareInfo);
                wx.onMenuShareTimeline(shareInfo);
                wx.onMenuShareWeibo(shareInfo);
            });
        } else {
            // 签名失败再次请求,不超过最大重试次数
            if (tryTimes++ < maxTry) {
                init();
            }
        }
      })
    };
    var setShareInfo=function(params){//设置分享信息
      /*
      1 单个和接龙创建成功后分享
      2 我发出的列表，单个和接龙分享
      3 宝箱列表多个心意转发
      4 宝箱心意拆开后转发
      5 场外单个心意全程转发
      6 串包老虎机页摇完一次后转发
      7 串包最后分享
      8 广场和专场分享
      */
      console.log(config);
      console.log(isQuestingConfig);
      console.log((config&&!config.appId));

      /*if(!config||!isQuestingConfig||(config&&!config.appId)){//若没请求签名或者返回值不正常则再次请求
        init();
      }*/
      setDefaultShareInfo();//每次调用都要清空上次所设置的数据
        //Vue.extend(shareInfo,params);
      if(params){
        for(var key in params){//如无值则取默认值
          shareInfo[key]=params[key];
          
        }
        init();
      }
      
      //alert(shareInfo.link+'\r'+shareInfo.title+'\r'+shareInfo.desc);

    };
    return {init:init,setShareInfo:setShareInfo}; 
  },

  shareModal : function(){
    return {
      show:function(){

      }

    }
  }


  
  

}
