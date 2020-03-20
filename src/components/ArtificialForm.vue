<template>
  <div class="IntelligentName">
      
      <div class="intelligent-form">
        <mt-field label="起名姓氏" placeholder="两个以内的中文汉字" type="text" v-model="set.username"></mt-field>

        <a class="mint-cell mint-field" style="min-height:.6rem;">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><span class="mint-cell-text">宝宝性别</span></div>
            <div class="mint-cell-value">
              <span class="cell-span" v-bind:class="{'cur':set.sex == 1}" @click="sexTypeBtn(1)">男宝宝</span><span class="cell-span"  v-bind:class="{'cur':set.sex == 0}" @click="sexTypeBtn(0)">女宝宝</span>
            </div>
          </div>
        </a>

        <a data-v-59720a94="" class="mint-cell mint-field">
          <!----><div class="mint-cell-left"></div><div class="mint-cell-wrapper"><div class="mint-cell-title"><!----><span class="mint-cell-text">出生日期</span><!----></div><div class="mint-cell-value">

          <input placeholder="请选择阳历出生日期" readonly="readonly" type="text" class="mint-field-core" @click='openPicker()' @change='change()' v-model='set.pickerDate'>

          <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div><span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span><div class="mint-field-other"></div></div><!----></div><div class="mint-cell-right"></div>
        </a>
        <mt-datetime-picker
          v-model="set.pickerVisible"
          :startDate="startDate"
          type="datetime"
          ref="picker"
          @confirm="handleConfirm"
          >
        </mt-datetime-picker>


        <mt-field label="出生地" placeholder="用于计算经纬度时差" type="text" v-model="set.areaString" @click.native="handlerArea" readonly="readonly"></mt-field>

        <mt-popup v-model="set.areaVisible" class="area-class" position="bottom">
          <div class="picker-toolbar picker-toolbar-area"><span class="mint-datetime-action mint-datetime-cancel">取消</span><span class="mint-datetime-action mint-datetime-confirm">确定</span></div>
          <mt-picker :visibleItemCount="5"  :slots="set.slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        

        <a class="mint-cell mint-field" style="min-height:.6rem;">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><span class="mint-cell-text">名字类型</span></div>
            <div class="mint-cell-value">
              <span class="cell-span" v-bind:class="{'cur':set.nameType == 2}" @click="nameTypeBtn(2)">双字名</span><span class="cell-span" v-bind:class="{'cur':set.nameType == 1}" @click="nameTypeBtn(1)">单字名</span>
            </div>
          </div>
        </a>



        

        
      </div>

      <div class="intelligent-form" style="padding-bottom:50px;">
        <a class="mint-cell mint-field" style="min-height:.6rem;">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><span class="mint-cell-text">指定用字</span></div>
            <div class="mint-cell-value">
              <input class="creat-text" type="text" placeholder="选填" style="width:.75rem;height:24px;line-height:24px;font:inherit" v-model="set.singleName" id="singleInput">
              <span class="cell-span cell-span-1"  v-bind:class="{'cur':set.specFlag && set.singleSpecFlag}" @click="middleNameBtn('中间字')">中间字</span><span class="cell-span cell-span-1"  v-bind:class="{'cur':!set.specFlag && set.singleSpecFlag}" @click="middleNameBtn('尾字')">尾字</span>
            </div>
          </div>
        </a>

        <mt-field label="忌讳字" placeholder="选填" type="text" v-model="set.limitName"></mt-field>

        <mt-field label="其他说明" placeholder="选填" type="textarea" rows="4" v-model="set.remark"></mt-field>

        <mt-field label="联系电话" placeholder="必填" type="text" v-model="set.phone"></mt-field>
      </div>







      <!--<div class="set-meal-wraper">
        <div><span class="what-icon-bg"></span><span class="what-text">智能起名介绍</span></div>
        <div class="btn" @click="intelligentBtn">开始起名</div>
      </div>-->

      <mt-tabbar>
        <div class="set-meal-wraper">
          <div class="btn" @click="intelligentBtn">确认提交</div>
        </div>
      </mt-tabbar>

      <iframe id="getLan" name="getLan" style="display:none"></iframe>

  </div>
