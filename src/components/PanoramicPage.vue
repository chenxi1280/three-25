<template>
  <div class="vrDiv" :style="{zIndex: showZIndex}">
    <!--    <el-button style="position:absolute; right: 2px" type="success" plain size="mini" @click="returnMap">返回</el-button>-->
    <div class="RightBtnContainer_container">
      <div>

      </div>
    </div>
    <div style="position: absolute;right: 60px;   bottom: 70%;">
      <div class="sandTableBox">
        <img draggable="false" src="../../public/img/map.jpg" style="width: 200px; height: 200px;">
        <div v-for="(v,i) in mapDotList" :key="i + 100"
             :style="{width: v.selectFlag?  '18.4px' : '12px', height: v.selectFlag?  '18.4px' : '12px'
             , top: v.selectFlag? '88.7167px' : ' 70.6667px' , left:v.selectFlag? '94.9667px': '113.167px',
             zIndex: '3', position: 'absolute', cursor: 'auto'}">
          <div style="position: relative;">

            <div>
              <div :style="{width: v.selectFlag?  '18.4px' : '12px', height: v.selectFlag?  '18.4px' : '12px',
               borderRadius: v.selectFlag?  '18.4px' : '12px', background: v.selectFlag?  'rgb(245, 40, 43)':'rgb(40, 110, 250)' }"></div>
            </div>
          </div>
        </div>

        <!--        <div-->
        <!--            style="width: 18.4px; height: 18.4px; position: absolute; top: 88.7167px; left: 94.9667px; z-index: 3; cursor: auto;">-->
        <!--          <div style="position: relative;">-->
        <!--            <div class="Tip_tip_3te0xM" style="visibility: hidden;">-->
        <!--              <p>东澳岛02</p>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <div style="width: 18.4px; height: 18.4px; border-radius: 18.4px; background: rgb(245, 40, 43);"></div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        -->
        <!--        -->
        <!--        <div-->
        <!--            style="width: 12px; height: 12px; position: absolute; top: 70.6667px; left: 113.167px; z-index: 2; cursor: pointer;">-->
        <!--          <div style="position: relative;">-->
        <!--            <div class="Tip_tip_3te0xM" style="visibility: hidden;">-->
        <!--              <p>东澳岛01</p>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <div style="width: 12px; height: 12px; border-radius: 12px; background: rgb(40, 110, 250);"></div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="compassR" :style="transformObj" @click="clickRotateComPass">
          <div
              style="-webkit-box-pack: center;   justify-content: center; display: flex; -webkit-box-orient: horizontal; flex-flow: row;">
            <img
                src="data:image/png;base64,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"
                draggable="false">
          </div>
        </div>
      </div>
    </div>


    <div class="main_vr">
      <div class="vr_container" id="vr_container"></div>
      <video id="video" :loop="false" crossOrigin="anonymous" :autoplay="false"
             style="display:none;width: 0px;height: 0px" :src="videoUrl">
      </video>
      <!--        src="http://1259692143.vod2.myqcloud.com/6fda56ccvodcq1259692143/6479003d5285890815766187729/GMSMgREou44A.mp4"-->
      <!--    <video  loop crossOrigin="anonymous" :autoplay="false" playsinline style="width: 100%;height: 100%;" src="https://1259692143.vod2.myqcloud.com/6fda56ccvodcq1259692143/e9c1fd208602268010532095477/j0GlZUmBL8MA.mp4?uuid=2e3vtuuzaw4">-->
      <!--    </video>-->
    </div>
    <SceneSwitcher></SceneSwitcher>
    <Popup v-if="popShowInfo.showFlag" :type="popShowInfo.type"></Popup>
    <!--    <div class="RightBtnContainer_container_2TnlAa"><div><em class="Button_btn_3I1HLL" style="display: block;"><i class="icon_icon_2qVimu" style="background-size: 900px 1009px; background-position: -65px -589px; width: 62px; height: 62px;"></i></em><div><em class="Button_btn_3I1HLL" style="display: block;"><i class="icon_icon_2qVimu" style="background-size: 900px 1009px; background-position: -130px -660px; width: 62px; height: 62px;"></i></em></div><em class="Button_btn_3I1HLL" id="vr_btn" style="display: block;"><i class="icon_icon_2qVimu" style="background-size: 900px 1009px; background-position: 0px -590px; width: 62px; height: 62px;"></i></em><em class="Button_btn_3I1HLL" style="display: block;"><i class="icon_icon_2qVimu" style="background-size: 900px 1009px; background-position: -401px -590px; width: 62px; height: 62px;"></i></em><img class="Image_image_H8TT1o" src="data:image/png;base64,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"></div></div>-->
  </div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import SceneSwitcher from "./SceneSwitcher.vue";
