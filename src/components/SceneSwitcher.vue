<template>
<!--  <img src="">-->
  <div :class="{ 'switch-main-div': showFlag , 'switch-main-div-hide': !showFlag }">
    <div style=" background-color: rgba(175,175,175,0.3); width: 100%;  display:flex ;justify-content: center;overflow-x: auto;">
      <div class="demo-image__lazy">
        <div style="width: 100Px;height: 96Px; margin: 0Px 2Px " v-for="(url,index) in urls" :key="index"
             :style="{background: `url(${url}) no-repeat center`, backgroundSize: '150%',
           borderColor: index === imgShowIndex ? '#f6b64c' : 'rgba(0,0,0,0)', borderWidth:  index === imgShowIndex ?'2Px':'2PX',borderStyle: 'solid'}"
             @click="changeScene(index)"
        >
        </div>
      </div>
    </div>
<!--    <div style="background-color: rgba(175,175,175,0.3);height: 30Px;margin-top: 10Px; overflow-x: auto;display: flex;justify-content: center;">-->
<!--      <div v-for="(item,i) in venues" style="margin-left:20px; margin-top: 5px;margin-bottom: 5px; color: white "-->
<!--      @click="venueChange(i)">-->
<!--        {{item.title+i}}-->
<!--      </div>-->
<!--    </div>-->
  </div>
  <el-icon v-if="showFlag"  @click="showFlag = false"  style="left:48%;bottom: 120PX;position: absolute;" :size="40"><ArrowDownBold /></el-icon>
  <el-icon v-if="!showFlag" @click="showFlag = true"   style="left:48%;bottom: 0.5%;position: absolute;" :size="40"><ArrowUpBold /></el-icon>

</template>

<script>
import {reactive , ref} from "vue";

export default {
  name: "SceneSwitcher",
  setup() {
    let urls = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]
    let showFlag = ref(true)
    let imgShowIndex = ref(0)
    const venues = [
      {title: '场馆', urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
      {title: '场馆', urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
      {title: '场馆', urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
      {title: '场馆', urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
      {title: '场馆', urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
      {title: '场馆', urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',] } ,
    ]


    return { urls,showFlag,imgShowIndex,venues }
  },
  data() {
    return {
      // showFlag:false
    }
  },
  created() {
    // console.log(window.innerWidth)
    // let element = document.querySelector('#app');
    // console.log(element)
    // const app = document.querySelector('#app')
    // app.style.overflow = 'hidden'

  },
  methods:{
    changeScene(index) {
      this.imgShowIndex = index
      console.log('切換 场景')
      this.$parent.changeScene(index)
    },
    venueChange(index){
      console.log(index)
      this.imgShowIndex = 0
      this.$parent.venueChange(index)
    }

  }

}
</script>

<style scoped lang="scss">

.switch-main-div {
  animation: test 0.6s linear;
  width: 100%;
  height: 100PX;
  bottom: 10Px;
  //left: 2%;
  //background: rgba(175,175,175,0.3);
  position: absolute;
  opacity: 1;
  z-index: 10;

}

@keyframes test {
  from {   opacity: 0;}
  to {   opacity: 1;}
}
@keyframes test-hide {
  from {   opacity: 1;z-index: 10;}
  to {   opacity: 0; z-index: -10;}
}

.switch-main-div-hide {
  animation: test-hide 0.6s linear;
  width: 100%;
  height: 100PX;
  bottom: 2px;
  //left: 2%;
  background: rgba(175,175,175,0.3);
  position: absolute;
  opacity: 0;
  z-index: -10;

}

.demo-image__lazy {
  height: 100%;
  /*overflow-y: auto;*/
  //overflow-x: auto;
  display: flex;
}

/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 5px;											//定义滚动条宽度
  height: 5px;											//定义滚动条高度
  border-radius: 5px;									//定义滚动条圆角
  background-color: rgba(240, 240, 240, 0.1);				//定义滚动条颜色
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);		//定义轨道阴影
  border-radius: 5px;									//定义轨道圆角
  background-color: rgba(4, 56, 114, .5);					//定义轨道颜色
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px; //定义滑块圆角
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); //定义滑块阴影
  background-color: rgba(2, 33, 54, .5); //定义滑块颜色

}


</style>
