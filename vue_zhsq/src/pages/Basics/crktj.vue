<template>
  <div ref="crktj">
    <!-- 操作栏区域 -->
    <Title :refDome="refDome"></Title>
    <!-- 导航栏区域 -->
    <div class="breadcrumb_wrap">
      <div class="breadcrumb_img">
        <img :src="breadcrumb[0][1]" />
      </div>
      <div class="breadcrumb_text">{{breadcrumb[0][0]}}</div>
      <div class="cha" @click="handleGoIndex">x</div>
    </div>
    <div class="tou" style="width:91%"></div>
    <!-- 出入口添加 -->
    <div class="crktj_wrap">
      <div class="crktj_wrap_title">
        <div class="crktj_wrap_title_text">出入口信息</div>
      </div>
      <div class="crktj_wrap_conent">
        <!-- 表单 -->
        <el-form
          hide-required-asterisk
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="crktj_ruleForm"
        >
          <!-- 小区编码 -->
          <el-form-item class="crkbm_select_item" label="小区编码：" prop="xqbm">
            <el-select v-model="ruleForm.xqbm" placeholder="请选择小区编码">
              <el-option
                v-for="item in xqbmList"
                :key="item.xq_id"
                :label="item.xqbm +' '+ item.xqmc"
                :value="item.xqbm"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 出入口序号： -->
          <el-form-item class="crkbm_item" label="出入口序号：" prop="crkbm">
            <el-input placeholder="请填写两位数字例如东门01" v-model="ruleForm.crkbm"></el-input>
          </el-form-item>
          <!-- 出入口名称： -->
          <el-form-item class="crkbm_item" label="出入口名称：" prop="crkmc">
            <el-input placeholder="请填写出入口名称,如北门人行出入口" v-model="ruleForm.crkmc"></el-input>
          </el-form-item>
          <!-- 出入口类型： -->
          <el-form-item class="crkbm_select_item" label="出入口类型：" prop="lx">
            <el-select v-model="ruleForm.lx" placeholder="请选择类型">
              <el-option label="人行" value="11"></el-option>
              <el-option label="车行" value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="from_img_wrap">
          <div class="from_img_wrap_image">出入口照片:</div>
          <div class="from_img_wrap_upLiadImg">
            <el-upload
              class="avatar-uploader"
              action=""
              :on-change="getFile"
              :limit="1"
            >
              <input v-model="imgname" class="imgInput" placeholder="点击右边选择一张图片" />
              <div class="upImg">选择图片</div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,一次只能传一次</div>
            </el-upload>
          </div>
        </div>
        <div class="black_wrap_crktj" @click="handleBlack">返回</div>
        <div class="up_wrap_crktj" @click="handleUp">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '../../components/title'
