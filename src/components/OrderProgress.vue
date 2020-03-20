<template>
  <div class="OrderProgress">
    <ul>  
      <li>
        <div class="tit">起名师工作中</div>
        <div class="desc">
          预计在2018-01-01 19:00前 完成
        </div>
      </li>
      <li class="cur">
        <div class="tit">起名师工作中</div>
        <div class="desc">
          预计在2018-01-01 19:00前 完成
        </div>
        <span class="btn">查询进度</span>
      </li>
      <li>
        <div class="tit">起名师工作中</div>
        <div class="desc">
          预计在2018-01-01 19:00前 完成
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name:'OrderProgress',
  data() {
    return {
      myData: [
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条',
          '我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条我是竖向流程条'
      ]
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>
.OrderProgress ul{padding:.15rem 0 0 .2rem}
.OrderProgress ul li{position: relative;padding:0 0 .3rem .3rem;}
.OrderProgress ul li:after{position: absolute;content:"";left:0;top:5px;width:2px;height:100%;background-color:#E5E5E5;z-index:1;}

.OrderProgress ul li:before{content: "";width:12px;height:12px;background:#E5E5E5;position: absolute;left:-5px;top: 5px;border-radius: 50%;z-index:2}
.OrderProgress ul li:last-child:after{display:none}

.OrderProgress ul li .tit{
  font-size: 16px;
  color: #A49F99;
}
.OrderProgress ul li .desc{
  margin-top:5px;
  width:70%;
  font-size: 12px;
  color: #A49F99;
}
.OrderProgress ul li.cur:before{
  background-image:url(../assets/images/propress-cur.png);
  background-size:cover;
  width:24px;
  height:24px;
  left:-11px;
  top: 0px;
}
.OrderProgress ul li.cur .tit{
  color: #5D482E;
  font-weight:600
}
.OrderProgress ul li.cur .btn{position:absolute;right:.2rem;top:.1rem;background: #D2A871;border-radius: 4px;width:.64rem;height:.32rem;line-height:.32rem;color:#FFF;font-size:12px;text-align:center;}
</style>