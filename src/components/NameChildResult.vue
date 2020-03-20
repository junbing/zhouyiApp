<template>
  <div class="OrderList">
    <div class="orderList" :style="{height: wrapperHeight + 'px'}">
      <!--<mt-loadmore

        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 

        :auto-fill="false"
        :bottomPullText='bottomPullTextVal'
        :bottomDropText='bottomDropTextVal'
        :bottomLoadingText='bottomLoadingTextVal'
      >-->
        <ul class="order-list">
          <li v-for="(item,index) in orderList" :key="index">
            <div class="tit" @click="jumpTo('/NameDetail?id=',item.id)">
              <div class="order-number">
                <div class="name">
                  <p v-if="!JSON.parse(item.nameDetail).combine_char2">{{JSON.parse(item.nameDetail).surname}}{{JSON.parse(item.nameDetail).combine_char1}}</p>
                  <p v-if="JSON.parse(item.nameDetail).combine_char2">{{JSON.parse(item.nameDetail).surname}}{{JSON.parse(item.nameDetail).combine_char1}}{{JSON.parse(item.nameDetail).combine_char2}}</p>
                  <p v-if="JSON.parse(item.nameDetail).combine_char3">{{JSON.parse(item.nameDetail).surname}}{{JSON.parse(item.nameDetail).combine_char1}}{{JSON.parse(item.nameDetail).combine_char2}}{{JSON.parse(item.nameDetail).combine_char3}}</p>

                  <p class="n-s" v-if="!JSON.parse(item.nameDetail).combine_char2_wuxing">{{JSON.parse(item.nameDetail).surname_wuxing}}{{JSON.parse(item.nameDetail).combine_char1_wuxing}}{{JSON.parse(item.nameDetail).combine_char2_wuxing}}</p>
                  <p class="n-s" v-if="JSON.parse(item.nameDetail).combine_char2_wuxing">{{JSON.parse(item.nameDetail).combine_char2_wuxing}}{{JSON.parse(item.nameDetail).combine_char1_wuxing}}{{JSON.parse(item.nameDetail).combine_char2_wuxing}}</p>
                  <p class="n-s" v-if="JSON.parse(item.nameDetail).combine_char3_wuxing">{{JSON.parse(item.nameDetail).combine_char3_wuxing}}{{JSON.parse(item.nameDetail).combine_char1_wuxing}}{{JSON.parse(item.nameDetail).combine_char2_wuxing}}{{JSON.parse(item.nameDetail).combine_char3_wuxing}}</p>
                </div>
                <!--<div class="name-change" @click="jumpTo('/NameChange')">
                  <a>变换“良”</a>
                  <a>变换“文”</a>
                </div>-->
                <div class="desc" v-if="((JSON.parse(item.nameDetail).score) | keepTowNum) >= 80">
                  <p><span>{{(JSON.parse(item.nameDetail).score) | keepTowNum}}分</span></p>
                  <p class="n-s">综合评分</p>
                </div>

                <div class="desc" v-if="((JSON.parse(item.nameDetail).score) | keepTowNum) < 80" @click.stop @click="jumpTo('/UnlockHighScore')">
                  <p><span>{{(JSON.parse(item.nameDetail).score) | keepTowNum}}分</span></p>
                  <p class="n-s" >分数低？解锁高分</p>
                  
                </div>


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
                <span></span><i>{{item.isFavorite==1?'取消收藏':'添加收藏'}}</i>
              </li>
              <li @click="doShare(item,item.id)">
                <span></span>转发
              </li>
              <li @click="jumpTo('/NameDetail?id=',item.id)">
                <span></span>名字详解
              </li>
            </ol>
          </li>


        </ul>
      <!--</mt-loadmore>-->
      <div class="page-loaded" v-if="allLoaded">没有更多数据咯~</div>
      <div class="common-null" v-if="orderList.length==0 || requireId=='' "><span class="n-icon"></span>名字搜索为空</div>
      <mt-popup
        v-model="popupVisible"
        position="top">
        <div class="wx-share-modal" @click="handlerPop">
        </div>
      </mt-popup>
      


    </div>

    <mt-tabbar>
      <div class="set-meal-wraper">
        <div class="btn" @click="nextPageBtn">换一批</div>
      </div>
    </mt-tabbar>

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
      userData:Util.authService().getLoginUser(),
      isUsedCard:0,
      orderList:[],
      pNo: 1,
      pSize: 5,
      popupVisible:false,

      requireId:'',

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

    updateUserData(){
      let that = this;
      API.getStatisData({}).then(function(res){
        if(res.code==0){

          let userData = Util.authService().getLoginUser();



          let setLoginUser = {

            giftNum    : userData.giftNum,
            headImage  : userData.headImage,
            id         : userData.id,
            nickName   : userData.nickName,
            openMemberFee:userData.openMemberFee,
            orderNum   : userData.orderNum,
            sex        : userData.sex,
            userType   : userData.userType,

            cardNum  : res.data.cardNum,
            collectNum : res.data.collectNum,
            unLock : res.data.unLock,
            usedNum : res.data.usedNum

          }

          Util.authService().cacheLoginUser(setLoginUser);
          that.userData = Util.authService().getLoginUser();

        }else{
          Toast(res.msg);
        }
      })
    },

    queryNameResultList() {
      let that = this;


      that.articleList = Util.sessionStorageService().getObject("nameChildResult");
      that.orderList = that.orderList.concat(that.articleList);
      if(that.orderList.length){
        that.requireId = that.orderList[0].requireId;
      }
      

      /*let orderParams = {
          pNo:that.pNo,
          pSize:that.pSize
      };
      API.queryNameResultList(orderParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {

          if(result.data.length == that.pSize) {
            
            
          } else {
            that.orderList = that.orderList.concat(result.data);
            that.allLoaded = true;
          }
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });*/
    },

    nextPageBtn(){
      let that = this;
      //若需要请求接口时，显示加载动画
      Indicator.open({
        text : '请稍候...',
        spinnerType: 'fading-circle'
      });

      let CardNums =  that.userData.cardNum?(that.userData.cardNum-that.userData.usedNum):'0';
      //若有高分卡，则提示是否使用高分卡，否则直接取名
      if(CardNums>0){
       MessageBox.confirm('', { 
          message: '您有'+CardNums+'张高分卡，是否使用一张获取高分姓名？', 
          title: '', 
          confirmButtonText: '使用', 
          cancelButtonText: '不使用' 
        }).then(action => { 
          if (action == 'confirm') { //确认的回调
             that.isUsedCard = 1;
             that.prepay();
          }
        }).catch(err => { 
          if (err == 'cancel') { //取消的回调
             that.isUsedCard = 0;
             that.prepay();
          } 
        });
      }else{
       that.prepay();
      }


      
      
    },

    prepay(){
      let that = this;
      if(!that.requireId) {
        Indicator.close();
        return Toast('名字搜索为空');
      }

      API.intelForname({requireId:that.requireId,isUsedCard:that.isUsedCard}).then(function (res) {
        that.loading = false;
        that.orderList=[];
        if(res.code == '0') {
          Indicator.close();
          that.orderList = that.orderList.concat(res.data.list);
          Util.sessionStorageService().setObject("nameChildResult",that.orderList);
          that.updateUserData();
        } else{
          //let instance = Toast(res.msg);
          setTimeout(() => {
            Indicator.close();
            let URL = '/Author';
            that.defaultActiveIndex = URL;
            that.$router.push(URL); //用go刷新
          }, 2000);
        }
      })
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
              that.orderList[index].isFavorite=is_Favorite;
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
        let shareUrl = window.location.protocol + '//' + window.location.host +'/zhouyiApp/#/NameDetail?id='+id+'&isShare=1';

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
      that.queryNameResultList();



    },

    handleBottomChange(status){
      this.bottomStatus = status;
    }
  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();

    this.queryNameResultList();
    this.updateUserData();

    Util.wxShareService().init();

    this.wrapperHeight = document.documentElement.clientHeight

  }
}
</script>
<style scoped>
.order-list{padding:.12rem .15rem .5rem}
.order-list > li{margin-bottom:.15rem;border:1px solid #F1E4D4;border-radius:4px;}
.order-list > li .tit{position:relative;margin:0 .15rem;height:.6rem;}
.order-list > li .tit .order-number{float:left;margin-top:.15rem;width:100%;}
.order-list > li .tit .order-number .name{
  position:absolute;
  left:0;
  white-space:nowrap;
  color:#5D482E;
  font-weight:600;
  text-align:center;
}
.order-list > li .tit .order-number .n-s{
  font-size:12px;
  color:#A49F99
}
.order-list > li .tit .order-number .desc{
  color:#A49F99;
  position:absolute;
  right:0;
  top:.1rem;
  text-align:center;
}
.order-list > li .tit .order-number .desc span{
  font-size:16px;
  color:#D2A871
}
.order-list > li .tit .order-status{position:absolute;right:0;top:50%;margin-top:-.16rem;background: #D2A871;border-radius: 4px;width:.64rem;height:.32rem;line-height:.32rem;color:#FFF;font-size:12px;text-align:center;}


.order-list > li .tit:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}

.order-list > li .tit .order-number .name-change{
  height:.35rem;
  line-height:.35rem;
  text-align:center;
  width:100%;
}

.order-list > li .tit .order-number .name-change a{
  margin-right:.1rem;
  color:#D2A871;
  font-size:.16rem;
}


.order-detail{margin:0 .15rem;padding:.15rem 0;color: #A49F99;}
.order-detail p{
  margin-bottom:5px;
}

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
.OrderList .mint-tabbar{
    position: fixed;
    height: .5rem;
    line-height: .5rem;
    background-image: none;
    box-shadow: 0 -1px 2px 0 rgba(93,72,46,.1);
    z-index: 2;
}
.OrderList .set-meal-wraper{
  width: 100%;

}
.OrderList .set-meal-wraper .btn {
    display: block;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    color: #FFF;
    background: #D2A871;
    font-size: .16rem;
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