</template>

<script>

import API from '../api/api_user'
import Util from '../common/util'
import { DatetimePicker,Toast,Switch,MessageBox,Indicator } from 'mint-ui'
import moment from 'moment'




// 导入数据
import data from '../assets/data/data.json'
let index = 0
let index2 = 0
let index3 = 0
// 初始化省
let province = data.map(res => {
  return res.name
})
// 初始化市
let city = data[index].childs.map(res => {
  return res.name
})
// 初始化区
let area = data[index].childs[index2].childs.map(res => {
  return res.name
})

export default {
  data() {
    return {
      startDate: new Date('1980-01-01'),
      animals:[],
      fivesNum:[],
      userData:Util.authService().getLoginUser(),
      set:{
        username:'',
        birthday:'',
        pickerVisible:new Date(),
        pickerDate:'',
        sex:1,
        nameType:2,

        specFlag:true,
        singleSpecFlag:true,
        singleName:'',
        middleName:'',
        lastName:'',
        limitName:'',

        midFiveElements:'',
        lastFiveElements:'',
        threeSelected:'',

        isSysRecommend:false,
        animals2:'',

        longitude:'',//经度
        latitude:'', //纬度
        remark:'',
        phone:'',

        appid :'', 
        timeStamp:'', 
        nonceStr:'',
        packageValue:'', 
        signType:'', 
        sign:'',
        orderNo:'',     



        areaVisible: false,
        streetVisible: false,
        areaString: '用于计算经纬度时差',
        streetString: '请选择',
        regionInit:false,
        slots: [{
          flex: 1,
          values: province,
          className: 'slot1',
          textAlign: 'left'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: city,
          className: 'slot3',
          textAlign: 'left'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: area,
          className: 'slot5',
          textAlign: 'left'
        }]

      },
      options : [
        {
          label: '避开刑冲相害',
          value: '0'
        },
        {
          label: '使用生肖喜用部首',
          value: '1'
        }
      ],
      fivesOptions:[
        {
          label: '人格、地格、总格均为吉数',
          value: '0'
        },
        {
          label: '天、人、地三才为吉数',
          value: '1'
        }
      ]
    }
  },
  
  watch:{
    pickerVisible(newValue, oldValue) {
　　　　console.log('new: %s, old: %s', newValue, oldValue);
　　},
    animals:function(val,oldvalue) {
      console.log(val);
      
    },
    fivesNum:function(val,oldvalue) {
      console.log(val);
    },
    set : function(val,oldvalue) {
      console.log(val);
    },
    userData : {
　　　　handler(newValue, oldValue) {
　　　　　　console.log(newValue)
　　　　},
　　　　deep: true
　　}
  },

  computed: {
    pickerVisible() {
        let that = this;
　　　　return that.set.pickerVisible;
　　}
  },

  methods: {
    openPicker() {
      this.$refs.picker.open();


      var scrollTop;
      scrollTop = document.documentElement.scrollTop;// 记录scrollTop的值
      $('.IntelligentName').addClass('fix');
 


    },
    handleConfirm (data) {
      let that = this;

      that.set.pickerVisible = moment(data).format('YYYY/MM/DD HH:mm');
      that.set.pickerDate = that.set.pickerVisible;

      var scrollTop;
      scrollTop = document.documentElement.scrollTop;// 记录scrollTop的值
      $('.IntelligentName').removeClass('fix');
      document.documentElement.scrollTop = scrollTop;// 设置scrollTop的值

      Toast({
        message: '已选择 ' + moment(data).format('YYYY/MM/DD HH:mm'),
        position: 'bottom'
      });
    },

    handlerArea() {
      this.set.areaVisible = true;
      this.set.regionInit = true;
      if(this.set.areaString=='用于计算经纬度时差'){
        this.set.areaString = '北京市,市辖区,东城区';
      }
      
    },

    onValuesChange(picker, values) {
      if (this.set.regionInit){
        let one = values[0]
        let two = values[1]
        let three = values[2]
        index = province.indexOf(one)
        if (index >= 0 && province.length > 0) {
          city = data[index].childs.map(res => {
            return res.name
          })
          picker.setSlotValues(1, city)
          two = values[1]
        }

        index2 = city.indexOf(two)
        if (index2 >= 0 && city.length > 0) {
          area = data[index].childs[index2].childs.map(res => {
            return res.name
          })
          picker.setSlotValues(2, area)
          three = values[2]
        }
        index3 = area.indexOf(three)
        
        this.set.areaString = values.join(',')
      }else{
        this.set.regionInit = true;
      }
    },

    sexTypeBtn(type){
      let that = this;
      that.set.sex = type;
    },

    nameTypeBtn(type){
      let that = this;
      that.set.nameType = type;

      if(type==1){
        $("#singleInput").attr("disabled",'disabled');
        $("#middSelect").attr("disabled",'disabled');
        $("#middSelect").parent().addClass("filter");
        that.set.midFiveElements="选择";
        that.set.threeTalents="选择";

        that.set.singleName = '';
        that.set.specFlag = false;
        that.set.singleSpecFlag = false;
      }else{
        $("#singleInput").attr("disabled",false);
        $("#middSelect").attr("disabled",false);
        $("#middSelect").parent().removeClass("filter");
        that.set.midFiveElements="选择";
        that.set.threeTalents="选择";

        that.set.specFlag = true;
        that.set.singleSpecFlag = true;
      }
    },

    middleNameBtn(txt){
      let that = this;

      if(!that.set.singleSpecFlag){
        Toast('名字类型为单字名，不可指定用字');
        return false;
      }

      if(txt=='中间字'){
        that.set.specFlag = true;
      }
      if(txt=='尾字'){
        that.set.specFlag = false;
      }
    },

    

    intelligentBtn(){
      let that = this;
      if(!that.set.username){
        Toast('请输入姓氏');
        return false;
      }
      if((that.set.pickerVisible).toString().indexOf('/')==-1){
        Toast('请输入生日期');
        return false;
      }

      if(!that.set.phone){
        Toast('请输入联系电话');
        return false;
      }

      if(!Util.reg().mobileNo.test(that.set.phone)){
        Toast('请正确的电话号码');
        return false;
      }


      //if(!that.set.areaString){
      //  Toast('请选择出生地');
      //  return false;
      //}


      if(that.set.specFlag){
        that.set.middleName=that.set.singleName;
        that.set.lastName='';
      }else{
        that.set.lastName=that.set.singleName;
        that.set.middleName='';
      }

      that.prepay();

      /*******微信充值 start********/
      //var appid, timeStamp, nonceStr, packageValue, signType, sign, orderNo;

      if(Util.browser().canWechatWithDraw()) {
        if(that.packageValue) {
          that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
        } else {
          that.prepay();
        }
        return;
      }
      /*******微信充值 end********/
    },

    //记录在后台
    prepay () {
      let that = this;
      Indicator.open({
        text : '正在提交，请稍候...',
        spinnerType: 'fading-circle'
      });

      let intelliParams = {
          familyName :that.set.username,
          birthday : moment(that.set.pickerVisible).format('YYYY/MM/DD HH:mm'),
          sex :that.set.sex,
          nameType :that.set.nameType,
          homePlace :that.set.areaString=="用于计算经纬度时差"?'':that.set.areaString,

          longitude : that.set.longitude,
          latitude : that.set.latitude,

          middleName:that.set.middleName,
          lastName:that.set.lastName,

          limitName:that.set.limitName,
          sysRecommend:(that.userData.userType==1 || that.userData.unLock==1) ? 1 : 0,
          midFiveElements:that.set.midFiveElements!='选择'?that.set.midFiveElements:'',
          lastFiveElements:that.set.lastFiveElements!='选择'?that.set.lastFiveElements:'',
          //threeTalents:that.set.threeTalents!='请选择'?that.set.threeTalents:'',
          isTaboo:that.animals[0] || '0',
          isPunching:that.animals[1] || '0',
          fiveLuckyNum:that.fivesNum[0] || '0',
          threeLuckyNum:that.fivesNum[1] || '0',
          remark:that.set.remark,
          phone:that.set.phone,
          mealType:Util.getRequest().mealType
      };



      API.personFornameRegister(intelliParams).then(function (res) {
        that.loading = false;
        if(res.code == '0') {
          that.appid = res.data.appId;
          that.timeStamp = res.data.timeStamp;
          that.nonceStr = res.data.nonceStr;
          that.packageValue = res.data.packageValue;
          that.signType = res.data.signType;
          that.sign = res.data.paySign;
          that.orderNo = res.data.orderNo;

          var mealMoney,mealText;
          if(Util.getRequest().mealType==0){
            mealMoney = '298.00';
            mealText = '专业版套餐';
          }else if(Util.getRequest().mealType==1){
            mealMoney = '688.00';
            mealText = '至尊版套餐';
          }
          MessageBox.alert('<div class="pop_inner_content"><p>商品名称：人工起名'+mealText+'</p><p>订单编号：'+that.orderNo+'</p><p>支付金额：'+mealMoney+'</p><p>支付方式：微信支付</p></div>','确认支付').then(action => {

            if(Util.browser().canWechatWithDraw()) {
              that.callpay(that.appid, that.timeStamp, that.nonceStr, that.packageValue, that.signType, that.sign, that.orderNo);
              return;
            }
            
          });

          //Util.sessionStorageService().setObject("nameChildResult",res.data.list);

          
        } else{
          //let instance = Toast(res.msg);
          setTimeout(() => {
            Indicator.close();
            let URL = '/Author';
            that.defaultActiveIndex = URL;
            that.$router.push(URL); //用go刷新
          }, 2000);
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
            
            let URL = '/RechargeSuc?mealType='+Util.getRequest().mealType;
            that.defaultActiveIndex = URL;
            that.$router.push(URL);

            
          } else if(res.err_msg == "get_brand_wcpay_request:fail") {
            WeixinJSBridge.log(res.err_msg);
            alert(res.err_code + res.err_desc + res.err_msg);
          } else { //get_brand_wcpay_request:cancel

          }
        }
      );
    },
    /*******微信充值 end********/


    /**
     * [getProvince 获取省]
     * @param  {[Object]} regions [省市区数据]
     * @return {[Array]}          [省数组]
     */
    getProvince(regions) {

        return regions['provincesArr'];
    },

    /**
     * [getCity 获取市]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @return {[Array]}               [市数组]
     */
    getCity(regions, provinceName) {

        return regions['provinces'][provinceName]['citiesArr'];
    },

    /**
     * [getArea 获取区]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @param  {[String]} cityName     [市名]
     * @return {[Array]}               [区数组]
     */
    getArea(regions, provinceName, cityName) {

        return regions['provinces'][provinceName]['cities'][cityName]['areasArr'];

    },

    setFramework7(){
      let that = this;
      // 初始化 Framework7
      var myApp = new Framework7.Framework7();
      var s = new Date();

      // 初始化省市区
      var province = that.getProvince(regions.regions),
          city = that.getCity(regions.regions, '北京市'),
          area = that.getArea(regions.regions, '北京市', '北京市');
      console.log(that.getArea(regions.regions, '广东省', '中山市') == 0)
      var e = new Date();
      console.log(e - s);
      // 保存 picker 选择的省
      var provinceSelect = '';

      // 省市区联动 / Framework7 picker
      var pickerLocation = myApp.picker({
          input: '#location',
          rotateEffect: true,
          toolbarTemplate: '<div class="toolbar">\
                              <div class="toolbar-inner">\
                                  <div class="left">\
                                      <a href="#" class="link close-picker">取消</a>\
                                  </div>\
                                  <div class="right">\
                                      <a href="#" class="link close-picker">完成</a>\
                                  </div>\
                              </div>\
                          </div>',
          cols: [{
                  cssClass: 'f-s-14',
                  width: '33.33%',
                  textAlign: 'left',
                  values: province,
                  onChange: function(picker, province) {
                      if (picker.cols[1].replaceValues) {
                          provinceSelect = province;
                          city = that.getCity(regions.regions, province);
                          area = that.getArea(regions.regions, province, city[0]);
                          picker.cols[1].replaceValues(city);
                          if (area.length !== 0) {
                              picker.cols[2].replaceValues(area);
                          } else {
                              picker.cols[2].replaceValues(city);
                          }
                      }
                  }
              },
              {
                  cssClass: 'f-s-14',
                  width: '33.33%',
                  textAlign: 'center',
                  values: city,
                  onChange: function(picker, city) {
                      if (picker.cols[2].replaceValues) {
                          area = that.getArea(regions, provinceSelect, city);
                          if (area.length !== 0) {
                              picker.cols[2].replaceValues(area);
                          } else {
                              picker.cols[2].replaceValues([city]);
                          }
                      }
                  }
              },
              {
                  cssClass: 'f-s-14',
                  width: '33.33%',
                  textAlign: 'right',
                  values: area,
              }
          ]
      });
    }
  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();
    let that = this;
    

    that.set.isSysRecommend = (that.userData.userType==1 || that.userData.unLock==1)?true:false;

    $(".picker-toolbar").delegate('span','click',function(){
      var scrollTop;
      scrollTop = document.documentElement.scrollTop;// 记录scrollTop的值
      $('.IntelligentName').removeClass('fix');
      document.documentElement.scrollTop = scrollTop;// 设置scrollTop的值
    })

    $(".picker-toolbar-area").delegate('span','click',function(){
      that.set.areaVisible = false;
      that.set.regionInit = false;

      //通过选择的区域获取经纬度

      var tempArea = that.set.areaString.replace(/,/g,'');
      $.ajax({
           url: "https://restapi.amap.com/v3/geocode/geo?key=389880a06e3f893ea46036f030c94700&s=rsv3&city=35&address="+tempArea,
           type: "GET",
           dataType: "jsonp", //指定服务器返回的数据类型
           success: function (data) {
               //var result = JSON.stringify(data); //json对象转成字符串
              var locaArr = data.geocodes[0].location.split(',')

              that.set.longitude = locaArr[0];
              that.set.latitude = locaArr[1];

           }
       });
      
    })
  }
}
</script>
<style scoped>


