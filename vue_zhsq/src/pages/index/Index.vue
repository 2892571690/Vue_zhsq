<template>
  <div ref="index">
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
      <div class="rightNews"></div>
    </el-card>
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
      //   新闻列表
      leftNewList: [],
    }
  },
  created() {
    let breadcrumb = window.sessionStorage.getItem('breadcrumb')
    let breadcrumb5 = breadcrumb.split(',')[4]
    let breadcrumb6 = `${breadcrumb.split(',')[5]},${breadcrumb.split(',')[6]}`
    let breadcrumb7 = breadcrumb.split(',')[7]
    let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb7]
    this.breadcrumb = [breadcrumb8]
    this.handleNewList()
  },
  mounted() {
    this.refDome = this.$refs.index
  },
  methods: {
    //   点击面包屑的x事件
    handleGoIndex() {
      // console.log(111)
      this.$router.push({ path: 'index' })
    },
    async handleNewList() {
      let res = await this.$http.get('/sy/content.do')
      console.log(res.data)
      this.leftNewList = res.data.data
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
  width: 1687px;
  height: 350px;
  margin-left: 10px;
  .leftNews {
    margin-top: 20px;
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
}
</style>