// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(MintUI)



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  methods:{
  	// 重置页面 rem 单位基准值
  	setHtmlFontSize : function () {
  		var clientWidth = document.documentElement.clientWidth>750?750:document.documentElement.clientWidth;
  		document.documentElement.style.fontSize = clientWidth / 3.75 + 'px'

  	}

  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  mounted:function(){
  	this.setHtmlFontSize();
  	window.addEventListener('resize', this.setHtmlFontSize, false);
  }
})

