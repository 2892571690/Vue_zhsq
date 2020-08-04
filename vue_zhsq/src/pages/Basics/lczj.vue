<template>
  <div ref="lctj">
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
    <!-- 添加楼栋信息 -->
    <div class="tjldxx_wrap">
      <div class="tjldxx_wrap_title">
        <div class="tjldxx_wrap_title_text">楼栋信息</div>
      </div>
      <div class="tjldxx_wrap_conent">
        <!-- 表单 -->
        <el-form
          hide-required-asterisk
          class="demo_ruleFormldtj"
          :rules="rules"
          :model="ruleForm"
          ref="RuleForm"
        >
          <div class="bitianFrom">
            <!-- 小区名称 -->
            <el-form-item label="小区:" prop="xqbm">
              <el-select v-model="ruleForm.xqbm" placeholder="请选择小区名称">
                <el-option v-for="item in xqmcList" :key="item.xq_id" :label="item.xqbm +':'+ item.xqmc" :value="item.xqbm"></el-option>
              </el-select>
            </el-form-item>
            <!-- 楼栋号 -->
            <el-form-item label="楼栋号:" prop="ldh">
              <el-input placeholder="请填写楼栋号,示范001" v-model="ruleForm.ldh"></el-input>
            </el-form-item>
            <!-- 单元数 -->
            <el-form-item label="单元数:" prop="dys">
              <el-input placeholder="实例：2" v-model="ruleForm.dys"></el-input>
            </el-form-item>
            <!-- 楼层数 -->
            <el-form-item label="楼层数:" prop="lcs">
              <el-input placeholder="实例：12" v-model="ruleForm.lcs"></el-input>
            </el-form-item>
            <!-- 每层房屋数量 -->
            <el-form-item label="每层房屋数量:" prop="hs">
              <el-input placeholder="实例：4" v-model="ruleForm.hs"></el-input>
            </el-form-item>
          </div>
          <div @click="handleBlackTo" class="blacktoldtj">返回</div>
          <div @click="handleUpTo" class="uptoldtj">提交</div>
        </el-form>
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
      //   小区名称列表
      xqmcList: [],
      ruleForm: {
        xqbm: '',
        ldh: '',
        dys: '',
        lcs: '',
        hs: '',
      },
      rules: {
        xqbm: [
          {
            required: true,
            message: '请选择小区名称',
            trigger: 'change',
          },
        ],
        ldh: [
          { required: true, message: '请输入楼栋号', trigger: 'blur' },
          {
            min: 3,
            max: 3,
            message: '长度在 3 到 3 个字符',
            trigger: 'blur',
          },
        ],
        dys: [
          { required: true, message: '请输入单元数', trigger: 'blur' },
          {
            min: 1,
            max: 2,
            message: '长度在 1 到 2 个字符',
            trigger: 'blur',
          },
        ],
        lcs: [
          { required: true, message: '请输入楼层数', trigger: 'blur' },
          {
            min: 1,
            max: 2,
            message: '长度在 1 到 2 个字符',
            trigger: 'blur',
          },
        ],
        hs: [
          { required: true, message: '请输入每层房屋数量', trigger: 'blur' },
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
    // 获取小区名称列表
    this.handleXQMC()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.lctj
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
    // 点击提交
    handleUpTo() {
      let self = this
      self.$refs.RuleForm.validate(async valid => {
        if (valid) {
          let res = await self.$http.get('/ld/insLouDong.do', {
            params: self.ruleForm,
          })
          // console.log(res)
          if(res.data.msg == 200){
              this.$message.success('添加成功')
              this.$router.go(-1)
          }else{
              this.$message.error('小区已经存在该楼栋，添加失败')
          }
        }
      })
    },
    // 点击返回
    handleBlackTo() {
      this.$router.go(-1)
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
.tjldxx_wrap {
  width: 1170px;
  margin: 74px 0 0 260px;
  border: 1px solid #bce9ef;
  border-radius: 10px;
  .tjldxx_wrap_title {
    width: 100%;
    height: 40px;
    background: #dfecf4;
    color: #30738d;
    line-height: 40px;
    .tjldxx_wrap_title_text {
      font-size: 14px;
      margin: 0 0 0 15px;
      line-height: 40px;
    }
  }
  .tjldxx_wrap_conent {
    height: 430px;
    width: 100%;
  }
}
//   表单的样式
.demo_ruleFormldtj {
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
    margin: 24px 0 0 220px;
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
.el-upload__tip {
  margin: 10px 0 0 100px;
}
.el-upload-list__item-name {
  margin: 0 0 0 100px;
}
.el-form-item__label {
  color: #363487;
}
.blacktoldtj {
  height: 34px;
  width: 107px;
  background: #5bc0de;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 640px;
  right: 1200px;
  border-radius: 10px;
}
.uptoldtj {
  height: 34px;
  width: 107px;
  background: #d9544f;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 640px;
  right: 940px;
  border-radius: 10px;
}
</style>