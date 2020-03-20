<template>
  <div class="MemberRole">
    <ul @click="test">
      <li>会员等级</li>
      <li>普通用户</li>
      <li>普通会员</li>
      <li>VIP会员</li>
    </ul>
    <ul>
      <li>姓名库</li>
      <li>基础库</li>
      <li>升级库</li>
      <li>专属库</li>
    </ul>

    <ul>
      <li>使用期限</li>
      <li>无限制</li>
      <li>无限制</li>
      <li>无限制</li>
    </ul>

    <ul>
      <li>匹配最佳五行</li>
      <li><span class="no"></span></li>
      <li><span class="yes"></span></li>
      <li><span class="yes"></span></li>
    </ul>

    <ul>
      <li>匹配最佳三才</li>
      <li><span class="no"></span></li>
      <li><span class="no"></span></li>
      <li><span class="yes"></span></li>
    </ul>

    <ul>
      <li>匹配五格数理</li>
      <li><span class="no"></span></li>
      <li><span class="yes"></span></li>
      <li><span class="yes"></span></li>
    </ul>

    <div class="set-meal-wraper">
      <div class="meal cur">
        <p class="txt">普通会员(永久)</p>
        <p class="num">&yen;298.00</p>
      </div>
      <div class="meal ml">
        <p class="txt">VIP会员(永久)</p>
        <p class="num">&yen;298.00</p>
      </div>

      <div class="btn">立即开通</div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  name:'MemberRole',
  data() {
    return {
      
    }
  },
  methods: {
    test:function(){
      MessageBox.confirm('是否确定开通普通会员？','').then(action => {
        alert(333);
      });
    }
  }
}
</script>
<style scoped>
.MemberRole ul{
  height:.5rem;
  line-height:.5rem;
  padding-left:.15rem;
}
.MemberRole ul li{
  float:left;
  text-align:center;
}
.MemberRole ul li .no,.MemberRole ul li .yes{
  vertical-align:middle;
  display:inline-block;
  width:.24rem;
  height:.24rem;
  
}
.MemberRole ul li .no{
  background-image:url(../assets/images/no.png);
  background-size:cover;
}
.MemberRole ul li .yes{
  background-image:url(../assets/images/yes.png);
  background-size:cover;
}
.MemberRole ul li:nth-child(1){
  width:28%;
  text-align:left;
}
.MemberRole ul li:nth-child(2){
  width:24%;
}
.MemberRole ul li:nth-child(3){
  width:24%;
}
.MemberRole ul li:nth-child(4){
  width:24%;
}
.MemberRole ul:nth-child(2n){
  background-color:#F7F5F3
}

.set-meal-wraper{
  margin-top:.3rem;
  text-align:center;
  font-size:0px;
}
.set-meal-wraper .meal{
  display:inline-block;
  border: 1px solid #F1E4D4;
  border-radius: 4px;
  width:1.35rem;
  height:.9rem;
  color:#A49F99 ;

}

.set-meal-wraper .meal .txt{
  margin-top:.15rem;
  font-size:.14rem;
}
.set-meal-wraper .meal .num{
  margin-top:.08rem;
  font-size:.28rem;
}
.set-meal-wraper .meal.ml{
  margin-left:.15rem;
}
.set-meal-wraper .meal.cur{
  border: 1px solid #D2A871;
}
.set-meal-wraper .meal.cur .txt{
  color:#5D482E
}
.set-meal-wraper .meal.cur .num{
  color:#D2A871
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


</style>
