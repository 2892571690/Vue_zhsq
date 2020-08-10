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
                <el-select v-model="ruleForm.xqbm" placeholder="请选择小区">
                  <el-option
                    v-for="item in xqList"
                    :key="item.xq_id"
                    :label="item.xqmc"
                    :value="item.xqbm"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 单元号 -->
              <el-form-item class="fxzj_ruleForm_ldh" label="楼栋号：" prop="ldh">
                <el-select v-model="ruleForm.ldh" placeholder="请选择楼栋号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="fxzj_wrap_content_FromCenter_center">
              <!-- 单元号 -->
              <el-form-item class="fxzj_ruleForm_dyh" label="单元号：" prop="dyh">
                <el-select v-model="ruleForm.dyh" placeholder="请选择单元号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 门牌号 -->
              <el-form-item class="fxzj_ruleForm_mph" label="单元号：" prop="mph">
                <el-select v-model="ruleForm.mph" placeholder="请选择门牌号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="fxzj_wrap_content_FromCenter_bottom">
              <!-- 住户姓名 -->
              <el-form-item class="fxzj_ruleForm_zhxm" label="住户姓名：" prop="zhxm">
                <el-select v-model="ruleForm.zhxm" placeholder="请选择住户姓名">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
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
        xm: '',
        xb: '',
        sfzhm: '',
        sjhm: '',
        xqbm: '',
        ldh: '',
        dyh: '',
        mph: '',
        zhxm: '',
        qssj: '',
        jzsj:''
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
          { required: true, message: '请选择住户姓名', trigger: 'change' },
        ],
        qssj: [
          { required: true, message: '请选择预约起始时间', trigger: 'change' },
        ],
        jzsj: [
          { required: true, message: '请选择预约截止期间', trigger: 'change' },
        ],
      },
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
      console.log(res)
      this.xqList = res.data
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
  height: 700px;
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
          margin: 15px 0 35px 0;
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
          margin: 15px 0 0 0;
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
          margin: 15px 0 35px 0;
          .fxzj_ruleForm_zhxm {
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
        background: pink;
        overflow: hidden;
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
</style>