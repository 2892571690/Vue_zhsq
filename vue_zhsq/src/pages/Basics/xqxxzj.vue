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
            <!-- 表单 -->
            <el-form class="demo_ruleForm" :rules="rules" :model="ruleForm" ref="RuleForm">
              <div class="bitianFrom">
                <!-- 小区编码 -->
                <el-form-item label="小区序号:" prop="xqbm">
                  <el-input placeholder="请输入小区序号3位" v-model="ruleForm.xqbm"></el-input>
                </el-form-item>
                <!-- 小区名称 -->
                <el-form-item label="小区名称:" prop="xqmc">
                  <el-input placeholder="请输入小区名称" v-model="ruleForm.xqmc"></el-input>
                </el-form-item>
                <!-- 省市区行政区划编码 -->
                <el-form-item label="省市区行政区划编码:" prop="ssqXzqhdm">
                  <el-select
                    :filterable="true"
                    :loading="SSQloading"
                    :remote="true"
                    :remote-method="SSQremoteMethod"
                    v-model="ruleForm.ssqXzqhdm"
                    placeholder="请输入省市区行政区划名称"
                  >
                    <el-option
                      v-for="item in SSQoptions"
                      :key="item.zdid"
                      :label="item.zdz"
                      :value="item.zdid"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 公安机关机构代码 -->
                <el-form-item label="公安机关机构代码:" prop="gajgjgdm">
                  <el-select
                    filterable
                    :loading="GAJGloading"
                    remote
                    :remote-method="GAJGremoteMethod"
                    v-model="ruleForm.gajgjgdm"
                    placeholder="请输入公安机关机构代码"
                  >
                    <el-option
                      v-for="item in GAJGoptions"
                      :key="item.zdid"
                      :label="item.zdz"
                      :value="item.zdid"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 社区代码 -->
                <el-form-item label="社区代码:" prop="sqdm">
                  <el-select
                    filterable
                    :loading="SQDMloading"
                    remote
                    v-model="ruleForm.sqdm"
                    :remote-method="SQDMremoteMethod"
                    placeholder="请输入社区名称"
                  >
                    <el-option
                      v-for="item in SQDMoptions"
                      :key="item.zdid"
                      :label="item.zdz"
                      :value="item.zdid"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 详细地址 -->
                <el-form-item label="详细地址:" prop="xxdz">
                  <el-input placeholder="请填入小区详细地址" v-model="ruleForm.xxdz"></el-input>
                </el-form-item>
                <!-- 物业名称 -->
                <el-form-item label="物业名称:" prop="wyno">
                  <!-- <el-input placeholder="请填入小区物业名称" v-model="ruleForm.wyno"></el-input> -->
                  <el-select
                    filterable
                    :loading="WYDMloading"
                    remote
                    v-model="ruleForm.wyno"
                    :remote-method="WYDMremoteMethod"
                    placeholder="请输入物业名称"
                  >
                    <el-option
                      v-for="item in WYDMoptions"
                      :key="item.wy_id"
                      :label="item.wymc"
                      :value="item.wybm"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 经度 -->
                <el-form-item label="经度:" prop="jd">
                  <el-input placeholder="实例格式:123.123456(保留小数点后六位)" v-model="ruleForm.jd"></el-input>
                </el-form-item>
                <!-- 纬度 -->
                <el-form-item label="纬度:" prop="wd">
                  <el-input placeholder="实例格式:123.123456(保留小数点后六位)" v-model="ruleForm.wd"></el-input>
                </el-form-item>
                <!-- 地图坐标集 -->
                <el-form-item label="地图坐标集:" prop="dtzbj">
                  <el-input
                    placeholder="实例格式:117.198149,31.840765;117.198719,31.840920"
                    v-model="ruleForm.dtzbj"
                  ></el-input>
                </el-form-item>
                <!-- 警员编号 -->
                <el-form-item label="警员编号:" prop="jybh">
                  <el-input placeholder="123456" v-model="ruleForm.jybh"></el-input>
                </el-form-item>
                <!-- 警员姓名 -->
                <el-form-item label="警员姓名:" prop="jyxm">
                  <el-input placeholder="张三" v-model="ruleForm.jyxm"></el-input>
                </el-form-item>
                <!-- 警员联系方式 -->
                <el-form-item label="警员联系方式:" prop="jylxfs">
                  <el-input maxlength='11' placeholder="请填入手机号" v-model="ruleForm.jylxfs"></el-input>
                </el-form-item>
              </div>
              <div class="From_text">
                <div>以下选项可以不填</div>
              </div>
              <div class="bkx_From">
                <!-- 占地面积 -->
                <el-form-item label="占地面积:" prop="zdmj">
                  <el-input placeholder="单位/平方米" v-model="ruleForm.zdmj"></el-input>
                </el-form-item>
                <!-- 建筑面积 -->
                <el-form-item label="建筑面积:" prop="jzmj">
                  <el-input placeholder="单位/平方米" v-model="ruleForm.jzmj"></el-input>
                </el-form-item>
              </div>
              <div class="From_img">
                <div class="From_img_text">小区图片:</div>
                <div class="upLiadImg">
                  <el-upload
                    class="avatar-uploader"
                    action="/admin/xq/xztp.do"
                    :on-change="getFile"
                    :limit="1"
                  >
                    <input v-model="imgname" class="imgInput" placeholder="点击右边选择一张图片" />
                    <div class="upImg">选择图片</div>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,一次只能传一次</div>
                  </el-upload>
                </div>
              </div>
              <div @click="handleBlackTo" class="blackto">返回</div>
              <div @click="handleUpTo" class="upto">提交</div>
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
import Qs from 'qs'
export default {
  components: {
    Title,
  },
  data() {
    // 经度纬度的验证规则
    var checkLongitude = (rule, value, cb) => {
      const regLongitude = /^[\d\.\,+-]*(\.\d{1,6})*$/g
      if (regLongitude.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的经度'))
    }
    // 纬度的验证规则
    var checkwd = (rule, value, cb) => {
      const regwd = /^[\d\.\,+-]*(\.\d{1,6})*$/g
      if (regwd.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的纬度'))
    }
    //地图坐标的验证规则
    var checkMap = (rule, value, cb) => {
      const regMap = /^[\d\.\,+-]*$/g
      if (regMap.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的地图坐标'))
    }
    //警员编号的验证规则
    var checkPolice = (rule, value, cb) => {
      const regPolice = /^[0-9]{1,100}$/g
      if (regPolice.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的警员编号'))
    }
    //警员联系方式的验证规则
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的联系方式'))
    }
    //占地面积的验证规则
    var checkzd = (rule, value, cb) => {
      const regzd = /^([\d\.]{1,10})*$/g
      if (regzd.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的占地面积'))
    }
    //建筑面积的验证规则
    var checkjz = (rule, value, cb) => {
      const regjz = /^([\d\.]{1,10})*$/g
      if (regjz.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的建筑面积'))
    }
    return {
      // 放大
      refDome: null,
      // 面包屑
      breadcrumb: [],
      //   需要验证的字段
      imgname: '',
      ruleForm: {
        xqbm: '',
        xqmc: '',
        ssqXzqhdm: '',
        gajgjgdm: '',
        sqdm: '',
        xxdz: '',
        wyno: '',
        jd: '',
        wd: '',
        dtzbj: '',
        jybh: '',
        jyxm: '',
        jylxfs: '',
        zdmj: '',
        jzmj: '',
        tp: '', //上传图片
      },
      rules: {
        xqbm: [
          { required: true, message: '请输入小区编码', trigger: 'blur' },
          {
            min: 1,
            max: 3,
            message: '长度在 1 到 3 个字符',
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
        ssqXzqhdm: [
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
        wyno: [
          { required: true, message: '请填入小区物业名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur',
          },
        ],
        jd: [
          { required: true, message: '请填入经度', trigger: 'blur' },
          { validator: checkLongitude, trigger: 'blur' },
        ],
        wd: [
          { required: true, message: '请填入纬度', trigger: 'blur' },
          { validator: checkwd, trigger: 'blur' },
        ],
        dtzbj: [
          { required: true, message: '请填入地图坐标集', trigger: 'blur' },
          { validator: checkMap, trigger: 'blur' },
        ],
        jybh: [
          { required: true, message: '请填入警员编号', trigger: 'blur' },
          { validator: checkPolice, trigger: 'blur' },
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
          { validator: checkPhone, trigger: 'blur' },
        ],
        zdmj: [{ validator: checkzd, trigger: 'blur' }],
        jzmj: [{ validator: checkjz, trigger: 'blur' }],
      },
      // 省市区行政区划编码数据
      ssqxzqhbmList: [],
      // 省市区行政区划编码的loading
      SSQloading: false,
      // 省市区行政区划编码的options
      SSQoptions: [],
      // 公安机关机构代码数据
      gajgjgdmList: [],
      // 公安机关机构代码的loading
      GAJGloading: false,
      // 公安机关机构代码的options
      GAJGoptions: [],
      // 社区代码数据
      sqdmList: [],
      // 社区代码的loading
      SQDMloading: false,
      // 社区代码的options
      SQDMoptions: [],
      // 物业代码数据
      wydmList: [],
      // 物业代码的loading
      WYDMloading: false,
      // 物业代码的options
      WYDMoptions: [],
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
    this.handleSSqList()
    // 获取公安机关机构代码列表
    this.handleGAJGList()
    // 获取社区代码列表
    this.handleSQDMList()
    // 获取物业代码列表
    this.handeWYBMList()
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
      window.sessionStorage.setItem('activePath', `/index`)
      eventBus.$emit('breadcrumb', breadcrumb9)
      location.reload()
    },
    // 获取省市区行政区划编码列表
    async handleSSqList() {
      let res = await this.$http.get('/qh/ssqxzqhbm.do')
      // console.log(res.data.data)
      this.ssqxzqhbmList = res.data.data
    },
    // 获取公安机关机构代码列表
    async handleGAJGList() {
      let res = await this.$http.get('/qh/selGajgjgdm.do')
      // console.log(res.data.data)
      this.gajgjgdmList = res.data.data
    },
    // 获取社区代码列表
    async handleSQDMList() {
      let res = await this.$http.get('/qh/selSqdm.do')
      // console.log(res.data.data)
      this.sqdmList = res.data.data
    },
    // 获取物业编码列表
    async handeWYBMList() {
      let res = await this.$http.get('/xq/selWY.do')
      // console.log(res.data)
      this.wydmList = res.data
    },
    // 图片转Base64
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
          slef.ruleForm.tp = imgResult
          resolve(imgResult)
        }
      })
    },
    // 点击现在文件
    getFile(file, fileList) {
      //上传图片
      this.imgname = file.name
      this.getBase64(file.raw)
    },
    // 点击提交
    handleUpTo() {
      let self = this
      // console.log(self.ruleForm.tp)
      let data = {
        xqbm: self.ruleForm.xqbm,
        xqmc: self.ruleForm.xqmc,
        ssqXzqhdm: self.ruleForm.ssqXzqhdm,
        gajgjgdm: self.ruleForm.gajgjgdm,
        sqdm: self.ruleForm.sqdm,
        xxdz: self.ruleForm.xxdz,
        wyno: self.ruleForm.wyno,
        jd: self.ruleForm.jd,
        wd: self.ruleForm.wd,
        dtzbj: self.ruleForm.dtzbj,
        jybh: self.ruleForm.jybh,
        jyxm: self.ruleForm.jyxm,
        jylxfs: self.ruleForm.jylxfs,
        zdmj: self.ruleForm.zdmj,
        jzmj: self.ruleForm.jzmj,
        tp: self.ruleForm.tp,
      }
      data = Qs.stringify(data)
      self.$refs.RuleForm.validate(async (valid) => {
        if (valid) {
          let res = await self.$http.post('/xq/xzxq.do', data)
          if (res.data.massage.status == 200) {
            self.$message.success('添加成功')
            self.$router.go(-1)
          } else if (res.data.massage.status == 202) {
            self.$message.error('小区编码重复')
          } else {
            self.$message.error('添加失败')
          }
        }
      })
    },
    // 点击返回
    handleBlackTo() {
      this.$router.go(-1)
    },
    // 省市区行政区划编码搜索
    SSQremoteMethod(query) {
      if (query !== '') {
        this.SSQloading = true
        setTimeout(() => {
          this.SSQloading = false
          this.SSQoptions = this.ssqxzqhbmList.filter((item) => {
            return item.zdz.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.SSQoptions = []
      }
    },
    // 公安机关机构代码搜索
    GAJGremoteMethod(query) {
      if (query !== '') {
        this.GAJGloading = true
        setTimeout(() => {
          this.GAJGloading = false
          this.GAJGoptions = this.gajgjgdmList.filter((item) => {
            return item.zdz.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.SSQoptions = []
      }
    },
    // 社区代码搜索
    SQDMremoteMethod(query) {
      if (query !== '') {
        this.SQDMloading = true
        setTimeout(() => {
          this.SQDMloading = false
          this.SQDMoptions = this.sqdmList.filter((item) => {
            return item.zdz.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.SQDMoptions = []
      }
    },
    // 物业代码搜索
    WYDMremoteMethod(query) {
      if (query !== '') {
        this.WYDMloading = true
        setTimeout(() => {
          this.WYDMloading = false
          this.WYDMoptions = this.wydmList.filter((item) => {
            return item.wymc.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.WYDMoptions = []
      }
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
    & ::placeholder {
        color: rgb(134, 130, 130);
        font-size: 12px;
      }
    .el-form-item__label {
      width: 182px;
      padding: 0;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      margin: 30px 0 0 0;
      
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
      margin: 30px 0 0 38px;
      height: 34px;
    }
    .el-form-item {
      margin: 0;
    }
    .el-form-item__error {
      margin: 30px 0 0 220px;
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
      .xxbm_wrap {
        .bitianFrom {
          width: 691px;
        }
        .From_text {
          width: 691px;
          margin: 20px 0 18px 30px;
          color: #fff;
          // border: 1px solid #eeeeee;
          font-size: 12px;
          text-align: center;

          div {
            width: 160px;
            height: 20px;
            line-height: 20px;
            background-color: #5abdda;
            border-radius: 5px;
          }
        }
        .bkx_From {
          width: 691px;
          margin: 0 0 30px 0;
        }
        .From_img {
          position: absolute;
          top: 293px;
          right: 326px;
          width: 430px;
          height: 169px;
          .From_img_text {
            font-size: 15px;
            margin: 0 0 0 100px;
          }
        }
      }
    }
  }
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
.blackto {
  height: 34px;
  width: 107px;
  background: #5bc0de;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 500px;
  right: 538px;
  border-radius: 10px;
  cursor: pointer;
}
.upto {
  height: 34px;
  width: 107px;
  background: #d9544f;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 500px;
  right: 358px;
  border-radius: 10px;
  cursor: pointer;
}
.el-upload__tip {
  margin: 10px 0 0 100px;
}
.el-upload-list__item-name {
  margin: 0 0 0 100px;
}
</style>