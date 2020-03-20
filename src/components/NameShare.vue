<template>
  <div class="NameWraper">
    <div class="NameShare">


      <div class="gift-null-wraper">
        <span class="img"></span>
        <p class="desc">基努.里维斯在美祥起名网起了一个名字，邀请你一起来看一下。~</p>
        <span class="btn">查看评分结果</span>
      </div>

      <div class="gift-null-wraper gift-null-wraper-1">
        <span class="img"></span>
        <p class="desc desc-1">长按关注公众号“周易智慧生活”<br/>免费周易起名、测名</p>
      </div>
    </div>

  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
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
    },
    test:function(){
      MessageBox.alert('可提现金额(1688) = 累计金额(1988)- 已提现金额(294) - 服务费(6)!').then(action => {
        alert(666)
      });

    }
  }
}
</script>
<style scoped>
.NameWraper{
  height: 100%;
  position: fixed;
  width: 100%;
  overflow-y:auto;
  background-image:url(../assets/images/share-bg.png);
  background-size:contain;
}
.gift-null-wraper{text-align:center}
.gift-null-wraper .img{margin-top:.8rem;display:inline-block;width:.8rem;height:.8rem;background-image:url(../assets/images/gift-null-bg.png);background-size:contain;border-radius:50%}
.gift-null-wraper .tit{margin-top:.15rem;color:#5D482E}
.gift-null-wraper .desc{margin-top:.05rem;padding:0 .5rem;color:#5D482E;font-size:16px;}
.gift-null-wraper .btn{background-color:#D2A871;width:80%;display:inline-block;height:.5rem;line-height:.5rem;text-align:center;color:#FFF;border-radius:4px;margin-top:.6rem}

.gift-null-wraper-1 .img{
  width:1.2rem;
  height:1.2rem;
  background-image:url(../assets/images/gift-null-bg.png);
  background-size:contain;
  border-radius:0
}
.gift-null-wraper-1 .desc-1{
  padding:0 .8rem;
  font-size:12px;
}
</style>