<template>
<div class="popup-div" >
  <div class="popup-header-div">
    <p>盲盒答题</p>
  </div>
  <div class="popup-body-div" >
    <div style="position: absolute; inset: 0px"></div>
    <div class="popup-backdrop-div">
    </div>
    <div class="popup-container-div">
      <span class="el-image-viewer__btn el-image-viewer__close" @click="closePopup" v-show="type !== 1">
        <i class="el-icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
          </path>
        </svg>
        </i>
      </span>

      <div style="position: absolute;top: 50%; left: 50%;margin: -22.5% 0% 0% -37.5%;width: 90%"   >
        <div style="width: 90%;height: 50%;font-size: 16px"   v-show="clickFlag">
          <img src="../../public/icon/图片1.png" v-for=" (v,i) in 20" :key="i"
               @click="lotteryBox(i)"
               :style="{width: imgWidth +'px' ,height: imgHeight + 'px', marginLeft: imgLeft + 'px' }"
          >
        </div>
        <div  style="width: 90%;height: 50%;font-size: 16px"  v-show="!clickFlag">
          <div>
            <h3>题目：太阳在上面时候下雨</h3>
          </div>
          <div style="margin-top: 100px;display: block">
            <el-button @click="checkAnswer(0)">A : 可以</el-button>
            <el-button @click="checkAnswer(1)">B: 可以</el-button>
            <el-button @click="checkAnswer(2)">C: 可以</el-button>
            <el-button @click="checkAnswer(3)">D: 可以</el-button>
          </div>
        </div>
      </div>

    </div>

  </div>


  <el-dialog v-model="centerDialogVisible" title="请填写个人收件信息" width="40%" center>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <el-form-item label="收件人" prop="userName">
          <el-input v-model="ruleForm.userName" />
        </el-form-item>

        <el-form-item label="电话号码" prop="userPhone">
          <el-input v-model.number="ruleForm.userPhone" />
        </el-form-item>

        <el-form-item label="收件地址" prop="userAddress">
          <el-input v-model="ruleForm.userAddress" type="textarea" />
        </el-form-item>
      </el-form>

    <template #footer>
      <span class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false" >确定</el-button>

        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>
import {reactive , ref} from "vue";
import { ElMessage } from 'element-plus'


export default {
  name: "BlindBoxPop",
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    let imgWidth , imgHeight ,imgLeft

    console.log(window.innerWidth * 0.9 / 5,window.innerHeight* 0.7 /4)
    let w = window.innerWidth * 0.9 / 5
    let h = window.innerHeight* 0.7 /4
    if (w > h) {
      imgWidth = h
      imgHeight = h
      imgLeft = (w - h) * 0.5
    }else  {
      imgHeight = w
      imgWidth = 2
      imgLeft = (h - w) * 0.5
    }
    console.log(imgWidth , imgHeight ,imgLeft )
    let clickFlag  = ref(true)
    function lotteryBox(i)  {
      console.log(i)
      console.log(clickFlag.value )
      let number = (Math.random() * 100  ) % 20;
      console.log(number)
      clickFlag.value = false
      console.log(clickFlag.value )
    }

    const centerDialogVisible = ref(false)




    const formSize = ref('default')
    const ruleFormRef = ref()
    const ruleForm = reactive({
      userName: 'Hello',
      userPhone:  undefined,
      userAddress: ''
    })
    const rules = reactive({
      userName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur' },
      ],
      userPhone: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'blur',
          type: 'number'
        },
      ],
      userAddress: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
      ],
    })

    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    // const resetForm = (formEl: FormInstance | undefined) => {
    //   if (!formEl) return
    //   formEl.resetFields()
    // }


    return {
      imgWidth , imgHeight ,imgLeft ,clickFlag ,lotteryBox,centerDialogVisible,
      formSize,ruleFormRef,ruleForm,rules
    }
  },
  created() {

  },
  mounted() {
    console.log(2)
  },
  show(){
    console.log(3)

  },
  methods: {
    closePopup() {
      this.$parent.closeBlindBoxPopShowInfo()
    },
    popupOpen() {

    },
    checkAnswer(i) {
      console.log(i)
      if (i === 1) {
        // open()
        this.centerDialogVisible = true
      } else {
        ElMessage({
          type: 'error',
          message: '回答错误',
        })
        this.closePopup()
      }
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
  z-index: 1000;
  padding-top: 50px;
  background-color: rgba(0,0,0,.8);
  color: #fff;
  .popup-header-div{
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
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



.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>