.intelligent-form{padding:0 .2rem;background-color:#FFF}

.IntelligentName{padding-bottom:.4rem}
.IntelligentName .mint-tabbar{position:fixed;height:.5rem;line-height:.5rem;background-image:none;box-shadow:0 -1px 2px 0 rgba(93,72,46,.1);z-index:2}
.IntelligentName .mint-tabbar .gif-footer .what-icon-bg{display:inline-block;width:.24rem;height:.24rem;background-image:url(../assets/images/what-icon-bg.png);background-size:cover;vertical-align:middle;margin-left:.1rem}
.IntelligentName .mint-tabbar .gif-footer{color:#A49F99;width:100%;text-align:left}
.IntelligentName .mint-tabbar .gif-footer .num{color:#D2A871;font-size:20px}
.IntelligentName .mint-tabbar .gif-footer .btn{float:right;width:120px;height:100%;line-height:49px;text-align:center;background-color:#D2A871;color:#FFF}

.IntelligentName .set-meal-wraper{
  text-align:center;
  width:100%;
}
.IntelligentName .set-meal-wraper .btn{
  display:block;
  width:100%;
  height:.5rem;
  line-height:.5rem;
  text-align:center;
  color:#FFF;
  background: #D2A871;
  font-size:.16rem;
}



.intelligent-form .cell-span{display:inline-block;background:#FFF;border:1px solid #F1E4D4;border-radius:4px;height:.32rem;line-height:.3rem;padding:0 .1rem;color:#A49F99;font-size:.14rem;margin-right:.3rem}
.intelligent-form .cell-span.cur{border:1px solid #D2A871;color:#5D482E}
.intelligent-form .cell-span-1{margin-right:.1rem}
.intelligent-form .cell-span-1:last-child{margin-right:0}
.intelligent-form .cell-span-2{background: #F1E4D4;border-radius: 4px;font-size: 14px;color: #5D482E;margin-right:.12rem;position:relative;padding-right:.2rem;}
.intelligent-form .cell-span-2:before{
  position:absolute;
  content:" ";
  right:.05rem;
  top:.09rem;
  width: 0;
  height: 0;
  border-left: .04rem solid transparent;
  border-right: .04rem solid transparent;
  border-bottom: .05rem solid #D2A871;
}
.intelligent-form .cell-span-2:after{
  position:absolute;
  content:" ";
  right:.05rem;
  top:.15rem;
  width: 0;
  height: 0;
  border-left: .04rem solid transparent;
  border-right: .04rem solid transparent;
  border-top: .05rem solid #D2A871;
}

.intelligent-form .cell-span-2 select{
  position:absolute;
  left:0;
  top:0;
  width:.56rem;
  height:.3rem;
  line-height:.3rem;
  opacity:0;

}

.intelligent-form .cell-span-2.filter{
  -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);

    filter: gray;
}

.intelligent-form .cell-ico{
    display:inline-block;
    vertical-align:middle;
    width:.16rem;
    height:.16rem;
    background-image:url(../assets/images/lock.png);
    background-size:cover;
    
}

.intelligent-form-1{
  position:relative;
}
.intelligent-form-1 .opacity{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:.48rem;
  z-index:2;
}
.intelligent-form-1 .cell-ico-1{
  position:absolute;
  left:1.4rem;
  top:.145rem;
  z-index:1;
}

.intelligent-form-1 .cell-ico-2{
  position:absolute;
  left:2.4rem;
  top:.145rem;
  z-index:1;
}
.intelligent-form .creat-text{font-size:12px;color:#A49F99;margin-right:.1rem}
.intelligent-tit{padding-left:.15rem;height:.36rem;line-height:.45rem;background:#F7F5F3;font-size:12px;color:#A49F99}



.what-icon-bg{display:inline-block;width:.24rem;height:.24rem;background-image:url(../assets/images/what-icon-bg.png);background-size:cover;vertical-align:middle;}
.what-text{margin-left:.05rem;display:inline-block;vertical-align:middle;whit-space:nowrap;color:#D2A871;font-size:.14rem;}




</style>

<style>
.pop_inner_content{
  text-align:left;
}

.intelligent-form .mint-cell-wrapper{padding:0;background:0 0;position:relative}
.intelligent-form .mint-cell-wrapper:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}
.intelligent-form .mint-cell:last-child{background:0 0}
.intelligent-form .mint-field-core{background:0 0;color:#A49F99}
.area-class{width:100%;height:40%}
.mint-datetime-action{color:#695C4C}
.mint-field .mint-cell-title{width:1.05rem}
.picker-toolbar{line-height:.4rem;border-bottom:1px solid #F1E4D4}
.mint-switch-input:checked+.mint-switch-core{border-color:#F1E4D4;background-color:#D2A871}
.mint-switch-core::after{width:30px;height:30px;background-color:#eee;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.mint-checkbox-input:checked + .mint-checkbox-core,.mint-checkbox-input:checked + .mint-switch-core::after {
    background-color: #D2A871;
    border-color: #D2A871;
}
.mint-switch-input:checked + .mint-switch-core::after{
  background-color: #D2A871;
    border-color: #D2A871;
}
.fix{
    height: 100%;
    overflow: hidden;
}
.mint-checklist-label{
  padding: 0;
}
.mint-checkbox-label {
    margin-left: 0
}

.mint-popup{
  
}
.picker-items{width:100%}

</style>
