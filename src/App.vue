<template>
  <div id="app">
    <router-view class="child-view"></router-view>  
    <!--<transition :name="transitionName">  
      <router-view class="child-view"></router-view>  
    </transition>--> 
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'app',
  data () {  
    return {  
      transitionName: 'slide-left'  
    }  
  },  
  mounted () {  
  },  
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = 'slide-right';  
      }else{  
        this.transitionName = 'slide-left';  
      }  
    }  
  }  
}
</script>
