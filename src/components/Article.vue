<template>
  <div class="Article">
    <div class="title">{{article.title?article.title:''}}</div>
    <div class="content">
    </div>
  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      article:{}
    }
  },
  methods: {
    handleLogin() {
      let that = this;
      if(!Util.getRequest().id) return Toast('文章参数错误');
      let loginParams = {
        id:Util.getRequest().id
      };
      API.getArticleInfo(loginParams).then(function (result) {
        that.loading = false;
        if (result && result.code==0) {
          that.article = result.data;
          $(".content").html(that.article.content);
        } else if(result.code==1000) {
          Toast('请先登录');
        }else{
          Toast('登录异常');
        }
      });
    }
  },
  mounted() {
    this.handleLogin();
  }

}
</script>

<style scoped>
.Article{padding:0.15rem;}
.Article .title{text-align:left;color:#5D482E;font-size:.16rem;font-weight:600;font-family: PingFangSC-Medium;}
.Article .content{padding:.1rem 0}
.Article .content p{padding-bottom:.1rem;}
</style>
<style>
.Article .content img{width:100%}
</style>