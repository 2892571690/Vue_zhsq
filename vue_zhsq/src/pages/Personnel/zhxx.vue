<template>
  <div ref="zhxx">
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
    <div class="zhxx_wrap">
      <!-- 头部表单 -->
      <div v-if="!searchBlock"></div>
      <div v-else>
        <div class="zhxx_From">
          <!-- 表单 -->
          <el-form class="zhxx_from_wrap" ref="form" :model="form">
            <!-- 小区信息 -->
            <el-form-item class="zhxx_xqxx_wrap">
              <el-select placeholder="请选择小区" @clear="handlexqClear" v-model="form.xqmc" clearable>
                <el-option
                  v-for="item in xqList"
                  :key="item.xq_id"
                  :label="item.xqmc"
                  :value="item.xqmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item class="zhxx_xm_wrap">
              <el-input clearable @clear="handlexmClear" placeholder="请输入姓名" v-model="form.xm"></el-input>
            </el-form-item>
            <!-- 手机号码 -->
            <el-form-item class="zhxx_sjhm_wrap">
              <el-input clearable @clear="handlesjClear" placeholder="请输入手机号码" v-model="form.sjhm"></el-input>
            </el-form-item>
          </el-form>
          <div class="el-icon-search searchBut" @click="handleSearch">搜索</div>
        </div>
      </div>

      <div class="zhxx_content">
        <div class="zhxx_content_title">
          <div class="zhxx_content_title_text">住户信息</div>
        </div>
        <div class="zhxx_content_content">
          <div class="zhxx_content_content_but">
            <div class="but_wrap">
              <div class="el-icon-plus addBut">增加</div>
              <div class="el-icon-delete deleteBut">删除</div>
              <div class="zhuceBut">注册照片或重新授权</div>
              <div class="putBut">上传人员</div>
              <div class="jihuoBut">激活/注销人员</div>
              <div class="txBut">提醒/正常</div>
              <div class="xz_wrap">{{zhxxList.length}}个中{{tableNum.length}}个被选</div>
            </div>
            <div class="right_button">
              <div class="right_but" @click="handleSearchBlock">
                <div class="right_but_img">
                  <img src="../../assets/sosuo.png" />
                </div>
              </div>
              <div class="right_but" @click="handleShuxin">
                <div class="right_but_img">
                  <img src="../../assets/shuaxin.png" />
                </div>
              </div>
              <div class="right_but" @click="handleBig">
                <div class="right_but_img">
                  <img src="../../assets/ed.png" />
                </div>
              </div>
            </div>
          </div>
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="zhxxList"
            style="width: 100%"
            stripe
            :header-cell-style="{color:'#44a0f7'}"
            border
            @selection-change="handleChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="xqmc" label="小区名称"></el-table-column>
            <el-table-column prop="xm" label="姓名"></el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">
                <div v-if="scope.row.xbdm == 1">男</div>
                <div v-else>女</div>
              </template>
            </el-table-column>
            <el-table-column label="身份证号码" width="220px">
              <template slot-scope="scope">
                <div>{{`**************${scope.row.zjhm.substr(-4,4)}`}}</div>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" width="150px">
              <template slot-scope="scope">
                <div>{{scope.row.sjhm.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/,"$1****$3")}}</div>
              </template>
            </el-table-column>
            <el-table-column label="人口类型代码">
              <template slot-scope="scope">
                <div v-if="scope.row.rklxdm == 1">常驻</div>
                <div v-else-if="scope.row.rklxdm == 2">流动人口</div>
                <div v-else>境外人员</div>
              </template>
            </el-table-column>
            <el-table-column label="与房主关系">
              <template slot-scope="scope">
                <div v-if="scope.row.yhzgxdm == 0">房主</div>
                <div v-else-if="scope.row.yhzgxdm == 1">配偶</div>
                <div v-else-if="scope.row.yhzgxdm == 2">子</div>
                <div v-else-if="scope.row.yhzgxdm == 3">女</div>
                <div v-else-if="scope.row.yhzgxdm == 4">孙子、孙女、或外孙子、外孙女</div>
                <div v-else-if="scope.row.yhzgxdm == 5">父母</div>
                <div v-else-if="scope.row.yhzgxdm == 6">祖父母或外祖父母</div>
                <div v-else-if="scope.row.yhzgxdm == 7">兄、弟、姐、妹</div>
                <div v-else-if="scope.row.yhzgxdm == 8">其他亲属</div>
                <div v-else>租客</div>
              </template>
            </el-table-column>
            <el-table-column label="注册照片" width="120px">
              <template slot-scope="scope">
                <div class="zcBox" @click="handlePic(scope.row.ryZp)">查看照片</div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdz" label="添加车辆">
              <template>
                <div class="zcBox" @click="handleAddCart">添加车辆</div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdz" label="个人资料">
              <template slot-scope="scope">
                <div class="zcBox" @click="handlePersonal(scope.row.items)">查看</div>
              </template>
            </el-table-column>
            <el-table-column label="是否上传">
              <template slot-scope="scope">
                <div v-if="scope.row.isUpload == 1" style="color:green;">已上传</div>
                <div v-else>未上传</div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdz" label="用户状态">
              <template slot-scope="scope">
                <div v-if="scope.row.yhzt == 0">正常</div>
                <div v-else-if="scope.row.yhzt == 1">锁定</div>
                <div v-else>特殊</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pagenum"
            :page-sizes="[5, 9, 13]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tatal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 图片的弹出框 -->
    <el-dialog
      title="注册图片"
      :visible.sync="PicDialogVisible"
      width="50%"
      :before-close="PicHandleClose"
      class="Pic_diao"
    >
      <span class="Pic_span">
        <img :src="PicImg" />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="PicDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="PicDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人资料的弹出框 -->
    <el-dialog
      title="个人资料"
      :visible.sync="PersonalDialogVisible"
      width="80%"
      :before-close="PersonalHandleClose"
      class="Personal_diao"
    >
      <span class="Personal_span">
          1111
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="PersonalDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="PersonalDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      //   下拉小区列表
      xqList: [],
      //   表单输入的内容
      form: {
        xqmc: '',
        xm: '',
        sjhm: '',
        pagenum: 1,
        pagesize: 5,
      },
      // 控制搜索框的显示与隐藏
      searchBlock: false,
      //   控制全屏跟小屏的切换
      screen: 1,
      tatal: 0,
      // 住户信息数据
      zhxxList: [],
      // 表格选中的数量
      tableNum: [],
      //   控制图片弹出框
      PicDialogVisible: false,
      //   点击查看的图片
      PicImg: '',
      //   控制个人资料弹出框
      PersonalDialogVisible: false,
      //   点击查看的个人资料
      PersonalObj:{}
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
    // 获取下拉小区列表
    await this.handleXQList()
    // 获取住户信息列表
    await this.handleZHXXList()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.zhxx
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
      //   console.log(res.data)
      this.xqList = res.data
    },
    // 点击搜索
    handleSearch() {
      this.handleZHXXList()
    },
    // 点击显示和隐藏
    handleSearchBlock() {
      this.searchBlock = !this.searchBlock
    },
    // 点击刷新
    handleShuxin() {
      location.reload()
    },
    // 点击放大
    handleBig() {
      // console.log(this.$refs.zhxx)
      if (this.screen % 2 == 0) {
        this.$refs.zhxx.style.position = 'static'
        this.screen++
      } else {
        this.$refs.zhxx.style.width = '100%'
        this.$refs.zhxx.style.height = '100%'
        this.$refs.zhxx.style.position = 'absolute'
        this.$refs.zhxx.style.top = '0'
        this.$refs.zhxx.style.left = '0'
        this.$refs.zhxx.style.zIndex = '10'
        this.$refs.zhxx.style.background = '#fff'
        this.screen++
      }
    },
    // 获取住户信息列表
    async handleZHXXList() {
      let res = await this.$http.get('ryxx/cxryxx.do', { params: this.form })
      console.log(res)
      this.zhxxList = res.data.data
      this.tatal = res.data.totalCount
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.form.pagesize = newSize
      this.handleZHXXList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.form.pagenum = newPage
      this.handleZHXXList()
    },
    // 表格选中的事件
    handleChange(value) {
      this.tableNum = value
    },
    // 点击查看照片
    handlePic(pic) {
      this.PicImg = pic
      this.PicDialogVisible = true
    },
    // 点击添加车辆
    handleAddCart() {
      console.log(222)
    },
    // 点击查看个人资料
    handlePersonal(items) {
      console.log(items)
      this.PersonalObj = items
      this.PersonalDialogVisible = true
    },
    // 点击姓名清除
    handlexmClear() {
      this.form.xm = ''
      this.handleZHXXList()
    },
    // 点击手机号码清除
    handlesjClear() {
      this.form.sjhm = ''
      this.handleZHXXList()
    },
    // 点击小区码清除
    handlexqClear() {
      this.form.xqmc = ''
      this.handleZHXXList()
    },
    // 点击图片的X
    PicHandleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>
