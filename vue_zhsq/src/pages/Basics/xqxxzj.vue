<template>
  <div ref="xqxxtj">
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
    <!-- 添加小区信息的框 -->
    <div class="addxqxx_wrap">
      <div class="addxqxx_wrap_title">
        <div class="addxqxx_wrap_title_text1">小区信息</div>
        <div class="addxqxx_wrap_title_text1">增加</div>
      </div>
      <div class="addxqxx_wrap_content">
        <div class="addxqxx_wrap_content_left">
          <div class="xxbm_wrap">
            <!-- 小区编码 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="xqbmRuleForm">
              <el-form-item label="小区编码:" prop="xqbm">
                <el-input placeholder="请输入小区序号3位" v-model="ruleForm.xqbm"></el-input>
              </el-form-item>
            </el-form>
            <!-- 小区名称 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="xqmcRuleForm">
              <el-form-item label="小区名称:" prop="xqmc">
                <el-input placeholder="请输入小区名称" v-model="ruleForm.xqmc"></el-input>
              </el-form-item>
            </el-form>
            <!-- 省市区行政区划编码 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="ssqxzqbmRuleForm">
              <el-form-item label="省市区行政区划编码:" prop="ssqxzqbm">
                <el-select v-model="ruleForm.ssqxzqbm" placeholder="请选择省市区行政区划编码">
                  <el-option v-for="item in ssqxzqhbmList" :key="item.zdid" :label="item.zdid+':'+item.zdz" :value="item.zdid+':'+item.zdz"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 公安机关机构代码 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="gajgjgdmRuleForm">
              <el-form-item label="公安机关机构代码:" prop="gajgjgdm">
                <el-select v-model="ruleForm.gajgjgdm" placeholder="请选择公安机关机构代码">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 社区代码 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="sqdmRuleForm">
              <el-form-item label="社区代码:" prop="sqdm">
                <el-select v-model="ruleForm.sqdm" placeholder="请选择社区代码">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 详细地址 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="xxdzRuleForm">
              <el-form-item label="详细地址:" prop="xxdz">
                <el-input placeholder="请填入小区详细地址" v-model="ruleForm.xxdz"></el-input>
              </el-form-item>
            </el-form>
            <!-- 物业名称 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="wymcRuleForm">
              <el-form-item label="物业名称:" prop="wymc">
                <el-input placeholder="请填入小区物业名称" v-model="ruleForm.wymc"></el-input>
              </el-form-item>
            </el-form>
            <!-- 经度 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="jdRuleForm">
              <el-form-item label="经度:" prop="jd">
                <el-input placeholder="实例格式:123.123456(保留小数点后六位)" v-model="ruleForm.jd"></el-input>
              </el-form-item>
            </el-form>
            <!-- 纬度 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="wdRuleForm">
              <el-form-item label="纬度:" prop="wd">
                <el-input placeholder="实例格式:123.123456(保留小数点后六位)" v-model="ruleForm.wd"></el-input>
              </el-form-item>
            </el-form>
            <!-- 地图坐标集 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="dtzbjRuleForm">
              <el-form-item label="地图坐标集:" prop="dtzbj">
                <el-input placeholder="实例格式:117.198149,31.840765;117.198719,31.840920" v-model="ruleForm.dtzbj"></el-input>
              </el-form-item>
            </el-form>
            <!-- 警员编号 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="jybhRuleForm">
              <el-form-item label="警员编号:" prop="jybh">
                <el-input placeholder="123456" v-model="ruleForm.jybh"></el-input>
              </el-form-item>
            </el-form>
            <!-- 警员姓名 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="jyxmRuleForm">
              <el-form-item label="警员姓名:" prop="jyxm">
                <el-input placeholder="张三" v-model="ruleForm.jyxm"></el-input>
              </el-form-item>
            </el-form>
            <!-- 警员联系方式 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="jylxfsRuleForm">
              <el-form-item label="警员联系方式:" prop="jylxfs">
                <el-input placeholder="请填入手机号" v-model="ruleForm.jylxfs"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="addxqxx_wrap_content_right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '../../components/title'
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
      //   省市区行政区划编码数据
      ssqxzqhbmList: [],
      //   需要验证的字段
      ruleForm: {
        xqbm: '',
        xqmc: '',
        ssqxzqbm: '',
        gajgjgdm: '',
        sqdm: '',
        xxdz:'',
        wymc:'',
        jd:'',
        wd:'',
        dtzbj:'',
        jybh:'',
        jyxm:'',
        jylxfs:''
      },
      rules: {
        xqbm: [
          { required: true, message: '请输入小区编码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        xqmc: [
          { required: true, message: '请输入小区名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur',
          },
        ],
        ssqxzqbm: [
          {
            required: true,
            message: '请选择省市区行政区划编码',
            trigger: 'change',
          },
        ],
        gajgjgdm: [
          {
            required: true,
            message: '请选择公安机关机构代码',
            trigger: 'change',
          },
        ],
        sqdm: [
          {
            required: true,
            message: '请选择公安机关机构代码',
            trigger: 'change',
          },
        ],
        xxdz: [
          { required: true, message: '请填入小区详细地址', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200 个字符',
            trigger: 'blur',
          },
        ],
        wymc: [
          { required: true, message: '请填入小区物业名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur',
          },
        ],
        jd: [
          { required: true, message: '请填入经度', trigger: 'blur' }
        ],
        wd: [
          { required: true, message: '请填入纬度', trigger: 'blur' }
        ],
        dtzbj: [
          { required: true, message: '请填入地图坐标集', trigger: 'blur' },
          {
            min: 1,
            max: 60000,
            message: '长度在 1 到 60000 个字符',
            trigger: 'blur',
          },
        ],
        jybh: [
          { required: true, message: '请填入警员编号', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur',
          },
        ],
        jyxm: [
          { required: true, message: '请填入警员姓名', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
        jylxfs: [
          { required: true, message: '请填入警员联系方式', trigger: 'blur' },
          {
            min: 1,
            max: 11,
            message: '长度在 1 到 11 个字符',
            trigger: 'blur',
          },
        ],
      }
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
    // 获取省市区行政区划编码列表
    let res = await this.$http.get('/qh/ssqxzqhbm.do')
    console.log(res.data.data)
    this.ssqxzqhbmList = res.data.data
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.xqxxtj
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
      eventBus.$emit('breadcrumb', breadcrumb9)
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
.addxqxx_wrap {
  margin: 80px 279px 0 260px;
  .addxqxx_wrap_title {
    width: 100%;
    height: 42px;
    border: 1px solid #c6e4ec;
    background: #d9edf6;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #446a7d;
    border-radius: 10px 10px 0 0;
    .addxqxx_wrap_title_text1 {
      margin: 0 8px 0 15px;
    }
    .addxqxx_wrap_title_text1 {
    }
  }
  //   表单的样式
  .demo_ruleForm {
    margin: 30px 0 0 0;
    .el-form-item__label {
      width: 182px;
      padding: 0;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
    }
    .el-input__inner {
      float: left;
      width: 434px;
      height: 32px;
      line-height: 32px;
    }
    .el-form-item__content {
      width: 693px;
      height: 34px;
      line-height: 34px;
    }
    .el-input {
      width: 434px;
      margin: 0 0 0 38px;
      height: 34px;
    }
    .el-form-item {
      margin: 0;
    }
    .el-form-item__error {
      margin-left: 220px;
    }
  }
  .el-select .el-input .el-select__caret {
    line-height: 1;
  }
  .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: none;
  }
  .addxqxx_wrap_content {
    width: 100%;
    border-radius: 0 0 10px 10px;
    border: 1px solid #cee1e7;
    border-top: 0;
    overflow: hidden;
    .addxqxx_wrap_content_left {
      width: 691px;
    }
  }
}
</style>