<template>
  <div class="OrderList">
    <div class="orderList" :style="{height: wrapperHeight + 'px'}">
      <mt-loadmore

        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 

        :auto-fill="false"
        :bottomPullText='bottomPullTextVal'
        :bottomDropText='bottomDropTextVal'
        :bottomLoadingText='bottomLoadingTextVal'
      >
      <ul class="order-list">
        <li v-for="(item,index) in orderList" :key="index">
          <div class="tit" @click="jumpTo('/NameDetail?id=',item.id)">
            <div class="order-number">
              <p class="name">{{item.surname+JSON.parse(item.nameDetail).combine}}</p>
              <p class="desc">综合评分：<span>{{(JSON.parse(item.nameDetail).score) | keepTowNum}}</span>分</p>
            </div>
            <!--<span class="order-status">查看详情</span>-->
          </div>
          <div class="order-detail" @click="jumpTo('/NameDetail?id=',item.id)">
            <p v-if="JSON.parse(item.nameDetail).combine_char1_description">{{JSON.parse(item.nameDetail).combine_char1}}：{{JSON.parse(item.nameDetail).combine_char1_description}}</p>
            <p v-if="JSON.parse(item.nameDetail).combine_char2_description">{{JSON.parse(item.nameDetail).combine_char2}}：{{JSON.parse(item.nameDetail).combine_char2_description}}</p>
            <p v-if="JSON.parse(item.nameDetail).combine_char3_description">{{JSON.parse(item.nameDetail).combine_char3}}：{{JSON.parse(item.nameDetail).combine_char3_description}}</p>
          </div>
          <ol class="col-handdle">
            <li @click="doCollectionName(item.id,item.isFavorite,index)">
              <span></span>取消收藏
            </li>
            <li @click="doShare(item,item.id)">
              <span></span>转发
            </li>
            <!--<li>
              <span></span>评论(5)
            </li>-->
          </ol>
        </li>

        
      </ul>

      </mt-loadmore>
      <div class="page-loaded" v-if="allLoaded && orderList.length!=0">没有更多数据咯~</div>
      <div class="common-null" v-if="orderList.length==0"><span class="n-icon"></span>名字收藏为空</div>
      <mt-popup
        v-model="popupVisible"
        position="top">
        <div class="wx-share-modal" @click="handlerPop">
        </div>
      </mt-popup>

    </div>

  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import {Indicator,Loadmore,MessageBox,Toast} from 'mint-ui'

export default {
  name:'NameChildResult',
  data() {
    return {
      orderList:[],
      pNo: 1,
      pSize: 5,
      popupVisible:false,

      bottomPullTextVal: '上划加载更多数据',
      bottomDropTextVal: '释放更新',
      bottomLoadingTextVal: '加载中...',

      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0
    }
  },
  filters: {
    keepTowNum: function (value) {
      let realVal = Number(value).toFixed(2)
      return realVal;
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

    queryCollectionNameList() {
      let that = this;
      let orderParams = {
          pNo:that.pNo,
          pSize:that.pSize
      };
      API.queryCollectionNameList(orderParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {

          if(result.data.length == that.pSize) {
            console.log(222);
            that.orderList = that.orderList.concat(result.data);
            //[].push.apply(that.orderList, result.data);
            console.log(that.orderList);
          } else {
            that.orderList = that.orderList.concat(result.data);
            that.allLoaded = true;
          }
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    },

    doCollectionName(id,isFavorite,index) {
      let is_Favorite = isFavorite==1?0:1;
      let is_FavoriteTxt = isFavorite==1?'取消':'添加';
      let that = this;
      let orderParams = {
          id:id,
          isFavorite:is_Favorite
      };
      MessageBox.confirm('你是否'+is_FavoriteTxt+'收藏？','').then(action => {
        API.doCollectionName(orderParams).then(function (result) {
          that.loading = false;
          if (result && result.code==0) {

            let instance = Toast('操作成功');
            setTimeout(() => {
              instance.close();
              that.orderList.splice(index,1);
            }, 2000);

          } else if(result.code==1000) {
            Toast('请先登录');
          }else{
            Toast('登录异常');
          }
        });
      });
      
    },

    handlerPop(){
      let that = this;
      that.popupVisible = false;
      
    },

    doShare(item,id){
        let that = this;
        let nameId = id;
        that.popupVisible = true;
        let shareUrl = window.location.protocol + '//' + window.location.host +'/zhouyiApp/?from=singlemessage#/NameDetail?id='+id;

        let shareName = '';
        if(!JSON.parse(item.nameDetail).combine_char2){
          shareName = JSON.parse(item.nameDetail).surname+JSON.parse(item.nameDetail).combine_char1;
        }

        if(JSON.parse(item.nameDetail).combine_char2){
          shareName = JSON.parse(item.nameDetail).surname+JSON.parse(item.nameDetail).combine_char1+JSON.parse(item.nameDetail).combine_char2;
        }

        if(JSON.parse(item.nameDetail).combine_char3){
          shareName = JSON.parse(item.nameDetail).surname+JSON.parse(item.nameDetail).combine_char1+JSON.parse(item.nameDetail).combine_char2+JSON.parse(item.nameDetail).combine_char3;
        }

        let shareUserInfoLink = {
          title: shareName+' - 姓名详解' || '',
          //下面是微信的两个字段，和上面的字段名不一样
          imgUrl: window.location.protocol + '//' + window.location.host +'/zhouyiApp/logo.png',
          link: shareUrl,
          desc: '全面解读姓名所包含的文化印象、周易命理、生肖宜忌、五格数理信息，助你轻松挑选好名字',
          type:'link'
        };



        shareUserInfoLink.success = function () {
            //统计
            console.log('进回调方法1');
            API.transferCallback({id:nameId}).then(function (result) {
              console.log('进回调方法2');
              that.loading = false;
              if (result && result.code==0) {

                let instance = Toast('转发成功');
                setTimeout(() => {
                  instance.close();
                  that.popupVisible = false;
                }, 1500);

              } else if(result.code==1000) {
                Toast('请先登录');
              }else{
                Toast('登录异常');
              }
            });
            

        };
        //用户取消分享后执行的回调函数
        shareUserInfoLink.cancel = function () { 
            Toast('转发失败');
        }
        Util.wxShareService().setShareInfo(shareUserInfoLink); //设置微信分享信息
        

        
    
    },

    

    loadBottom () {
      let that = this;
      that.pNo++;
      
      that.allLoaded = true;
      that.$refs.loadmore.onBottomLoaded();
      that.queryCollectionNameList();



    },

    handleBottomChange(status){
      this.bottomStatus = status;
    }
  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();

    this.queryCollectionNameList();

    Util.wxShareService().init();

    this.wrapperHeight = document.documentElement.clientHeight

  }
}
</script>
<style scoped>
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
  background-image:url(../assets/images/col-3.png);
  background-size:cover;
}
</style>

<style>
.wx-share-modal{

  position:absolute;
  right:-160px;
  top:20px;
  width:212px;
  height:224px;
  background-image: url(../assets/images/shareArrow.png);
  background-size:cover;
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
