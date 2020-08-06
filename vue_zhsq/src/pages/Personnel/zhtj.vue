<template>
  <div ref="zhtj">
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
    <!-- 住户信息 -->
    <div class="zhbjxx_wrap">
      <div class="zhbjxx_wrap_title">
        <div class="text">住户信息</div>
      </div>
      <div class="zhbjxx_wrap_content">
        <el-form
          hide-required-asterisk
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="zhbjxx_ruleForm"
        >
          <!-- 上面的表单 -->
          <div class="zhbjxx_ruleForm_top">
            <!-- 上面————左边的表单 -->
            <div class="zhbjxx_ruleForm_topLeft">
              <!-- 姓名 -->
              <el-form-item label="姓名：" prop="xm">
                <el-input disabled placeholder="请先读取身份信息" v-model="ruleForm.xm"></el-input>
              </el-form-item>
              <!-- 户籍所在地： -->
              <el-form-item label="户籍所在地：" prop="hjdxz">
                <el-input disabled placeholder="请先读取身份信息" v-model="ruleForm.hjdxz"></el-input>
              </el-form-item>
              <!-- 小区 -->
              <el-form-item label="小区：" prop="xqbm">
                <el-select v-model="ruleForm.xqbm" placeholder="请选择小区">
                  <el-option
                    v-for="item in xqmcList"
                    :key="item.xqbm"
                    :label="item.xqmc"
                    :value="item.xqbm"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 单元号 -->
              <el-form-item label="单元号：" prop="xqbm">
                <el-select v-model="ruleForm.dyh" placeholder="请选择单元号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 手机号码 -->
              <el-form-item label="电话号码：" prop="sjhm">
                <el-input maxlength="11" placeholder="请输入手机号码" v-model="ruleForm.sjhm"></el-input>
              </el-form-item>
              <!-- 人口类型 -->
              <el-form-item label="人口类型：" prop="rklxdm">
                <el-select v-model="ruleForm.rklxdm" placeholder="请选择人口类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 政治面貌 -->
              <el-form-item label="政治面貌：" prop="zzmmdm">
                <el-select v-model="ruleForm.zzmmdm" placeholder="请选择政治面貌">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="zhbjxx_ruleForm_topRight">
              <!-- 身份证号码 -->
              <el-form-item label="身份证号码：" prop="zjhm">
                <el-input disabled placeholder="请先读取身份信息" v-model="ruleForm.zjhm"></el-input>
              </el-form-item>
              <!-- 性别 -->
              <el-form-item label="性别：" prop="xbdm">
                <el-input disabled placeholder="请先读取身份信息" v-model="ruleForm.xbdm"></el-input>
              </el-form-item>
              <!-- 楼栋号 -->
              <el-form-item label="楼栋号：" prop="ldh">
                <el-select v-model="ruleForm.ldh" placeholder="请选择楼栋号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 门牌号 -->
              <el-form-item label="门牌号：" prop="mph">
                <el-select v-model="ruleForm.mph" placeholder="请选择门牌号">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 证件类型 -->
              <el-form-item label="证件类型：" prop="zjlxdm">
                <el-select v-model="ruleForm.zjlxdm" placeholder="请选择证件类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 与户主关系代码 -->
              <el-form-item label="与户主关系代码：" prop="yhzgxdm">
                <el-select v-model="ruleForm.yhzgxdm" placeholder="请选择与户主关系代码">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <!-- 中间的 -->
          <div class="zhbjxx_ruleForm_center">
              <div class="zhbjxx_ruleForm_center_text">选填项</div>
          </div>
          <!-- 下面的表单 -->
          <div class="zhbjxx_ruleForm_bottom">
            <div class="zhbjxx_ruleForm_bottomLeft">
              <!-- 籍贯省份 -->
              <el-form-item label="籍贯省份：" prop="jgsf">
                <el-select v-model="ruleForm.jgsf" placeholder="请选择籍贯省份">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 国籍 -->
              <el-form-item label="国籍：" prop="gj">
                <el-select v-model="ruleForm.gj" placeholder="请选择国籍">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 宗教信仰 -->
              <el-form-item label="宗教信仰：" prop="zjxydm">
                <el-select v-model="ruleForm.zjxydm" placeholder="请选择宗教信仰">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 婚姻状况 -->
              <el-form-item label="婚姻状况：" prop="hyzkdm">
                <el-select v-model="ruleForm.hyzkdm" placeholder="请选择婚姻状况">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="zhbjxx_ruleForm_bottomRight">
              <!-- 籍贯精确到(区县) -->
              <el-form-item label="籍贯精确到(区县)：" prop="jgjqdqx">
                <el-select v-model="ruleForm.jgjqdqx" placeholder="请选择籍贯精确到(区县)">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 名族 -->
              <el-form-item label="名族：" prop="mzdm">
                <el-select v-model="ruleForm.mzdm" placeholder="请选择名族">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 文化程度 -->
              <el-form-item label="文化程度：" prop="whcddm">
                <el-select v-model="ruleForm.whcddm" placeholder="请选择文化程度">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 兵役状况 -->
              <el-form-item label="兵役状况：" prop="byzkdm">
                <el-select v-model="ruleForm.byzkdm" placeholder="请选择兵役状况">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
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
      //   小区列表
      xqmcList: [],
      //   表单
      ruleForm: {
        xm: '',
        hjdxz: '',
        xqbm: '',
        dyh: '',
        sjhm: '',
        rklxdm: '',
        zzmmdm: '',
        zjhm: '',
        xbdm: '',
        ldh: '',
        mph: '',
        zjlxdm: '',
        yhzgxdm: '',
        jgsf: '',
        gj: '',
        zjxydm: '',
        hyzkdm: '',
        jgjqdqx:'',
        mzdm:'',
        whcddm:'',
        byzkdm:''
      },
      //   表单验证
      rules: {
        xm: [
          { required: true, message: '请读卡获取姓名', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 1 到 15 个字符',
            trigger: 'blur',
          },
        ],
        hjdxz: [
          { required: true, message: '请读卡获取户籍所在地', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur',
          },
        ],
        xqbm: [{ required: true, message: '请选择小区', trigger: 'change' }],
        dyh: [{ required: true, message: '请选择单元号', trigger: 'change' }],
        sjhm: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        rklxdm: [
          { required: true, message: '请选择人口类型', trigger: 'change' },
        ],
        zzmmdm: [
          { required: true, message: '请选择政治面貌', trigger: 'change' },
        ],
        zjhm: [
          { required: true, message: '请读卡获取身份证号码', trigger: 'blur' },
          {
            min: 18,
            max: 18,
            message: '长度在 18 到 18 个字符',
            trigger: 'blur',
          },
        ],
        xbdm: [
          { required: true, message: '请读卡获取性别', trigger: 'blur' },
          {
            min: 1,
            max: 1,
            message: '长度在 1 到 1 个字符',
            trigger: 'blur',
          },
        ],
        ldh: [{ required: true, message: '请选择楼栋号', trigger: 'change' }],
        mph: [{ required: true, message: '请选择门牌号', trigger: 'change' }],
        zjlxdm: [
          { required: true, message: '请选择证件类型', trigger: 'change' },
        ],
        yhzgxdm: [
          { required: true, message: '请选择与户主关系', trigger: 'change' },
        ],
        jgsf: [
          { required: true, message: '请选择籍贯省份', trigger: 'change' },
        ],
        gj: [{ required: true, message: '请选择国籍', trigger: 'change' }],
        zjxydm: [
          { required: true, message: '请选择宗教信仰', trigger: 'change' },
        ],
        hyzkdm: [
          { required: true, message: '请选择婚姻状况', trigger: 'change' },
        ],
        jgjqdqx: [
          { required: true, message: '请选择籍贯精确到(区县)', trigger: 'change' },
        ],
        mzdm: [
          { required: true, message: '请选择名族', trigger: 'change' },
        ],
        whcddm: [
          { required: true, message: '请选择文化程度', trigger: 'change' },
        ],
        byzkdm: [
          { required: true, message: '请选择兵役状况', trigger: 'change' },
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
    // 获取小区名称列表
    this.handleXQMC()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.zhtj
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
    // 获取小区名称
    async handleXQMC() {
      let res = await this.$http.get('/xq/selXQ.do')
      console.log(res.data)
      this.xqmcList = res.data
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
.zhbjxx_wrap {
  width: 1170px;
  margin: 57px 280px 0 258px;
  border-radius: 10px;
  border: 1px solid #d1dfdf;
  .zhbjxx_wrap_title {
    width: 100%;
    height: 40px;
    background: #d9edf6;
    .text {
      font-size: 14px;
      color: #226c9b;
      margin: 0 0 0 15px;
      line-height: 40px;
    }
  }
  .zhbjxx_wrap_content {
    .zhbjxx_ruleForm {
      & ::placeholder {
        color: rgb(134, 130, 130);
        font-size: 12px;
      }
      .zhbjxx_ruleForm_top {
        display: flex;
        height: 370px;
        .zhbjxx_ruleForm_topLeft {
          width: 396px;
          height: 34px;
          .el-form-item {
            height: 34px;
            margin: 15px 0 0 0;
            .el-form-item__label {
              width: 165px;
              text-align: right;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              line-height: 1;
              .el-input {
                width: 192px;
                height: 34px;
                margin: 0 0 0 39px;
                .el-input__inner {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .zhbjxx_ruleForm_topRight {
          width: 440px;
          .el-form-item {
            height: 34px;
            margin: 15px 0 0 0;
            .el-form-item__label {
              width: 205px;
              text-align: right;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              line-height: 1;
              .el-input {
                width: 192px;
                height: 34px;
                margin: 0 0 0 39px;
                .el-input__inner {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
      .zhbjxx_ruleForm_center{
          width: 94%;
          height: 30px;
          margin: 0 30px 0 30px;
          display: flex;
          align-items: center;
          border: 1px solid #ededed;
          .zhbjxx_ruleForm_center_text{
              width: 60px;
              height: 20px;
              background: #4fb6d5;
              text-align: center;
              color: #fff;
              line-height: 20px;
              border-radius: 10px;
          }
      }
      .zhbjxx_ruleForm_bottom {
        width: 100%;
        height: 240px;
        overflow: hidden;
        display: flex;
        .zhbjxx_ruleForm_bottomLeft {
          width: 500px;
          .el-form-item {
            height: 34px;
            margin: 20px 0 0 0;
            .el-form-item__label {
              width: 138px;
              text-align: right;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              line-height: 1;
              .el-input {
                width: 320px;
                height: 34px;
                margin: 0 0 0 39px;
                .el-input__inner {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .zhbjxx_ruleForm_bottomRight {
          width: 570px;
          .el-form-item {
            height: 34px;
            margin: 20px 0 0 0;
            .el-form-item__label {
              width: 220px;
              text-align: right;
              height: 34px;
              line-height: 34px;
              padding: 0;
            }
            .el-form-item__content {
              line-height: 1;
              .el-input {
                width: 320px;
                height: 34px;
                margin: 0 0 0 29px;
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
  }
}
</style>