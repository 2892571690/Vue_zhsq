<template>
  <div ref="ldxx">
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
              v-model="queryInfo.ldh"
              placeholder="搜索楼栋号"
              class="input-with-select"
            ></el-input>
            <div class="search_but el-icon-search" @click="handleList">搜索</div>
          </div>
        </div>

        <!-- 功能键 -->
        <div class="left_button">
          <div class="left_button_wrap">
            <div class="increase_but el-icon-plus" type="primary" @click="handleAddxqxx">增加</div>
            <div class="uploadXQ">上传楼栋</div>
            <div class="uploadXQ">上传房屋</div>
            <div class="delent_but" @click="handleDelete">删除楼栋</div>
            <div class="uploadXQ" @click="handleplzj">批量增加</div>
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
          <el-table-column prop="ldh" label="楼栋号"></el-table-column>
          <el-table-column prop="xqmc" label="小区名称"></el-table-column>
          <el-table-column prop="dys" label="单元数"></el-table-column>
          <el-table-column prop="lcs" label="楼层数"></el-table-column>
          <el-table-column prop="hs" label="户数(每层房屋数量)"></el-table-column>
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
      // 搜索框输入的字
      inputValue: '',
      // 表格数据
      tableList: [],
      // 表格选中的数量
      tableNum: [],
      // 获取用户列表的参数对象
      queryInfo: {
        ldh: '',
        // 当前的页数
        currPage: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
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
    // 获取楼栋信息
    this.handleTableList()
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
    // 获取表格数据
    async handleTableList() {
      let res = await this.$http.get('/ld/selLouDong.do', {
        params: this.queryInfo,
      })
      // console.log(res)
      let tatol = res.data[res.data.length - 1]
      res.data.splice(res.data.length - 1, 1)
      this.tableList = res.data
      this.tatal = Number(tatol.totalCount)
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
      this.queryInfo.pageSize = newSize
      this.handleTableList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currPage = newPage
      this.handleTableList()
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
      //   console.log(this.$refs.ldxx)
      if (this.screen % 2 == 0) {
        this.$refs.ldxx.style.position = 'static'
        this.screen++
      } else {
        this.$refs.ldxx.style.width = '100%'
        this.$refs.ldxx.style.height = '100%'
        this.$refs.ldxx.style.position = 'absolute'
        this.$refs.ldxx.style.top = '0'
        this.$refs.ldxx.style.left = '0'
        this.$refs.ldxx.style.zIndex = '10'
        this.$refs.ldxx.style.background = '#fff'
        this.screen++
      }
    },
    // 删除按钮
    async handleDelete() {
      let ldidList = []
      for (var i = 0; i < this.tableNum.length; i++) {
        ldidList.push(this.tableNum[i].ldbm)
      }
      Qs.stringify({ ldidList: ldidList }, { arrayFormat: 'repeat' })
      let res = await this.$http.post('/ld/delLouDong.do?', ldidList)
      console.log(res)
      let self = this
      // if (res.data.msg.length > 1) {
        for (var i = 0; i < res.data.msg.length; i++) {
          let index = self.tableNum.findIndex(
            (v) => v.ldbm == res.data.msg[i].ldbm
          )
          if (res.data.msg[i].mes == '200') {
            await self.$message.success(
              `${self.tableNum[index].xqmc}小区${self.tableNum[index].ldh}楼栋号删除成功`
            )
          } else {
            await self.$message.warning(
              `${self.tableNum[index].xqmc}小区${self.tableNum[index].ldh}楼栋号内有住户导致删除失败`
            )
          }
        }
      // } else {
      //   let index = self.tableNum.findIndex(v => v.ldbm == res.data.msg[0].ldbm)
      //   console.log(res)
      //   if (res.data.msg.mes == '200') {
      //     await self.$message.success(
      //       `${self.tableNum[index].xqmc}小区${self.tableNum[index].ldh}楼栋号删除成功`
      //     )
      //   } else {
      //     await self.$message.warning(
      //       `${self.tableNum[index].xqmc}小区${self.tableNum[index].ldh}楼栋号内有住户导致删除失败`
      //     )
      //   }
      // }
      this.handleTableList()
    },
    // 点击添加按钮
    handleAddxqxx() {
      this.$router.push({ path: 'lczj' })
    },
    // 点击批量增加
    handleplzj() {
      this.$router.push({ path: 'lcplzj' })
    },
    //点击搜索
    handleList() {
      this.handleTableList()
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
      padding: 10px 0;
      border-bottom: 1px solid #eeeeee;
      .input-with-select {
        width: 218px;
        height: 40px;
        margin: 0 0 0 10px;
      }
      .search_but {
        margin-left: 13px;
        padding: 13px;
        background: #409efe;
        color: #fff;
        border-radius: 5px;
      }
    }
    .left_button {
      background: #fff;
      padding: 10px 0;
      display: flex;
      height: 60px;
      box-sizing: border-box;
      .left_button_wrap {
        display: flex;
        height: 40px;
        align-items: center;
        .increase_but {
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
        .uploadXQ {
          width: 98px;
          height: 40px;
          margin: 0 14px 0 13px;
          line-height: 40px;
          border: 1px solid #dedee8;
          border-radius: 10px;
          box-sizing: border-box;
          text-align: center;
        }
        .delent_but {
          width: 70px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #dedee8;
          border-radius: 10px;
          box-sizing: border-box;
          text-align: center;
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
        margin-left: 750px;
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
// .xqxx_wrap .xqxx_card .xqxx_search[data-v-7159484e]{
//     height: none;
//     line-height: none;
// }
</style>