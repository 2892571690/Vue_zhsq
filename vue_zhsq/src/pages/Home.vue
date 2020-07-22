<template>
  <div style="height:100%;">
    <!-- 布局 -->
    <el-container class="home_container">
      <!-- 头部区域 -->
      <el-header class="home_hander">
        <div class="home_hander_img">
          <img src="../assets/loge.png" />
        </div>
        <div class="home_hander_title">智能社区综合管理服务云平台</div>
        <div class="home_hander_text">(安徽合肥市)</div>
      </el-header>
      <!-- 内容区域 -->
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside class="home_hander_aside">Aside</el-aside>
        <!-- 主内容区域 -->
        <el-main class="home_hander_main">Main</el-main>
      </el-container>
    </el-container>

    <!-- 点击显示修改字体弹出框的显示 -->
    <el-button type="text" @click="addFont = true">A</el-button>
    <!-- 修改字体的弹出框 -->
    <el-dialog title="修改字体" :visible.sync="addFont" width="30%" :before-close="handleClose">
      <!-- 弹出框内容 -->
      <span>
        <!-- 滑块 -->
        <div class="demonstration">
          <el-slider v-model="value" show-input></el-slider>
        </div>
      </span>
      <!-- 下面的取消和确定 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFont = false">取 消</el-button>
        <el-button type="primary" @click="determineFont">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 控制修改字体弹出框显示与隐藏
      addFont: false,
      //   滑块的值
      value: 0
    }
  },
  methods: {
    // 点击修改字体弹出框x的事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 点击确定按钮
    determineFont() {
      console.log(this.value)
      document.querySelector('html').style.fontSize = `${this.value}px`
      this.addFont = false
    }
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
  }
  .home_hander_main {
    background-color: #fff;
  }
}
.el-slider {
  .el-slider__stop {
    background: #ccc;
  }
}
</style>
