<template>
  <div ref="crkxx">
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
    <!-- 出入口信息 -->
    <div class="crkxx_wrap">
      <!-- 搜索框 -->
      <div v-if="!searchBlock"></div>
      <div v-else>
        <div class="crkxx_wrap_input">
          <div class="crkxx_wrap_input1">
            <el-input
              @blur="handleBlur"
              class="crkxx_wrap_input1_inp"
              placeholder="搜索出入口名称"
              prefix-icon="el-icon-search"
              v-model="from.crkmc"
              clearable
            ></el-input>
          </div>
          <div class="crkxx_wrap_input2">
            <el-select class="crkxx_wrap_input2_sel" v-model="from.lx" placeholder="出入口类型">
              <el-option label="人行" value="11"></el-option>
              <el-option label="车行" value="12"></el-option>
            </el-select>
          </div>
          <div class="el-icon-search crkxx_search" @click="handleCRKXXSearch">搜索</div>
        </div>
      </div>

      <!-- 功能区 -->
      <div class="function_wrap">
        <div class="function_wrap_left">
          <div class="function_wrap_left_add el-icon-plus" type="primary" @click="handleAddcrk">增加</div>
          <div class="function_wrap_left_up">上传选中进出口</div>
          <div class="function_wrap_left_dele" @click="handleDeletecrk">删除</div>
        </div>
        <div class="function_center_text">{{crkxxList.length}}个中{{crkxxListNum.length}}个被选</div>
        <div class="function_right_button">
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
        :data="crkxxList"
        style="width: 100%"
        stripe
        :header-cell-style="{color:'#44a0f7' ,background:'#f6f6f6'}"
        border
        @selection-change="handleChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="xqmc" label="小区名称"></el-table-column>
        <el-table-column prop="crkmc" label="出入口名称"></el-table-column>
        <el-table-column label="出入口类型">
          <template slot-scope="scope">
            <div v-if="scope.row.lx == 1">人行</div>
            <div v-else>车行</div>
          </template>
        </el-table-column>
        <el-table-column prop="crkbm" label="出入口编码"></el-table-column>
        <el-table-column label="是否上传">
          <template slot-scope="scope">
            <div v-if="scope.row.isUpload == 1" style="color:green;">已上传</div>
            <div v-else>未上传</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="from.pagenum"
        :page-sizes="[5, 9, 13]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tatal"
      ></el-pagination>
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
      // 出入口信息列表
      crkxxList: [],
      // 搜索框关键字
      from: {
        crkmc: '',
        lx: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      tatal: 0,
      // 表格选中的数量
      crkxxListNum: [],
      //   控制全屏跟小屏的切换
      screen: 1,
      // 控制搜索框的显示与隐藏
      searchBlock: false,
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
    // 获取出入口信息列表
    this.handleCRKXXList()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.crkxx
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
    // 获取出入口信息列表
    async handleCRKXXList() {
      let res = await this.$http.get('/crk/cxcrk.do', { params: this.from })
      // console.log(res)
      this.crkxxList = res.data.data
      this.tatal = res.data.totalCount
    },
    // 点击搜索
    handleCRKXXSearch() {
      this.handleCRKXXList()
    },
    // 点击增加
    handleAddcrk() {
      this.$router.push({ path: 'crktj' })
    },
    // 点击删除
    async handleDeletecrk() {
      let Arrid = []
      for (var i = 0; i < this.crkxxListNum.length; i++) {
        Arrid.push(this.crkxxListNum[i].crk_id)
      }
      Arrid = Arrid + ''
      let res = await this.$http.post(`/crk/sccrk.do?Arrid=${Arrid}`)
      // console.log(res)
      // console.log(this.crkxxListNum)
      let self = this
      if (res.data.data.length > 1) {
        for (var i = 0; i < res.data.data.length; i++) {
          let index = this.crkxxListNum.findIndex(
            (v) => v.crk_id == res.data.data[i].crk_id
          )
          if (res.data.data[i].msg == '该小区删除成功') {
            await this.$message.success(
              `${self.crkxxListNum[index].crkmc}：删除成功`
            )
          } else {
            await this.$message.warning(
              `${self.crkxxListNum[index].crkmc}：删除失败`
            )
          }
        }
      } else {
        let index = this.crkxxListNum.findIndex(
          (v) => v.crk_id == res.data.data.crk_id
        )
        if (res.data.data.msg == '该小区删除成功') {
          await this.$message.success(
            `${self.crkxxListNum[index].crkmc}：删除成功`
          )
        } else {
          await this.$message.warning(
            `${self.crkxxListNum[index].crkmc}：删除失败`
          )
        }
      }
      this.handleCRKXXList()
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
      if (this.screen % 2 == 0) {
        this.$refs.crkxx.style.position = 'static'
        this.screen++
      } else {
        this.$refs.crkxx.style.width = '100%'
        this.$refs.crkxx.style.height = '100%'
        this.$refs.crkxx.style.position = 'absolute'
        this.$refs.crkxx.style.top = '0'
        this.$refs.crkxx.style.left = '0'
        this.$refs.crkxx.style.zIndex = '10'
        this.$refs.crkxx.style.background = '#fff'
        this.screen++
      }
    },
    // 表格选中的事件
    handleChange(value) {
      this.crkxxListNum = value
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.from.pagesize = newSize
      this.handleCRKXXList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.from.pagenum = newPage
      this.handleCRKXXList()
    },
    // 搜索框失去焦点事件
    handleBlur() {
      this.handleCRKXXList()
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
.crkxx_wrap {
  width: 1671px;
  // height: 700px;
  margin: 45px 20px 0 20px;
  box-shadow: 0 0.01041667rem 0.02083333rem rgba(0, 0, 0, 0.12),
    0 0 0.03125rem rgba(0, 0, 0, 0.04);
  .crkxx_wrap_input {
    height: 58px;
    width: 100%;
    display: flex;
    padding: 7px 0 9px 0;
    border-bottom: 1px solid #eeeeee;
    .crkxx_wrap_input1 {
      width: 218px;
      height: 40px;
      margin: 0 13px 0 10px;

      .crkxx_wrap_input1_inp {
        width: 100%;
        height: 100%;
        .el-input__inner {
          width: 100%;
          height: 100%;
        }
      }
    }
    .el-input__icon {
      line-height: 40px;
    }
    .crkxx_wrap_input2 {
      width: 194px;
      height: 40px;
      margin: 0 13px 0 0;
      .crkxx_wrap_input2_sel {
        height: 100%;
        width: 100%;
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
    .crkxx_search {
      cursor: pointer;
      width: 89px;
      height: 40px;
      background: #45a0fd;
      color: #fff;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      margin: 0 0 0 0;
    }
  }
  .function_wrap {
    width: 100%;
    height: 60px;
    display: flex;
    .function_wrap_left {
      display: flex;
      height: 60px;
      align-items: center;
      font-size: 14px;
      .function_wrap_left_add {
        cursor: pointer;
        height: 40px;
        width: 93px;
        margin-left: 30px;
        line-height: 40px;
        background: #409efe;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
      }
      .function_wrap_left_up {
        cursor: pointer;
        width: 140px;
        height: 40px;
        margin: 0 14px 0 13px;
        line-height: 40px;
        border: 1px solid #dedee8;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: center;
        color: #626367;
      }
      .function_wrap_left_dele {
        cursor: pointer;
        width: 70px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dedee8;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: center;
      }
    }
    .function_center_text {
      margin-left: 21px;
      display: flex;
      align-items: center;
      color: #9a9a9a;
      letter-spacing: 2px;
    }
    .function_right_button {
      margin-left: 750px;
      height: 60px;
      align-items: center;
      display: flex;
      .right_but {
        cursor: pointer;
        width: 54px;
        height: 38px;
        box-sizing: border-box;
        border: 1px solid #dedee6;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        &:nth-child(1) {
          border-radius: 10px 0 0 10px;
        }
        &:nth-child(3) {
          border-radius: 0 10px 10px 0;
        }
        .right_but_img {
          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
      el-pagination {
        background: #fff;
        height: 50px;
        padding: 11px 0 10px 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>