<template>
<div class="popup-div" >
  <div class="popup-header-div">
    <p>弹窗图片</p>
  </div>
  <div class="popup-body-div" >
    <div style="position: absolute; inset: 0px"></div>
    <div class="popup-backdrop-div">
    </div>
    <div class="popup-container-div">
      <div class="demo-image__preview" v-show="imgShowFlag">
        <el-image
            @close="closePopup"
            id="elImage"
            style="width: 0%; height: 0%"
            :src="url"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
            :hide-on-click-modal="false"
        />
      </div>

      <span class="el-image-viewer__btn el-image-viewer__close" @click="closePopup" v-if="type !== 1">
        <i class="el-icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
          </path>
        </svg>
        </i>
      </span>

      <div style="position: absolute;top: 50%; left: 50%;margin: -20% 0% 0% -22.5%;"  v-show="videoShowFlag" >
        <video src="../../public/video/2_4.mp4" controls style="width: 80%;height: 45%;"  ></video>
      </div>

      <div style="position: absolute;top: 50%; left: 50%;margin: -20% 0% 0% -22.5%;"  v-show="type === -1" >
        <div style="width: 80%;height: 45%;font-size: 16px">
          &nbsp; &nbsp;  这是一段简介。这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。
          这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。这是一段简介， 这是一段简介。这是一段简介，
        </div>
      </div>

    </div>

  </div>
</div>
</template>

<script>
import {reactive , ref} from "vue";

export default {
  name: "Popup",
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const url =
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    const srcList = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]
    let imgShowFlag = ref(false)
    let videoShowFlag = ref(false)
    console.log(props)
    return {
      url,srcList,imgShowFlag,videoShowFlag
    }
  },
  created() {
    console.log(1)
  },
  mounted() {
    if (this.type === 1 ) {
      this.isShow()
    }else if (this.type === 2 ) {
      this.videoShowFlag = true
    }else if (this.type === -1 ) {

    }
    setTimeout( () => {

      document.getElementById("elImage").click();

      // let elementsByTagName = document.querySelector('video');
      // elementsByTagName.play()

    },100)
    // this.isShow()
    console.log(2)
  },
  show(){
    console.log(3)

  },
  methods: {
    isShow(){

      this.imgShowFlag = true
    },
    closePopup() {
      this.$parent.closePopup()
    },
    popupOpen() {

    }

  }
}
</script>

<style scoped lang="scss">

.popup-div {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 10000000000;
  padding-top: 50px;
  background-color: rgba(0,0,0,.8);
  color: #fff;
  .popup-header-div{
    top: 0;
    left: 0;
    position: absolute;
    z-index: 5500;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;


  }
  .popup-body-div{
    position: relative;
    width: 100%;
    height: 100%;
    .popup-backdrop-div{
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
    }
    .popup-container-div{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }


}



.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>
