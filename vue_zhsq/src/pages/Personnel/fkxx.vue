<template>
  <div ref="fkxx">
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
    <!-- 访客信息 -->
    <div class="fkxx_wrap">
      <div v-if="!searchBlock"></div>
      <div v-else>
        <div class="fkxx_wrap_from">
          <!-- 表单 -->
          <el-form class="fkxx_wrap_From_wrap" ref="form" :model="form">
            <!-- 小区信息 -->
            <el-form-item class="fkxx_wrap_xqxx">
              <el-select placeholder="请选择小区" v-model="form.xqmc" clearable @clear="clearXQ">
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
              <el-input placeholder="请输入姓名" v-model="form.fkxm"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item class="zhxx_sjh_wrap">
              <el-input placeholder="请收入手机号" v-model="form.sjhm"></el-input>
            </el-form-item>
            <!-- 选择状态 -->
            <el-form-item class="fkxx_zt_xqxx">
              <el-select placeholder="请选择状态" v-model="zt" clearable @clear="clearZT">
                <el-option label="未启用" value="0|3"></el-option>
                <el-option label="已启用/已放行状态" value="1|1"></el-option>
                <el-option label="已启用/未放行状态" value="1|0"></el-option>
              </el-select>
            </el-form-item>
            <!-- 预约起始时间 -->
            <!-- <el-date-picker v-model="form.yyqssj" type="date" placeholder="选择预约起始时间"></el-date-picker> -->
            <!-- 预约截止时间 -->
            <!-- <el-date-picker class="jzData" v-model="form.yyjzsj" type="date" placeholder="选择预约截止时间"></el-date-picker> -->
            <!-- {{form.yyqssj}} -->
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="yyData"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="el-icon-search fkxx_search" @click="handleFKXXsearch">搜索</div>
          </el-form>
        </div>
      </div>
      <div class="fkxx_wrap_content">
        <div class="fkxx_wrap_content_title">
          <div class="fkxx_wrap_content_title_text">住户信息</div>
        </div>
        <div class="fkxx_wrap_content_content">
          <div class="zhxx_content_content_but">
            <div class="but_wrap">
              <div class="el-icon-plus addBut" @click="handleAddZH">增加</div>
              <div class="el-icon-delete deleteBut" @click="handleDeleteZH">删除</div>
              <div class="zhuceBut" @click="handleAddPic">授权/取消</div>
              <div class="putBut">上传人员</div>
              <div class="jihuoBut" @click="handleJHZH">取消预约来访</div>
              <div class="xz_wrap">{{tableList.length}}个中{{tableNum.length}}个被选</div>
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
            :data="tableList"
            style="width: 100%"
            stripe
            :header-cell-style="{color:'#44a0f7' ,background:'#f6f6f6'}"
            border
            @selection-change="handleChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="xqmc" label="小区名称"></el-table-column>
            <el-table-column prop="fkxm" label="姓名"></el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">
                <div v-if="scope.row.fkxbdm == 1">男</div>
                <div v-else>女</div>
              </template>
            </el-table-column>
            <el-table-column label="身份证号码" width="220px">
              <template slot-scope="scope">
                <div>{{`**************${scope.row.fksfzhm.substr(-4,4)}`}}</div>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" width="150px">
              <template slot-scope="scope">
                <div>{{scope.row.fksjhm.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/,"$1****$3")}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="yylfqssj.time"
              :formatter="formatDate"
              label="预约来访起始时间"
              width="190px"
            ></el-table-column>
            <el-table-column
              prop="yylfjzsj.time"
              :formatter="formatDate"
              label="预约来访截止时间"
              width="190px"
            ></el-table-column>
            <el-table-column prop="fwdd" label="访问地点" width="120px"></el-table-column>
            <el-table-column label="是否上传">
              <template slot-scope="scope">
                <div v-if="scope.row.isUpload == 1" style="color:green;">已上传</div>
                <div v-else>未上传</div>
              </template>
            </el-table-column>
            <el-table-column label="预约/授权状态" width="150px">
              <template slot-scope="scope">
                <div style="display:flex;">
                  <div>
                    <div v-if="scope.row.yyzt == 0">未启用</div>
                    <div v-else>已启用</div>
                  </div>
                  <div>/</div>
                  <div>
                    <div v-if="scope.row.sqzt == 0">未放行</div>
                    <div v-else>已放行</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdz" label="详情" width="130px">
              <template slot-scope="scope">
                <div class="zcBox" @click="handleAddCart(scope.row.fksfzhm)">查看</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.currPageNo"
            :page-sizes="[5, 10, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tatal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 访客历史信息弹出框 -->
    <el-dialog
      class="fklszl_Dialog"
      title="来访历史资料"
      :visible.sync="FXLSZLDialogVisible"
      width="50%"
      :before-close="fxlszlHandleClose"
    >
      <span class="fxlszl_wrap_span">
        <div class="lszl_wrap" v-for="(item,index) in fklsxx" :key="index">
          <!-- 序号 -->
          <div class="yyr_wrap">
            <div class="yyr_wrap_title">序号：</div>
            <div class="yyr_wrap_text">{{item.fkId}},</div>
          </div>
          <!-- 预约人 -->
          <div class="yyr_wrap">
            <div class="yyr_wrap_title">预约人：</div>
            <div class="yyr_wrap_text">{{item.fkxm}},</div>
          </div>
          <!-- 来访地点 -->
          <div class="yyr_wrap">
            <div class="yyr_wrap_title">来访地点：</div>
            <div class="yyr_wrap_text">{{item.fwdd}},</div>
          </div>
          <!-- 预约时间 -->
          <div class="yyr_wrap">
            <div class="yyr_wrap_title">预约时间：</div>
            <div
              class="yyr_wrap_text"
            >{{lszlDataFrom(item.yylfqssj.time)}}到{{lszlDataFrom(item.yylfqssj.time)}}</div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FXLSZLDialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
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
      //   下拉小区列表
      xqList: [],
      //   状态
      zt: '',
      //   搜索表单
      form: {
        xqmc: '',
        fkxm: '',
        sjhm: '',
        yyzt: '',
        sqzt: '',
        currPageNo: 1,
        pageSize: 5,
        yyqssj: '',
        yyjzsj: '',
      },
      // 预约时间
      yyData: '',
      // 控制搜索框的显示与隐藏
      searchBlock: false,
      //   控制全屏跟小屏的切换
      screen: 1,
      tatal: 0,
      //   表格数据
      tableList: [],
      // 表格选中的数量
      tableNum: [],
      // 访客历史信息
      fklsxx: [],
      // 控制来访历史资料的弹出框显示
      FXLSZLDialogVisible: false,
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
    // 获取表格列表
    this.handleFKList()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.fkxx
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
      this.xqList = res.data
    },
    // 获取表格数据
    async handleFKList() {
      let res = await this.$http.get('/fk/selFangKe.do', { params: this.form })
      // console.log(res)
      let tatol = res.data[res.data.length - 1]
      this.tatal = Number(tatol.totalCount)
      res.data.splice(res.data.length - 1, 1)
      this.tableList = res.data
    },
    // 点击搜索
    handleFKXXsearch() {
      // console.log(typeof this.form.yyqssj == 'number')
      // console.log(this.form.yyjzsj)
      // if (
      //   (this.form.yyqssj == '' || this.form.yyqssj == null) &&
      //   (this.form.yyjzsj == null || this.form.yyjzsj == '')
      // ) {
      // } else {
      //   if (
      //     (this.form.yyqssj == '' || this.form.yyqssj == null) &&
      //     (this.form.yyjzsj !== '' || this.form.yyjzsj !== null)
      //   ) {
      //     console.log('有截止时间---没有起始时间')
      //     if (typeof this.form.yyjzsj !== 'number') {
      //       this.form.yyjzsj = this.form.yyjzsj.getTime()
      //     } else {
      //     }
      //   } else if (
      //     (this.form.yyjzsj == '' || this.form.yyjzsj == null) &&
      //     (this.form.yyqssj !== '' || this.form.yyqssj !== null)
      //   ) {
      //     if (typeof this.form.yyqssj !== 'number') {
      //       this.form.yyqssj = this.form.yyqssj.getTime()
      //     } else {
      //     }
      //   } else if (
      //     (this.form.yyjzsj !== '' || this.form.yyjzsj !== null) &&
      //     (this.form.yyqssj !== '' || this.form.yyqssj !== null)
      //   ) {
      //     if (
      //       typeof this.form.yyjzsj == 'object' &&
      //       typeof this.form.yyqssj == 'object'
      //     ) {
      //       this.form.yyjzsj = this.form.yyjzsj.getTime()
      //       this.form.yyqssj = this.form.yyqssj.getTime()
      //     } else if (
      //       typeof this.form.yyjzsj == 'number' &&
      //       typeof this.form.yyqssj == 'number'
      //     ) {
      //     }
      //   }
      // }
      this.form.yyqssj = this.yyData[0]
      this.form.yyjzsj = this.yyData[1]
      this.form.yyzt = this.zt.split('|')[0]
      this.form.sqzt = this.zt.split('|')[1]
      this.handleFKList()
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
      // console.log(this.$refs.fkxx)
      if (this.screen % 2 == 0) {
        this.$refs.fkxx.style.position = 'static'
        this.screen++
      } else {
        this.$refs.fkxx.style.width = '100%'
        this.$refs.fkxx.style.height = '100%'
        this.$refs.fkxx.style.position = 'absolute'
        this.$refs.fkxx.style.top = '0'
        this.$refs.fkxx.style.left = '0'
        this.$refs.fkxx.style.zIndex = '10'
        this.$refs.fkxx.style.background = '#fff'
        this.screen++
      }
    },
    // 点击增加
    handleAddZH() {
      this.$router.push({ path: 'fkzj' })
    },
    // 点击删除
    async handleDeleteZH() {
      if (this.tableNum.length == 0) {
        this.$message.warning('请至少选择一名访客')
        return
      } else {
        let fkidList = []
        for (var i = 0; i < this.tableNum.length; i++) {
          fkidList.push(this.tableNum[i].fkId)
        }
        Qs.stringify({ fkidList: fkidList }, { arrayFormat: 'repeat' })
        let res = await this.$http.post('/fk/delFangKeBatch.do', fkidList)
        if (res.data.msg == 200) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.handleFKList()
      }
    },
    // 点击授权取消
    async handleAddPic() {
      if (this.tableNum.length == 0) {
        this.$message.warning('请至少选择一名访客')
        return
      } else {
        let fkidList = []
        for (var i = 0; i < this.tableNum.length; i++) {
          fkidList.push(this.tableNum[i].fkId)
        }
        Qs.stringify({ fkidList: fkidList }, { arrayFormat: 'repeat' })
        let res = await this.$http.post('/fk/updAuthorize.do', fkidList)
        if (res.data.msg == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
        this.handleFKList()
      }
    },
    // 点击取消预约来访
    async handleJHZH() {
      if (this.tableNum.length == 0) {
        this.$message.warning('请至少选择一名访客')
        return
      } else {
        let fkidList = []
        for (var i = 0; i < this.tableNum.length; i++) {
          fkidList.push(this.tableNum[i].fkId)
        }
        Qs.stringify({ fkidList: fkidList }, { arrayFormat: 'repeat' })
        let res = await this.$http.post('/fk/updReservation.do', fkidList)
        if (res.data.msg == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
        this.handleFKList()
      }
    },
    // 表格选中的事件
    handleChange(value) {
      this.tableNum = value
    },
    formatDate(row, column, cellValue, index) {
      if (cellValue == null || cellValue == '') return ''
      let date = new Date(parseInt(cellValue)) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '-'
          : date.getMonth() + 1 + '-'
      let D =
        date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h =
        date.getHours() < 10
          ? '0' + date.getHours() + ':'
          : date.getHours() + ':'
      let m =
        date.getMinutes() < 10
          ? '0' + date.getMinutes() + ':'
          : date.getMinutes()
      return Y + M + D + h + m
    },
    lszlDataFrom(time) {
      let datas = new Date(time)
      let y = datas.getFullYear()
      let MM = datas.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = datas.getDate()
      d = d < 10 ? '0' + d : d
      let h = datas.getHours()
      h = h < 10 ? '0' + h : h
      let m = datas.getMinutes()
      m = m < 10 ? '0' + m : m
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    },
    // 查看
    async handleAddCart(fksfzhm) {
      // console.log(fksfzhm)
      let res = await this.$http.get(
        `/fk/selFangKeHistory.do?fksfzhm=${fksfzhm}`
      )
      console.log(res)
      this.fklsxx = res.data
      this.FXLSZLDialogVisible = true
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.form.pageSize = newSize
      this.handleFKList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.form.currPageNo = newPage
      this.handleFKList()
    },
    fxlszlHandleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 小区点击清空
    clearXQ() {
      this.form.yyzt = this.zt.split('|')[0]
      this.form.sqzt = this.zt.split('|')[1]
      this.handleFKList()
    },
    // 状态点击清空
    clearZT() {
      this.form.yyzt = this.zt.split('|')[0]
      this.form.sqzt = this.zt.split('|')[1]
      this.handleFKList()
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
.fkxx_wrap {
  width: 1628px;
  //   height: 600px;
  margin: 42px 40px 0 40px;
  overflow: hidden;
  .fkxx_wrap_from {
    width: 100%;
    height: 36px;
    margin: 15px 0;
    .fkxx_wrap_From_wrap {
      display: flex;
      .fkxx_wrap_xqxx {
        width: 200px;
        height: 36px;
        margin: 0 0 12px 0;
        .el-form-item__content {
          line-height: 1;
          width: 100%;
          height: 100%;
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
        margin: 0 0 0 12px;
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
      .zhxx_sjh_wrap {
        width: 110px;
        height: 36px;
        margin: 0 0 0 12px;
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
      .fkxx_zt_xqxx {
        width: 200px;
        height: 36px;
        margin: 0 12px 0 12px;
        .el-form-item__content {
          line-height: 1;
          width: 100%;
          height: 100%;
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
      .el-date-editor {
        height: 36px;
        width: 230px;
        .el-input__inner {
          width: 100%;
          height: 100%;
        }
        .el-input__icon {
          line-height: 28px;
        }
        .el-range-separator {
          line-height: 28px;
          padding: 0 5px;
          font-size: 12px;
          width: 12%;
        }
      }
      .jzData {
        margin: 0 15px;
      }
      .fkxx_search {
        width: 90px;
        height: 36px;
        background: #409efe;
        color: #fff;
        text-align: center;
        line-height: 36px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin: 0 0 0 15px;
      }
    }
  }
  .fkxx_wrap_content {
    // width: 1630px;
    // height: 500px;
    border-radius: 10px;
    border: 1px solid #dbe1d5;
    .fkxx_wrap_content_title {
      width: 100%;
      height: 30px;
      background: #def0d8;
      color: #46703e;
      .fkxx_wrap_content_title_text {
        line-height: 30px;
        margin: 0 0 0 20px;
      }
    }
    .fkxx_wrap_content_content {
      font-size: 14px;
      .zhxx_content_content_but {
        display: flex;
        line-height: 1;
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
            cursor: pointer;
            color: #fff;
          }
          .deleteBut {
            width: 93px;
            height: 40px;
            background: #f46c6c;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
            cursor: pointer;
            color: #fff;
          }
          .zhuceBut {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
            cursor: pointer;
          }
          .putBut {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
            cursor: pointer;
          }
          .jihuoBut {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
            cursor: pointer;
          }
          .txBut {
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #e0dfe4;
            border-radius: 5px;
            margin: 25px 15px 10px 0;
            cursor: pointer;
          }
          .xz_wrap {
            line-height: 40px;
            margin: 25px 15px 10px 0;
          }
        }
        .right_button {
          margin-left: 480px;
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
      .el-pagination {
        white-space: nowrap;
        padding: 2px 5px;
        color: #303133;
        font-weight: 700;
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
  cursor: pointer;
}
.fklszl_Dialog {
  .el-dialog {
    margin-top: 7vh;
    width: 70% !important;
  }
  .el-dialog__header {
    padding: 20px 20px 0 10px;
  }
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .fxlszl_wrap_span {
    .lszl_wrap {
      display: flex;
      .yyr_wrap {
        display: flex;
        margin: 40px 20px 0 0;
        .yyr_wrap_title {
        }
        .yyr_wrap_text {
        }
      }
    }
  }
}
</style>