import Qs from 'qs'
export default {
  components: {
    Title,
  },
  data() {
    return {
      // 放大
      refDome: null,
      // 面包屑
      breadcrumb: [],
      //   小区编码列表
      xqbmList: [],
      imgname: '',
      ruleForm: {
        xqbm: '',
        crkbm: '',
        crkmc: '',
        lx: '',
        crkzp: '',
      },
      rules: {
        crkbm: [
          { required: true, message: '请输入出入口编码', trigger: 'blur' },
          { min: 2, max: 2, message: '长度在 2 到 2 个字符', trigger: 'blur' },
        ],
        crkmc: [
          { required: true, message: '请输入出入口名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        lx: [{ required: true, message: '请选择出入口类型', trigger: 'blur' }],
        xqbm: [
          { required: true, message: '请选择出入口类型', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    // 面包屑的
    let breadcrumb = window.sessionStorage.getItem('breadcrumb')
    let breadcrumb5 = breadcrumb.split(',')[4]
    let breadcrumb6 = `${breadcrumb.split(',')[5]},${breadcrumb.split(',')[6]}`
    let breadcrumb7 = breadcrumb.split(',')[7]
    let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb7]
    this.breadcrumb = [breadcrumb8]
    //获取小区编码
    this.handlecrkxqbm()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.crktj
  },
  methods: {
    //   点击面包屑的x事件
    handleGoIndex() {
      let breadcrumb = window.localStorage.getItem('breadcrumb')
      let breadcrumb1 = breadcrumb.split(',')[0]
      let breadcrumb2 = `${breadcrumb.split(',')[1]},${
        breadcrumb.split(',')[2]
      }`
      let breadcrumb3 = breadcrumb.split(',')[3]
      let breadcrumb4 = [breadcrumb1, breadcrumb2, breadcrumb3]
      let breadcrumb9 = [breadcrumb4]
      this.$router.push({ path: 'index', query: { breadcrumb: breadcrumb9 } })
      window.sessionStorage.setItem('breadcrumb', breadcrumb9)
      window.sessionStorage.setItem('activePath', `/index`)
      eventBus.$emit('breadcrumb', breadcrumb9)
      location.reload()
    },
    // 获取小区编号
    async handlecrkxqbm() {
      let res = await this.$http.get('xq/selXQ.do')
      //   console.log(res)
      this.xqbmList = res.data
    },
    getBase64(file) {
      let slef = this
      //把图片转成base64编码
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          slef.ruleForm.crkzp = imgResult
          resolve(imgResult)
        }
      })
    },
    getFile(file, fileList) {
      //上传图片
      this.imgname = file.name
      this.getBase64(file.raw)
    },
    // 返回
    handleBlack() {
      this.$router.go(-1)
    },
    // 提交
    handleUp() {
      let self = this
      console.log(self.ruleForm)
      let data = {
        xqbm: self.ruleForm.xqbm,
        crkbm: self.ruleForm.crkbm,
        crkmc: self.ruleForm.crkmc,
        lx: self.ruleForm.lx,
        crkzp: self.ruleForm.crkzp,
      }
      data = Qs.stringify(data)
      //   console.log(this.ruleForm)
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          //   console.log(self.ruleForm)
          let res = await self.$http.post('/crk/xzcrk.do', data)
          // console.log(res)
          if (res.data.massage.status == 200) {
            self.$message.success('添加成功')
            self.$router.go(-1)
          } else if (res.data.massage.status == 202) {
            self.$message.error('出入口编码重复')
          } else {
            self.$message.error('添加失败')
          }
        }
      })
    },
  },
}
</script>
<style lang="less">
// 面包屑的样式
.breadcrumb_wrap {
  width: 9%;
  height: 39px;
  float: left;
  display: flex;
  align-items: center;
  .breadcrumb_img {
    width: 16px;
    height: 13px;
    margin-right: 12px;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: super;
    }
  }
  .breadcrumb_text {
    font-size: 14px;
    color: #3d9fff;
  }
  .cha {
    color: #3d9fff;
    margin-left: 10px;
    margin-top: -4px;
    font-size: 13px;
  }
}
.tou {
  height: 39px;
  background: #f6f7fb;
  float: left;
  width: 81%;
  box-sizing: border-box;
  border: 1px solid #e4e7ec;
  border-right: 0;
}
.tou_img {
  height: 38.5px;
  width: 10%;
  float: right;
  padding: 7px 37px 6px 10px;
  box-sizing: border-box;
  background: #f6f7fb;
  border: 1px solid #e4e7ec;
  border-left: 0;
}
// 面包屑到这
.crktj_wrap {
  width: 1170px;
  margin: 74px 0 0 260px;
  border: 1px solid #bce9ef;
  border-radius: 10px;
  .crktj_wrap_title {
    width: 100%;
    height: 40px;
    background: #dfecf4;
    color: #30738d;
    line-height: 40px;
    .crktj_wrap_title_text {
      font-size: 14px;
      margin: 0 0 0 15px;
      line-height: 40px;
    }
  }
  .crktj_wrap_conent {
    height: 290px;
    width: 100%;
    padding: 0 0 0 105px;
    display: flex;
    .crktj_ruleForm {
      width: 550px;
      height: 35px;
      .crkbm_item {
        display: flex;
        margin: 30px 0 0 0;
        .el-form-item__label {
          font-size: 15px;
          padding: 0;
          line-height: 34px;
          width: 150px;
          height: 34px;
        }
        .el-form-item__content {
          width: 435px;
          height: 34px;
          margin: 0 0 0 24px;
          line-height: 34px;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .crkbm_select_item {
        margin: 30px 0 0 0;
        display: flex;
        .el-form-item__label {
          height: 34px;
          font-size: 15px;
          padding: 0;
          line-height: 34px;
          width: 150px;
        }
        .el-form-item__content {
          width: 435px;
          height: 34px;
          line-height: 34px;
          margin: 0 0 0 24px;
          .el-select {
            width: 100%;
            height: 100%;
            .el-input {
              width: 100%;
              height: 100%;
              .el-input__inner {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .from_img_wrap {
      width: 515px;
      height: 100%;
      .from_img_wrap_image {
        font-size: 15px;
        margin: 18px 0 0 135px;
      }
      .from_img_wrap_upLiadImg {
        margin: -15px 0 0 45px;
      }
    }
  }
}
.el-upload__tip {
  margin: 10px 0 0 100px;
}
.el-upload-list__item-name {
  margin: 0 0 0 100px;
}
.upImg {
  width: 104px;
  height: 40px;
  background: #3579b6;
  color: #fff;
  text-align: center;
  line-height: 40px;
  float: left;
  margin: 69px 0 0 0;
}
.imgInput {
  width: 184px !important;
  height: 34px;
  float: left;
  margin: 69px 0 0 100px;
}
.black_wrap_crktj {
  width: 105px;
  height: 35px;
  background: #5bc0de;
  color: #fff;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 540px;
  top: 500px;
}
.up_wrap_crktj {
  width: 105px;
  height: 35px;
  background: #d9544f;
  color: #fff;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 340px;
  top: 500px;
}
</style>