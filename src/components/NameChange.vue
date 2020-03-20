<template>
  <div class="NameChange">
    <div>  
      <div class="name-change-tab">  
        <mt-button v-bind:class="{'cur':active == 'tab-container1'}" size="small" @click.native.prevent="active = 'tab-container1'">五行相同</mt-button>  
        <mt-button v-bind:class="{'cur':active == 'tab-container2'}" size="small" @click.native.prevent="active = 'tab-container2'">五行相同</mt-button>  
        <mt-button v-bind:class="{'cur':active == 'tab-container3'}" size="small" @click.native.prevent="active = 'tab-container3'">部首相同</mt-button>
      </div>  
        
      <div class="page-tab-container">  
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
          <mt-tab-container-item id="tab-container1">  
            <div class="name-change-wraper">
              <ul class="order-list">
                <li>
                  <div class="tit">
                    <div class="order-number">
                      <p class="name">刘良文</p>
                      <p class="desc">综合评分：<span>85</span>分</p>
                    </div>
                    <!--<span class="order-status">查看详情</span>-->
                  </div>
                  <div class="order-detail">良：本义为善良，另外良字的含义有很多，主要有良好、杰出、优秀、贤良、温良、和悦等。用在名字中一般取其温良、杰出、优秀的含义。文：本义为花纹，纹理。在人名中引申为智慧、文采、才华、美德、涵养、温厚等含义。
                  </div>
                  <ol class="col-handdle">
                    <li>
                      <span></span>取消收藏
                    </li>
                    <li>
                      <span></span>转发
                    </li>
                    <li @click="jumpTo('/NameDetail')">
                      <span></span>名字详解
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="tab-container2">  
            <div class="name-change-wraper">
              <ul class="order-list">
                <li>
                  <div class="tit">
                    <div class="order-number">
                      <p class="name">刘良文</p>
                      <p class="desc">综合评分：<span>85</span>分</p>
                    </div>
                    <!--<span class="order-status">查看详情</span>-->
                  </div>
                  <div class="order-detail">良：本义为善良，另外良字的含义有很多，主要有良好、杰出、优秀、贤良、温良、和悦等。用在名字中一般取其温良、杰出、优秀的含义。文：本义为花纹，纹理。在人名中引申为智慧、文采、才华、美德、涵养、温厚等含义。
                  </div>
                  <ol class="col-handdle">
                    <li>
                      <span></span>取消收藏
                    </li>
                    <li>
                      <span></span>转发
                    </li>
                    <li @click="jumpTo('/NameDetail')">
                      <span></span>名字详解
                    </li>
                  </ol>
                </li>
              </ul>  
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="tab-container3">  
            <div class="name-change-wraper">
              <ul class="order-list" v-if="false">
                <li>
                  <div class="tit">
                    <div class="order-number">
                      <p class="name">刘良文</p>
                      <p class="desc">综合评分：<span>85</span>分</p>
                    </div>
                    <!--<span class="order-status">查看详情</span>-->
                  </div>
                  <div class="order-detail">良：本义为善良，另外良字的含义有很多，主要有良好、杰出、优秀、贤良、温良、和悦等。用在名字中一般取其温良、杰出、优秀的含义。文：本义为花纹，纹理。在人名中引申为智慧、文采、才华、美德、涵养、温厚等含义。
                  </div>
                  <ol class="col-handdle">
                    <li>
                      <span></span>取消收藏
                    </li>
                    <li>
                      <span></span>转发
                    </li>
                    <li @click="jumpTo('/NameDetail')">
                      <span></span>名字详解
                    </li>
                  </ol>
                </li>
              </ul> 
              <div class="data-null">
                <span class="icon"></span>
                <p class="f16">抱歉，您目前还不能查看此内容</p>
                <p class="f14">此内容仅供VIP用户查看</p>
                <div class="set-meal-wraper">
                  <div class="btn">升级为VIP用户</div>
                </div>
              </div>
            </div>
          </mt-tab-container-item>  
        </mt-tab-container>  
      </div>  
    </div> 






    
  </div>
</template>

<script>
import { TabContainer, TabContainerItem } from 'mint-ui';
export default {
  name:'NameChange',
  data() {
    return {
      active:'tab-container1'
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
.name-change-tab{
  position:relative;
  height:.42rem;
  line-height:.40rem;
  padding:0 .15rem;
}
.name-change-tab:after{
  position:absolute;
  content:" ";
  bottom:0;
  left:0;
  height:2px;
  width:100%;
  background-color:#F1E4D4;
  -webkit-transform: scale(1,.5);
  transform: scale(1,.3);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom
}
.name-change-tab .mint-button--small{
  float:left;
  width:33.33%;
  text-align:center;
  background-color:transparent;
  box-shadow: 0 0 1px transparent;
  border-radius:0;
  height:.42rem;
  line-height:.40rem;
  color:#5D482E
}
.name-change-tab .mint-button--small.cur{
  color:#D2A871;
  border-bottom:1px solid #D2A871
}
.name-change-wraper{
  min-height:3rem;
}
.name-change-wraper .data-null{
  padding-top:.6rem;
  text-align:center;

}
.name-change-wraper .data-null .icon{
  display:inline-block;
  width:1.42rem;
  height:.84rem;
  background-image:url(../assets/images/data-null.png);
  background-size:cover;
}
.name-change-wraper .data-null .f16{
  margin-top:.1rem;
  font-size:.16rem;
}
.name-change-wraper .data-null .f14{
  margin-top:.06rem;
  font-size:.14rem;
  color:#A49F99
}

.order-list{padding:.12rem .15rem}
.order-list > li{margin-bottom:.15rem;border:1px solid #F1E4D4;border-radius:4px;}
.order-list > li .tit{position:relative;margin:0 .15rem;height:.5rem;}
.order-list > li .tit .order-number{float:left;margin-top:.15rem;}
.order-list > li .tit .order-number .name{
  color:#5D482E;
  font-weight:600
}
.order-list > li .tit .order-number .desc{
  padding-top:5px;
  color:#A49F99;
  position:absolute;
  right:0;
  top:.1rem;
}
.order-list > li .tit .order-number .desc span{
  font-size:16px;
  color:#D2A871
}
.order-list > li .tit .order-status{position:absolute;right:0;top:50%;margin-top:-.16rem;background: #D2A871;border-radius: 4px;width:.64rem;height:.32rem;line-height:.32rem;color:#FFF;font-size:12px;text-align:center;}


.order-list > li .tit:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}


.order-detail{margin:0 .15rem;padding:.15rem 0;color: #A49F99;}

.col-handdle{
  border-top:1px solid #F1E4D4;
  height:.4rem;
  line-height:.4rem;
}
.col-handdle li{
  float:left;
  width:33.33%;
  text-align:center;
}
.col-handdle li span{
  display:inline-block;
  margin-right:2px;
  width:24px;
  height:24px;
  vertical-align:middle;
  
}
.col-handdle li:nth-child(1) span{
  background-image:url(../assets/images/col-1.png);
  background-size:cover;
}
.col-handdle li:nth-child(2) span{
  background-image:url(../assets/images/col-2.png);
  background-size:cover;
}
.col-handdle li:nth-child(3) span{
  background-image:url(../assets/images/col-4.png);
  background-size:cover;
}

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
</style>