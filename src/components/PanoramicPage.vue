<template>
    <el-button style="position:absolute; right: 2px" type="success" plain size="mini" @click="returnMap">返回</el-button>
    <div class="main_vr">
      <div class="vr_container" id="vr_container"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import imgUtl from  '../assets/img/backGround2.jpg'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import SceneSwitcher from "./SceneSwitcher.vue";
import basicColorLights from '../shaders/BasicColorLights.js'
import BasicColor from '../shaders/BasicColor'
import {MeshReflectorMaterial} from '../shaders/reflect-mat.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import {TWEEN}  from 'three/examples/jsm/libs/tween.module.min.js';

import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js'
// , controls, raycaster , light
var container, mixer ,raycaster
var camera, scene, renderer, texture,controls,stats,geometry,imgMesh ,modelAnimation

var clock = new THREE.Clock()

// var spriteTL, spriteTR, spriteBL, spriteBR, spriteC, sceneOrtho, cameraOrtho
export default {
  name: 'PanoramicPage',
  components: {SceneSwitcher},
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
        x:0,
        y:0
      }
    }
  },
  watch: {
    handlerVideoUrl(newVideoUrl, oldVideoUrl) {
      console.log(newVideoUrl, oldVideoUrl)
      this.videoUrl = newVideoUrl
    }
  },
  created() {
    setTimeout( () => {
      this.init()
    },1000)
  },
  methods: {
    returnMap() {
      this.$emit('closeVR')
    },
    // three.js方法
    init( ) {
      // const app = document.querySelector('#app')
      // app.style.overflow = 'hidden'
      // this.videoUrl =  '../../public/img/backGround2.jpg'
      // this.showType = showType
      container = document.querySelector('.vr_container')

      stats = new Stats();
      container.appendChild(stats.dom);


      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      // renderer.toneMapping = THREE.LinearToneMapping;
      renderer.toneMappingExposure = 1;
      // renderer.shadowMap.enabled = true
      // renderer.physicallyCorrectLights
      // renderer.shadowMap.type =
      renderer.outputEncoding = THREE.sRGBEncoding;
      // renderer.shadowMap.enabled = true; // 渲染器
      container.appendChild(renderer.domElement)


      // 创建相机

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.target = new THREE.Vector3( 0, -1.5, 0 );
      camera.position.set(0, 1.5, 0)

      // 创建场景
      scene = new THREE.Scene()
      // scene.background = new THREE.Color(0x101010)


      let textureLoader = new THREE.TextureLoader(  )
      textureLoader.load('../../public/img/play.png', (texture) => {
        texture.mapping = THREE.UVMapping;
        let geometry = new THREE.PlaneGeometry(0.5, 0.5, 4, 4);
        let material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
        material.transparent = true;//是否透明
        material.opacity = 1;//透明度

        imgMesh = new THREE.Mesh(geometry, material);
        imgMesh.position.x = 11
        imgMesh.position.y = 0.8 ;
        imgMesh.position.z = -5
        imgMesh.scale.x = imgMesh.scale.y = imgMesh.scale.z = 1;
        imgMesh.rotateY(-Math.PI/2 )
        imgMesh.name =  'play'
        // imgMesh.visible = visible
        // if ( visible ){
        //   optionsGroup.add(imgMesh)
        // }else {
        scene.add(imgMesh);
        // }
      });






      let loader =  new GLTFLoader()
      loader.setDRACOLoader( new DRACOLoader().setDecoderPath( '../../public/gltf/' ) )
      loader.setPath( '../../public/model/' )
      loader.load( 'quanjingcyycombined.glb', function ( gltf ) {
            console.log(gltf )
            gltf.scene.scale.set(1, 1, 1)
            gltf.scene.position.set(0,0 , 0)
            // mixer = new THREE.AnimationMixer( gltf.scene );
            // mixer.timeScale = 4
            // mixer.clipAction( gltf.animations[ 0 ] ).play();
            scene.add( gltf.scene );

          } );

      loader.load( 'test-51.glb', function ( gltf ) {
        console.log(gltf )
        gltf.scene.scale.set(0.01, 0.01, 0.01)
        gltf.scene.position.set(12, 0, -5)
        gltf.scene.rotateY( - Math.PI / 2)
        // gltf.scene.position.set(0, 10, -8.599)
        mixer = new THREE.AnimationMixer( gltf.scene );
        // mixer.timeScale = 4
        modelAnimation =  mixer.clipAction( gltf.animations[ 0 ] )

        scene.add( gltf.scene );
      } );

      // TODO
      var pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      let hdr = new RGBELoader()

      hdr.load('../public/hdr/backHrd.hdr', (texture) => {
        let envMap = pmremGenerator.fromEquirectangular(texture).texture
        // scene.background = envMap
        scene.environment = envMap

      })

      scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.5))
      //
      let geometryPlane = new THREE.PlaneGeometry(25,25)
      let materialPlane = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
      const plane = new THREE.Mesh( geometryPlane, materialPlane );
      plane.position.y = 0.2
      plane.position.x = 5
      plane.position.z = -1
      plane.rotateX( -Math.PI/2 )
      plane.name = 'ground'
      plane.visible = false
      scene.add( plane );




      raycaster = new THREE.Raycaster()
      raycaster.far = 5500


      // TODO 旋转摄像机
      // controls = new OrbitControls(camera, renderer.domElement)
      // controls.target.set(10.963, 1.185, -8.599)
      // controls.minDistance = 1
      // controls.maxDistance = 800
      // // controls.enableRotate = true
      // controls.rotateSpeed = 1.0
      // controls.zoomSpeed = 1.2
      // controls.panSpeed = 0.8
      //
      // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      // controls.dampingFactor = 0.05;



      // controls = new FirstPersonControls( camera, renderer.domElement );
      // controls.movementSpeed = 150;
      // controls.lookSpeed = 1;

      // canvas事件绑定
      renderer.domElement.onmousemove = this.canvasMouseMove
      renderer.domElement.onmouseout = this.canvasMouseOut
      renderer.domElement.onmouseup = this.canvasMouseup

      renderer.domElement.onmousedown = this.canvasMouseDown
      renderer.domElement.ontouchstart = this.canvasTouchstart
      renderer.domElement.ontouchmove = this.canvasTouchmove
      renderer.domElement.ontouchend = this.canvasTouchend

      renderer.domElement.onclick = this.onMouseClick

      // renderer.domElement.on
      window.addEventListener('resize', this.onWindowResize)
      let elementsByTagName = document.querySelector('canvas')
      console.log(elementsByTagName)
      // 点击事件
      elementsByTagName.addEventListener('click', this.onMouseClick)

      this.rAfID = requestAnimationFrame(
          this.animate
      )

    },
    // 重绘
    animate(time) {
      // console.log(time)

      if ( controls ) {
        controls.update(clock.getDelta())
      }else {
        this.lat = Math.max(-85, Math.min(85, this.lat))
        this.phi = THREE.MathUtils.degToRad(90 - this.lat)
        this.theta = THREE.MathUtils.degToRad(this.lon)
        camera.position.x = 50 * Math.sin(this.phi) * Math.cos(this.theta)
        camera.position.y = 50 * Math.cos(this.phi)
        camera.position.z = 50 * Math.sin(this.phi) * Math.sin(this.theta)

        camera.lookAt(camera.target)
        camera.position.copy(camera.target).negate()
      }



      this.rAfID = requestAnimationFrame(
          this.animate
      )
      if (TWEEN) {
        TWEEN.update()
      }
      const delta = clock.getDelta();
      if ( mixer) {
        mixer.update( delta );

      }

      this.update()
    },
    // 更新
    update() {
      stats.update();
      // renderer.clear()
      renderer.render(scene, camera)
    },

    onMouseClick (event) {
      console.log(11)
      this.clickFlag = true
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      event.preventDefault()
      // 注意坐标
      // console.log(event.clientX,event.clientY,window.innerWidth,window.innerHeight)
      this.mouse.x = ((event.clientX) / (window.innerWidth)) * 2 - 1
      this.mouse.y = -((event.clientY) / (window.innerHeight)) * 2 + 1
      raycaster.setFromCamera(this.mouse, camera)// 更新射线

      let intersects = raycaster.intersectObjects(scene.children, true) // 参数1：检测对象，参数2：是否检测该对象的children
      // let intersects = raycaster.intersectObjects(this.optionsGroup.children, true); //参数1：检测对象，参数2：是否检测该对象的children
      // intersects 与射线相交的模型
      // console.log('intersects', intersects,intersects[0],camera)
      if ( intersects.length ) {
        let v = intersects[0].object
        // && !v.visible
        if (v instanceof THREE.Mesh  &&v.name === 'ground') {
          console.log(111,'移动')
          // camera.position.set(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z)

          // this.animateCamera(camera.position,  intersects[0].point ,controls.target, intersects[0].point, () => {
          // })
          intersects[0].point.y = intersects[0].point.y+ 1.5
          // camera.target = intersects[0].point
          this.animateCamera2(camera.position,intersects[0].point, () => {
            camera.target = intersects[0].point.negate()
          })
        }else if ( v.name === 'play') {
          imgMesh.visible = false
          modelAnimation.play()
        }

      }

      intersects.forEach(value => {
        if (value.object instanceof THREE.Sprite && value.object.visible) {
        }
      })
    },
    // current1 相机当前的位置
    // target1 相机的目标位置
    // current2 当前的controls的target
    // target2 新的controls的target
    animateCamera (current1, target1, current2,    target2, onLoaded) {
      // camera.lookAt(0, 0, 0)
      let positionVar = {
        x1: current1.x,
        y1: current1.y,
        z1: current1.z,
        x2: current2.x,
        y2: current2.y,
        z2: current2.z
      }
      // 关闭控制器
      controls.enabled = false;
      console.log(TWEEN)
      // camera.setRotationFromQuaternion(new THREE.Quaternion(0, 0, 0, 1))
      var tween = new TWEEN.Tween(positionVar)
      console.log(tween)
      tween.to({
        x1: target1.x,
        y1: target1.y,
        z1: target1.z,
      }, 1000)
      tween.onUpdate(() => {
        // camera.lookAt(target2)
        camera.position.x = positionVar.x1
        camera.position.y = positionVar.y1
        camera.position.z = positionVar.z1

      })
      tween.start()
      tween.onComplete(() => {
        console.log(111)
        // camera.setRotationFromQuaternion(new THREE.Quaternion(0, 0, 0, 1))
        // controls.target.x = target2.x
        // controls.target.y = target2.y
        // controls.target.z = target2.z
        controls.enabled = true


        onLoaded()
      })
      tween.easing(TWEEN.Easing.Sinusoidal.InOut)
    },

    animateCamera2 (current1,  target1, onLoaded) {
      // camera.lookAt(0, 0, 0)
      // camera.up = new THREE.Vector3(0, 1, 0)
      let positionVar = {
        x: current1.x,
        y: current1.y,
        z: current1.z,
      }
      // 关闭控制器
      console.log(TWEEN)
      // camera.setRotationFromQuaternion(new THREE.Quaternion(0, 0, 0, 1))
      var tween = new TWEEN.Tween(positionVar)
      console.log(tween)
      tween.to({
        x: target1.x,
        y: target1.y,
        z: target1.z
      }, 1000)
      tween.onUpdate(() => {
        // camera.lookAt(target2)
        camera.position.x = positionVar.x
        camera.position.y = positionVar.y
        camera.position.z = positionVar.z
      })
      tween.start()
      tween.onComplete(() => {
        console.log(111)
        // camera.setRotationFromQuaternion(new THREE.Quaternion(0, 0, 0, 1))
        onLoaded()
      })
      tween.easing(TWEEN.Easing.Sinusoidal.InOut)
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
      // if (this.showType) {
        this.isMove = true
      // }
      this.onPointerDownPointerX = event.clientX
      this.onPointerDownPointerY = event.clientY

      this.onPointerDownLon = this.lon
      this.onPointerDownLat = this.lat
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
    }
  }
}
</script>

<style lang="scss">
.vrDiv {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rosybrown;

  .main_vr {

  }
}

.vr_container {
  width: 99%;
  height: 99%;
  left: 0;
  top: 0;
}
</style>
