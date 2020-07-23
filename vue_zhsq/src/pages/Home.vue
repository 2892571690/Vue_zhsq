<template>
  <div style="height:100%;">
    <!-- 布局 -->
    <el-container class="home_container">
      <!-- 头部区域 -->
      <el-header class="home_hander" ref="handre">
        <div class="home_hander_img">
          <img src="../assets/loge.png" />
        </div>
        <div class="home_hander_title">智能社区综合管理服务云平台</div>
        <div class="home_hander_text">(安徽合肥市)</div>
      </el-header>
      <!-- 内容区域 -->
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside class="home_hander_aside" ref="mian">
          <div class="home_hander_index">
            <div class="home_hander_index_img">
              <img src="../assets/index.png" />
            </div>
            <div class="home_hander_index_title" ref="index">首页</div>
          </div>
        </el-aside>
        <!-- 主内容区域 -->
        <el-main class="home_hander_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  mounted() {
    // 更改主题颜色
    let self = this;
    eventBus.$on('eventBusName', function(val) {
      self.$refs.handre.$el.style.background = val[0]
      self.$refs.mian.$el.style.background = val[1]
      self.$refs.index.style.color = val[2]
    })
  },
  beforeDestroy() {
    eventBus.$off('eventBusName')
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-header {
    background-color: #192438;
    height: 94px !important;
    display: flex;
    align-items: center;
    padding: 0;
    .home_hander_img {
      width: 65px;
      margin: 0 29px 0 47px;
      height: 72px;
    }
    .home_hander_title {
      color: #fff;
      font-size: 38px;
    }
    .home_hander_text {
      color: #fff;
      font-size: 23px;
      margin: 0 0 0 13px;
    }
  }
  .home_hander_aside {
    width: 210px !important;
    background-color: #243352;
    .home_hander_index_img {
      width: 22px;
      height: 21px;
    }
    .home_hander_index {
      width: 100%;
      height: 53px;
      color: #fff;
      font-size: 14px;
      // background-color: #192438;
      display: flex;
      align-items: center;
      margin-top: 40px;
      padding-left: 24px;
      letter-spacing: 7px;
      box-sizing: border-box;
      .home_hander_index_img {
        margin-right: 18px;
      }
    }
  }
  .home_hander_main {
    background-color: #fff;
    padding: 0;
  }
}
</style>
