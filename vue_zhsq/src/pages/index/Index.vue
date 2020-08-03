<template>
  <div ref="index">
    <!-- 操作栏区域 -->
    <Title :refDome="refDome"></Title>
    <!-- 导航栏区域 -->
    <div v-if="breadcrumb.length == 1">
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
    </div>
    <div v-else>
      <div class="breadcrumb_wrap">
        <div class="breadcrumb_img">
          <img :src="breadcrumb[1]" />
        </div>
        <div class="breadcrumb_text">{{breadcrumb[0]}}</div>
        <div class="cha" @click="handleGoIndex">x</div>
      </div>
      <div class="tou"></div>
      <div class="tou_img">
        <img src="../../assets/tou.png" />
      </div>
    </div>

    <!-- 新闻卡片区域 -->
    <el-card class="box-card">
      <div class="leftNews">
        <div class="newAray" v-for="item in leftNewList" :key="item.id">
          <div class="text_title_wrap">
            <div class="text_square"></div>
            <div class="Hot" v-if="item.ishot == 1">
              <img :src="item.pic" />
            </div>
            <div v-else></div>
            <div class="newAray_title">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="rightNews">
        <div class="rightNews_wrap" v-for="item in rightNewsList" :key="item.id">
          <div class="rightNews_img">
            <img :src="item.pic" />
          </div>
          <div class="rightNews_text">{{item.title}}</div>
        </div>
      </div>
    </el-card>
    <div class="b">
      <!-- 快捷操作卡片区域 -->
      <div class="quick_edition_wrap">
        <div class="quick_wrap">
          <div class="quick_title_wrap">
            <div class="quick_title_img">
              <img src="../../assets/link.png" />
            </div>
            <div class="quick_title_text">快捷操作</div>
          </div>
          <div class="quick_content_wrap">
            <div class="quick_content_box" v-for="item in QuickList" :key="item.id">
              <div class="quick_content_box_img">
                <img :src="item.picUrl" />
              </div>
              <div class="quick_content_box_text">{{item.kjName}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 版本卡片区域 -->
      <div class="edition_box">
        <!-- 版本 -->
        <div class="edition_card">
          <div class="edition_title">
            <div class="edition_s_wrap">
              <div class="s_img">
                <img src="../../assets/s.png" />
              </div>
              <div class="edition_text">版本</div>
            </div>
            <div class="report_wrap">报告问题</div>
          </div>
          <div class="banben_wrap">
            <div class="dangqian">当前:</div>
            <div class="oldbanben">v2.6.1</div>
            <div class="zuixin_wrap">
              <div class="zuixin_img">
                <img src="../../assets/top.png" />
              </div>
              <div class="zuixin_text">最新:</div>
            </div>
            <div class="newbanben_wrap">v2.6.1</div>
          </div>
          <div class="Official_website">
            <div class="Official_website_wrap">
              <div class="Official_website_img">
                <img src="../../assets/label.png" />
              </div>
              <div class="Official_website_text">访问官网</div>
            </div>
          </div>
          <div class="Official_website" style="margin-bottom:53px;">
            <div class="Official_website_wrap">
              <div class="Official_website_img">
                <img src="../../assets/label.png" />
              </div>
              <div class="Official_website_text">访问论坛</div>
            </div>
          </div>
        </div>
        <!-- THRTECH -->
        <div class="thrtect_wrap">
          <div class="thrtect_wrap_img">
            <img src="../../assets/th.png" />
          </div>
          <div class="thrtect_wrap_title">技术研发：安徽三拓智能科技有限公司</div>
          <div class="thrtect_wrap_text">客服热线：0551—63802018</div>
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
      refDome: null,
      // 面包屑
      breadcrumb: [],
      //   左边的新闻列表
      leftNewList: [],
      // 右边的新闻列表
      rightNewsList: [],
      // 快捷操作列表
      QuickList: [],
    }
  },
  created() {
    // 获取新闻列表
    this.handleNewList()
    // 获取快捷操作列表
    this.handleQuickList()
    if (this.$route.query.breadcrumb) {
      if(this.$route.query.breadcrumb.length == 1){
        this.breadcrumb = this.$route.query.breadcrumb
      }else{
        let breadcrumb = this.$route.query.breadcrumb.split(',')
        let breadcrumb5 = breadcrumb[0]
        let breadcrumb6 = breadcrumb[1]+','+breadcrumb[2]
        let breadcrumb7 = [breadcrumb5,breadcrumb6]
        this.breadcrumb = breadcrumb7
      }
    } else {
      let breadcrumb = window.sessionStorage.getItem('breadcrumb')
      let breadcrumb5 = breadcrumb.split(',')[0]
      let breadcrumb6 = `${breadcrumb.split(',')[1]},${
        breadcrumb.split(',')[2]
      }`
      let breadcrumb7 = breadcrumb.split(',')[3]
      let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb7]
      this.breadcrumb = [breadcrumb8]
    }
  },
  mounted() {
    this.refDome = this.$refs.index
  },
  methods: {
    //   点击面包屑的x事件
    handleGoIndex() {
      this.$router.push({ path: 'index' })
    },
    // 获取新闻列表
    async handleNewList() {
      let res = await this.$http.get('/sy/content.do')
      // console.log(res)
      this.leftNewList = res.data.data
      this.rightNewsList = res.data.dataArray
    },
    // 获取快捷操作列表
    async handleQuickList() {
      let res = await this.$http.get('/sy/getshortcut.do')
      this.QuickList = res.data.message
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
.box-card {
  width: 1680px;
  height: 350px;
  margin-left: 10px;
  .leftNews {
    float: left;
    margin-top: 20px;
    width: 660px;
    .newAray {
      color: #292929;
      &:nth-child(4) {
        color: #e75a2e;
      }
      &:nth-child(6) {
        color: #d31050;
      }
      .text_title_wrap {
        display: flex;
        align-items: center;
        .text_square {
          width: 2px;
          height: 2px;
          background-color: #292929;
          margin-right: 6px;
        }
        .newAray_title {
          font-size: 14px;
          line-height: 32px;
          width: 660px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .Hot {
          width: 22px;
          height: 11px;
          margin-right: 9px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
  .rightNews {
    width: 965px;
    float: left;
    margin-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
    .rightNews_wrap {
      height: 126px;
      display: flex;
      &:nth-child(2) {
        margin-top: 36px;
      }
      .rightNews_img {
        height: 126px;
        width: 194px;
        margin-right: 31px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightNews_text {
        font-size: 14px;
        color: #292929;
        width: 743px;
        line-height: 25px;
        padding-right: 10px;
        box-sizing: border-box;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.b {
  width: 1690px;
}
.quick_edition_wrap {
  float: left;
  width: 1250px;
  margin-top: 21px;
  margin-left: 10px;
  margin-bottom: 34px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .quick_wrap {
    width: 1261px;
    .quick_title_wrap {
      width: 100%;
      height: 54px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeecf9;
      .quick_title_img {
        width: 14px;
        height: 14px;
        margin-right: 13px;
        margin-left: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .quick_title_text {
        font-size: 16px;
        color: #313133;
      }
    }

    .quick_content_wrap {
      .quick_content_box {
        float: left;
        width: 104px;
        height: 99px;
        margin-right: 28px;
        margin-bottom: 17px;
        box-sizing: border-box;
        padding: 5px;
        .quick_content_box_img {
          width: 100%;
          height: 75px;
          padding: 10px;
          box-sizing: border-box;
          img {
            height: 100%;
            width: 100%;
          }
        }

        .quick_content_box_text {
          height: 24px;
          font-size: 16px;
          color: #676767;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
.edition_box {
  float: left;
  width: 406px;
  margin: 21px 0 34px 15px;
  .edition_card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .edition_title {
      width: 100%;
      height: 58px;
      // background: red;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececf6;
      .edition_s_wrap {
        display: flex;
        height: 100%;
        align-items: center;
        .s_img {
          width: 11px;
          height: 15px;
          margin: 0 6px 0 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .edition_text {
          font-size: 16px;
          color: #303030;
        }
      }

      .report_wrap {
        font-size: 14px;
        color: #3b9efc;
        margin-right: 22px;
      }
    }
    .banben_wrap {
      width: 100%;
      display: flex;
      font-size: 16px;
      color: #1bb495;
      margin: 21px 0 0 0;
      .dangqian {
        margin: 0 20px 0 91px;
        color: #303030;
      }

      .oldbanben {
      }

      .zuixin_wrap {
        display: flex;
        .zuixin_img {
          width: 10px;
          height: 12px;
          margin: 0 3px 0 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .zuixin_text {
          margin: 0 12px 0 0;
        }
      }

      .newbanben_wrap {
      }
    }
    .Official_website {
      height: 38px;
      width: 363px;
      border: 1px solid #dfddea;
      display: flex;
      justify-content: center;
      margin: 11px 0 0 0;
      border-radius: 10px;
      .Official_website_wrap {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        .Official_website_img {
          width: 18px;
          height: 14px;
          margin: 0 11px 0 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .Official_website_text {
          font-size: 14px;
          color: #616065;
        }
      }
    }
  }

  .thrtect_wrap {
    .thrtect_wrap_img {
      width: 172px;
      height: 42px;
      margin: 48px 0 35px 91px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .thrtect_wrap_title {
      margin-left: 22px;
    }
    .thrtect_wrap_text {
      margin-left: 22px;
      margin-top: 11px;
    }
  }
}
</style>