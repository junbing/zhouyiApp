<template>
  <div class="DrawSuc">
    <div class="draw-wraper">
      
      <span class="ico" ></span><!--:class="{error:true}"-->
      <p class="txt">支付成功</p>
      <div class="num">&yen;{{mealType==0?'298.00':'688.00'}}</div>
    </div>

    <div class="draw-tit" style="text-align:center">请长按下方二维码，添加老师微信</div>

    <div style="text-align:center;margin-top:10px;">
      <img src="../assets/images/u1423.png" widht="180" height="180">
    </div>
  </div>
</template>

<script>
import Util from '../common/util'
import { MessageBox } from 'mint-ui';
export default {
  name:'DrawSuc',
  data() {
    return {
      mealType:Util.getRequest().mealType
    }
  },
  methods: {
    jumpTo(url,el) {
      let that = this;
      //that.$router.push({path: '/Article',params: { userId: 2332 } });

      let URL = (el||el==0)? url+el : url;
      that.defaultActiveIndex = URL;
      that.$router.push(URL); //用go刷新
    }
    
  }
}
</script>
<style scoped>
.draw-wraper{
  position:relative;
  padding:.3rem 0 .4rem;
  text-align:center;
}
.draw-wraper .draw-record{
  position:absolute;
  right:.2rem;
  top:.1rem;
  white-space:nowrap;
  font-size: 16px;
  color: #D2A871;
}
.draw-wraper .ico{
  display:inline-block;
  width:.6rem;
  height:.6rem;
  background-image:url(../assets/images/draw-suc-bg.png);
  background-size:cover;
}
.draw-wraper .ico.error{
  display:inline-block;
  width:.6rem;
  height:.6rem;
  background-image:url(../assets/images/draw-error-bg.png);
  background-size:cover;
}

.draw-wraper .txt{
  padding-top:.15rem;
  color:#5D482E;
  font-size: 16px;
}
.draw-wraper .num{
  padding-top:.1rem;
  font-size: 28px;
  color: #D2A871;
}
.draw-tit{
  padding-left:.15rem;
  height:.3rem;
  line-height:.3rem;
  background: #F7F5F3;
  font-size: 12px;
  color: #A49F99;
}
.draw-desc{
  padding-left:.15rem;
}
.draw-desc .conbox{
  padding:.2rem 0;
  position:relative;
}
.draw-desc .conbox:after{
  position:absolute;
  content:" ";
  bottom:0;
  left:0;
  height:1px;
  width:100%;
  background-color:#F1E4D4;
  -webkit-transform: scale(1,.5);
  transform: scale(1,.5);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom
}
.draw-desc .conbox:last-child:after{
  display:none;
}
.draw-desc .conbox .que{
  font-size: 16px;
  color: #5D482E;
}
.draw-desc .conbox .ans{
  margin-top:.05rem;
  padding-right:.15rem;
  font-size: 14px;
  color: #A49F99;
}
</style>