<template>
  <div ref="lcplzj">
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
    <div class="tjldplxx_wrap">
      <div class="tjldxx_wrap_title">
        <div class="tjldxx_wrap_title_text">楼栋信息</div>
        <div @click="handleAddFrom" class="addFrom_wrap_top el-icon-plus"></div>
        <div @click="handleDelteFrom" class="deleteFrom_wrap_top el-icon-minus"></div>
      </div>
      <div class="ldpltj_wrap_conent">
        <!-- 表单 -->
        <el-form
          hide-required-asterisk
          class="demo_ruleFormldplzj"
          :model="ruleForm"
          ref="RuleForm"
        >
          <!-- 添加的from -->
          <div
            class="bitianFromldplzj"
            v-for="(domain, index) in ruleForm.ldinfo"
            :key="domain.key"
          >
            <!--小区名称  -->
            <div class="form_wrap_box">
              <el-form-item
                label="小区:"
                :prop="'ldinfo.' + index + '.xqbm'"
                :rules="{required: true, message: '请选择小区名称', trigger: 'blur'}"
              >
                <el-select v-model="ruleForm.ldinfo[index].xqbm" placeholder="请选择小区名称">
                  <el-option
                    v-for="item in xqmcList"
                    :key="item.xq_id"
                    :label="item.xqmc"
                    :value="item.xqbm"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 楼栋号 -->
            <div class="form_wrap_box">
              <el-form-item
                class="lcs_wrap_box"
                label="楼栋号:"
                :prop="'ldinfo.' + index + '.ldh'"
                :rules="[{required: true, message: '请选择楼栋号', trigger: 'blur'}]"
              >
                <!-- <el-input placeholder="请填写楼栋号,示范001" v-model="ruleForm.ldinfo[index].ldh"></el-input> -->
                <el-select v-model="ruleForm.ldinfo[index].ldh" placeholder="请选择楼栋号">
                  <el-option
                    v-for="(item,index) in 100"
                    :key="index"
                    :label="(index+1)+'栋'"
                    :value="index+1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 单元数 -->
            <div class="form_wrap_box">
              <el-form-item
                class="lcs_wrap_box"
                label="单元数:"
                :prop="'ldinfo.' + index + '.dys'"
                :rules="[{required: true, message: '请输入单元数', trigger: 'blur'}]"
              >
                <!-- <el-input placeholder="实例：2" v-model="ruleForm.ldinfo[index].dys"></el-input> -->
                <el-select v-model="ruleForm.ldinfo[index].dys" placeholder="请选择单元号">
                  <el-option
                    v-for="(item,index) in 10"
                    :key="index"
                    :label="(index+1)+'单元'"
                    :value="index+1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 楼层数 -->
            <div class="form_wrap_box">
              <el-form-item
                class="lcs_wrap_box"
                label="楼层数:"
                :prop="'ldinfo.' + index + '.lcs'"
                :rules="[{required: true, message: '请输入楼层数', trigger: 'blur'}]"
              >
                <!-- <el-input placeholder="实例：12" v-model="ruleForm.ldinfo[index].lcs"></el-input> -->
                <el-select v-model="ruleForm.ldinfo[index].lcs" placeholder="请选择楼层号">
                  <el-option
                    v-for="(item,index) in 50"
                    :key="index"
                    :label="(index+1)+'层'"
                    :value="index+1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 每层房屋数量 -->
            <div class="form_wrap_box">
              <el-form-item
                class="lcs_wrap_box1"
                label="每层房屋数量:"
                :prop="'ldinfo.' + index + '.hs'"
                :rules="[{required: true, message: '请输入每层房屋数量', trigger: 'blur'}]"
              >
                <!-- <el-input placeholder="实例：4" v-model="ruleForm.ldinfo[index].hs"></el-input> -->
                <el-select v-model="ruleForm.ldinfo[index].hs" placeholder="请选择户数号">
                  <el-option
                    v-for="(item,index) in 10"
                    :key="index"
                    :label="(index+1)+'户'"
                    :value="index+1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <!-- 添加的from结束 -->
          <div @click="handleBlackTo" class="blacktoldpltj">返回</div>
          <div @click="handleUpTo" class="uptoldpltj">提交</div>
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
    return {
      // 放大
      refDome: null,
      // 面包屑
      breadcrumb: [],
      //   小区名称列表
      xqmcList: [],
      ruleForm: {
        ldinfo: [
          {
            xqbm: '',
            key: Date.now(),
            ldh: '',
            key: Date.now(),
            dys: '',
            key: Date.now(),
            lcs: '',
            key: Date.now(),
            hs: '',
            key: Date.now(),
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
    this.refDome = this.$refs.lcplzj
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
      let ldinfo = this.ruleForm.ldinfo
      // console.log(ldinfo)
      let self = this
      Qs.stringify({ ldinfo: ldinfo }, { arrayFormat: 'repeat' })
      self.$refs.RuleForm.validate(async (valid) => {
        if (valid) {
          let res = await self.$http.post('/ld/insLouDongList.do', ldinfo)
          // console.log(res)
          if (res.data.msg == 200) {
            this.$message.success('添加成功')
          } else if (res.data.msg == 202) {
            this.$message.warning('添加失败,楼栋信息重复')
          } else {
            this.$message.error('添加失败')
          }
          self.$router.go(-1)
        }
      })
    },
    // 点击返回
    handleBlackTo() {
      this.$router.go(-1)
    },
    // 添加from表单
    handleAddFrom() {
      if (this.ruleForm.ldinfo.length == 5) {
        return
      } else {
        this.ruleForm.ldinfo.push({
          xqbm: '',
          key: Date.now(),
          ldh: '',
          key: Date.now(),
          dys: '',
          key: Date.now(),
          lcs: '',
          key: Date.now(),
          hs: '',
          key: Date.now(),
        })
      }
    },
    // 删除表单
    handleDelteFrom() {
      if (this.ruleForm.ldinfo.length == 1) {
        return
      } else {
        this.ruleForm.ldinfo.pop()
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
.tjldplxx_wrap {
  width: 1250px;
  margin: 74px 30px 0 265px;
  border: 1px solid #bce9ef;
  border-radius: 10px;
  .tjldxx_wrap_title {
    width: 100%;
    height: 40px;
    background: #dfecf4;
    color: #30738d;
    line-height: 40px;
    position: relative;
    .tjldxx_wrap_title_text {
      font-size: 14px;
      margin: 0 0 0 15px;
      line-height: 40px;
    }
  }
  .ldpltj_wrap_conent {
    height: 395px;
    width: 100%;
  }
}
//   表单的样式
.demo_ruleFormldplzj {
  .el-form-item__label {
    width: auto;
    padding: 0;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
  }
  .el-input__inner {
    float: left;
    width: 150px;
    height: 32px;
    line-height: 32px;
  }
  .el-form-item__content {
    & ::placeholder {
      color: rgb(134, 130, 130);
      font-size: 12px;
    }
    // width: 693px;
    height: 34px;
    line-height: 34px;
  }
  .el-input {
    width: 150px;
    margin: 0 0 0 10px;
    height: 34px;
  }
  .el-form-item {
    margin: 0;
  }
  .el-form-item__error {
    margin: 0 0 0 56px;
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
.blacktoldpltj {
  height: 34px;
  width: 107px;
  background: #5bc0de;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 620px;
  right: 1000px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #087cf3;
  }
}
.uptoldpltj {
  height: 34px;
  width: 107px;
  background: #d9544f;
  line-height: 34px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 620px;
  right: 800px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #db1616;
  }
}
.form_wrap_box {
  width: 220px;
  float: left;
}
.bitianFromldplzj {
  margin: 20px 0 0 40px;
  height: 40px;
}
.addFrom_wrap_top {
  cursor: pointer;
  width: 62px;
  height: 30px;
  background: #3ac75d;
  line-height: 1;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 5px;
  right: 260px;
  font-size: 19px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #12ce7f;
  }
}
.deleteFrom_wrap_top {
  cursor: pointer;
  width: 62px;
  height: 30px;
  background: #ca4743;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 5px;
  right: 150px;
  font-size: 19px;
  font-weight: 700;
  &:hover {
    background: #db1616;
  }
}
.lcs_wrap_box {
  width: 270px;
  .el-select {
    width: 123px;
    .el-input {
      width: 100%;
      .el-input__inner {
        width: 100%;
      }
    }
  }
}
.lcs_wrap_box1 {
  width: 270px;
  .el-select {
    width: 123px;
    .el-input {
      width: 100%;
      .el-input__inner {
        width: 100%;
      }
    }
  }
  .el-form-item__error {
    margin: 0 0 0 100px;
  }
}
</style>