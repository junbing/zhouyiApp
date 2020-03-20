<template>
  <div class="ArtificialName">
    <div class="art_content">
      <p>名字作为一个人的符号，虽然不能决定命运，但它却一直带着时代的气息，蕴含着文化的内涵，留下了家族血统的烙印，也凝聚着父母的期望，对人的一生起着潜移默化的作用。</p>
      <p>名字的重要性不言而喻，但是现实生活中很多家长给孩子起名字即使绞尽脑汁也很难起到满意的名字。为了更好地满足家长们多元化的起名需求，特别推出了人工起名服务。该服务是由拥有多年起名经验的专家团队所提供，能够为您快速定制满意的吉祥好名。名字不仅朗朗上口、意蕴深厚、利于书写。同时也遵循传统周易起名的精髓，通过合理搭配名字所用汉字的五行组合，最大程度弥补命局五行不足，达到助运旺财、趋吉避害的效果。</p>

      <h4 style="margin-top:.2rem;margin-bottom:.1rem;font-size:.14rem;font-weight: bold;">服务流程</h4>
      <p>客户提交申请并支付完成之后，系统会分配一名专员老师添加微信做一对一的起名指导。根据客户的需求在指定时间内提供精选高分吉名。客户接收到名字之后如果不满意，可联系老师再做调整，直至客户满意为止。</p>
    </div>

    <h4 style="margin-top:.2rem;margin-bottom:.1rem;padding:0 .2rem;font-size:.14rem;font-weight: bold;">套餐详情</h4>
    <div class="score_title">专业版套餐&emsp;<span style="color:red;">¥298.00</span> <span class="btn" @click="jumpTo('/ArtificialForm?mealType=0')">立即购买</span></div>


    <div class="set_meal">
      <p>详细八字五行分析</p>
      <p>出生地经纬度时差校正</p>
      <p>专员老师一对一指导</p>
      <p>精选高分吉名</p>
      <p>个性化需求定制</p>
      <p>7个工作日内专家答疑服务</p>
    </div>

    <div class="score_title">至尊版套餐&emsp;<span style="color:red;">¥688.00</span> <span class="btn" @click="jumpTo('/ArtificialForm?mealType=1')">立即购买</span></div>


    <div class="set_meal">
      <p>详细八字五行分析</p>
      <p>出生地经纬度时差校正</p>
      <p>专员老师一对一指导</p>
      <p>精选高分吉名</p>
      <p>个性化需求定制</p>
      <p>15个工作日内专家答疑服务</p>
      <p style="color:red;">双胞胎起名</p>
      <p style="color:red;">专家团队评审</p>
      <p style="color:red;">自起名字详评</p>
      <p style="color:red;">特殊姓氏起名</p>
    </div>




    

    


  </div>
</template>

<script>

import API from '../api/api_user'
import Util from '../common/util'
import { Toast,MessageBox,Indicator } from 'mint-ui'





export default {
  data() {
    return {
      
    }
  },
  
  watch:{
    
  },

  computed: {
   
  },

  methods: {
    jumpTo(url,el) {
      let that = this;

      let URL = (el||el==0)? url+el : url;
      that.defaultActiveIndex = URL;
      that.$router.push(URL); //用go刷新
    },

 
  },
  mounted() {
  
  }
}
</script>
<style scoped>
.art_content{
  padding:.2rem;
}
.art_content p{
  margin-bottom:.1rem;
  text-indent:.2rem;
  line-height:22px;
}
.score_title{

  padding:0 .15rem;
  height:.5rem;
  line-height:.5rem;
  position:relative;
  background-color:#eee
}
.score_title .desc{
  margin-left:.2rem;
  color:#999;
}
.score_title .btn{
  position:absolute;
  right:.2rem;
  top:50%;
  margin-top:-.15rem;
  height:.3rem;
  line-height:.3rem;
  padding:0 .1rem;
  border-radius:4px;
  border:1px solid #D2A871;
  color:#5D482E;
}
.set_meal{
  padding:.2rem;
}
.set_meal p{
  line-height:22px;
}
</style>
