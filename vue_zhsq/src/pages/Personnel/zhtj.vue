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
                <el-select @change="handleXQClick" v-model="ruleForm.xqbm" placeholder="请选择小区">
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
                <el-select
                  @focus="DYHfocus"
                  @change="DYHchange"
                  v-model="ruleForm.dyh"
                  placeholder="请选择单元号"
                >
                  <el-option v-for="item in DYList" :key="item" :label="item+'单元'" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <!-- 手机号码 -->
              <el-form-item label="手机号码：" prop="sjhm">
                <el-input maxlength="11" placeholder="请输入手机号码" v-model="ruleForm.sjhm"></el-input>
              </el-form-item>
              <!-- 人口类型 -->
              <el-form-item label="人口类型：" prop="rklxdm">
                <el-select v-model="ruleForm.rklxdm" placeholder="请选择人口类型">
                  <el-option
                    v-for="(item,index) in rklxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 政治面貌 -->
              <el-form-item label="政治面貌：" prop="zzmmdm">
                <el-select v-model="ruleForm.zzmmdm" placeholder="请选择政治面貌">
                  <el-option
                    v-for="(item,index) in zzmmlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdid"
                  ></el-option>
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
                <el-input disabled placeholder="请先读取身份信息" v-model="xb"></el-input>
              </el-form-item>
              <!-- 楼栋号 -->
              <el-form-item label="楼栋号：" prop="ldh">
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
              <!-- 门牌号 -->
              <el-form-item label="门牌号：" prop="mph">
                <el-select @focus="MPLfocus" v-model="ruleForm.mph" placeholder="请选择门牌号">
                  <el-option v-for="item in MPList" :key="item" :label="item + '号'" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <!-- 证件类型 -->
              <el-form-item label="证件类型：" prop="zjlxdm">
                <el-select v-model="ruleForm.zjlxdm" placeholder="请选择证件类型">
                  <el-option
                    v-for="(item,index) in zjlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 与户主关系代码 -->
              <el-form-item label="与户主关系代码：" prop="yhzgxdm">
                <el-select v-model="ruleForm.yhzgxdm" placeholder="请选择与户主关系代码">
                  <el-option
                    v-for="(item,index) in yhzgxlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdid"
                  ></el-option>
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
                <el-select @change="JGSFchange" v-model="ruleForm.jgsf" placeholder="请选择籍贯省份">
                  <el-option
                    v-for="(item,index) in jgsflxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 国籍 -->
              <el-form-item label="国籍：" prop="gjdm">
                <el-select v-model="ruleForm.gjdm" placeholder="请选择国籍">
                  <el-option
                    v-for="(item,index) in gjlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 宗教信仰 -->
              <el-form-item label="宗教信仰：" prop="zjxydm">
                <el-select v-model="ruleForm.zjxydm" placeholder="请选择宗教信仰">
                  <el-option
                    v-for="(item,index) in zjxylxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 婚姻状况 -->
              <el-form-item label="婚姻状况：" prop="hyzkdm">
                <el-select v-model="ruleForm.hyzkdm" placeholder="请选择婚姻状况">
                  <el-option
                    v-for="(item,index) in hyzklxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="zhbjxx_ruleForm_bottomRight">
              <!-- 籍贯精确到(区县) -->
              <el-form-item label="籍贯精确到(区县)：" prop="jgjqdqx">
                <el-select @focus="JGJQfocus" v-model="ruleForm.jgjqdqx" placeholder="请选择籍贯精确到(区县)">
                  <el-option
                    v-for="(item,index) in jgjqdqxlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 名族 -->
              <el-form-item label="民族：" prop="mzdm">
                <el-select v-model="ruleForm.mzdm" placeholder="请选择名族">
                  <el-option
                    v-for="(item,index) in mzlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 文化程度 -->
              <el-form-item label="文化程度：" prop="whcddm">
                <el-select v-model="ruleForm.whcddm" placeholder="请选择文化程度">
                  <el-option
                    v-for="(item,index) in whcdlxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 兵役状况 -->
              <el-form-item label="兵役状况：" prop="byzkdm">
                <el-select v-model="ruleForm.byzkdm" placeholder="请选择兵役状况">
                  <el-option
                    v-for="(item,index) in byzklxList"
                    :key="index"
                    :label="item.zdz"
                    :value="item.zdx"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- 读卡 -->
        <div class="zhbjxx_img">
          <div class="zhbjxx_img_text">身份照片</div>
          <div class="zhbjxx_img_pic">
            <div v-if="ruleForm.zjzp == ''">
              <img src="../../assets/zjzp.png" />
            </div>
            <div v-else>
              <img :src="ruleForm.zjzp" />
            </div>
          </div>
          <div class="zhbjxx_img_but" @click="ReadCard">读卡</div>
        </div>
        <!-- 提交—————返回 -->
        <div class="zhxxbj_wrap_but">
          <div class="zhxxzj_black" @click="handleBlack">返回</div>
          <div class="zhxxzj_up" @click="handleUp">提交</div>
        </div>
        <!-- 点击下载 -->
        <div class="zhxxbj_wrap_titleText">
          <div class="zhxxbj_wrap_titleText_text1">请在IE浏览器使用</div>
          <div class="zhxxbj_wrap_titleText_text2">控件不可用，可能未正确安装控件及驱动,或者控件未启用</div>
          <div class="zhxxbj_wrap_titleText_text3" @click="handleDownload">点击此处查看文档</div>
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
      //   小区列表
      xqmcList: [],
      // 性别
      xb: '',
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
        gjdm: '',
        zjxydm: '',
        hyzkdm: '',
        jgjqdqx: '',
        mzdm: '',
        whcddm: '',
        byzkdm: '',
        zjzp:'',
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
      },
      // 证件类型列表
      zjlxList: [],
      // 人口类型列表
      rklxList: [],
      // 与户主关系类型列表
      yhzgxlxList: [],
      // 政治面貌类型列表
      zzmmlxList: [],
      //籍贯省份类型列表
      jgsflxList: [],
      //籍贯精确到区县类型列表
      jgjqdqxlxList: [],
      //国籍类型列表
      gjlxList: [],
      //名族类型列表
      mzlxList: [],
      //宗教信仰类型列表
      zjxylxList: [],
      //文化程度类型列表
      whcdlxList: [],
      //婚姻状况类型列表
      hyzklxList: [],
      //兵役状况类型列表
      byzklxList: [],
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
    //获取证件照类型
    this.handleZJLX()
    //获取人口类型
    this.handleRK()
    //获取与户主关系类型
    this.handleYHZGX()
    //获取政治面貌类型
    this.handleZZMM()
    //获取籍贯省份类型
    this.handleJGSF()
    //获取籍贯精确到区县类型
    // this.handleJGJQDQX()
    //获取国籍类型
    this.handleGJ()
    //获取名族类型
    this.handleMZ()
    //获取宗教信仰类型
    this.handleZJXY()
    //获取文化程度类型
    this.handleWHCD()
    //获取婚姻状况类型
    this.handleHYZK()
    //获取兵役状况类型
    this.handleBYZK()
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
      // console.log(res.data)
      this.xqmcList = res.data
    },
    // 点击返回
    handleBlack() {
      this.$router.go(-1)
    },
    // 点击提交
    handleUp() {
      // console.log(this.ruleForm)
      let self = this
      let data = {
        xm: this.ruleForm.xm,
        hjdxz: this.ruleForm.hjdxz,
        xqbm: this.ruleForm.xqbm,
        dyh: this.ruleForm.dyh,
        sjhm: this.ruleForm.sjhm,
        rklxdm: this.ruleForm.rklxdm,
        zzmmdm: this.ruleForm.zzmmdm,
        zjhm: this.ruleForm.zjhm,
        xbdm: this.ruleForm.xbdm,
        ldh: this.ruleForm.ldh,
        mph: this.ruleForm.mph,
        zjlxdm: this.ruleForm.zjlxdm,
        yhzgxdm: this.ruleForm.yhzgxdm,
        jgsf: this.ruleForm.jgsf,
        gjdm: this.ruleForm.gjdm,
        zjxydm: this.ruleForm.zjxydm,
        hyzkdm: this.ruleForm.hyzkdm,
        jgjqdqx: this.ruleForm.jgjqdqx,
        mzdm: this.ruleForm.mzdm,
        whcddm: this.ruleForm.whcddm,
        byzkdm: this.ruleForm.byzkdm,
        zjzp: this.ruleForm.zjzp,
      }
      data = Qs.stringify(data)
      self.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await self.$http.post('ryxx/xzryxx.do', data)
          // console.log(res)
          if (res.data.message.status == '200') {
            this.$message.success('入住成功')
            this.$router.go(-1)
          } else if(res.data.message.status == '201'){
            this.$message.warning('房主已经存在,请更换与房主关系')
          }else{
            this.$message.error('入住失败')
          }
        }
      })
    },
    // 点击下载
    async handleDownload() {
      let res = await this.$http.get('/qh/download.do', {
        responseType: 'blob', // 设置响应数据类型
      })
      // console.log(res)
      const data = res.data
      let url = window.URL.createObjectURL(data) // 将二进制文件转化为可访问的url
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = 'cvr-100uc-driver.zip'
      a.click() // 模拟点击下载
      window.URL.revokeObjectURL(url)
    },
    // 点击小区下拉框
    async handleXQClick(e) {
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
    // 获取证件照类型
    async handleZJLX() {
      let res = await this.$http.get('/qh/selZjlx.do')
      this.zjlxList = res.data.data
    },
    // 获取人口类型
    async handleRK() {
      let res = await this.$http.get('/qh/selRklx.do')
      this.rklxList = res.data.data
    },
    // 获取与户主关系类型
    async handleYHZGX() {
      let res = await this.$http.get('/qh/selYfzgx.do')
      this.yhzgxlxList = res.data.data
    },
    // 获取政治面貌类型
    async handleZZMM() {
      let res = await this.$http.get('/qh/selZzmm.do')
      this.zzmmlxList = res.data.data
    },
    // 获取籍贯省份类型
    async handleJGSF() {
      let res = await this.$http.get('/qh/jiguanSheng.do')
      // console.log(res)
      this.jgsflxList = res.data.data
    },
    // 点击籍贯省份下拉框
    async JGSFchange(e) {
      // console.log(e)
      e = e.substring(0, 2)
      let res = await this.$http.get(`/qh/jiguanShengShiQu.do?zdx=${e}`)
      this.jgjqdqxlxList = res.data.data
    },
    // 获取国籍类型
    async handleGJ() {
      let res = await this.$http.get('/qh/selGuoji.do')
      this.gjlxList = res.data.data
    },
    // 获取名族类型
    async handleMZ() {
      let res = await this.$http.get('/qh/selMingzu.do')
      this.mzlxList = res.data.data
    },
    // 获取宗教信仰类型
    async handleZJXY() {
      let res = await this.$http.get('/qh/selZjxy.do')
      this.zjxylxList = res.data.data
    },
    // 获取文化程度类型
    async handleWHCD() {
      let res = await this.$http.get('/qh/selWhcd.do')
      this.whcdlxList = res.data.data
    },
    // 获取婚姻状况类型
    async handleHYZK() {
      let res = await this.$http.get('/qh/selHyzk.do')
      this.hyzklxList = res.data.data
    },
    // 获取兵役状况类型
    async handleBYZK() {
      let res = await this.$http.get('/qh/selByzk.do')
      this.byzklxList = res.data.data
    },
    // 籍贯精确到 获取焦点事件
    JGJQfocus() {
      if (this.jgjqdqxlxList == 0) {
        this.$message.warning('请先选择籍贯省份')
      } else {
        return
      }
    },
    // 点击读卡
    ReadCard() {
      var ret = document.getElementById('CVR_IDCard').ReadCard()
      if (ret == '0') {
        this.ruleForm.xm = document.getElementById('CVR_IDCard').Name
        this.ruleForm.zjhm = document.getElementById('CVR_IDCard').CardNo
        this.ruleForm.hjdxz = document.getElementById('CVR_IDCard').Address
        this.ruleForm.xbdm =
          document.getElementById('CVR_IDCard').Sex == '1' ? '1' : '2'
        this.xb = document.getElementById('CVR_IDCard').Sex == '1' ? '男' : '女'
        this.ruleForm.zjzp = `data:image/jpeg;base64,${
          document.getElementById('CVR_IDCard').Picture
        }`
        return
      }
      this.$message.error('读卡错误，尝试重新放置')
      return
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
        height: 410px;
        .el-form-item__error {
          margin: 0 0 0 205px;
        }
        .zhbjxx_ruleForm_topLeft {
          width: 396px;
          height: 34px;
          .el-form-item {
            height: 34px;
            margin: 20px 0 0 0;
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
          .el-form-item__error {
            margin: 0 0 0 243px;
          }
          width: 440px;
          .el-form-item {
            height: 34px;
            margin: 20px 0 0 0;
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
      .zhbjxx_ruleForm_center {
        width: 94%;
        height: 30px;
        margin: 0 30px 0 30px;
        display: flex;
        align-items: center;
        border: 1px solid #ededed;
        .zhbjxx_ruleForm_center_text {
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
        .el-form-item__error {
          margin: 0 0 0 180px;
        }
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
          .el-form-item__error {
            margin: 0 0 0 250px;
          }
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
.zhbjxx_img {
  width: 175px;
  height: 335px;
  position: absolute;
  right: 370px;
  top: 260px;
  .zhbjxx_img_text {
    font-size: 15px;
    text-align: center;
    line-height: 1;
    margin: 0 0 9px 0;
  }
  .zhbjxx_img_pic {
    width: 175px;
    height: 270px;
    div {
      width: 100%;
      height: 100%;
    }
  }
  .zhbjxx_img_but {
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
.zhxxbj_wrap_but {
  width: 100%;
  display: flex;
  .zhxxzj_black {
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
  .zhxxzj_up {
    width: 190px;
    height: 34px;
    background-color: #d9544f;
    color: #fff;
    text-align: center;
    line-height: 34px;
    border-radius: 10px;
    cursor: pointer;
  }
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
</style>