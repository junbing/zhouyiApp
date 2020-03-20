<template>
  <div class="NameDetail">
    <div>  
      <div class="name-change-tab">  
        <mt-button v-bind:class="{'cur':active == 'tab-container1'}" size="small" @click.native.prevent="tabAction('tab-container1')">综合分析</mt-button>  
        <mt-button v-bind:class="{'cur':active == 'tab-container2'}" size="small" @click.native.prevent="tabAction('tab-container2')">周易命理</mt-button>  
        <mt-button v-bind:class="{'cur':active == 'tab-container3'}" size="small" @click.native.prevent="tabAction('tab-container3')">生肖宜忌</mt-button>
        <mt-button v-bind:class="{'cur':active == 'tab-container4'}" size="small" @click.native.prevent="tabAction('tab-container4')">五格数理</mt-button>
      </div>  
        
      <div class="page-tab-container">  
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" :swipeable='true'>  
          <mt-tab-container-item id="tab-container1">  

            <div class="tab-container1">
              <div class="name clearfix">
                <div style="float:left;min-width:80px;">
                  <p>
                    <span style="color:#333;" v-if="name.surnameLen>1">{{name.surname_fu_pinyin[0]}}</span>
                    <span style="color:#333;" v-if="name.surnameLen>1">{{name.surname_fu_pinyin[1]}}</span>
                    <span style="color:#333;" v-if="name.surnameLen==1">{{name.surname_pinyin}}</span>

                    <span style="color:#333;" v-if="name.combine_char1_pinyin">{{name.combine_char1_pinyin}}</span>
                    <span style="color:#333;" v-if="name.combine_char2_pinyin">{{name.combine_char2_pinyin}}</span>
                  </p>
                  <p>
                    <span style="color:#333;" v-if="name.surnameLen>1">{{name.surname_fu[0]}}</span>
                    <span style="color:#333;" v-if="name.surnameLen>1">{{name.surname_fu[1]}}</span>
                    <span style="color:#333;" v-if="name.surnameLen==1">{{name.surname}}</span>

                    <span style="color:#333;" v-if="name.combine_char1">{{name.combine_char1}}</span>
                    <span style="color:#333;" v-if="name.combine_char2">{{name.combine_char2}}</span>
                  </p>
                </div>
                <span style="float:left;min-width:100px;margin-top:.3rem;font-size:12px;" v-if="name.combine_char1_wuxing && !name.combine_char2_wuxing">{{name.surname_wuxing}}{{name.combine_char1_wuxing}}{{name.combine_char1_wuxing}}</span>
                <span style="float:left;min-width:100px;margin-top:.3rem;font-size:12px;" v-if="name.combine_char2_wuxing">{{name.surname_wuxing}}{{name.combine_char1_wuxing}}{{name.combine_char2_wuxing}}</span>

              </div>
              <div class="pie">
                <div id="chartPie" style="width:100%; height:180px;"></div>
              </div>
              <ul class="pie-list">
                <li><span>{{score.wenhua}}分</span>文化印象</li>
                <li><span>{{score.ming_li}}分</span>周易命理</li>
                <li><span>{{score.sheng_xiao}}分</span>生肖宜忌</li>
                <li><span>{{score.wu_ge}}分</span>五格数理</li>
                <li><span>{{score.overall}}分</span>综合评分</li>
              </ul>
            </div>
            <div style="clear:both"></div>
            <div class="intelligent-tit">名字解析</div>
            <div class="order-detail">
              <p v-if="name.combine_char1">{{name.combine_char1 +'：'+ name.combine_char1_description!=undefined?name.combine_char1_description:''}}</p>
              <p v-if="name.combine_char2">{{name.combine_char2 +'：'+ name.combine_char2_description!=undefined?name.combine_char2_description:''}}</p>
              <p v-if="name.combine_char3">{{name.combine_char3 +'：'+ name.combine_char3_description!=undefined?name.combine_char3_description:''}}</p>
            </div>

            <div class="intelligent-tit">名字意境</div>
            <div class="order-detail" id="hightLightBox">
              {{wenhua.description}}
              <!--<span v-if="item !=undefined " v-for="(item,index) in wenhua.description" :key="index"> {{item + (index%2==0?'；':'。')}} </span>-->
              
            </div>

            <div class="intelligent-tit">名字音律</div>
            <div class="order-detail">
            {{wenhua.yin_lv}} 
            </div>

            <div class="intelligent-tit">名字字型</div>
            <div class="order-detail">
            {{wenhua.zi_xing}} 
            </div>


          </mt-tab-container-item>  
          <mt-tab-container-item id="tab-container2">  
            <div class="intelligent-tit">八字排盘</div>

            <div class="intelligent-form">
              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">公历</span></div>
                  <div class="mint-cell-value">
                    {{nameDetail.birthday}}
                  </div>
                </div>
              </a>
              <a class="mint-cell mint-field" style="min-height:.4rem;" v-if="nameDetail.adjust_date">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">真太阳时</span></div>
                  <div class="mint-cell-value">
                    {{nameDetail.adjust_date}}
                  </div>
                </div>
              </a>
              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">农历</span></div>
                  <div class="mint-cell-value">
                    {{paipan_result.lunar_year_chinese}} {{paipan_result.lunar_month_chinese}} {{paipan_result.lunar_day_chinese}}  {{paipan_result.lunar_hour_chinese}}
                  </div>
                </div>
              </a>

              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title mint-cell-title-1"><span class="mint-cell-text">干神</span></div>
                  <div class="mint-cell-value">
                    <ul class="cell-wraper-box">
                      <li v-for="(item,index) in paipan_result.ganshen_arr" :key="index">{{item}}</li> 
                    </ul>
                  </div>
                </div>
              </a>

              <a class="mint-cell mint-field" style="min-height:.6rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title mint-cell-title-1"><span class="mint-cell-text">{{nameDetail.gender==1?'乾造':'坤造'}}</span></div>
                  <div class="mint-cell-value">
                    <ul class="cell-wraper-box">
                      <li><span style="display:inline-block;width:15px;">{{paipan_result.ganzhi_year}}</span></li> <li><span style="display:inline-block;width:15px;">{{paipan_result.ganzhi_month}}</span></li> <li><span style="display:inline-block;width:15px;">{{paipan_result.ganzhi_day}}</span></li> <li><span style="display:inline-block;width:15px;">{{paipan_result.ganzhi_hour}}</span></li>
                    </ul>
                  </div>
                </div>
              </a>

              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title mint-cell-title-1"><span class="mint-cell-text">藏干</span></div>
                  <div class="mint-cell-value">
                    <ul class="cell-wraper-box">
                      <li  v-for="(item,index) in paipan_result.cang_gan_arr" :key="index">{{item.join('')}}</li>
                    </ul>
                  </div>
                </div>
              </a>

              <a class="mint-cell mint-field" style="min-height:.6rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title mint-cell-title-1"><span class="mint-cell-text">支神</span></div>
                  <div class="mint-cell-value">
                    <ul class="cell-wraper-box">
                      <li v-for="(item,index) in paipan_result.ganzhi_shen_arr" :key="index">
                        <span v-for="items in item" style="display:inline-block;width:15px;">
                          {{items}}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>

            <div class="intelligent-tit">五行旺衰</div>
            <div class="chartColumn-wraper">
              <div id="chartColumn" style="width:370px; height:200px;"></div>
            </div>
            <div class="intelligent-form">
              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">同类五行</span></div>
                  <div class="mint-cell-value">
                    {{wuxing_strength.similar.join('、')}}，占比约{{( (percentObj.one / percentObj.total)*100 ).toFixed(2)  }}%
                  </div>
                </div>
              </a>
              <a class="mint-cell mint-field" style="min-height:.4rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">异类五行</span></div>
                  <div class="mint-cell-value">
                    {{diffSimilar.join("、")}}，占比约{{ (100 - (percentObj.one / percentObj.total)*100 ).toFixed(2) }}%
                  </div>
                </div>
              </a>
              <a class="mint-cell mint-field" style="min-height:.6rem;">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title"><span class="mint-cell-text">五行建议</span></div>
                  <div class="mint-cell-value" style="padding:10px 10px 10px 0;flex:inherit">
                    {{wuxing_suitable.suggest || ''}}
                  </div>
                </div>
              </a>
            </div>


            <div class="intelligent-tit">名字五行分析</div>
            <div class="order-detail">
              <p v-if="ming_li.char1_wuxing_analyse">{{ming_li.char1_wuxing_analyse}}</p>
              <p v-if="ming_li.char2_wuxing_analyse">{{ming_li.char2_wuxing_analyse}}</p>
              <p v-if="ming_li.combine_wuxing_analyse">{{ming_li.combine_wuxing_analyse}}</p>
            </div>

            <div class="intelligent-tit">名字三才分析</div>
            <div class="order-detail">
              <div>
                <p>{{sancai_analyse.name}}</p>
                <p v-if="sancai_analyse.gaishu">概述：{{sancai_analyse.gaishu}}</p>
                <p v-if="sancai_analyse.caiyun">财运：{{sancai_analyse.caiyun}}</p>
                <p v-if="sancai_analyse.jiankang">健康：{{sancai_analyse.jiankang}}</p>
                <p v-if="sancai_analyse.jiating">家庭：{{sancai_analyse.jiating}}</p>
                <p v-if="sancai_analyse.shiye">事业：{{sancai_analyse.shiye}}</p>
                <p v-if="sancai_analyse.xingge">性格：{{sancai_analyse.xingge}}</p>
                <p v-if="sancai_analyse.score">评分：{{sancai_analyse.score}}，匹配{{sancai_analyse.level}}。</p>
              </div>
            </div>


          </mt-tab-container-item>  
          <mt-tab-container-item id="tab-container3"> 
            <div class="order-detail">由于生肖与地支相配，地支有相合、相冲、相害关系，所以古人取名，除考虑五行外，还注重考虑生年生肖与姓氏生肖。
            </div> 
            <div class="intelligent-tit">合冲害关系</div>
            <div class="order-detail">
              <p>{{sheng_xiao.xiao_relation.description}}</p>
              <p v-if="sheng_xiao.xiao_relation[name.combine_char1]!=undefined">{{sheng_xiao.xiao_relation[name.combine_char1]===false? name.combine_char1+'：不是生肖忌用汉字，可放心使用；' :name.combine_char1 +'：是生肖忌用汉字，建议更换；'}}</p>
              <p v-if="sheng_xiao.xiao_relation[name.combine_char2]!=undefined">{{sheng_xiao.xiao_relation[name.combine_char2]===false? name.combine_char2+'：不是生肖忌用汉字，可放心使用；' :name.combine_char2 +'：是生肖忌用汉字，建议更换；'}}</p>
              <p v-if="sheng_xiao.xiao_relation[name.combine_char3]!=undefined">{{sheng_xiao.xiao_relation[name.combine_char3]===false? name.combine_char3+'：不是生肖忌用汉字，可放心使用；' :name.combine_char3 +'：是生肖忌用汉字，建议更换；'}}</p>
            </div> 

            <div class="intelligent-tit">生肖喜用部首</div>
            <div class="order-detail">
              <p>{{sheng_xiao.suitable_bushou.suitable_bushou}}</p>
              <p v-if="sheng_xiao.suitable_bushou[name.combine_char1]!=undefined">{{sheng_xiao.suitable_bushou[name.combine_char1]===false? name.combine_char1+'：部首“' + name.combine_char1_bushou + '”不是生肖喜用部首，建议更换；' :name.combine_char1 +'：部首“' + name.combine_char1_bushou + '”是生肖喜用部首，可放心使用；'}}</p>
              <p v-if="sheng_xiao.suitable_bushou[name.combine_char2]!=undefined">{{sheng_xiao.suitable_bushou[name.combine_char2]===false? name.combine_char2+'：部首“' + name.combine_char2_bushou + '”不是生肖喜用部首，建议更换；' :name.combine_char2 +'：部首“' + name.combine_char2_bushou + '”是生肖喜用部首，可放心使用；'}}</p>
              <p v-if="sheng_xiao.suitable_bushou[name.combine_char3]!=undefined">{{sheng_xiao.suitable_bushou[name.combine_char3]===false? name.combine_char3+'：部首“' + name.combine_char3_bushou + '”不是生肖喜用部首，建议更换；' :name.combine_char3 +'：部首“' + name.combine_char3_bushou + '”是生肖喜用部首，可放心使用；'}}</p>
            </div>
            
          </mt-tab-container-item>  
          <mt-tab-container-item id="tab-container4">  

            <div class="wg_tu" v-if="name.surnameLen==1">
              <div class="inner" >
                <span class="left text text01"><em>外格 {{wu_ge.wai.shuli_id}}</em></span>
                <span class="left xian xian01"><em class="line"></em></span>
                <span class="left text text02">
                    <p>1</p>
                    <p>{{name.surname}} {{name.surname_bihua[0]}}</p>
                    <p>{{name.combine_char1}} {{name.combine_char1_bihua}}</p>
                    <p v-if="name.combine_char2!==undefined && name.combine_char2!=='' ">{{name.combine_char2}}&nbsp;{{name.combine_char2_bihua}} </p>
                    <p v-if="name.combine_char2==undefined || name.combine_char2==''">1</p>
                </span>
                <span class="left xian xian02">
                    <em class="line"></em><em class="line"></em><em class="line"></em>
                </span>
                <span class="left text text03">
                    <p>天格 {{wu_ge.tian.shuli_id}}</p>
                    <p>人格 {{wu_ge.ren.shuli_id}}</p>
                    <p>地格 {{wu_ge.di.shuli_id}}</p>
                </span>
              </div>

   
              <span class="text04">总格 {{wu_ge.zong.shuli_id}}</span>
            </div>

            <div class="wg_tu" v-if="name.surnameLen>1">
              <div class="inner" style="width:2.8rem;">
                <span class="left text text01"><em>外格 12</em></span>
                <span class="left xian xian01"><em class="line"></em></span>
                <span class="left text text02">
                    <p>{{name.surname_fu[0]}} {{name.surname_bihua[0]}}</p>
                    <p>{{name.surname_fu[1]}} {{name.surname_bihua[1]}}</p>
                    <p>{{name.combine_char1}} {{name.combine_char1_bihua}}</p>
                    <p v-if="name.combine_char2!==undefined && name.combine_char2!=='' ">{{name.combine_char2}}&nbsp;{{name.combine_char2_bihua}} </p>
                    <p v-if="name.combine_char2==undefined || name.combine_char2==''">1</p>
                </span>
                <span class="left xian xian02">
                    <em class="line" style="background:#FFF"></em><em class="line fu"></em><em class="line"></em>
                </span>
                <span class="left text text03" style="padding:.2rem;width:1rem;">
                    <p>天格 {{wu_ge.tian.shuli_id}}</p>
                    <p>人格 {{wu_ge.ren.shuli_id}}</p>
                    <p>地格 {{wu_ge.di.shuli_id}}</p>
                </span>
              </div>
              <span class="text04">总格 {{wu_ge.zong.shuli_id}}</span>
            </div>

            <div class="intelligent-tit">天格 {{wu_ge.tian.shuli_id}} 解析：</div>
            <div class="order-detail">
              <p>（{{wu_ge.tian.description}}）{{wu_ge.tian.mean}}</p>
              <p>{{wu_ge.tian.type}}：{{wu_ge.tian.explain}}（{{wu_ge.tian.ji_xiong}}）</p>
            </div>

            <div class="intelligent-tit">人格 {{wu_ge.ren.shuli_id}} 解析：</div>
            <div class="order-detail">
              <p>（{{wu_ge.ren.description}}）{{wu_ge.ren.mean}}</p>
              <p>{{wu_ge.ren.type}}：{{wu_ge.ren.explain}}（{{wu_ge.ren.ji_xiong}}）</p>
            </div>

            <div class="intelligent-tit">地格 {{wu_ge.di.shuli_id}} 解析：</div>
            <div class="order-detail">
              <p>（{{wu_ge.di.description}}）{{wu_ge.di.mean}}</p>
              <p>{{wu_ge.di.type}}：{{wu_ge.di.explain}}（{{wu_ge.di.ji_xiong}}）</p>
            </div>

            <div class="intelligent-tit">外格 {{wu_ge.wai.shuli_id}} 解析：</div>
            <div class="order-detail">
              <p>（{{wu_ge.wai.description}}）{{wu_ge.wai.mean}}</p>
              <p>{{wu_ge.wai.type}}：{{wu_ge.wai.explain}}（{{wu_ge.wai.ji_xiong}}）</p>
            </div>

            <div class="intelligent-tit">总格 {{wu_ge.zong.shuli_id}} 解析：</div>
            <div class="order-detail">
              <p>（{{wu_ge.zong.description}}）{{wu_ge.zong.mean}}</p>
              <p>{{wu_ge.zong.type}}：{{wu_ge.zong.explain}}（{{wu_ge.zong.ji_xiong}}）</p>
            </div>
            
          </mt-tab-container-item>  
        </mt-tab-container>  
      </div>  
    </div>
    <div @click="guideBtn" class="guide-user"></div>

    <mt-popup
      v-model="popupVisible"
      position="middle" style="background:transparent">
      
        <div class="gift-null-wraper" @click="handlerPop">
          <img src="../assets/images/code.jpg" class="img" />
          <p class="desc desc-1">长按关注公众号“周易智慧生活”<br/>免费周易起名、测名</p>
        </div>
    </mt-popup>
    
  </div>
