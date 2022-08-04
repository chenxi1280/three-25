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

// , controls, raycaster , light
var container
var camera, scene, renderer, texture,controls,stats,geometry

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
      onPointerDownLat: 0
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


      renderer = new THREE.WebGLRenderer()
      // renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      // 创建相机

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0, 60)

      // 创建场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x101010)

      scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.5))

      let  light = new THREE.DirectionalLight(0xffffff, 0.75)
      light.position.set(0, 2.3, 0)
      // camera.add(light);
      light.visible = false
      scene.add(light)
      // 创建几何体
      geometry = new THREE.SphereGeometry(50, 100, 100)
      // invert the geometry on the x-axis so that all of the faces point inward
      // geometry.position.set(0,0,0)
      geometry.scale(1, 1, 1)
      // let  shader = reflectMat
      // let shaderObject = {
      //   vertexShader: shader.vertexShader,
      //   fragmentShader: shader.fragmentShader,
      //   lights: true
      // }
      // // Add uniforms if present.
      // if ('uniforms' in shader) {
      //   // Using UniformUtils will clone the shader files uniforms,
      //   shaderObject.uniforms = THREE.UniformsUtils.merge([
      //     THREE.UniformsLib['lights'],
      //     shader.uniforms
      //   ])
      // }
      // // Set this new material on the mesh.
      // let material = new THREE.ShaderMaterial(shaderObject)
      // add the original uniforms here so we can loop over them in the Controls, because other uniforms are added thathttps://github.com/2pha/vue-three-shaders.git we don't want controls for.
      // material.customUniforms = shader.uniforms

      // const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
       let material = new MeshReflectorMaterial( renderer, camera,scene, geometry, {
        dithering: true,
        blur: [ 1000, 1000 ],
        mixBlur: 30,
        mixStrength: 80,
        mixContrast: 1,
        resolution: 1024,
        mirror: 0,
        depthScale: 0.01,
        minDepthThreshold: 0.9,
        maxDepthThreshold: 1,
        depthToBlurRatioBias: 0.25,
        debug: 0,
        reflectorOffset: 0.2,
      } );

      // ground.material.setValues( {
      //   envMapIntensity: 0,
      //   color: new THREE.Color( 0.1, 0.1, 0.1 ),
      //   roughnessMap: assets.roughnessMap,
      //   normalMap: assets.normalMap,
      // } )
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0,0,-100)
      scene.add(mesh)

      this. initLoadMesh()


      const geometry2 = new THREE.PlaneGeometry(200, 200);
      const fragmentShader = `
      #include <common>

      uniform vec3 iResolution;
      uniform float iTime;
      uniform sampler2D iChannel0;

      // By Daedelus: https://www.shadertoy.com/user/Daedelus
      // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
      #define TIMESCALE 0.25
      #define TILES 8
      #define COLOR 0.7, 1.6, 2.8

      void mainImage( out vec4 O, vec2 I)
      {
    //Resolution for scaling
    vec2 r = iResolution.xy,
    //Rotated coordinates
    c = mat2(9,1,-1,9) * (I+I-r),
    //Iteration value
    i = vec2(0,11),
    //Temporary position variable for noise
    p;

    //Clear fragcolor
    for(O-=O;
    //Loop 200 times
    i.x<2e2;
    //Add DOF sample (noise texture, 4 octaves and sine coloring)
    O += pow(sin(texture(iChannel0,p*exp2(mod(i,4.))/2e3)*3.+p.x*.4+vec4(0,2,3,0))*.5+.5,4.+O-O))
        //Compute DOF sample coordinates
        p = c+sin(i)*sqrt(i++).x*c.y/4e2,
        //Correct for perspective and scroll
        p = p/(r+r-p*.1).y+iTime;

    //Fourth root for better coloring
    O = sqrt(sqrt(O))*.3;

      }

      varying vec2 vUv;

      void main() {
        mainImage(gl_FragColor, vUv * iResolution.xy);
      }
      `;
      const vertexShader = `
      varying vec2 vUv;
      void main() {
        // vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `;
      let uniforms = {
        iTime: { value: 0 },
        iResolution:  { value: new THREE.Vector3() },
        iChannel0: { value: texture },

      }
      const shader = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
      });
      this.uniforms = uniforms
      const plane = new THREE.Mesh(geometry2, shader);
      plane.position.set(0,100,-100)
      scene.add(plane);

      let mixer

      let loader =  new GLTFLoader()
      loader.setDRACOLoader( new DRACOLoader().setDecoderPath( '../../public/gltf/' ) )
      loader.setPath( '../../public/model/' )
          .load( 'quanjingcyy1.glb', function ( gltf ) {
            console.log(gltf )
            gltf.scene.scale.set(1, 1, 1)
            gltf.scene.position.set(0, 0, 0)
            // mixer = new THREE.AnimationMixer( gltf.scene );
            // mixer.timeScale = 4
            // mixer.clipAction( gltf.animations[ 0 ] ).play();
            scene.add( gltf.scene );

          } );



      // TODO 旋转摄像机
      controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.minDistance = 1
      controls.maxDistance = 800

      controls.rotateSpeed = 1.0
      controls.zoomSpeed = 1.2
      controls.panSpeed = 0.8

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;

      // this.initLoadMesh()

      let Ambient = new THREE.AmbientLight(0xFFFFFF, 5);
      scene.add(Ambient);

      // canvas事件绑定
      // renderer.domElement.onmousemove = this.canvasMouseMove
      // renderer.domElement.onmouseout = this.canvasMouseOut
      // renderer.domElement.onmouseup = this.canvasMouseup
      // renderer.domElement.onmousedown = this.canvasMouseDown
      // renderer.domElement.ontouchstart = this.canvasTouchstart
      // renderer.domElement.ontouchmove = this.canvasTouchmove
      // renderer.domElement.ontouchend = this.canvasTouchend

      window.addEventListener('resize', this.onWindowResize)

      this.rAfID = requestAnimationFrame(
          this.animate
      )

    },
    // 重绘
    animate(time) {
      // console.log(time)

      this.rAfID = requestAnimationFrame(
          this.animate
      )
      time *= 0.001;  // convert to seconds
      // resizeRendererToDisplaySize(renderer);
      const canvas = renderer.domElement;
      this.uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      this.uniforms.iTime.value = time;
      this.update()
    },
    // 更新
    update() {
      controls.update()
      stats.update();
      // renderer.clear()
      renderer.render(scene, camera)
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
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      mesh.position.set(0, 0, 0)
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
