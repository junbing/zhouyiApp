import Vue from 'vue'
import Router from 'vue-router'
import Util from '../common/util'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Home = resolve => require(['@/components/Home'], resolve)
const Index = resolve => require(['@/components/Index'], resolve)

const Article = resolve => require(['@/components/Article'], resolve)

const OrderList = resolve => require(['@/components/OrderList'], resolve)
const OrderProgress = resolve => require(['@/components/OrderProgress'], resolve)

const GiftList = resolve => require(['@/components/GiftList'], resolve)

const MemberRole = resolve => require(['@/components/MemberRole'], resolve)

const DrawSuc = resolve => require(['@/components/DrawSuc'], resolve)
const DrawList = resolve => require(['@/components/DrawList'], resolve)

const IntelligentName = resolve => require(['@/components/IntelligentName'], resolve)
const Enroll = resolve => require(['@/components/Enroll'], resolve)
const NameChildResult = resolve => require(['@/components/NameChildResult'], resolve)
const NameCollect = resolve => require(['@/components/NameCollect'], resolve)
const NameChange = resolve => require(['@/components/NameChange'], resolve)
const NameDetail = resolve => require(['@/components/NameDetail'], resolve)
const NameScore = resolve => require(['@/components/NameScore'], resolve)
const NamePromote = resolve => require(['@/components/NamePromote'], resolve)
const NameShare = resolve => require(['@/components/NameShare'], resolve)

const NotFound = resolve => require(['@/components/NotFound'], resolve)

const Author = resolve => require(['@/components/Author'], resolve)
const Progress = resolve => require(['@/components/Progress'], resolve)
const WeiXinPlatForm = resolve => require(['@/components/WeiXinPlatForm'], resolve)

const HighScoreCard = resolve => require(['@/components/HighScoreCard'], resolve)
const UnlockHighScore = resolve => require(['@/components/UnlockHighScore'], resolve)

const ArtificialName = resolve => require(['@/components/ArtificialName'], resolve)
const ArtificialForm = resolve => require(['@/components/ArtificialForm'], resolve)
const RechargeSuc = resolve => require(['@/components/RechargeSuc'], resolve)



Vue.use(Router)



let router = new Router({
  routes: [

    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '周易起名'
      }
    },

    {
      path: '/Article',
      name: 'Article',
      component: Article,
      meta: {
        title: '文章详情'
      }
    },


    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '我的订单'
      }
    },

    {
      path: '/OrderProgress',
      name: 'OrderProgress',
      component: OrderProgress,
      meta: {
        title: '订单进度'
      }
    },

    {
      path: '/GiftList',
      name: 'GiftList',
      component: GiftList,
      meta: {
        title: '收到的礼物'
      }
    },

    {
      path: '/MemberRole',
      name: 'MemberRole',
      component: MemberRole,
      meta: {
        title: '会员服务'
      }
    },

    {
      path: '/IntelligentName',
      name: 'IntelligentName',
      component: IntelligentName,
      meta: {
        title: '智能起名'
      }
    },

    {
      path: '/enroll',
      name: 'Enroll',
      component: Enroll,
      meta: {
        title: '人工起名登记'
      }
    },

    {
      path: '/NameChildResult',
      name: 'NameChildResult',
      component: NameChildResult,
      meta: {
        title: '起名结果'
      }
    },

    {
      path: '/NameChange',
      name: 'NameChange',
      component: NameChange,
      meta: {
        title: '名字变换'
      }
    },

    {
      path: '/NameCollect',
      name: 'NameCollect',
      component: NameCollect,
      meta: {
        title: '名字收藏'
      }
    },

    {
      path: '/NameDetail',
      name: 'NameDetail',
      component: NameDetail,
      meta: {
        title: '名字详情'
      }
    },

    {
      path: '/NameScore',
      name: 'NameScore',
      component: NameScore,
      meta: {
        title: '名字评分'
      }
    },

    {
      path: '/NamePromote',
      name: 'NamePromote',
      component: NamePromote,
      meta: {
        title: '升级姓名库'
      }
    },
    {
      path: '/NameShare',
      name: 'NameShare',
      component: NameShare,
      meta: {
        title: '名字分享'
      }
    },
    {
      path: '/DrawSuc',
      name: 'DrawSuc',
      component: DrawSuc,
      meta: {
        title: '提现成功'
      }
    },

    {
      path: '/RechargeSuc',
      name: 'RechargeSuc',
      component: RechargeSuc,
      meta: {
        title: '付款成功'
      }
    },

    

    {
      path: '/progress',
      name: 'Progress',
      component: Progress,
      meta: {
        title: '进度查询'
      }
    },

    {
      path: '/DrawList',
      name: 'DrawList',
      component: DrawList,
      meta: {
        title: '提现记录'
      }
    },

    {
      path: '/HighScoreCard',
      name: 'HighScoreCard',
      component: HighScoreCard,
      meta: {
        title: '高分卡'
      }
    },

    {
      path: '/UnlockHighScore',
      name: 'UnlockHighScore',
      component: UnlockHighScore,
      meta: {
        title: '解锁高分卡'
      }
    },

    {
      path: '/ArtificialName',
      name: 'ArtificialName',
      component: ArtificialName,
      meta: {
        title: '人工起名'
      }
    },

    {
      path: '/ArtificialForm',
      name: 'ArtificialForm',
      component: ArtificialForm,
      meta: {
        title: '预约人工起名'
      }
    },
    

    

    {
      path: '/WeiXinPlatForm',
      name: 'WeiXinPlatForm',
      component: WeiXinPlatForm,
      meta: {
        title: '页面访问提示'
      }
    },


    {
      path: '/Author',
      name: 'Author',
      component: Author,
      meta: {
        title: '进入中，请稍候。。。'
      }
    },

    {
      path: '*',
      name: 'Home',
      component: Home,
      meta: {
        title: '周易起名'
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if(!Util.authService().isLogin() && to.path != '/Home'){
    //详情页面不用登录，用户可直接进入
    if(to.path == '/NameDetail' || to.path == '/enroll' || to.path == '/progress'){
      next();
      return false;
    }
    // 第一次进入项目
    Util.holdno().cookie.set('beforeLoginUrl', to.fullPath) // 保存用户进入的url
    next('/Home')
    return false;
  }
  next();

  /*if (to.path.startsWith('/Home')) {
    //先移除原有缓存
    window.localStorage.removeItem('login-user')
    next()
  } else {
    let user = Util.authService().getLoginUser('login-user')
    if (!user) {
      next({path: '/Home'})
    } else {
      next()
    }
  }*/
})

export default router
