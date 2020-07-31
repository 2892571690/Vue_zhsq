<template>
  <div ref="fwxxck">
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
    <!-- 房屋信息查看 -->
    <div class="fwxxck_wrap">
      <div class="fwxxck_wrap_title">
        <div class="fwxxck_wrap_title_text">房屋信息查看</div>
      </div>
      <div class="fwxxck_wrap_content">
        <div class="fwxxck_wrap_content_left">
          <div class="xqmc_wrap">
            <div class="xqmc_wrap_title">小区名称:</div>
            <div class="xqmc_wrap_text">{{yzxx.xqmc}}</div>
          </div>
          <div class="xqbm_wrap">
            <div class="xqbm_wrap_title">小区编码:</div>
            <div class="xqbm_wrap_text">{{yzxx.xqbm}}</div>
          </div>
          <div class="ldh_wrap">
            <div class="ldh_wrap_title">楼栋号:</div>
            <div class="ldh_wrap_text">{{yzxx.ldh}}</div>
          </div>
          <div class="dyh_wrap">
            <div class="dyh_wrap_title">单元号:</div>
            <div class="dyh_wrap_text">{{yzxx.dyh}}</div>
          </div>
          <div class="lch_wrap">
            <div class="lch_wrap_title">楼层号:</div>
            <div class="lch_wrap_text">{{yzxx.lch}}</div>
          </div>
          <div class="mph_wrap">
            <div class="mph_wrap_title">门牌号:</div>
            <div class="mph_wrap_text">{{yzxx.mph}}</div>
          </div>
          <div class="fwzt_wrap">
            <div class="fwzt_wrap_title">房屋状态:</div>
            <div v-if="yzxx.fwztdm == 1">
              <div class="fwzt_wrap_text">出租</div>
            </div>
            <div v-else-if="yzxx.fwztdm == 2">
              <div class="fwzt_wrap_text">自住</div>
            </div>
            <div v-else-if="yzxx.fwztdm == 4">
              <div class="fwzt_wrap_text">空置</div>
            </div>
            <div v-else>
              <div class="fwzt_wrap_text">其他</div>
            </div>
          </div>
          <div class="fcyt_wrap">
            <div class="fcyt_wrap_title">房产用途:</div>
            <div class="fcyt_wrap_text">{{yzxx.fwytdm}}</div>
          </div>
          <div class="cqxz_wrap">
            <div class="cqxz_wrap_title">产权性质:</div>
            <div class="cqxz_wrap_text">{{yzxx.cqxzdm}}</div>
          </div>
          <div class="fwmj_wrap">
            <div class="fwmj_wrap_title">房屋面积:</div>
            <div class="fwmj_wrap_text">{{yzxx.fwmj}}平方米</div>
          </div>
          <div class="bz_wrap">
            <div class="bz_wrap_title">备注:</div>
            <div class="bz_wrap_text">{{yzxx.bz}}</div>
          </div>
        </div>
        <div class="fwxxck_wrap_content_center">
          <div class="fzxm_wrap">
            <div class="fzxm_wrap_title">房主姓名:</div>
            <div class="fzxm_wrap_text">{{yzxx.xm}}</div>
            <div class="el-icon-s-fold"></div>
          </div>
          <div class="sfzhm_wrap">
            <div class="sfzhm_wrap_title">身份证号码:</div>
            <div class="sfzhm_wrap_text">{{yzxx.zjhm}}</div>
          </div>
          <div class="sjhm_wrap">
            <div class="sjhm_wrap_title">手机号码:</div>
            <div class="sjhm_wrap_text">{{yzxx.sjhm}}</div>
          </div>
          <div class="jsrs_wrap">
            <div class="jsrs_wrap_title">家属人数:</div>
            <div class="jsrs_wrap_text">{{yzxx.js}}</div>
          </div>
          <div class="zkrs_wrap">
            <div class="zkrs_wrap_title">租客人数:</div>
            <div class="zkrs_wrap_text">{{yzxx.zk}}</div>
          </div>
          <div class="rzrylb_wrap">
            <div class="rzrylb_wrap_title">入住人员列表:</div>
            <div class="rzrylb_wrap_text" v-for="(item,index) in yzxx.rzrylb" :key="index">
              <div class="rzrylb_wrap_text_ren1">{{index+1}}.</div>
              <div class="rzrylb_wrap_text_ren2">{{item.xm}}，</div>
              <div class="rzrylb_wrap_text_ren3">{{item.xbdm}}，</div>
              <div class="rzrylb_wrap_text_ren4">{{item.zjhm}}，</div>
              <div class="rzrylb_wrap_text_ren5">{{item.yhzgxdm}}</div>
            </div>
          </div>
        </div>
        <div class="fwxxck_wrap_content_img">
          <img src="../../assets/logo.png"/>
        </div>
      </div>
      <div class="fanhui" @click="handleGoBlack">返回</div>
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
      // 业主证件号码
      yzzjhm: '',
      // 业主信息
      yzxx: {},
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
    // console.log(this.$route.query.yzzjhm)
    this.yzzjhm = this.$route.query.yzzjhm
    // 查看业主的信息
    this.handleckfwxx()
  },
  mounted() {
    // 放大
    this.refDome = this.$refs.fwxxck
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
    // 查看信息
    async handleckfwxx() {
      // let res = await this.$http.get(`/fw/selFangWo.do?zjhm=${this.yzzjhm}`)
      let res = await this.$http.get('/fw/cxfwxx.do?zjhm=34040620010903383X')
      console.log(res)
      this.yzxx = res.data.data
    },
    // 点击返回
    handleGoBlack(){
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="less" scoped>
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
.fwxxck_wrap {
  width: 1085px;
  // height: 732px;
  border-radius: 10px;
  border: 1px solid #dfe0da;
  margin: 60px 330px 0 290px;
  .fwxxck_wrap_title {
    width: 100%;
    height: 50px;
    background: #def0d8;
    .fwxxck_wrap_title_text {
      font-size: 14px;
      color: #4a6844;
      margin: 0 0 0 45px;
      line-height: 50px;
    }
  }
  .fwxxck_wrap_content {
    width: 100%;
    display: flex;
    height: 655px;
    .fwxxck_wrap_content_left {
      width: 382px;
      height: 571px;
      margin: 32px 0 0 100px;
      .xqmc_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .xqmc_wrap_title {
          color: #5f6460;
        }
        .xqmc_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .xqbm_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .xqbm_wrap_title {
          color: #5f6460;
        }
        .xqbm_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .ldh_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .ldh_wrap_title {
          color: #5f6460;
          margin: 0 0 0 18px;
        }
        .ldh_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .dyh_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .dyh_wrap_title {
          color: #5f6460;
          margin: 0 0 0 18px;
        }
        .dyh_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .lch_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .lch_wrap_title {
          color: #5f6460;
          margin: 0 0 0 18px;
        }
        .lch_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .mph_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .mph_wrap_title {
          color: #5f6460;
          margin: 0 0 0 18px;
        }
        .mph_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .fwzt_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .fwzt_wrap_title {
          color: #5f6460;
        }
        .fwzt_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .fcyt_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .fcyt_wrap_title {
          color: #5f6460;
        }
        .fcyt_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .cqxz_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .cqxz_wrap_title {
          color: #5f6460;
        }
        .cqxz_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .fwmj_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .fwmj_wrap_title {
          color: #5f6460;
        }
        .fwmj_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .bz_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 0 0;
        .bz_wrap_title {
          width: 70px;
          color: #5f6460;
        }
        .bz_wrap_text {
          color: #000000;
        }
      }
    }
    .fwxxck_wrap_content_center {
      width: 390px;
      height: 571px;
      margin: 32px 0 0 0;
      .fzxm_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .fzxm_wrap_title {
          color: #5f6460;
          margin: 0 0 0 12px;
        }
        .fzxm_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
        .el-icon-s-fold {
          font-size: 25px;
          margin: 0 0 0 59px;
        }
      }
      .sfzhm_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .sfzhm_wrap_title {
          color: #5f6460;
        }
        .sfzhm_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .sjhm_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .sjhm_wrap_title {
          color: #5f6460;
          margin: 0 0 0 12px;
        }
        .sjhm_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .jsrs_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .jsrs_wrap_title {
          color: #5f6460;
          margin: 0 0 0 12px;
        }
        .jsrs_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .zkrs_wrap {
        display: flex;
        font-size: 14px;
        margin: 0 0 30px 0;
        .zkrs_wrap_title {
          color: #5f6460;
          margin: 0 0 0 12px;
        }
        .zkrs_wrap_text {
          margin: 0 0 0 22px;
          color: #000000;
        }
      }
      .rzrylb_wrap {
        font-size: 14px;
        margin: 0 0 30px 0;
        .rzrylb_wrap_title {
          color: #5f6460;
          margin: 0 0 13px 12px;
        }
        .rzrylb_wrap_text {
          display: flex;
          font-size: 16px;
          color: #000000;
          line-height: 28px;
          .rzrylb_wrap_text_ren1{
            margin: 0 0 0 17px;
          }
          .rzrylb_wrap_text_ren2{}
          .rzrylb_wrap_text_ren3{}
          .rzrylb_wrap_text_ren4{}
          .rzrylb_wrap_text_ren5{}
        }
      }
    }
    .fwxxck_wrap_content_img {
      width: 151px;
      height: 193px;
      margin: 32px 0 0 0;
    }
  }
}
.fanhui{
  width: 190px;
  height: 34px;
  background: #5bc0de;
  color: #fff;
  line-height: 34px;
  text-align: center;
  position: absolute;
  left: 955px;
  bottom: 50px;
  border-radius: 10px;
}
</style>