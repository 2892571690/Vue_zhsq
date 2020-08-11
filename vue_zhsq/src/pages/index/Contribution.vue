<template>
  <div ref="Contribution">
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
  },
  mounted() {
    this.refDome = this.$refs.Contribution
  },
  methods: {
    //   点击面包屑的x事件
    handleGoIndex() {
      this.$router.push({ path: 'index' })
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
  cursor: pointer;
}
</style>