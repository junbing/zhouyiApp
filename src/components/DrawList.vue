<template>
  <div class="DrawList">
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
    <section v-for="(val, key,index1) in tempSetArr" :key="index1"> 
      
        <div class="date">{{key}}</div>
        <ul class="draw-ls">
          <li v-for="(item,index2) in val">
            <div class="draw-t clearfix">
              <span>{{(item.totalAmount) | mumber }}</span>微信钱包
            </div>
            <p class="status">{{item.status==0? '处理中' : item.status==1? '已到账' :'提现失败'}}</p>
          </li>
        </ul>
    </section>
    <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'"
          :class="{'is-rotate': bottomStatus === 'drop'}"><mt-spinner type="snake"></mt-spinner></span>
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>

    </mt-loadmore>
    <div class="page-loaded" v-if="allLoaded">没有更多数据咯~</div> 

  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import {Indicator,Loadmore,MessageBox,Toast} from 'mint-ui'

export default {
  data() {
    return {
      getUserData : Util.authService().getLoginUser(),
      drawList:[],
      pNo: 1,
      pSize: 15,

      bottomPullTextVal: '上划加载更多数据',
      bottomDropTextVal: '释放更新',
      bottomLoadingTextVal: '加载中...',

      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      tempSetArr:[]
    }
  },
  filters: {  
      mumber: function (value) {  
          return (value/100).toFixed(2);  
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
    queryUserDrawList() {
      let that = this;
      let orderParams = {
          pNo:that.pNo,
          pSize:that.pSize
      };
      API.queryWithdrawalsList(orderParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {

          if(result.data.length > 0 ) {
            that.drawList = that.drawList.concat(result.data);
            var tmpObj = {},
                k;
                that.drawList.forEach(function(data, index, array){
                  k = array[index].createTime.substring(0, 10);
                  if(tmpObj[k]) {
                    if(Object.prototype.toString.call(tmpObj[k]) != '[object Array]') {
                      tmpObj[k] = [];
                    }
                    tmpObj[k].push(data);
                  } else {
                    if(Object.prototype.toString.call(tmpObj[k]) != '[object Array]') {
                      tmpObj[k] = [];
                    }
                    tmpObj[k].push(data);
                  }
                    
                });

            that.tempSetArr = tmpObj;
            console.log(that.tempSetArr);
          } else {
            that.allLoaded = true;
          }

          
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    },

    loadBottom () {
      let that = this;
      that.pNo++;
      
      that.allLoaded = true;
      that.$refs.loadmore.onBottomLoaded();
      that.queryUserDrawList();

    },

    handleBottomChange(status){
      this.bottomStatus = status;
    }
    
  },
  mounted() {
    //关闭授权登录后的loading
    Indicator.close();

    this.queryUserDrawList();

    this.wrapperHeight = document.documentElement.clientHeight

  }
}
</script>
<style scoped>
.DrawList{
   background:#f7f5f3;
   height: 100%;
   position: fixed;
   width: 100%;
   overflow-y:auto;
}
.DrawList .date{
  padding-left:.15rem;
  height:.3rem;
  line-height:.3rem;
  font-size: 12px;
  color: #A49F99;
}
.DrawList .draw-ls{

  background:#FFF;
}
.DrawList .draw-ls li{
  position:relative;

  padding:.1rem .2rem;
}
.DrawList .draw-ls li .draw-t span{
  float:right;
  font-size: 18px;
  color: #D2A871;
}

.DrawList .draw-ls li:after{
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
.DrawList .draw-ls li .status{
  text-align:right;
  font-size: 12px;
  color: #A49F99;
}
</style>