</template>

<script>
import API from '../api/api_user'
import Util from '../common/util'
import {TabContainer, TabContainerItem , Indicator,Loadmore,MessageBox,Toast} from 'mint-ui'
import echarts from 'echarts'

export default {
  name:'NameDetail',
  data() {
    return {
      popupVisible:false,
      active:'tab-container1',
      chartPie: null,
      chartColumn: null,
      idx:1,


      nameDetail:{},
      ming_li:{},
      score:{},
      

      name:{
        surnameLen:0,
        surname_fu:[],
        surname_fu_pinyin:[],
        surname_bihua:[],

        //处理非复姓的特殊返回：如：//surname_pinyin:"zhāng、zhàng"
        surname_pinyin:[]  
      },
      wenhua:{},

      sheng_xiao:{
        xiao_relation:{
          description:''
        },
        suitable_bushou:{
          suitable_bushou:''
        }
      },

      wu_ge:{
        tian:{},
        di:{},
        ren:{},
        wai:{},
        zong:{}
      },

      paipan_result:{},
      wuxing_suitable:{
        suggest:''
      },
      sancai_analyse:{},
      wuxing_strength:{
        similar:[]
      },

      diffSimilar:[],

      percentObj:{
        total:1,
        one:0,
        sec:0
      }

    }
  },
  filters: {
    keepTowNum: function (value) {
      console.log(typeof value)
      let realVal = Number(value).toFixed(2);
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
    tabAction:function(type){
      let that = this;
      that.active = type;
    },
    /**
     * [createChart 创建图表]
     * @return {[type]} [description]
     */
    createChart(){
      let that = this;
      this.chartPie = echarts.init(document.getElementById('chartPie'));
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartPie.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        color:[ 
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#ffffff', 
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', 
            '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
            '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' 
        ],

        legend: {
             orient : 'horizontal', //horizontal  vertical
             x : 'left',
            y:'bottom',
            itemWidth:10,
             itemHeight:10,
             data:['文化印象','周易命理','生肖宜忌','五格数理',' ']
         },

        series: [
          {
            name: '访问来源',
            type:'pie',
            center: ['30.2%', '30%'],
            radius: '50%',
            data: [
              {value: (that.score.wenhua*100)/400,  name:'文化印象'},
              {value: (that.score.ming_li*100)/400,  name:'周易命理'},
              {value: (that.score.sheng_xiao*100)/400,  name:'生肖宜忌'},
              {value: (that.score.wu_ge*100)/400,   name:'五格数理'},
              {value: 100-( (that.score.wenhua*100)/400 )-( (that.score.ming_li*100)/400 )-( (that.score.sheng_xiao*100)/400 )-( (that.score.wu_ge*100)/400 ),  name:' '}
            ],
            itemStyle: {
                normal : {
                    label : {
                        position : 'outer',
                        formatter : function (params) {                         
                          return (params.percent - 0).toFixed(0) + '%'
                        }
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        formatter : "{b}\n{d}%"
                    }
                }
                
            }
          }
          
        ]
      });

      this.chartColumn.setOption({
        xAxis: {
          data: ["金", "木", "水", "火", "土"],
          axisLine:{
            lineStyle:{
                color: '#A49F99',
                width: 1
            }   
          }
        },

        yAxis: {
            axisLine:{
              lineStyle:{
                  color: '#A49F99',
                  width: 1
              }
            },
            axisTick: {
                show: false
            },
            splitLine:false
        },

        series: [{
          name: '分析图',
          type: 'bar',
          barMaxWidth:20,
          barMinHeight:1,
          barCategoryGap:5,
          data: [that.wuxing_strength.gold_strength, that.wuxing_strength.wood_strength, that.wuxing_strength.water_strength, that.wuxing_strength.fire_strength, that.wuxing_strength.earth_strength],
          itemStyle: {   
              normal:{  
                  color: function (params){
                      var colorList = ['#b8860b', '#008000', '#0073cf', '#e25822', '#a67b5b'];
                      return colorList[params.dataIndex];
                  }
              },
              //鼠标悬停时：
              emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }]
      });
    },

    doShare(result,params){
        let that = this;
        let item = result.data;
        let nameId = Util.getRequest().id;
        let shareUrl = '';
        if(params){
          shareUrl = window.location.protocol + '//' + window.location.host +'/zhouyiApp/#/NameDetail?surname='+params.surname+'&combine='+params.combine+'&sex='+params.sex+'&birthday='+params.birthday+'&homePlace='+params.homePlace+'&longitude='+params.longitude+'&latitude='+params.latitude+'&score=1&isShare=1';

          shareUrl = encodeURI(shareUrl);

        }else{
          shareUrl = window.location.protocol + '//' + window.location.host +'/zhouyiApp/#/NameDetail?id='+nameId+'&isShare=1';
        }

        let shareName = '';
        if(item.name.combine_char1){
          shareName = item.name.surname+item.name.combine_char1;
        }

        if(item.name.combine_char2){
          shareName = item.name.surname+item.name.combine_char1+item.name.combine_char2;
        }

        if(item.name.combine_char3){
          shareName = item.name.surname+item.name.combine_char1+item.name.combine_char2+item.name.combine_char3;
        }

        let shareUserInfoLink = {
          title: shareName+' - 姓名详解' || '',
          //下面是微信的两个字段，和上面的字段名不一样
          imgUrl: window.location.protocol + '//' + window.location.host +'/zhouyiApp/logo.png',
          link: shareUrl,
          desc: '全面解读姓名所包含的文化印象、周易命理、生肖宜忌、五格数理信息，助你轻松挑选好名字'
        };



        shareUserInfoLink.success = function () {
            //统计
            console.log('进回调方法1');
            API.transferCallback({id:nameId}).then(function (result) {
              console.log('进回调方法2');
              that.loading = false;
              if (result && result.code==0) {

                let instance = Toast('转发成功');

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

    /**
     * [createChart 取名详解]
     * @return {[type]} [description]
     */
    getNameExplain(){
      let that=this;
      let orderParams={
        id : Util.getRequest().id,
        testId    : Util.getRequest().testId
      }
      API.getNameExplain(orderParams).then(function (result) {

        that.loading = false;
        Indicator.close();
        if (result && result.code==0) {

          that.callBack(result);

          setTimeout(function(){
            that.doShare(result);
          },1000)
          


        } else if(result.code==1000) {
          let instance = Toast('请先登录');
          setTimeout(() => {
            that.$router.push({path: '/Home'});
            instance.close();
          }, 1500);
        }else{
          
          let instance = Toast('登录异常');
          setTimeout(() => {
            that.$router.push({path: '/Home'});
            instance.close();
          }, 1500);
          
        }
      });
    },

    /**
     * [createChart 名字测评详解]
     * @return {[type]} [description]
     */
    testNameExplain(){
      let that = this;
      //let orderParams=Util.sessionStorageService().getObject('NAMESCORE_KEY');

      var orderParams = {

        surname:Util.getRequest().surname,
        combine:Util.getRequest().combine,
        sex    : Util.getRequest().sex,
        birthday  : Util.getRequest().birthday,
        homePlace : Util.getRequest().homePlace,
        longitude : Util.getRequest().longitude,
        latitude  : Util.getRequest().latitude,
        isDouble  : Util.getRequest().isDouble


        
      };

      console.log(orderParams);


      API.testNameExplain(orderParams).then(function (result) {
        that.loading = false;
        Indicator.close();
        if (result && result.code==0) {

          that.callBack(result);
          setTimeout(function(){
            that.doShare(result,orderParams);
          },1000)
          

        } else if(result.code==1000) {
          let instance = Toast('请先登录');
          setTimeout(() => {
            that.$router.push({path: '/Home'});
            instance.close();
          }, 1500);
        }else{
          
          let instance = Toast('登录异常');
          setTimeout(() => {
            that.$router.push({path: '/Home'});
            instance.close();
          }, 1500);
          
        }
      });
    },

    /**
     * [callBack ajax回调]
     * @param  {[type]} result [返回结果]
     * @return {[type]}        [description]
     */
    callBack(result){
      let that = this;
      that.nameDetail = result.data;


      that.score = that.nameDetail.score;
      that.ming_li = that.nameDetail.ming_li;

      that.name = that.nameDetail.name;
      that.name.surnameLen = that.nameDetail.name.surname.length;
      that.name.surname_bihua = that.nameDetail.name.surname_bihua.split(' ');
      that.name.surname_fu = that.nameDetail.name.surname.split('');
      that.name.surname_fu_pinyin = that.nameDetail.name.surname_pinyin.split(' ');

      if(that.name.surnameLen==1){
        that.name.surname_pinyin = that.nameDetail.name.surname_pinyin.split('、')[0];
      }


      //修改标题
      let nameTitle = '',
          nameTxt = '',
          groupName = '';
      if(that.name.surnameLen>1){
        nameTitle = that.name.surname_fu[0]+that.name.surname_fu[1];
      }else{
        nameTitle = that.name.surname;
      }

      if(that.name.combine_char1){
        nameTxt = that.name.combine_char1
      }

      if(that.name.combine_char2){
        nameTxt = that.name.combine_char1+that.name.combine_char2
      }

      groupName = nameTitle+nameTxt+' - 姓名详解';

      $('title').html(groupName);
      

      
      

      that.wenhua = that.nameDetail.wenhua;
      that.wenhua.description = that.nameDetail.wenhua.description;

      that.sheng_xiao = that.nameDetail.sheng_xiao;

      that.wu_ge = that.nameDetail.wu_ge;

      var str1 = that.name.combine_char1;
      var str2 = that.name.combine_char2;


      var reg1 = "/"+str1+"/ig";
      var reg2 = "/"+str2+"/ig";

      that.wenhua.description = that.wenhua.description.join('；&nbsp;').replace(eval(reg1),'<span style="color:red">'+str1+'</span>').replace(eval(reg2),'<span style="color:red">'+str2+'</span>');

      var oBox = document.getElementById("hightLightBox").innerHTML = that.wenhua.description || "暂无此名字意境， 我们会及时补充";


      that.paipan_result =  that.nameDetail.ming_li.paipan_result;

      if(that.nameDetail.ming_li.wuxing_suitable){
        that.wuxing_suitable = that.nameDetail.ming_li.wuxing_suitable;
      }
      

      that.sancai_analyse = that.nameDetail.ming_li.sancai_analyse;
      that.wuxing_strength =  that.nameDetail.ming_li.wuxing_strength;


      //五行总分
      let allStrength = that.wuxing_strength.gold_strength + that.wuxing_strength.wood_strength + that.wuxing_strength.water_strength + that.wuxing_strength.fire_strength + that.wuxing_strength.earth_strength;
      let wangXingArr = ['金','木','水','火','土'];
      let wangXingObj = {
        '金':that.wuxing_strength.gold_strength,
        '木':that.wuxing_strength.wood_strength,
        '水':that.wuxing_strength.water_strength,
        '火':that.wuxing_strength.fire_strength,
        '土':that.wuxing_strength.earth_strength
      };

      let similar = that.wuxing_strength.similar;

      //同类部分
      let similarScore = 0;
      //推算出异类属性,和同类总分
      for(let m=0;m<similar.length;m++){
        let index = wangXingArr[wangXingArr.indexOf(similar[m])];
        wangXingArr.splice(wangXingArr.indexOf(similar[m]),1);
        similarScore +=wangXingObj[index];

      }
      that.percentObj.total = allStrength;
      that.percentObj.one = similarScore;
      that.percentObj.sec = allStrength - similarScore;

      //异类五行
      that.diffSimilar = wangXingArr;
      that.createChart();    
    },
    /**
     * [guideBtn 引导关注微信]
     * @return {[type]} [description]
     */
    guideBtn(){
      let that = this;
      that.popupVisible = true;
    },

    handlerPop(){
      let that = this;
      that.popupVisible = false;
      
    },


  },
  mounted: function () {
    let that = this;
    Indicator.open({
      text : '正在加载...',
      spinnerType: 'fading-circle'
    });

    //从名字测评过来的详解
    if(Util.getRequest().score){
      that.testNameExplain();
    //从起名列表过来的详解
    }else{
      that.getNameExplain();
    }

    //微信转发会自带from="singlemessage"(朋友) from="timeline"(朋友圈) 。。。 ,如果是直接从评分过来的则不显示浮层
    //微信转发过来的或者来自名字测评的，则增加一个浮动按钮“我要测名”（引导关注公众号）
    //
    if( window.location.href.indexOf('isShare')!=-1 ) {
      $('.guide-user').css({
        display:'block'
      })
    }

    Util.wxShareService().init();


  }
}
</script>
<style scoped>
.page-tab-container{padding-top:.35rem;background-color:#FFF;}
.name-change-tab{z-index:20;position:fixed;width:100%;height:.42rem;line-height:.4rem;padding:0 .15rem;background-color:#FFF;}
.name-change-tab:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}
.name-change-tab .mint-button--small{float:left;width:25%;text-align:center;background-color:transparent;box-shadow:0 0 1px transparent;border-radius:0;height:.42rem;line-height:.4rem;color:#5D482E}
.name-change-tab .mint-button--small.cur{color:#D2A871;border-bottom:1px solid #D2A871}
.name-change-wraper{min-height:3rem}
.name-change-wraper .data-null{padding-top:.6rem;text-align:center}
.name-change-wraper .data-null .icon{display:inline-block;width:1.42rem;height:.84rem;background-image:url(../assets/images/data-null.png);background-size:cover}
.name-change-wraper .data-null .f16{margin-top:.1rem;font-size:.16rem}
.name-change-wraper .data-null .f14{margin-top:.06rem;font-size:.14rem;color:#A49F99}

.tab-container1{
  padding:.15rem;
  height:2.51rem;
  position:relative;
}
.tab-container1 .name{
  padding-bottom:.1rem;
  font-size:.2rem;
  color:#5D482E
}
.tab-container1 .name span{
  font-size:.16rem;
  color:#A49F99;
}
.tab-container1 .pie{
  float:left;
  width:100%;
  padding-bottom:10px;
}

.tab-container1 .pie-list{
  padding:0 .1rem;
  position:absolute;
  width:1.3rem;
  right:.1rem;
  top:.24rem;
  border: 1px solid #F1E4D4;
  border-radius: 4px;
}
.tab-container1 .pie-list li{
  height:.3rem;
  line-height:.3rem;
  font-size:13px;
}
.tab-container1 .pie-list li span{
  float:right;
}
.tab-container1 .pie-list li:last-child span{
  color:#D2A871
}

.intelligent-tit{padding-left:.15rem;height:.36rem;line-height:.45rem;background:#F7F5F3;font-size:12px;color:#A49F99}
.order-detail{margin:0 .15rem;padding:.15rem 0;color: #695C4C;}
.order-detail p{
  margin-bottom:5px;
}

.intelligent-form{padding-left:.15rem;}
.intelligent-form .mint-cell-wrapper{padding:0;background:0 0;position:relative;overflow:inherit;font-size:.14rem;}
.intelligent-form .mint-cell-wrapper .mint-cell-text{font-size:.14rem;}
.intelligent-form .mint-cell-wrapper:after{position:absolute;content:" ";bottom:0;left:0;height:2px;width:100%;background-color:#F1E4D4;-webkit-transform:scale(1,.5);transform:scale(1,.3);-webkit-transform-origin:center bottom;transform-origin:center bottom}
.intelligent-form .mint-cell:last-child{background:0 0}
.intelligent-form .mint-field-core{background:0 0;color:#A49F99}
.mint-datetime-action{color:#695C4C}
.mint-field .mint-cell-title{width:1.05rem}
.cell-wraper-box{
  margin:.1rem 0;
  height: .2rem;
  display:block;
  width:2.55rem;
  flex:none;
}
.cell-wraper-box li{
  float:left;

  display:block;
  width:25%;
  text-align:center;
}

.intelligent-form .mint-cell-wrapper .mint-cell-value{
  flex:none;
  display:block;
  width:100%;
  line-height:20px;

}
.intelligent-form .mint-cell-wrapper .mint-cell-title-1{
  width:.8rem;
}

.chartColumn-wraper{
  padding-left:.15rem;
}
.left{
  float:left;
}
/* 五格图表 */
.wg_tu .inner{
  width:2.6rem;
  margin:0 auto;
}
.wg_tu{padding-bottom:.1rem;}
.wg_tu .xian{ width: .15rem; padding:.2rem 0; }
.wg_tu .text{ text-align: center; padding:0 10px;}
.wg_tu .text03{ padding: .2rem .1rem;}
.wg_tu .text04{position:relative; display: block; clear: both; border-top: 1px solid #D2A871; text-align: center; padding:.1rem 0;margin:0 5%;}

.wg_tu .text p{ display: block; line-height: 40px; }
.wg_tu .text em{ line-height: 160px;}
.wg_tu .xian em.line{ width: .14rem; border:1px solid #D2A871; float: left; margin: 2px 0;z-index:2;position:relative}



.wg_tu .xian01 em.line{ height: 114px; border-right:0;}
.wg_tu .xian02 em.line{ height: 34px; border-left:0;}

.wg_tu .xian em.line.fu{ width: .3rem; border:1px solid #D2A871; float: left; margin: 2px 0;border-left:0;height:60px;margin-top:-18px;z-index:1;}

.wg_tu .text01,.wg_tu .text03{width:.8rem;}

.wg_tu .text02{width:.7rem;}

.guide-user{
  position:fixed;right:10px;bottom:10px;width:85px;height:128px;background-image:url(../assets/images/guide-user.png);background-size:cover;display:none;

}

.gift-null-wraper{text-align:center}
.gift-null-wraper .img{display:inline-block;width:1.2rem;height:1.2rem;}
.gift-null-wraper .tit{margin-top:.15rem;color:#5D482E}
.gift-null-wraper .desc{margin-top:.05rem;padding:0 .5rem;color:#FFF;font-size:16px;white-space:nowrap;}



</style>