import Popup from "./Popup.vue";
import {ref, reactive} from "vue"

// import Stats from './stats.min.js'
// import { OrbitControls } from './OrbitControls.js'
// , controls,  , light
var container, annie, runner, annies = []
var camera, scene, renderer, texture, controls, stats, geometry, raycaster, textureLoader, mesh
var clock = new THREE.Clock();
// var spriteTL, spriteTR, spriteBL, spriteBR, spriteC, sceneOrtho, cameraOrtho
export default {
  name: 'PanoramicPage',
  components: {Popup, SceneSwitcher},
  props: {
    showZIndex: {
      type: Number,
      default: -1
    },
    videoUrl: {
      type: String,
      default: '../../public/img/backGround2.jpg'
    },
    showType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mapDotList: [{selectFlag: true}, {selectFlag: false}],
      transformObj: 'transform: rotate(0deg)',
      // popShowFlag: false,
      video: null,
      lon: 0,
      lat: 0,
      phi: 0,
      theta: 0,
      onPointerDownPointerY: 0,
      onPointerDownLon: 0,
      onPointerDownPointerX: 0,
      onPointerDownLat: 0,
      mouse: {
        x: 0,
        y: 0
      },
      optionsTreeAll: {
        // 父id
        parentId: 0,
        // 节点id
        nodeId: 1,
        // 位置
        position: '0.5 ,1.2, 15',
        title: '',
        // 大小
        scale: 1, //  右边弹出框的 信息
        popupInfo: {
          popupType: 1,
          imgUrlList: []
        },
        childs: [{
          // 父id
          parentId: 0,
          // 节点id
          nodeId: 1,
          // 位置
          position: '500,250,500',
          title: '',
          scale: 1, //  右边弹出框的 信息
          popupInfo: {
            popupType: 1,
            imgUrlList: []
          },
          childs: []
        }, {
          // 父id
          parentId: 0,
          // 节点id
          nodeId: 1,
          // 位置
          position: '500,-250,500',
          title: '',
          scale: 1, //  右边弹出框的 信息
          popupInfo: {
            popupType: 2,
            imgUrlList: []
          },
          childs: []
        }]
      }
    }
  },
  watch: {
    handlerVideoUrl(newVideoUrl, oldVideoUrl) {
      console.log(newVideoUrl, oldVideoUrl)
      this.videoUrl = newVideoUrl
    }
  },
  setup() {
    // let popShowFlag = ref(false)
    // let popupType =
    let popShowInfo = reactive({
      showFlag: false,
      type: 1
    })
    const popupRef = ref()

    return {popShowInfo, popupRef}
  },
  created() {
    setTimeout(() => {
      // this.init()
    }, 1000)
    textureLoader = new THREE.TextureLoader()

    textureLoader.load('../../public/img//backGround2.jpg', (texture) => {
      texture.mapping = THREE.UVMapping

      this.init(texture)
    })

    this.currentTile = 0;
    // how long should each image be displayed?


    // how long has the current image been displayed?
    this.currentDisplayTime = 0;
  },
  methods: {
    //指南针方法
    rotateComPass() {
      this.transformObj = 'transform: rotate(' + this.lon + 'deg);' + 'ba'
    },
    //指南针方法
    clickRotateComPass() {
      this._touch.lon = 0
      this.lon = 0
    },
    returnMap() {
      this.$emit('closeVR')
    },
    // three.js方法
    init(texture) {


      // const app = document.querySelector('#app')
      // app.style.overflow = 'hidden'
      // this.videoUrl =  '../../public/img/backGround2.jpg'
      // this.showType = showType
      this.video = document.querySelector('#video')


      raycaster = new THREE.Raycaster()
      raycaster.far = 5500

      renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      // renderer.shadowMap.enabled = true
      // renderer.autoClear = false; // To allow render overlay on top of sprited sphere
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // renderer.toneMappingExposure = 1;
      // renderer.physicallyCorrectLights = true;

      // container.appendChild( renderer.domElement );


      container = document.querySelector('#vr_container')
      container.appendChild(renderer.domElement)

      console.log(11)

      stats = new Stats();
      container.appendChild(stats.dom);
      // 创建相机

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.target = new THREE.Vector3(0, 0, 0);
      camera.position.set(0, 0, 0)

      // 创建场景

      // var options = {
      //   generateMipmaps: true,
      //   minFilter: THREE.LinearMipmapLinearFilter,
      //   magFilter: THREE.LinearFilter
      // }

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x222222);
      // scene.background = new THREE.WebGLCubeRenderTarget(1024, options).fromEquirectangularTexture(renderer, texture)
      // scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.5))


      // controls = new OrbitControls(camera, renderer.domElement);
      // controls.target.set(0, 0, 0);
      // controls.minDistance = 35;
      // controls.maxDistance = 200;
      //
      // controls.rotateSpeed = 1.0;
      // controls.zoomSpeed = 1.2;
      // controls.panSpeed = 0.8;


      // 创建几何体
      geometry = new THREE.SphereGeometry(800, 100, 100)
      // invert the geometry on the x-axis so that all of the faces point inward

      geometry.scale(-1, 1, 1)
      //
      //
      this.initLoadMesh()


      let Ambient = new THREE.AmbientLight(0xFFFFFF, 0.5);
      scene.add(Ambient);

      // canvas事件绑定
      renderer.domElement.onmousemove = this.canvasMouseMove
      renderer.domElement.onmouseout = this.canvasMouseOut
      renderer.domElement.onmouseup = this.canvasMouseup
      renderer.domElement.onmousedown = this.canvasMouseDown
      renderer.domElement.ontouchstart = this.canvasTouchstart
      renderer.domElement.ontouchmove = this.canvasTouchmove
      renderer.domElement.ontouchend = this.canvasTouchend

      window.addEventListener('resize', this.onWindowResize)


      this.initLoadOptions()


      setTimeout(() => {
        if (this.showType === 1) {
          this.video.play()
        }
        this.animate()

      }, 50)

    },
    initLoadOption(v, i) {
      function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
        // note: texture passed by reference, will be updated by the update function.

        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet.
        this.numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

        // how long should each image be displayed?
        this.tileDisplayDuration = tileDispDuration;

        // how long has the current image been displayed?
        this.currentDisplayTime = 0;

        // which image is currently being displayed?
        this.currentTile = 0;

        this.update = function (milliSec) {
          this.currentDisplayTime += milliSec;
          while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
              this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
            texture.offset.y = currentRow / this.tilesVertical;
          }
        };
      }

      var runnerTexture = new THREE.ImageUtils.loadTexture('../../public/img/11.png');
      var runnerMaterial = new THREE.MeshBasicMaterial({
        map: runnerTexture,
        side: THREE.DoubleSide,
        opacity: 1,
        transparent: true
      });
      var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);

      let split = v.position.split(',')
      let x = parseInt(split[0] - 0)
      let y = parseInt(split[1] - 0)
      let z = parseInt(split[2] - 0)


      let runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
      runner.position.set(x, y, z);
      runner.name = 'runner'
      runner.index = i


      let a = {
        annie: new TextureAnimator(runnerTexture, 1, 25, 25, 160),
        runner: runner,
      }
      this.lookAtCamera(runner)
      scene.add(runner);

      annies.push(a)// texture, #horiz, #vert, #total, duration.

    },
    initLoadOptions() {

      this.optionsTreeAll.childs.forEach((v, i) => {
        this.initLoadOption(v, i)
      })
      console.log(annies)
    },
    initLoadMesh() {
      // if (this.showType === 1) {
      //   console.log(this.video)
      //   texture = new THREE.VideoTexture(this.video)
      //   // 组成物体
      //   const material = new THREE.MeshBasicMaterial({map: texture})
      //   const mesh = new THREE.Mesh(this.geometry, material)
      //   mesh.position.set(0, 0, 0)
      //   scene.add(mesh)
      // } else {
      //
      //   let  textureLoader = new THREE.TextureLoader();
      //   textureLoader.load( '../../public/img//backGround2.jpg',  ( texture ) =>  {
      //     texture.mapping = THREE.UVMapping;
      //     const options = {
      //       generateMipmaps: true,
      //       minFilter: THREE.LinearMipmapLinearFilter,
      //       magFilter: THREE.LinearFilter
      //     };
      //     scene.background = new THREE.WebGLCubeRenderTarget( 1024, options ).fromEquirectangularTexture( renderer, texture );
      //   } );
      //
      //   controls = new OrbitControls(camera, renderer.domElement);
      //   controls.target.set(0, -5, 0);
      //   controls.minDistance = 35;
      //   controls.maxDistance = 200;
      //
      //   controls.rotateSpeed = 1.0;
      //   controls.zoomSpeed = 1.2;
      //   controls.panSpeed = 0.8;
      // }

      if (this.showType === 1) {
        texture = new THREE.VideoTexture(this.video)
      } else {
        texture = new THREE.TextureLoader().load(this.videoUrl)
      }
      // 组成物体
      const material = new THREE.MeshBasicMaterial({map: texture})
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      mesh.position.set(0, 0, 0)
    },
    changeScene(index) {
      console.log(index)
      texture = new THREE.TextureLoader().load('../../public/img/backGround' + index + '.jpg')
      mesh.material.map = texture
      console.log(mesh)
    },
    // 重绘
    animate() {
      this.rotateComPass()

      this.rAfID = requestAnimationFrame(() => {
        this.animate()
      })

      var delta = clock.getDelta();
      annies.forEach(v => {
        v.annie.update(1750 * delta);
      })
      // controls.update()

      this.lat = Math.max(-85, Math.min(85, this.lat))
      this.phi = THREE.MathUtils.degToRad(90 - this.lat)
      this.theta = THREE.MathUtils.degToRad(this.lon)
      camera.position.x = 50 * Math.sin(this.phi) * Math.cos(this.theta)
      camera.position.y = 50 * Math.cos(this.phi)
      camera.position.z = 50 * Math.sin(this.phi) * Math.sin(this.theta)
      camera.lookAt(camera.target)
      camera.position.copy(camera.target).negate()

      stats.update();


      this.update()
    },
    // 更新
    update() {
      renderer.clear()
      renderer.render(scene, camera)
    },
    // 初传入物体 object 3d  旋转到 正对 相机
    lookAtCamera(thing) {
      let targetQuaternion = new THREE.Quaternion()
      let rotationMatrix = new THREE.Matrix4()
      // console.log(this.cylinder)
      rotationMatrix.lookAt(camera.position, thing.position, camera.position)
      targetQuaternion.setFromRotationMatrix(rotationMatrix)

      thing.quaternion.rotateTowards(targetQuaternion, 0)
      thing.lookAt(camera.position)
    },
    chengeVrSource(videoUrl, showType) {
      this.videoUrl = videoUrl
      this.showType = showType
      this.initLoadMesh()
      setTimeout(() => {
        if (this.showType === 1) this.video.play()
        this.animate()
      }, 20)
    },
    closeUpdate() {
      cancelAnimationFrame(this.rAfID)
      this.video.pause()
    },
    canvasMouseMove(event) {
      if (this.isMove) {
        this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon
        this.lat = (this.onPointerDownPointerY - event.clientY) * 0.1 + this.onPointerDownLat
      }
    },
    canvasMouseOut(event) {
      if (this.isMove) {
        this.isMove = false
      }
    },
    canvasMouseup(event) {
      if (this.isMove) {
        this.isMove = false
      }
    },
    canvasMouseDown(event) {
      event.preventDefault()
      // if (this.showType) {
      this.isMove = true
      // }
      this.onPointerDownPointerX = event.clientX
      this.onPointerDownPointerY = event.clientY

      this.onPointerDownLon = this.lon
      this.onPointerDownLat = this.lat

      console.log(11)
      this.mouse.x = ((event.clientX) / (window.innerWidth)) * 2 - 1
      this.mouse.y = -((event.clientY) / (window.innerHeight)) * 2 + 1
      console.log(11, this.mouse)
      raycaster.setFromCamera(this.mouse, camera)// 更新射线
      let intersects = raycaster.intersectObjects(scene.children, true) // 参数1：检测对象，参数2：是否检测该对象的children
      // let intersects = raycaster.intersectObjects(this.optionsGroup.children, true); //参数1：检测对象，参数2：是否检测该对象的children
      // intersects 与射线相交的模型
      console.log('intersects', intersects)
      console.log(camera)

      intersects.forEach(v => {
        if (v.object instanceof THREE.Mesh && v.object.name === 'runner') {
          console.log('popup show', this.$refs, this.optionsTreeAll.childs[v.object.index])
          this.popShowInfo.showFlag = true
          this.popShowInfo.type = this.optionsTreeAll.childs[v.object.index].popupInfo.popupType
          // this.$refs.popupRef.popupOpen()
        }
      })

    },

    // 触摸事件
    canvasTouchstart(event) {
      // this.flag3 = true
      // if (this.showType) {
      this.isMove = true
      // }

      event.preventDefault();
      this.isUserInteracting = true;
      this.onPointerDownPointerX = event.touches[0].clientX;
      this.onPointerDownPointerY = event.touches[0].clientY;

      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;

    },
    canvasTouchmove(event) {

      if (this.isMove === true) {

        this.lon = (this.onPointerDownPointerX - event.touches[0].clientX) * 0.1 + this.onPointerDownLon;
        this.lat = (this.onPointerDownPointerY - event.touches[0].clientY) * 0.1 + this.onPointerDownLat;

      }

    },
    canvasTouchend() {
      this.isMove = false;
      // this.flag3 = false
    },
    // 拖动canvas，动态改变选项的位置
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    closePopup() {
      this.popShowInfo.showFlag = false
    }
  }
}
</script>

<style lang="scss">
.vrDiv {
  width: 100%;
  height: 100%;
  position: absolute;


  .compassR {

    width: 128px;
    height: 128px;
    position: absolute;
    top: 33.9167px;
    left: 40.1667px;
    display: block;

    //width: 60px;
    //height: 60px;
    //position: fixed;
    //bottom: 80%;
    //right: 60px;
    //z-index: 999;

    img {
      //display: block;
      width: 57px;
      height: 64px;
      border: 0;
      -webkit-user-drag: none;
    }

  }

  .main_vr {

  }
}

.sandTableBox {
  width: 200px;
  position: relative;
  overflow: hidden;

}

.Tip_tip_3te0xM {
  position: absolute;
  background: #fff;
  top: -33px;
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  color: #333;
}

.vr_container {
  width: 99%;
  height: 99%;
  left: 0;
  top: 0;
}
.RightBtnContainer_container{
  position: absolute;
  right: 15px;
  z-index: 4300;
  display: block;
  .Button_btn_3I1HLL {
    width: 31px;
    height: 31px;
    margin-bottom: 14px;
    cursor: pointer;
  }
}

</style>
