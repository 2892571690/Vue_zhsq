<template>
  <div ref="fwxx">
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
    <!-- 房屋信息 -->
    <div class="fwxx_wrap">
      <div class="fwxx_title_from">
        <!-- 表单 -->
        <el-form ref="form" class="fwxx_from" :model="form">
          <!-- 选择小区 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="xw_Fromitem">
              <el-select placeholder="请选择小区" v-model="form.xqbm" @change="handleOption">
                <el-option
                  v-for="item in xqList"
                  :key="item.xq_id"
                  :label="item.xqmc"
                  :value="item.xqbm"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 楼栋号 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="ldh_Fromitem">
              <el-input placeholder="请输入楼栋号" v-model="form.ldh"></el-input>
            </el-form-item>
          </div>
          <!-- 房间号 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="fjh_Fromitem">
              <el-input placeholder="请输入房间号" v-model="form.mph"></el-input>
            </el-form-item>
          </div>
          <!-- 全部状态 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="qbzt_Fromitem">
              <el-select placeholder="全部状态" v-model="form.isupload">
                <el-option label="未上传" value="0"></el-option>
                <el-option label="已上传" value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 排列方式 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="plfs_Fromitem">
              <el-select placeholder="排列方式(可选)" v-model="form.order">
                <el-option label="门牌号" value="mph"></el-option>
                <el-option label="按单元" value="dyh"></el-option>
                <el-option label="按楼层" value="lch"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 姓名 -->
          <div class="fwxx_box_wrap">
            <el-form-item class="xm_Fromitem">
              <el-input placeholder="请输入业主姓名" v-model="form.xm"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="search_fwxx" @click="handleFWXX">搜索</div>
      </div>
      <div class="fwxx_title_content">
        <div class="fwxx_title_content_title">
          <div class="fwxx_title_content_title_text">{{mrxqmc}}</div>
        </div>
        <div class="fwxx_title_content_content">
          <!-- 楼栋号 -->
          <div class="left_ldh_wrap">
            <div
              class="ld_num_wrap"
              :style="{background: index == isActive? '#3c763c' : '#3b78af'}"
              v-for="(item,index) in ldxxList"
              :key="item.ldbm"
              @click="handleLDdj([item.ldbm,index])"
            >{{item.ldh}}栋</div>
          </div>
          <!-- 门牌号 -->
          <div class="left_ldh_mpl">
            <router-view></router-view>
          </div>
        </div>
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
      //   下拉小区列表
      xqList: [],
      //   下面默认的小区名称
      mrxqmc: '',
      //   默认楼栋编码
      mrldbm: '',
      //   楼栋信息列表
      ldxxList: [],
      //   点击换色
      isActive: 0,
      //   表单输入的内容
      form: {
        xqbm: '',
        ldh: '',
        mph: '',
        isupload: '',
        order: '',
        xm:''
      },
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
    // 获取楼栋信息
    await this.handleLD()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.fwxx
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
      // console.log(res.data)
      this.xqList = res.data
      this.form.xqbm = res.data[0].xqbm
      this.mrxqmc = res.data[0].xqmc
    },
    // 获取楼栋数据
    async handleLD() {
      let res = await this.$http.get(
        `/fw/selLouDongHao.do?xqbm=${this.form.xqbm}`
      )
      if (res.data.length == 0) {
        this.mrldbm = ''
        this.ldxxList = ''
        this.$router.push({
          path: 'mphList',
          query: { bm: [this.form.xqbm, this.mrldbm] },
        })
      } else {
        this.mrldbm = res.data[0].ldbm
        this.ldxxList = res.data
        this.$router.push({
          path: 'mphList',
          query: { bm: [this.form.xqbm, this.mrldbm] },
        })
      }
    },
    // 点击下拉触发的事件
    handleOption(xqmc) {
      let xqList = this.xqList
      let index = xqList.findIndex((v) => Number(v.xqbm) == Number(xqmc))
      this.form.xqbm = xqList[index].xqbm
      this.mrxqmc = xqList[index].xqmc
      this.handleLD()
    },
    // 点击搜索
    async handleFWXX() {
      //   console.log(this.form.ldh)
      if (this.form.ldh == '') {
        this.$router.push({
          path: 'mphList',
          query: {
            bm: [
              this.form.xqbm,
              this.mrldbm,
              this.form.ldh,
              this.form.mph,
              this.form.isupload,
              this.form.order,
              this.form.xm
            ],
          },
        })
      } else {
        // console.log(this.ldxxList)
        let index = this.ldxxList.findIndex(
          (v) => Number(v.ldh) == Number(this.form.ldh)
        )
        // console.log(index)
        this.isActive = index
        this.mrldbm = this.ldxxList[index].ldbm
        this.$router.push({
          path: 'mphList',
          query: {
            bm: [
              this.form.xqbm,
              this.mrldbm,
              this.form.ldh,
              this.form.mph,
              this.form.isupload,
              this.form.order,
            ],
          },
        })
      }
    },
    // 点击楼栋
    handleLDdj(ldbm) {
      this.isActive = ldbm[1]
      this.mrldbm = ldbm[0]
      this.$router.push({
        path: 'mphList',
        query: { bm: [this.form.xqbm, this.mrldbm] },
      })
    },
  },
}
</script>
<style lang="less">
.active {
  background: #3c763c;
}
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
.fwxx_wrap {
  // height: 900px;
  width: 1666px;
  //   background: pink;
  margin: 42px 25px 0 25px;
  overflow: hidden;
  .fwxx_title_from {
    width: 100%;
    height: 36px;
    // background: green;
    margin: 20px 0;
    display: flex;
    // 表单样式
    .fwxx_from {
      display: flex;
      .fwxx_box_wrap {
        .xw_Fromitem {
          width: 200px;
          height: 36px;
          margin: 0 12px 0 15px;
          .el-form-item__content {
            width: 100%;
            height: 100%;
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
        .ldh_Fromitem {
          width: 120px;
          height: 36px;
          margin: 0 10px 0 0;
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
        .fjh_Fromitem {
          width: 120px;
          height: 36px;
          margin: 0 10px 0 0;
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
        .qbzt_Fromitem {
          width: 200px;
          height: 36px;
          margin: 0 12px 0 0;
          .el-form-item__content {
            width: 100%;
            height: 100%;
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
        .plfs_Fromitem {
          width: 200px;
          height: 36px;
          margin: 0 12px 0 0;
          .el-form-item__content {
            width: 100%;
            height: 100%;
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
        .xm_Fromitem {
          width: 130px;
          height: 36px;
          margin: 0 10px 0 0;
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
    .search_fwxx {
      cursor: pointer;
      width: 70px;
      height: 36px;
      background: #409efe;
      color: #fff;
      text-align: center;
      line-height: 36px;
      border-radius: 5px;
      &:hover {
        background: #087cf3;
      }
    }
  }
  .fwxx_title_content {
    width: 1666px;
    // height: 670px;
    border: 1px solid #d5e9c6;
    border-radius: 10px;
    .fwxx_title_content_title {
      width: 100%;
      height: 50px;
      background: #e0efd8;
      color: #41783f;
      .fwxx_title_content_title_text {
        margin: 0 0 0 19px;
        line-height: 50px;
      }
    }
    .fwxx_title_content_content {
      display: flex;
      .left_ldh_wrap {
        width: 274px;
        height: 358px;
        margin: 19px 0 0 11px;
        .ld_num_wrap {
          cursor: pointer;
          width: 76px;
          height: 42px;
          background: #3b78af;
          line-height: 42px;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          margin: 14px 7px;
          float: left;
        }
      }
      .left_ldh_mpl {
        width: 1382px;
      }
    }
  }
}
</style>