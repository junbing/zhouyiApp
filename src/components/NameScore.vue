<template>
  <div class="IntelligentName">
      <div class="intelligent-form">

        <a class="mint-cell mint-field" style="min-height:.6rem;">
          <div class="mint-cell-wrapper ">
            <div class="mint-cell-title"><span class="mint-cell-text">尊姓大名</span></div>
            <div class="mint-cell-value mint-cell-value-1">
              <input placeholder="请输入名字" type="text" class="mint-field-core" v-model='set.username'>
              <mt-checklist
                align="left"
                v-model="animals"
                :options="options">
              </mt-checklist>
            </div>
          </div>
        </a>

        

        <a class="mint-cell mint-field" style="min-height:.6rem;">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><span class="mint-cell-text">性别</span></div>
            <div class="mint-cell-value">
              <span class="cell-span" v-bind:class="{'cur':set.sex == 1}" @click="sexTypeBtn(1)">男</span><span class="cell-span" v-bind:class="{'cur':set.sex == 0}" @click="sexTypeBtn(0)">女</span>
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
          :startDate = "startDate"
          type="datetime"
          ref="picker"
          @confirm="handleConfirm"
          >
        </mt-datetime-picker>



        <mt-field label="出生地" placeholder="请选择出生地" type="text" v-model="set.areaString" @click.native="handlerArea" readonly="readonly"></mt-field>

        <mt-popup v-model="set.areaVisible" class="area-class" position="bottom">
          <div class="picker-toolbar picker-toolbar-area"><span class="mint-datetime-action mint-datetime-cancel">取消</span><span class="mint-datetime-action mint-datetime-confirm">确定</span></div>
          <mt-picker :visibleItemCount="5"  :slots="set.slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        
      </div>



      <div class="set-meal-wraper">
        <div @click="isOpenDesc"><span class="what-icon-bg"></span><span class="what-text">姓名评分介绍</span></div>
        <div class="btn" @click="isOpenMemberBtn">查看结果</div>
      </div>

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
      startDate: new Date('1960-01-01'),
      animals:[],
      fivesNum:[],
      userData: Util.authService().getLoginUser(),
      set:{
        username:'',
        birthday:'年/月/日',
        pickerVisible:new Date(),
        pickerDate:'',
        sex:1,
        startDate:'',
        tabooName:'',
        isSysRecommend:true,
        animals2:'',

        longitude:'',//经度
        latitude:'', //纬度

        isDouble:0,



        areaVisible: false,
        streetVisible: false,
        areaString: '',
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
          label: '复姓',
          value: '1'
        }
      ]
    }
  },
  watch:{
    animals:function(val,oldvalue) {
      console.log(val);
      
    },
    pickerVisible(newValue, oldValue) {
　　　　console.log('new: %s, old: %s', newValue, oldValue);
　　},
    set : function(val,oldvalue) {
      console.log(val);
    }
  },
  computed: {
    pickerVisible() {
        let that = this;
　　　　return that.set.pickerVisible;
　　}
  },
  methods: {
    sexTypeBtn(type){
      let that = this;
      that.set.sex = type;
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm (data) {
      let that = this;

      that.set.pickerVisible = moment(data).format('YYYY/MM/DD HH:mm');
      that.set.pickerDate = that.set.pickerVisible;

    },

    handlerArea() {
      this.set.areaVisible = true;
      this.set.regionInit = true;
      if(this.set.areaString==''){
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

    isOpenDesc(){
      MessageBox.alert('<p style="text-align:left;">美祥姓名评分采用四维评分标准：1、八字五行喜忌以及姓名三才匹配度评分；2、文化印象评分；3、生肖宜忌评分；4、五格数理评分；综合评分能够更全面的衡量名字各方面的表现。</p>','').then(action => {  
      });
    },

    isOpenMemberBtn(){
      let that = this;

      if(that.set.username==''){
        Toast('您输入姓名进行测评');
        return false;
      }

      if(that.set.username.length<2){
        Toast('姓名最少两个字');
        return false;
      }

      if(typeof that.set.pickerVisible!='string'){
        Toast('您选择出生日期');
        return false;
      }

      if(that.set.username==''){
        Toast('您选择出生地');
        return false;
      }

      let surname = '';
      let combine = '';
      //复姓
      if(that.animals[0]==1){
        that.set.isDouble = 1;
        if(that.set.username.length>=3){
          surname = that.set.username.substring(0,2);
          combine = that.set.username.substring(2,that.set.username.length);
        }else{
          Toast('您选择的输入为复姓，请输入正确的名字');
          return;
        }

      //单姓  
      }else{  
        that.set.isDouble = 0;
        surname = that.set.username.substring(0,1);
        combine = that.set.username.substring(1,that.set.username.length);
      }


      let params={
        surname:surname,
        combine:combine,
        sex    : that.set.sex,
        birthday  : moment(that.set.pickerVisible).format('YYYY/MM/DD hh:mm'),
        homePlace : that.set.areaString,
        longitude : that.set.longitude,
        latitude  : that.set.latitude,
        isDouble  : that.set.isDouble

      }
      console.log(params);

      MessageBox.confirm('<p>您输入的姓：'+surname+';&emsp;名：'+combine+';</p><p>确定进入测评？</p>','').then(action => {
        //Util.sessionStorageService().setObject('NAMESCORE_KEY', params);
        let URL = 'NameDetail?surname='+surname+'&combine='+combine+'&sex='+that.set.sex+'&birthday='+moment(that.set.pickerVisible).format('YYYY/MM/DD HH:mm')+'&homePlace='+that.set.areaString+'&longitude='+that.set.longitude+'&latitude='+that.set.latitude+'&isDouble='+that.set.isDouble+'&score=1';
        that.defaultActiveIndex = URL;
        that.$router.push(URL); //用go刷新

        /*window.location.href = window.location.protocol + '//' + window.location.host +'/zhouyiApp/#/NameDetail?surname='+surname+'&combine='+combine+'&sex='+that.set.sex+'&birthday='+moment(that.set.pickerVisible).format('YYYY/MM/DD HH:mm')+'&homePlace='+that.set.areaString+'&longitude='+that.set.longitude+'&latitude='+that.set.latitude+'&isDouble='+that.set.isDouble+'&score=1';*/
        
      });



      

    }
  },

  mounted() {
    //关闭授权登录后的loading
    Indicator.close();
    let that = this;

    $(".picker-toolbar-area").delegate('span','click',function(){
      that.set.areaVisible = false;
      that.set.regionInit = false;


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


.intelligent-form{padding:0 .2rem;background:#FFF}

.intelligent-form .cell-span{display:inline-block;background:#FFF;border:1px solid #F1E4D4;border-radius:4px;height:.32rem;line-height:.3rem;padding:0 .2rem;color:#A49F99;font-size:.14rem;margin-right:.3rem}
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
  left:1.2rem;
  top:.145rem;
  z-index:1;
}

.intelligent-form-1 .cell-ico-2{
  position:absolute;
  left:2.2rem;
  top:.145rem;
  z-index:1;
}
.intelligent-form .creat-text{font-size:12px;color:#A49F99;margin-right:.1rem}
.intelligent-tit{padding-left:.15rem;height:.36rem;line-height:.45rem;background:#F7F5F3;font-size:12px;color:#A49F99}
.set-meal-wraper{
  padding:.3rem 0;
  text-align:center;
  font-size:0px;
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


.what-icon-bg{display:inline-block;width:.24rem;height:.24rem;background-image:url(../assets/images/what-icon-bg.png);background-size:cover;vertical-align:middle;}
.what-text{margin-left:.05rem;display:inline-block;vertical-align:middle;whit-space:nowrap;color:#D2A871;font-size:.14rem;}
</style>

<style>

.intelligent-form .mint-cell-wrapper{padding:0;background:0 0;position:relative}
.intelligent-form .mint-cell-value-1 .mint-cell-wrapper:after{display:none}
.intelligent-form .mint-cell-value-1 .mint-checklist-title{display:none}
.intelligent-form .mint-cell:last-child{background:0 0}
.intelligent-form .mint-field-core{background:0 0;color:#A49F99}
.area-class{width:100%;height:40%}
.mint-datetime-action{color:#695C4C}
.mint-field .mint-cell-title{width:1.05rem}
.picker-toolbar{padding-left:.15rem;line-height:.4rem}
.mint-switch-input:checked+.mint-switch-core{border-color:#F1E4D4;background-color:#F1E4D4}
.mint-switch-core::after{width:30px;height:30px;background-color:#D2A871;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #D2A871;
    border-color: #D2A871;
}

.mint-checklist-label{
  padding:0;
}
.mint-checkbox-label{
  margin-left:0;
  font-size:.16rem;
}
.mint-cell-text{
  font-size:.16rem;
}
</style>
