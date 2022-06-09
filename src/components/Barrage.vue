<template>
  <div class="build-page">
    <div class="mivebidss">
      <div class="mive-box" ref="listbox">
        <div
            :style="item.style"
            v-for="(item, index) in buildList.list"
            :key="index"
        >{{ item.text }}</div>
      </div>
    </div>
    <div class="input-build">
      <input type="text" v-model="buildText" placeholder="发表你的弹幕吧！" @keyup.enter="sendBuild" />
      <button @click="sendBuild">发送</button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "vue";
export default {
  setup() {
    let { buildText, buildList, sendBuild, listbox, times } = buildFan();
    return { buildText, buildList, sendBuild, listbox, times };
  },
  mounted() {
    this.$h.post(`api/user/getToken`).then(res => {
      console.log(res)
    })
  }
};
function buildFan() {
  const buildText = ref("");
  const buildList: any = reactive({
    list: [],
  });
  const listbox = ref();
  let times:any = ref(null);
  let boxHeight: number;
  onMounted(() => {
    boxHeight = listbox.value.offsetHeight;
  });
  function sendBuild() {
    if (buildText.value != "") {
      buildList.list.push({
        text: buildText.value,
        style: {
          top: 400 + "px"  ,
          color: "#" + Math.random().toString(16).substr(2, 6).toUpperCase(),
          fontSize: 18 + "px", //Math.floor(Math.random() * (30 - 12) + 12)
          left:    2 + "px",
          setLefr: 400,
        },
      });
      if (times) clearInterval(times);
      times = setInterval( () =>{
        for (let i = 0; i < buildList.list.length; i++) {
          buildList.list[i].style.setLefr -= 50 / 80;
          buildList.list[i].style.top = buildList.list[i].style.setLefr + "px";
          if (buildList.list[i].style.setLefr < -400) {
            // buildList.list.splice(i, 1);
            buildList.list.shift()
            i--;
          }
          if (buildList.list.length < 1) {
            clearInterval(times);
            times = null;
          }
        }
      }, 10);
    } else {
      buildText.value = "";
    }
    buildText.value = "";
  }

  return { buildText, buildList, sendBuild, listbox, times };
}
</script>

<style scoped>
.build-page {
  /*height: 100%;*/
  /*width: 100%;*/
  position: absolute;
  right: 10px;
  bottom: 170px;
}
.mivebidss {
  width: 250px;
  height: 350px;
  margin: 0 auto;
  background-color:rgba(175, 175, 175, 0.3);;
  margin-bottom: 10px;
}
.mive-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mive-box > div {
  position: absolute;
  left: 700px;
  overflow: hidden;
}
.input-build {
  display: flex;
  width: 250px;
  margin: 0 auto;
}
.input-build > input {
  flex: 1;
}
</style>
