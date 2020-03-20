/**
 * Created by chenjunbing on 2018/5/23.
 * 用户相关api
 */
var __API='apis';

import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/'+__API+'/user/login', params)
  },
  //首页文章列表
  queryArticlePageList: params => {
    return API.POST('/'+__API+'/article/queryArticlePageList', params)
  },

  //文章内容
  getArticleInfo: params => {
    return API.POST('/'+__API+'/article/getArticleInfo', params)
  },
  

  /*************会员有关 start****************/
  //用户礼物列表
  queryUserGiftList: params => {
    return API.POST('/'+__API+'/member/queryUserGiftList', params)
  },

  //开通会员
  openMember: params => {
    return API.POST('/'+__API+'/member/openMember', params)
  },

  //升级库
  upgradeNameLib: params => {
    return API.POST('/'+__API+'/member/upgradeNameLib', params)
  },

  //转发回调
  transferCallback: params => {
    return API.POST('/'+__API+'/member/transferCallback', params)
  },


  

  /*************智能起名信息提交 start****************/

  //取名
  intelForname: params => {
    return API.POST('/'+__API+'/member/intelForname', params)
  },
  //获取起名结果列表
  queryNameResultList: params => {
    return API.POST('/'+__API+'/member/queryNameResultList', params)
  },
  //获取名字详解
  getNameExplain: params => {
    return API.POST('/'+__API+'/member/getNameExplain', params)
  },
  //名字测评详解
  testNameExplain: params => {
    return API.POST('/'+__API+'/member/testNameExplain', params)
  },
  //收藏名字
  doCollectionName: params => {
    return API.POST('/'+__API+'/member/doCollectionName', params)
  },
  //收藏列表
  queryCollectionNameList: params => {
    return API.POST('/'+__API+'/member/queryCollectionNameList', params)
  },
  /*************智能起名信息提交 end****************/





  /*************订单有关 start****************/
  //用户订单列表
  queryOrderPageListByUser: params => {
    return API.POST('/'+__API+'/order/queryOrderPageListByUser', params)
  },

  //提现
  toWithdrawals: params => {
    return API.POST('/'+__API+'/order/toWithdrawals', params)
  },

  //提现记录
  queryWithdrawalsList: params => {
    return API.POST('/'+__API+'/order/queryWithdrawalsList', params)
  },

  //订单支付
  payOrder: params => {
    return API.POST('/'+__API+'/order/payOrder', params)
  },

  /*************订单有关 end****************/


  /*************分享转发 start*************/
  getWXShareSign: params => {
    return API.POST('/'+__API+'/uc/share/getWXShareSign', params)
  },
  /*************分享转发 end*************/

  /*************人工起名 start*************/
  enroll: params => {
    return API.POST('/'+__API+'/member/intelFornameRegister', params)
  },

  queryOrder: params => {
    return API.POST('/'+__API+'/order/getOrderDetail', params)
  },

  personFornameRegister: params => {
    return API.POST('/'+__API+'/member/personFornameRegister', params)
  },

  /*************人工起名 end*************/

  /*************高分卡 start*************/
  queryCardRecordList: params => {
    return API.POST('/'+__API+'/member/queryCardRecordList', params)
  },
  addCard: params => {
    return API.POST('/'+__API+'/member/addCard', params)
  },
  unlock: params => {
    return API.POST('/'+__API+'/member/unlock', params)
  },

  getStatisData: params => {
    return API.POST('/'+__API+'/member/getStatisData', params)
  }

  /*************高分卡 end*************/

}
