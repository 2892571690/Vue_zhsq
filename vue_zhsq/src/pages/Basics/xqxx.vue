<template>
  <div ref="xqxx">
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
    <div class="tou"></div>
    <div class="tou_img">
      <img src="../../assets/tou.png" />
    </div>
    <!-- 小区信息 -->
    <div class="xqxx_wrap">
      <div class="xqxx_card">
        <!-- 搜索框 -->
        <div v-if="!searchBlock"></div>
        <div v-else>
          <div class="xqxx_search">
            <!-- search -->
            <el-input
              clearable
              @blur="handleBlur"
              v-model="queryInfo.xqmc"
              placeholder="搜索小区名称,小区编码"
              class="input-with-select"
            ></el-input>
            <el-button class="search_but" type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </div>

        <!-- 功能键 -->
        <div class="left_button">
          <div class="left_button_wrap">
            <el-button class="increase_but" type="primary" icon="el-icon-plus">增加</el-button>
            <el-button class="uploadXQ">上传小区</el-button>
            <el-button class="delent_but">删除</el-button>
          </div>
          <div class="center_text">{{tableList.length}}个中{{tableNum.length}}个被选</div>
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
          :data="tableList"
          style="width: 100%"
          stripe
          :header-cell-style="{color:'#44a0f7'}"
          border
          @selection-change="handleChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="xqmc" label="小区名称"></el-table-column>
          <el-table-column prop="xqbm" label="小区编码"></el-table-column>
          <el-table-column prop="sqdm" label="社区代码"></el-table-column>
          <el-table-column prop="xxdz" label="详细地址"></el-table-column>
          <el-table-column prop="ssqXzqhdm" label="省市区行政区划编码"></el-table-column>
          <el-table-column label="是否上传">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.isUpload == 1">已上传</el-tag>
              <el-tag type="info" v-else>未上传</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 9, 13]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tatal"
        ></el-pagination>
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
      // 搜索框输入的字
      inputValue: '',
      // 表格数据
      tableList: [],
      // 表格选中的数量
      tableNum: [],
      // 获取用户列表的参数对象
      queryInfo: {
        xqmc: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      tatal: 0,
      // 控制搜索框的显示与隐藏
      searchBlock: false,
      //   控制全屏跟小屏的切换
      screen: 1,
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
    // 获取表格数据
    this.handleTableList()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.xqxx
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
      let breadcrumb5 = breadcrumb.split(',')[4]
      let breadcrumb6 = `${breadcrumb.split(',')[5]},${
        breadcrumb.split(',')[6]
      }`
      let breadcrumb7 = breadcrumb.split(',')[7]
      let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb8]
      let breadcrumb9 = [breadcrumb4, breadcrumb8]
      this.$router.push({ path: 'index', query: { breadcrumb: breadcrumb9 } })
      window.sessionStorage.setItem('breadcrumb', breadcrumb9)
      eventBus.$emit('breadcrumb', breadcrumb9)
    },
    // 获取表格数据
    async handleTableList() {
      let res = await this.$http.get('/xq/xqxx.do', { params: this.queryInfo })
      // console.log(res.data.totalCount)
      this.tableList = res.data.data
      this.tatal = res.data.totalCount
    },
    // 表格选中的事件
    handleChange(value) {
      this.tableNum = value
    },
    // 搜索框市区焦点事件
    handleBlur() {
      this.handleTableList()
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize
      this.handleTableList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage
      this.handleTableList()
    },
    // 点击显示和隐藏
    handleSearchBlock() {
      this.searchBlock = !this.searchBlock
    },
    // 点击刷新
    handleShuxin() {
      location.reload();
    },
    // 点击放大
    handleBig() {
      console.log(this.$refs.xqxx)
      if (this.screen % 2 == 0) {
        this.$refs.xqxx.style.position = 'static'
        this.screen++
      } else {
        this.$refs.xqxx.style.width = '100%'
        this.$refs.xqxx.style.height = '100%'
        this.$refs.xqxx.style.position = 'absolute'
        this.$refs.xqxx.style.top = '0'
        this.$refs.xqxx.style.left = '0'
        this.$refs.xqxx.style.zIndex = '10'
        this.$refs.xqxx.style.background = '#fff'
        this.screen++
      }
    },
  },
}
</script>
<style lang="less" scoped>
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
.xqxx_wrap {
  width: 100%;
  background: #f1f1f1;
  margin: 45px 0 0 0;
  padding: 17px 0 0 0;
  .xqxx_card {
    margin: 0 27px 0 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .xqxx_search {
      width: 100%;
      background: #f8f8f8;
      height: 58px;
      line-height: 58px;
      border-bottom: 1px solid #eeeeee;
      .input-with-select {
        width: 218px;
        height: 40px;
        margin: 0 0 0 10px;
      }
      .search_but {
        margin-left: 13px;
        width: 89px;
        height: 40px;
      }
    }
    .left_button {
      background: #fff;
      padding: 10px 0;
      display: flex;
      height: 60px;
      box-sizing: border-box;
      .left_button_wrap {
        .increase_but {
          height: 40px;
          width: 93px;
          margin-left: 30px;
        }
        .uploadXQ {
          width: 98px;
          height: 40px;
          margin: 0 14px 0 13px;
        }
        .delent_but {
          width: 70px;
          height: 40px;
        }
      }
      .center_text {
        margin-left: 21px;
        display: flex;
        align-items: center;
        color: #9a9a9a;
        letter-spacing: 2px;
      }
      .right_button {
        margin-left: 1000px;
        .right_but {
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
            width: 12px;
            height: 12px;
            .img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .el-pagination {
      background: #fff;
      height: 50px;
      padding: 10px 0 10px 20px;
      box-sizing: border-box;
    }
  }
}
.el-button .el-button {
  padding: 0 !important;
}
</style>