
<template>
  <div ref="fwxxbj">
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
    <!-- 房屋信息编辑 -->
    <div class="fwxxbj_wrap">
      <div class="fwxxbj_wrap_title">
        <div class="fwxxbj_wrap_title_text">房屋信息编辑</div>
      </div>
      <div class="fwxxbj_wrap_content">
        <el-form :model="from" :rules="rules" ref="ruleForm" class="fw_ruleForm">
          <div class="fwxxbj_wrap_content_left">
            <!-- 小区名称 -->
            <div class="xqmc_input">
              <div class="xqmc_input_text">小区名称：</div>
              <div v-if="fwxxList.xqmc == '' || fwxxList.xqmc == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.xqmc" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 小区编码 -->
            <div class="xqbm_input">
              <div class="xqbm_input_text">小区编码：</div>
              <div v-if="fwxxList.xqbm == '' || fwxxList.xqbm == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.xqbm" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 楼栋号 -->
            <div class="ldh_input">
              <div class="ldh_input_text">楼栋号：</div>
              <div v-if="fwxxList.ldh == '' || fwxxList.ldh == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.ldh" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 单元号 -->
            <div class="dyh_input">
              <div class="dyh_input_text">单元号：</div>
              <div v-if="fwxxList.dyh == '' || fwxxList.dyh == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.dyh" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 楼层号 -->
            <div class="lch_input">
              <div class="lch_input_text">楼层号：</div>
              <div v-if="fwxxList.lch == '' || fwxxList.lch == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.lch" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 门牌号 -->
            <div class="mph_input">
              <div class="mph_input_text">门牌号：</div>
              <div v-if="fwxxList.mph == '' || fwxxList.mph == 'null'">
                <el-input placeholder :disabled="true"></el-input>
              </div>
              <div v-else>
                <el-input :placeholder="fwxxList.mph" :disabled="true"></el-input>
              </div>
            </div>
            <!-- 房屋状态 -->
            <div class="fwzt_input">
              <div class="fwzt_input_text">房屋状态：</div>
              <el-select v-model="from.fwztdm" placeholder="请选择">
                <el-option
                  v-for="item in FWZTList"
                  :key="item.zdid"
                  :label="item.zdz"
                  :value="item.zdid"
                ></el-option>
              </el-select>
            </div>
            <!-- 房屋用途 -->
            <div class="fwyt_input">
              <div class="fwyt_input_text">房屋用途：</div>
              <el-select v-model="from.fwytdm" placeholder="请选择">
                <el-option
                  v-for="item in FWYTList"
                  :key="item.zdid"
                  :label="item.zdz"
                  :value="item.zdid"
                ></el-option>
              </el-select>
            </div>
            <!-- 产权性质 -->
            <div class="cqxz_input">
              <div class="cqxz_input_text">产权性质：</div>
              <el-select v-model="from.cqxzdm" placeholder="请选择">
                <el-option
                  v-for="item in FWCQXZList"
                  :key="item.zdid"
                  :label="item.zdz"
                  :value="item.zdid"
                ></el-option>
              </el-select>
            </div>
            <!-- 房屋面积 -->
            <div class="fwmj_input">
              <div class="fwmj_input_text">房屋面积：</div>
              <el-form-item prop="fwmj">
                <el-input
                  v-model="from.fwmj"
                  :placeholder="fwxxList.fwmj == 'null' || fwxxList.fwmj == '' ? 0 :fwxxList.fwmj"
                ></el-input>
              </el-form-item>
              <!-- </div> -->
              <div class="fwmj_input_text1">平方米</div>
            </div>
            <!-- 备注 -->
            <div class="bz_input">
              <div class="bz_input_text">备注：</div>
              <div v-if="fwxxList.bz == '' || fwxxList.bz == 'null'">
                <el-input placeholder type="textarea" v-model="from.bz"></el-input>
              </div>
              <div v-else>
                <el-input v-model="from.bz" :placeholder="fwxxList.mph" type="textarea"></el-input>
              </div>
            </div>
          </div>
          <div class="fwxxbj_wrap_content_center">
            <!-- 房主姓名 -->
            <div class="fzxm_input">
              <div class="fzxm_input_text">房主姓名：</div>
              <el-form-item prop="xm">
                <el-input
                  :placeholder="fwxxList.xm == 'null' || fwxxList.xm == '' ? '' :fwxxList.xm"
                  v-model="from.xm"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 身份证号码 -->
            <div class="sfzhm_input">
              <div class="sfzhm_input_text">身份证号码：</div>
              <el-form-item prop="zjhm">
                <el-input
                  :placeholder="fwxxList.zjhm == 'null' || fwxxList.zjhm == '' ? '' :fwxxList.zjhm"
                  v-model="from.zjhm"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 手机号码 -->
            <div class="sjhm_input">
              <div class="sjhm_input_text">手机号码：</div>
              <el-form-item prop="sjhm">
                <el-input
                  :placeholder="fwxxList.sjhm == 'null' || fwxxList.sjhm == '' ? '' :fwxxList.sjhm"
                  v-model="from.sjhm"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 家属人数 -->
            <div class="jsrs_input">
              <div class="jsrs_input_text">家属人数：</div>
              <el-form-item prop="js">
                <el-input
                  :placeholder="fwxxList.js == 'null' || fwxxList.js == '' ? '' :fwxxList.js"
                  v-model="from.js"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 租客人数 -->
            <div class="zkrs_input">
              <div class="zkrs_input_text">租客人数：</div>
              <el-form-item prop="zk">
                <el-input
                  :placeholder="fwxxList.zk == 'null' || fwxxList.zk == '' ? '' :fwxxList.zk"
                  v-model="from.zk"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 入住人员列表 -->
            <div class="rzrylb_input">
              <div class="rzrylb_input_text">入住人员列表：</div>

              <el-input :placeholder="strry" type="textarea" :disabled="true"></el-input>
            </div>
          </div>
        </el-form>
        <div class="fwxxbj_wrap_content_right">
          <div class="fwxxbj_wrap_content_right_title">身份证照片</div>
          <div v-if="this.from.zjzp == ''">
            <div class="fwxxbj_wrap_content_right_img">
              <img src="../../assets/zjzp.png" />
            </div>
          </div>
          <div v-else>
            <div class="fwxxbj_wrap_content_right_img">
              <img :src="this.from.zjzp" />
            </div>
          </div>
          <div class="fwxxbj_wrap_content_right_but">
            <div class="reading" @click="ReadCard">读卡</div>
          </div>
        </div>
        <div class="black_xx_fwbj" @click="handleBliack">返回</div>
        <div class="up_xx_fwbj" @click="handleUp">提交</div>
        <div class="text1">请在IE浏览器使用</div>
        <div class="text2">控件不可用，可能未正确安装控件及驱动,或者控件未启用</div>
        <div class="text3" @click="handleText">点击此处查看文档</div>
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
    //面积的验证规则
    var checkmj = (rule, value, cb) => {
      const regmj = /^([\d\.]{1,10})*$/g
      if (regmj.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的面积'))
    }
    //联系方式的验证规则
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }
    return {
      // 放大
      refDome: null,
      // 面包屑
      breadcrumb: [],
      // 房屋信息
      fwxxList: [],
      from: {
        // 房屋编码
        fwbm: '',
        fwztdm: '',
        fwytdm: '',
        cqxzdm: '',
        fwmj: '',
        bz: '',
        xm: '',
        zjhm: '',
        sjhm: '',
        js: '',
        zk: '',
        zjzp: '',
      },
      strry: '',
      // 房屋状态列表
      FWZTList: [],
      // 房屋用途列表
      FWYTList: [],
      // 房屋产权性质列表
      FWCQXZList: [],
      rules: {
        fwmj: [
          { required: true, message: '请输入房屋面积', trigger: 'blur' },
          { validator: checkmj, trigger: 'blur' },
        ],
        xm: [
          { required: true, message: '请输入房主姓名', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ],
        zjhm: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          {
            min: 18,
            max: 18,
            message: '长度在 18 到 18 个字符',
            trigger: 'blur',
          },
        ],
        sjhm: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        js: [
          { required: true, message: '请输入家属人数', trigger: 'blur' },
          {
            min: 1,
            max: 2,
            message: '长度在 1 到 2 个字符',
            trigger: 'blur',
          },
        ],
        zk: [
          { required: true, message: '请输入租客人数', trigger: 'blur' },
          {
            min: 1,
            max: 2,
            message: '长度在 1 到 2 个字符',
            trigger: 'blur',
          },
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
    this.from.fwbm = this.$route.query.fwbm
    this.handleFWXXBM()
    // 获取房屋状态
    this.handleFWZT()
    // 获取房屋用途
    this.handleFWYT()
    // 获取房屋产权性质
    this.handleFWCQXZ()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.fwxxbj
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
    // 获取房屋信息
    async handleFWXXBM() {
      let res = await this.$http.get(`/fw/cxfwxx.do?fwbm=${this.from.fwbm}`)
      // let res = await this.$http.get(`/fw/cxfwxx.do?fwbm=888999`)
      console.log(res.data)
      this.fwxxList = res.data.data
      this.from.zjzp = res.data.data.ryZp
      let rzrylb = res.data.data.rzrylb
      if (rzrylb.length == 0) {
        return
      } else {
        let strry = ''
        for (var i = 0; i < rzrylb.length; i++) {
          strry += `${i + 1}.${rzrylb[i].xm}，${rzrylb[i].xbdm}，${
            rzrylb[i].zjhm
          }，${rzrylb[i].yhzgxdm}\n`
        }
        this.strry = strry
      }
    },
    // 获取房屋状态
    async handleFWZT() {
      let res = await this.$http.get('/qh/selFwzt.do')
      // console.log(res)
      this.FWZTList = res.data.data
    },
    // 获取房屋用途
    async handleFWYT() {
      let res = await this.$http.get('/qh/selFwyt.do')
      this.FWYTList = res.data.data
      // console.log(this.FWYTList)
    },
    // 获取房屋产权性质
    async handleFWCQXZ() {
      let res = await this.$http.get('/qh/selFwcqxz.do')
      this.FWCQXZList = res.data.data
      // console.log(this.FWCQXZList)
    },
    // 点击连接
    handleConnect() {
      console.log(111)
    },
    // 点击读卡
    ReadCard() {
      var ret = document.getElementById('CVR_IDCard').ReadCard()
      if (ret == '0') {
        console.log(document.getElementById('CVR_IDCard').Picture)
        this.from.xm = document.getElementById('CVR_IDCard').Name
        this.from.zjhm = document.getElementById('CVR_IDCard').CardNo
        this.from.zjzp = `data:image/jpeg;base64,${
          document.getElementById('CVR_IDCard').Picture
        }`
        return
      }
      this.$message.error('读卡错误，尝试重新放置')
      return
    },
    // 点击返回
    handleBliack() {
      this.$router.go(-1)
    },
    // 点击提交
    handleUp() {
      let self = this
      let data = {
        fwbm: this.from.fwbm,
        fwztdm: this.from.fwztdm,
        fwytdm: this.from.fwytdm,
        cqxzdm: this.from.cqxzdm,
        fwmj: this.from.fwmj,
        bz: this.from.bz,
        xm: this.from.xm,
        zjhm: this.from.zjhm,
        sjhm: this.from.sjhm,
        jsNum: this.from.js,
        zkNum: this.from.zk,
        zjzp: this.from.zjzp,
      }
      data = Qs.stringify(data)
      self.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await self.$http.post('/fw/xgfwxx.do', data)
          console.log(res)
          if (res.data.massage.status == 200) {
            this.$message.success('编辑成功')
            this.$router.go(-1)
          } else {
            this.$message.error('编辑失败')
          }
        }
      })
    },
    // 点击查看文档
    async handleText() {
      let res = await this.$http.get('/qh/download.do', {
        responseType: 'blob', // 设置响应数据类型
      })
      console.log(res)
      const data = res.data
      let url = window.URL.createObjectURL(data) // 将二进制文件转化为可访问的url
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = 'cvr-100uc-driver.zip'
      a.click() // 模拟点击下载
      window.URL.revokeObjectURL(url)
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
.fwxxbj_wrap {
  width: 1220px;
  height: 735px;
  border-radius: 10px;
  border: 1px solid #dfe0da;
  margin: 60px 250px 0 238px;
  .fwxxbj_wrap_title {
    width: 100%;
    height: 50px;
    background: #def0d8;
    .fwxxbj_wrap_title_text {
      font-size: 14px;
      color: #4a6844;
      margin: 0 0 0 45px;
      line-height: 50px;
    }
  }
  .fwxxbj_wrap_content {
    width: 100%;
    height: 685px;
    display: flex;
    position: relative;
    .fwxxbj_wrap_content_left {
      width: 390px;
      height: 100%;
      margin: 0 0 0 60px;
      overflow: hidden;
      .xqmc_input {
        height: 34px;
        display: flex;
        margin: 25px 0 0 0;
        .xqmc_input_text {
          height: 34px;
          text-align: right;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 260px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .xqbm_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .xqbm_input_text {
          height: 34px;
          text-align: right;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 150px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .ldh_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .ldh_input_text {
          text-align: right;
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 91px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .dyh_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .dyh_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 91px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .lch_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .lch_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 91px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .mph_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .mph_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 91px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .fwzt_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .fwzt_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 270px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .fwyt_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .fwyt_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 270px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .cqxz_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .cqxz_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-input {
          width: 270px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .fwmj_input {
        height: 34px;
        display: flex;
        margin: 12px 0 0 0;
        .fwmj_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .fwmj_input_text1 {
          height: 34px;
          width: 80px;
          font-size: 14px;
          line-height: 34px;
          text-align: left;
        }
        .el-input {
          width: 91px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .bz_input {
        height: 34px;
        display: flex;
        margin: 22px 0 0 0;
        .bz_input_text {
          height: 34px;
          width: 110px;
          font-size: 14px;
          line-height: 34px;
          text-align: right;
        }
        .el-textarea {
          width: 270px;
          height: 70px;
          .el-textarea__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .fwxxbj_wrap_content_center {
      width: 425px;
      height: 100%;
      .fzxm_input {
        height: 34px;
        display: flex;
        margin: 25px 0 0 0;
        .fzxm_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 260px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .sfzhm_input {
        height: 34px;
        display: flex;
        margin: 22px 0 0 0;
        .sfzhm_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 260px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .sjhm_input {
        height: 34px;
        display: flex;
        margin: 22px 0 0 0;
        .sjhm_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 260px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .jsrs_input {
        height: 34px;
        display: flex;
        margin: 22px 0 0 0;
        .jsrs_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 90px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .zkrs_input {
        height: 34px;
        display: flex;
        margin: 22px 0 0 0;
        .zkrs_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-input {
          width: 90px;
          height: 34px;
          .el-input__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .rzrylb_input {
        height: 34px;
        margin: 22px 0 0 0;
        .rzrylb_input_text {
          height: 34px;
          text-align: right;
          width: 130px;
          font-size: 14px;
          line-height: 34px;
        }
        .el-textarea {
          width: 393px;
          height: 209px;
          margin: 0 0 0 32px;
          .el-textarea__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .fwxxbj_wrap_content_right {
      width: 253px;
      height: 355px;
      margin: 0 0 0 35px;
      text-align: center;
      .fwxxbj_wrap_content_right_title {
        font-size: 14px;
        margin: 21px 0 9px 0;
      }
      .fwxxbj_wrap_content_right_img {
        width: 175px;
        height: 271px;
        margin: 0 auto;
      }
      .fwxxbj_wrap_content_right_but {
        .reading {
          width: 65px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: #5bc0de;
          color: #fff;
          font-size: 15px;
          border-radius: 5px;
          margin: 15px 0 0 95px;
        }
      }
    }
  }
}
.black_xx_fwbj {
  width: 190px;
  height: 34px;
  color: #fff;
  background: #5bc0de;
  line-height: 34px;
  text-align: center;
  position: absolute;
  bottom: 80px;
  right: 500px;
  border-radius: 10px;
}
.up_xx_fwbj {
  width: 190px;
  height: 34px;
  color: #fff;
  background: #d7534e;
  line-height: 34px;
  text-align: center;
  position: absolute;
  bottom: 80px;
  right: 250px;
  border-radius: 10px;
}
.text1 {
  color: #f30a05;
  position: absolute;
  bottom: 55px;
  left: 535px;
}
.text2 {
  color: #f30a05;
  position: absolute;
  bottom: 35px;
  left: 535px;
}
.text3 {
  color: #2e79b2;
  position: absolute;
  bottom: 15px;
  left: 535px;
}
.fw_ruleForm {
  display: flex;
  .el-form-item__content {
    line-height: 1;
  }
}
</style>