<style lang="less">
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
// 面包屑到这里
.zhxx_wrap {
  //   width: 1630px;
  //   height: 400px;
  margin: 42px 40px 0 40px;
  overflow: hidden;
  .zhxx_From {
    height: 36px;
    width: 100%;
    margin: 22px 0;
    display: flex;
    .zhxx_from_wrap {
      display: flex;
      .zhxx_xqxx_wrap {
        width: 200px;
        height: 36px;
        .el-form-item__content {
          margin: 0 !important;
          height: 100%;
          width: 100%;
          line-height: 1;
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
      .zhxx_xm_wrap {
        width: 110px;
        height: 36px;
        margin: 0 0 0 13px;
        .el-form-item__content {
          width: 100%;
          height: 100%;
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
      .zhxx_sjhm_wrap {
        width: 110px;
        height: 36px;
        margin: 0 0 0 13px;
        .el-form-item__content {
          width: 100%;
          height: 100%;
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
    }
  }
  .searchBut {
    margin: 0 0 0 18px;
    width: 90px;
    line-height: 36px;
    text-align: center;
    background: #409efe;
    color: #fff;
    border-radius: 5px;
  }
  .zhxx_content {
    width: 100%;
    height: 100%;
    .zhxx_content_title {
      width: 100%;
      height: 40px;
      background: #def0d8;
      border-radius: 10px 10px 0 0;
      line-height: 40px;
      .zhxx_content_title_text {
        font-size: 14px;
        color: #355933;
        margin: 0 0 0 15px;
      }
    }
    .zhxx_content_content {
      width: 100%;
      //   height: 180px;
      border: 1px solid #dcddd8;
      .zhxx_content_content_but {
        display: flex;
        line-height: 1;
        // height: 40px;
        // margin: 0 0 10px 0;
        .but_wrap {
          display: flex;
          .addBut {
            width: 93px;
            height: 40px;
            background: #3e9ffd;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            margin: 25px 15px 10px 25px;
          }
          .deleteBut {
            width: 93px;
            height: 40px;
            background: #f46c6c;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
          }
          .zhuceBut {
            width: 200px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
          }
          .putBut {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
          }
          .jihuoBut {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
          }
          .txBut {
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
          }
          .xz_wrap {
            line-height: 40px;
            margin: 25px 15px 10px 0;
          }
        }
        .right_button {
          margin-left: 380px;
          .right_but {
            width: 54px;
            height: 38px;
            box-sizing: border-box;
            border: 1px solid #dedee6;
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            margin: 25px 0 0 0;
            &:nth-child(1) {
              border-radius: 10px 0 0 10px;
            }
            &:nth-child(3) {
              border-radius: 0 10px 10px 0;
            }
            .right_but_img {
              // width: 12px;
              // height: 12px;
              .img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .zhxx_content_content_tab {
      }
    }
  }
}
.zcBox {
  width: 80px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  background: #53b3dd;
  border-radius: 10px;
}
.Pic_diao {
  .el-dialog {
    margin-top: 2vh !important;
    .el-dialog__body {
      width: 735px;
      height: 735px;
      margin: 0 auto;
      .Pic_span {
        width: 735px;
        height: 735px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.Personal_diao {
  .el-dialog {
    margin-top: 4vh !important;
    .el-dialog__body {
      width: 1260px;
      height: 750px;
      margin: 0 auto;
      .Personal_span {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>