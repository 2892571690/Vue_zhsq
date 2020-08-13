<template>
  <div ref="newsList">
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
    </div>
    <!-- 新闻内容 -->
    <div class="newList_wrap">
      <div class="newList_wrap_title">{{newTextList.iname}}</div>
      <div class="newList_wrap_text">{{newTextList.icotent}}</div>
      <div v-if="newTextList.picUrl == '' || newTextList.picUrl == 'null'"></div>
      <div v-else class="newList_wrap_pic">
        <img :src="newTextList.picUrl" />
      </div>
      <div class="black" @click="handleBlack">返 回</div>
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
      //   新闻的id
      newsId: '',
      //   新闻的内容
      newTextList: [],
    }
  },
  created() {
    if (this.$route.query.breadcrumb) {
      if (this.$route.query.breadcrumb.length == 1) {
        this.breadcrumb = this.$route.query.breadcrumb
      } else {
        let breadcrumb = this.$route.query.breadcrumb.split(',')
        let breadcrumb5 = breadcrumb[0]
        let breadcrumb6 = breadcrumb[1] + ',' + breadcrumb[2]
        let breadcrumb7 = [breadcrumb5, breadcrumb6]
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
    this.newsId = this.$route.query.id
    // 获取新闻内容
    this.handleNewsList()
  },
  mounted() {
    this.refDome = this.$refs.newsList
  },
  methods: {
    //   点击面包屑的x事件
    handleGoIndex() {
      this.$router.push({ path: 'index' })
    },
    // 获取新闻详细内容
    async handleNewsList() {
      let res = await this.$http.get(`/sy/getcontentID.do?id=${this.newsId}`)
      console.log(res)
      this.newTextList = res.data.message
    },
    handleBlack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.breadcrumb_wrap {
  cursor: pointer;
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
  width: 91%;
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
  cursor: pointer;
}
.newList_wrap {
  width: 1200px;
  margin: 60px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  .newList_wrap_title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin: 20px 0 30px 0;
    padding: 10px;
  }
  .newList_wrap_text {
    text-indent: 2em;
    font-size: 20px;
    margin: 0 0 30px 0;
    padding: 0 40px;
    position: relative;
  }
  .newList_wrap_pic {
    padding: 0 100px;
  }
  .black {
    width: 100px;
    height: 40px;
    color: #fff;
    background: #5bc0de;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>