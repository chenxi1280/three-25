<template>
  <div>
<!--    <HelloWorld msg="hello world" />-->
    <PanoramicPage></PanoramicPage>
<!--    <BarrageArea></BarrageArea>-->
<!--    <BarrageTest></BarrageTest>-->
  </div>

</template>

<script>
import  HelloWorld from '../components/HelloWorld.vue'
import PanoramicPage from "../components/PanoramicPage.vue";
import Barrage from "../components/Barrage.vue";
export default {
  components: {Barrage, PanoramicPage}
}

</script>

<style scoped>


</style>
