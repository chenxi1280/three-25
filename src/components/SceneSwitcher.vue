<template>
<!--  <img src="">-->
  <div :class="{ 'switch-main-div': showFlag , 'switch-main-div-hide': !showFlag }" >
    <transition>
    <div class="demo-image__lazy">
<!--      <el-image v-for="url in urls" :key="url" :src="url" lazy />-->
<!--      <img class="demo-image__lazy_img" :src="url" v-for="url in urls" :key="url">-->
      <div style="width: 225px;height: 100%; margin: 0px 2px " v-for="url in urls" :key="url">
        <img style="width: 225px;height:94%" :src="url" />
      </div>
    </div>
    </transition>
  </div>
  <el-icon v-if="showFlag" @click="showFlag = false"   style="left:48%;bottom: 25.5%;position: absolute;" :size="40"><ArrowDownBold /></el-icon>
  <el-icon v-if="!showFlag" @click="showFlag = true"   style="left:48%;bottom: 0.5%;position: absolute;" :size="40"><ArrowUpBold /></el-icon>

</template>

<script>
export default {
  name: "SceneSwitcher",
  setup() {
    const urls = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]
    // const showFlag = false
    return { urls }
  },
  data() {
    return {
      showFlag:false
    }
  },
  created() {
    console.log(window.innerWidth)
    let element = document.querySelector('#app');
    console.log(element)
    const app = document.querySelector('#app')
    app.style.overflow = 'hidden'
  }

}
</script>

<style scoped lang="scss">
.switch-main-div {
  animation: test 0.6s linear;
  width: 96%;
  height: 25%;
  bottom: 2px;
  left: 2%;
  background: rgba(175,175,175,0.3);
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
  width: 96%;
  height: 25%;
  bottom: 2px;
  left: 2%;
  background: rgba(175,175,175,0.3);
  position: absolute;
  opacity: 0;
  z-index: -10;
}

.demo-image__lazy {
  height: 100%;
  /*overflow-y: auto;*/
  overflow-x: auto;
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
