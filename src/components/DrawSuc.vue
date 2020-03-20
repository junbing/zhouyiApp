<template>
  <div class="DrawSuc">
    <div class="draw-wraper">
      <span class="draw-record" @click="jumpTo('/DrawList')">提现记录</span>
      <span class="ico"></span>
      <p class="txt">已提现至微信零钱</p>
      <div class="num">&yen;298.00</div>
    </div>

    <div class="draw-tit">常见问题</div>

    <div class="draw-desc">
      <div class="conbox">
        <p class="que">微信到账时间？</p>
        <p class="ans">微信付款是实时到账的，请及时核对微信零钱账单。</p>
      </div>
      <div class="conbox">
        <p class="que">指定时间内没有收到邮件怎么办？</p>
        <p class="ans">首先检查邮箱是否设置了拦截规则；在确认没有收到的情况下可以在订单列表点击重新发送或者联系客服。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name:'DrawSuc',
  data() {
    return {

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