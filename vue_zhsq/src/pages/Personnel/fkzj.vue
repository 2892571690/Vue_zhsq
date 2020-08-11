<template>
  <div ref="fkzj">
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
    <!-- 访客增加 -->
    <div class="fxzj_wrap">
      <div class="fxzj_wrap_title">
        <div class="fxzj_wrap_title_text">访客增加</div>
      </div>
      <div class="fxzj_wrap_content">
        <el-form
          hide-required-asterisk
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="fxzj_ruleForm"
        >
          <!-- 上面的表单 -->
          <div class="fxzj_wrap_content_FromTop">
            <div class="fxzj_wrap_content_FromTop_top">
              <!-- 姓名 -->
              <el-form-item class="fxzj_ruleForm_xm" label="姓名：" prop="xm">
                <el-input v-model="ruleForm.xm" disabled></el-input>
              </el-form-item>
              <!-- 性别 -->
              <el-form-item class="fxzj_ruleForm_xb" label="性别：" prop="xb">
                <el-select v-model="ruleForm.xb" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="fxzj_wrap_content_FromTop_bottom">
              <!-- 身份证号码 -->
              <el-form-item class="fxzj_ruleForm_sfzhm" label="身份证号码：" prop="sfzhm">
                <el-input v-model="ruleForm.sfzhm" disabled></el-input>
              </el-form-item>
              <!-- 手机号码 -->
              <el-form-item class="fxzj_ruleForm_sjhm" label="手机号码：" prop="sjhm">
                <el-input v-model="ruleForm.sjhm" maxlength="11"></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 访问地址 -->
          <div class="fxzj_fwdz_wrap">
            <div class="fxzj_fwdz_wrap_text">访问地址</div>
          </div>
          <div class="fxzj_wrap_content_FromCenter">
            <div class="fxzj_wrap_content_FromCenter_top">
              <!-- 小区 -->
              <el-form-item class="fxzj_ruleForm_xq" label="小区：" prop="xqbm">
                <el-select @change="handleXQClick" v-model="ruleForm.xqbm" placeholder="请选择小区">
                  <el-option
                    v-for="item in xqList"
                    :key="item.xq_id"
                    :label="item.xqmc"
                    :value="item.xqbm"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 楼栋号 -->
              <el-form-item class="fxzj_ruleForm_ldh" label="楼栋号：" prop="ldh">
                <el-select
                  @change="LDHchange"
                  @focus="LDHfocus"
                  v-model="ruleForm.ldh"
                  placeholder="请选择楼栋号"
                >
                  <el-option
                    v-for="(item,index) in LDList"
                    :key="index"
                    :label="item.ldh+'栋'"
                    :value="item.ldh"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="fxzj_wrap_content_FromCenter_center">
              <!-- 单元号 -->
              <el-form-item class="fxzj_ruleForm_dyh" label="单元号：" prop="dyh">
                <el-select
                  @focus="DYHfocus"
                  @change="DYHchange"
                  v-model="ruleForm.dyh"
                  placeholder="请选择单元号"
                >
                  <el-option v-for="item in DYList" :key="item" :label="item+'单元'" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <!-- 门牌号 -->
              <el-form-item class="fxzj_ruleForm_mph" label="门牌号：" prop="mph">
                <el-select
                  @change="handleMph"
                  @focus="MPLfocus"
                  v-model="ruleForm.mph"
                  placeholder="请选择门牌号"
                >
                  <el-option v-for="item in MPList" :key="item" :label="item + '号'" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="fxzj_wrap_content_FromCenter_bottom">
              <!-- 住户姓名 -->
              <el-form-item class="fxzj_ruleForm_zhxm" label="住户姓名：" prop="zhxm">
                <el-select multiple v-model="ruleForm.zhxm" placeholder="请选择住户姓名">
                  <el-option
                    v-for="(item,index) in RYLBList"
                    :key="index"
                    :label="item.xm"
                    :value="item.zjhm"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <!-- 预约时间 -->
          <div class="fxzj_yysj_wrap">
            <div class="fxzj_yysj_wrap_text">预约时间</div>
          </div>
          <!-- 下面的表单 -->
          <div class="fxzj_wrap_content_FromBottom">
            <!-- 起始时间 -->
            <el-form-item class="fxzj_ruleForm_qssj" label="起始时间：" prop="qssj">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分"
                value-format="yyyy-MM-dd HH:mm"
                v-model="ruleForm.qssj"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <!-- 截止期间 -->
            <el-form-item class="fxzj_ruleForm_jzsj" label="截止期间：" prop="jzsj">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分"
                value-format="yyyy-MM-dd HH:mm"
                v-model="ruleForm.jzsj"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div style="display:flex;">
          <div class="fxzj_wrap_black" @click="handleBlack">返 回</div>
          <div class="fxzj_wrap_up" @click="handleUp">提 交</div>
        </div>
        <!-- 点击下载 -->
        <div class="zhxxbj_wrap_titleText">
          <div class="zhxxbj_wrap_titleText_text1">请在IE浏览器使用</div>
          <div class="zhxxbj_wrap_titleText_text2">控件不可用，可能未正确安装控件及驱动,或者控件未启用</div>
          <div class="zhxxbj_wrap_titleText_text3" @click="handleDownload">点击此处查看文档</div>
        </div>
        <div class="fxzj_wrap_zjz">
          <div class="fxzj_wrap_zjz_text">身份证照片：</div>
          <div class="fxzj_wrap_zjz_img">
            <div v-if="ruleForm.sfzzp == ''">
              <img src="../../assets/zjzp.png" />
            </div>
            <div v-else>
              <img :src="ruleForm.sfzzp" />
            </div>
          </div>
          <div class="fxzj_wrap_zjz_but" @click="ReadCard">读卡</div>
        </div>
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
    //联系方式的验证规则
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的联系方式'))
    }
    return {
      // 放大
      refDome: null,
      // 面包屑
      breadcrumb: [],
      // 小区
      xqList: [],
      // 表单
      ruleForm: {
        xm: '吴品龙',
        xb: '',
        sfzhm: '331023200006215132',
        sjhm: '',
        xqbm: '',
        ldh: '',
        dyh: '',
        mph: '',
        zhxm: [],
        qssj: '',
        jzsj: '',
        sfzzp: '',
      },
      // 表单验证
      rules: {
        xm: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ],
        xb: [{ required: true, message: '请选择性别', trigger: 'change' }],
        sfzhm: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          {
            min: 1,
            max: 18,
            message: '长度在 1 到 18 个字符',
            trigger: 'blur',
          },
        ],
        sjhm: [
          { required: true, message: '请填入联系方式', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        xqbm: [{ required: true, message: '请选择小区', trigger: 'change' }],
        ldh: [{ required: true, message: '请选择楼栋号', trigger: 'change' }],
        dyh: [{ required: true, message: '请选择单元号', trigger: 'change' }],
        mph: [{ required: true, message: '请选择门牌号', trigger: 'change' }],
        zhxm: [
          {
            type: 'array',
            required: true,
            message: '请选择住户姓名',
            trigger: 'change',
          },
        ],
        qssj: [
          { required: true, message: '请选择预约起始时间', trigger: 'change' },
        ],
        jzsj: [
          { required: true, message: '请选择预约截止期间', trigger: 'change' },
        ],
      },
      // 小区编码
      XQBMStr: '',
      // 楼栋编码
      LDHStr: '',
      // 单元号
      DYHMStr: '',
      //门牌编码
      MPHMStr: '',
      //楼栋列表
      LDList: [],
      //单元列表
      DYList: [],
      //门牌列表
      MPList: [],
      // 人员列表
      RYLBList: [],
    }
  },
  async created() {
    // 面包屑的
    let breadcrumb = window.sessionStorage.getItem('breadcrumb')
    let breadcrumb5 = breadcrumb.split(',')[4]
    let breadcrumb6 = `${breadcrumb.split(',')[5]},${breadcrumb.split(',')[6]}`
    let breadcrumb7 = breadcrumb.split(',')[7]
    let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb7]
    this.breadcrumb = [breadcrumb8]
    //获取小区下拉框的
    this.handleXQList()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.fkzj
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
    // 获取小区下拉框的
    async handleXQList() {
      let res = await this.$http.get('/xq/selXQ.do')
      // console.log(res)
      this.xqList = res.data
    },
    // 点击返回
    handleBlack() {
      this.$router.go(-1)
    },
    // 点击提交
    handleUp() {
      console.log(this.ruleForm)
      let self = this
      let data = {
        xm: this.ruleForm.xm,
        xb: this.ruleForm.xb,
        sfzhm: this.ruleForm.sfzhm,
        sjhm: this.ruleForm.sjhm,
        xqbm: this.ruleForm.xqbm,
        ldh: this.ruleForm.ldh,
        mph: this.ruleForm.mph,
        zhxm: this.ruleForm.zhxm,
        qssj: this.ruleForm.qssj,
        jzsj: this.ruleForm.jzsj,
        sfzzp: this.ruleForm.sfzzp,
        dyh: this.ruleForm.dyh,
      }
      data = Qs.stringify(data)
      self.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // let res = await self.$http.post('ryxx/xzryxx.do', data)
          // // console.log(res)
          // if (res.data.message.status == '200') {
          //   this.$message.success('入住成功')
          //   this.$router.go(-1)
          // } else if(res.data.message.status == '201'){
          //   this.$message.warning('房主已经存在,请更换与房主关系')
          // }else{
          //   this.$message.error('入住失败')
          // }
        }
      })
    },
    // 点击下载
    async handleDownload() {
      let res = await this.$http.get('/qh/download.do', {
        responseType: 'blob', // 设置响应数据类型
      })
      const data = res.data
      let url = window.URL.createObjectURL(data) // 将二进制文件转化为可访问的url
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = 'cvr-100uc-driver.zip'
      a.click() // 模拟点击下载
      window.URL.revokeObjectURL(url)
    },
    // 点击读卡
    ReadCard() {
      var ret = document.getElementById('CVR_IDCard').ReadCard()
      if (ret == '0') {
        this.ruleForm.xm = document.getElementById('CVR_IDCard').Name
        this.ruleForm.sfzhm = document.getElementById('CVR_IDCard').CardNo
        this.ruleForm.sfzzp = `data:image/jpeg;base64,${
          document.getElementById('CVR_IDCard').Picture
        }`
        return
      }
      this.$message.error('读卡错误，尝试重新放置')
      return
    },
    // 点击小区下拉框
    async handleXQClick(e) {
      this.ruleForm.ldh = ''
      this.ruleForm.dyh = ''
      this.ruleForm.mph = ''
      this.ruleForm.zhxm = []
      this.XQBMStr = e
      let res = await this.$http.get(
        `/fw/selLouDongHao.do?xqbm=${this.XQBMStr}`
      )
      this.LDList = res.data
    },
    // 楼栋号获取焦点
    LDHfocus() {
      if (this.LDList.length == 0) {
        this.$message.warning('请先选择小区')
      } else {
        return
      }
    },
    // 点击楼栋号下拉框
    async LDHchange(e) {
      this.ruleForm.dyh = ''
      this.ruleForm.mph = ''
      this.ruleForm.zhxm = []
      let index = this.LDList.findIndex((v) => v.ldh == e)
      this.LDHStr = this.LDList[index].ldbm
      let res = await this.$http.get(
        `/fw/selDanYuanHao.do?ldbm=${this.LDHStr}&xqbm=${this.XQBMStr}`
      )

      this.DYList = res.data
    },
    // 单元号获取焦点
    DYHfocus() {
      if (this.DYList.length == 0) {
        this.$message.warning('请先选择楼栋')
      } else {
        return
      }
    },
    // 点击单元数下拉框
    async DYHchange(e) {
      this.ruleForm.mph = ''
      this.ruleForm.zhxm = []
      this.DYHMStr = e
      let res = await this.$http.get(
        `/fw/selMenPaiHao.do?xqbm=${this.XQBMStr}&ldbm=${this.LDHStr}&dyh=${this.DYHMStr}`
      )
      this.MPList = res.data
    },
    // 门牌号获取焦点
    MPLfocus() {
      if (this.MPList.length == 0) {
        this.$message.warning('请先选择单元号')
      } else {
        return
      }
    },
    // 获取人数
    async handleMph(e) {
      this.ruleForm.zhxm = []
      this.MPHMStr = e
      let res = await this.$http.get(
        `/fk/selPersonFromFw.do?ldbm=${this.LDHStr}&dyh=${this.DYHMStr}&mph=${this.MPHMStr}`
      )
      this.RYLBList = res.data
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
.fxzj_wrap {
  width: 1172px;
  border-radius: 10px;
  border: 1px solid #cee0e2;
  margin: 88px 255px 0 285px;
  overflow: hidden;
  .fxzj_wrap_title {
    height: 40px;
    width: 100%;
    background: #d9edf6;
    color: #1b2c40;
    .fxzj_wrap_title_text {
      margin: 0 0 0 25px;
      line-height: 40px;
    }
  }
  .fxzj_wrap_content {
    position: relative;
    .fxzj_ruleForm {
      .el-form-item {
        margin-bottom: 0;
      }
      .fxzj_wrap_content_FromTop {
        width: 780px;
        overflow: hidden;
        .fxzj_wrap_content_FromTop_top {
          display: flex;
          margin: 15px 0 0 0;
          .fxzj_ruleForm_xm {
            width: 397px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 165px;
              height: 100%;
              padding: 0;
              line-height: 34px;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              margin: 0 0 0 39px;
              line-height: 1;
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
          .fxzj_ruleForm_xb {
            width: 383px;
            height: 34px;
            .el-form-item__label {
              padding: 0;
              width: 150px;
              height: 100%;
              line-height: 34px;
            }
            .el-form-item__content {
              width: 383px;
              height: 100%;
              line-height: 1;
              .el-form-item__error {
                left: 185px;
              }
              .el-select {
                width: 193px;
                height: 100%;
                margin: 0 0 0 39px;
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
        .fxzj_wrap_content_FromTop_bottom {
          display: flex;
          margin: 25px 0 35px 0;
          .fxzj_ruleForm_sfzhm {
            width: 397px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 165px;
              height: 100%;
              padding: 0;
              line-height: 34px;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              margin: 0 0 0 39px;
              line-height: 1;
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
          .fxzj_ruleForm_sjhm {
            width: 383px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              padding: 0;
              width: 150px;
              height: 100%;
              line-height: 34px;
            }
            .el-form-item__content {
              width: 193px;
              height: 34px;
              margin: 0 0 0 39px;
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
        }
      }
      .fxzj_fwdz_wrap {
        height: 60px;
        width: 790px;
        margin: 0 0 0 44px;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        .fxzj_fwdz_wrap_text {
          width: 66px;
          height: 21px;
          background: #55c4d8;
          line-height: 21px;
          text-align: center;
          border-radius: 5px;
          color: #fff;
        }
      }
      .fxzj_wrap_content_FromCenter {
        .fxzj_wrap_content_FromCenter_top {
          width: 780px;
          display: flex;
          margin: 20px 0 0 0;
          .fxzj_ruleForm_xq {
            width: 397px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 167px;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              line-height: 1;
              margin: 0 0 0 39px;
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
          .fxzj_ruleForm_ldh {
            width: 383px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 150px;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              line-height: 1;
              margin: 0 0 0 39px;
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
        .fxzj_wrap_content_FromCenter_center {
          width: 780px;
          display: flex;
          margin: 25px 0 0 0;
          .fxzj_ruleForm_dyh {
            width: 397px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 167px;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              line-height: 1;
              margin: 0 0 0 39px;
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
          .fxzj_ruleForm_mph {
            width: 383px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 150px;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              width: 193px;
              height: 100%;
              line-height: 1;
              margin: 0 0 0 39px;
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
        .fxzj_wrap_content_FromCenter_bottom {
          width: 780px;
          display: flex;
          margin: 25px 0 35px 0;
          .fxzj_ruleForm_zhxm {
            width: 520px;
            height: 34px;
            display: flex;
            .el-form-item__label {
              width: 167px;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              width: 300px;
              height: 100%;
              line-height: 1;
              margin: 0 0 0 39px;
              .el-select {
                width: 100%;
                height: 100%;
                .el-select__tags {
                  transform: none;
                  top: 15%;
                  // flex-wrap: nowrap;
                }
                .el-input {
                  width: 100%;
                  height: 100%;
                  .el-input__inner {
                    width: 100%;
                    height: 100% !important;
                  }
                }
              }
            }
          }
        }
      }
      .fxzj_yysj_wrap {
        height: 60px;
        width: 790px;
        margin: 0 0 0 44px;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        .fxzj_yysj_wrap_text {
          width: 66px;
          height: 21px;
          background: #55c4d8;
          line-height: 21px;
          text-align: center;
          border-radius: 5px;
          color: #fff;
        }
      }
      .fxzj_wrap_content_FromBottom {
        width: 780px;
        height: 100px;
        display: flex;
        .fxzj_ruleForm_qssj {
          width: 398px;
          height: 34px;
          display: flex;
          margin: 20px 0 0 0;
          .el-form-item__label {
            width: 166px;
            height: 100%;
            line-height: 34px;
            padding: 0;
          }
          .el-form-item__content {
            margin: 0 0 0 35px;
            width: 193px;
            height: 100%;
            line-height: 1;
            .el-date-editor {
              height: 100%;
              width: 100%;
              .el-input__inner {
                height: 100%;
                width: 100%;
              }
              .el-icon-time {
                line-height: 34px;
              }
            }
          }
        }
        .fxzj_ruleForm_jzsj {
          width: 398px;
          height: 34px;
          display: flex;
          margin: 20px 0 0 0;
          .el-form-item__label {
            width: 166px;
            height: 100%;
            line-height: 34px;
            padding: 0;
          }
          .el-form-item__content {
            margin: 0 0 0 35px;
            width: 193px;
            height: 100%;
            line-height: 1;
            .el-date-editor {
              height: 100%;
              width: 100%;
              .el-input__inner {
                height: 100%;
                width: 100%;
              }
              .el-icon-time {
                line-height: 34px;
              }
            }
          }
        }
      }
    }
  }
}
.fxzj_wrap_black {
  width: 190px;
  height: 34px;
  background-color: #5bc0de;
  color: #fff;
  text-align: center;
  line-height: 34px;
  border-radius: 10px;
  margin: 0 150px 0 310px;
  cursor: pointer;
}
.fxzj_wrap_up {
  width: 190px;
  height: 34px;
  background-color: #d9544f;
  color: #fff;
  text-align: center;
  line-height: 34px;
  border-radius: 10px;
  cursor: pointer;
}
.zhxxbj_wrap_titleText {
  font-size: 14px;
  margin: 10px 0 10px 410px;
  color: #f30a05;
  .zhxxbj_wrap_titleText_text1 {
  }
  .zhxxbj_wrap_titleText_text2 {
  }
  .zhxxbj_wrap_titleText_text3 {
    color: #2e79b2;
    cursor: pointer;
  }
}
.fxzj_wrap_zjz {
  width: 173px;
  height: 336px;
  position: absolute;
  top: 30px;
  right: 80px;
  .fxzj_wrap_zjz_text {
    font-size: 15px;
    text-align: center;
    line-height: 1;
    margin: 0 0 9px 0;
  }
  .fxzj_wrap_zjz_img {
    width: 175px;
    height: 270px;
    div {
      width: 100%;
      height: 100%;
    }
  }
  .fxzj_wrap_zjz_but {
    width: 63px;
    height: 34px;
    background: #4fb6d5;
    color: #fff;
    line-height: 34px;
    text-align: center;
    margin: 5px auto;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>