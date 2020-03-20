<template>
  <div class="HighScoreCard">
      <div class="score_title">高分卡<span class="desc">总计：{{cardTotal}}张&emsp;剩余：{{cardSurplus}}张</span> <span class="btn" @click="jumpTo('/UnlockHighScore')">立即购买</span></div>
      <div class="score_ls_tit">高分卡使用记录</div>
      <div class="score_wraper_each" v-for="(item,index) in cardList">
          <div class="titl">{{cardList[index][0].usedTime}}&emsp;姓氏：{{cardList[index][0].familyName}}&emsp;性别：{{cardList[index][0].sex==1?"男":"女"}} <!--宜用五行：土火--></div>
          <ul class="clearfix">
            <li  v-for="(items,index) in item" v-if="index>0" @click="jumpTo('/NameDetail?id=',items.id)">{{items.fullName}}</li>
          </ul>
      </div>
      <div class="common-null" v-if="cardList.length==0"><span class="n-icon"></span>暂无使用记录</div>

  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import { Toast,Indicator } from 'mint-ui'




export default {
  data() {
    return {
      cardList:[],
      userData:Util.authService().getLoginUser(),
      cardTotal:Util.authService().getLoginUser().cardNum,
      cardSurplus:Util.authService().getLoginUser().cardNum - Util.authService().getLoginUser().usedNum
      
    }
  },
  methods: {
    jumpTo(url,el) {
      let that = this;

      let URL = (el||el==0)? url+el : url;
      that.defaultActiveIndex = URL;
      that.$router.push(URL); //用go刷新
    },

    queryCardRecordList(){
      let that = this;
      API.queryCardRecordList({}).then(function (result) {
        that.loading = false;
        Indicator.close();
        if (result && result.code==0) {
          that.cardList = result.data;
          console.log(that.cardList);
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    }
  },

  mounted() {
    this.queryCardRecordList();
  }
}
</script>
<style scoped>
.HighScoreCard{
  background-color:#F7F5F3;
}
.score_title{
  padding:0 .15rem;
  height:.5rem;
  line-height:.5rem;
  position:relative;
  background-color:#FFF
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
.score_ls_tit{
  padding-left: .15rem;
  height: .4rem;
  line-height: .45rem;
  border-top:1px solid #eee;
  border-bottom:1px solid #eee;
  background: #F7F5F3;
  font-size: 12px;
  color: #A49F99;
}

.score_wraper_each .titl{
  padding:0 .15rem;
  border-bottom:1px solid #eee;
  height:.3rem;
  line-height:.3rem;
  background-color:#FFF
}
.score_wraper_each ul{
  margin-bottom:.15rem;
  padding-bottom:.1rem;
  border-bottom:1px solid #eee;
  background-color:#FFF
}
.score_wraper_each ul li{
  float:left;
  border:1px solid #D2A871;
  color:#5D482E;
  padding:0 .15rem;
  height:.3rem;
  line-height:.3rem;
  border-radius:4px;
  margin-left:.15rem;
  margin-top:.1rem;
}

/*空状态*/
.common-null{
  font-size: 16px;
  color: #5D482E;
  letter-spacing: 0;
  text-align: center;
}
.common-null .n-icon{
  margin:.8rem auto 10px;
  display:block;
  width:.68rem;
  height:.73rem;
  background-image: url(../assets/images/common-null.png);
  background-size: cover;
  background-repeat:no-repeat;

}
</style>
