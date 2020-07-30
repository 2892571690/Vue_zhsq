<template>
  <div>
    <div class="title_handre_wrap">
      <!-- 三条线段 -->
      <div class="title_handre_iconTitle">
        <div class="icon iconfont icon-list-check"></div>
      </div>
      <!-- 面包屑 -->
      <div v-if="breadcrumb.length == 1">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item class="title_imgTitle">
            <div class="title_img">
              <img :src="breadcrumb[0][1]" />
            </div>
            <div class="title_text">{{breadcrumb[0][0]}}</div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-else-if="breadcrumb.length == 3">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item class="title_imgTitle">
            <div class="title_img">
              <img :src="breadcrumb[1]" />
            </div>
            <div class="title_text">{{breadcrumb[0]}}</div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-else>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item class="title_imgTitle" v-for="item in breadcrumb" :key="item[0][1]">
            <div class="title_img">
              <img :src="item[1]" />
            </div>
            <div class="title_text">{{item[0]}}</div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 右边操作改变的 -->
      <div class="title_operation_wrap">
        <!-- 点击显示修改字体弹出框的显示 -->
        <el-button class="font_text" type="text" @click="addFont = true">A</el-button>
        <!-- 全屏 -->
        <div class="icon iconfont icon-fangda" @click="handleFullScreen"></div>
        <!-- 返回首页 -->
        <div class="icon iconfont icon-fangzi" @click="handleGoHome"></div>
        <!-- 改变颜色 -->
        <el-button class="color_wrap" type="text" @click="addColorHandle">
          <div class="icon iconfont icon-yanse"></div>
          <div class="color_wrap_text">
            <div class="color_text">更换主题</div>
            <div class="el-icon-arrow-down"></div>
          </div>
        </el-button>
        <!-- 个人 -->
        <div class="user_wrap">
          <el-dropdown @command="handleCommand">
            <div class="user_button">
              <div class="icon iconfont icon-wo"></div>
              <div class="user_name">吴品龙</div>
              <div class="el-icon-arrow-down"></div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="退出成功">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 修改字体的弹出框 -->
    <el-dialog title="修改字体" :visible.sync="addFont" width="30%" :before-close="handleClose">
      <!-- 弹出框内容 -->
      <span>
        <!-- 滑块 -->
        <div class="demonstration">
          <el-slider v-model="value" show-input :max="300"></el-slider>
        </div>
      </span>
      <!-- 下面的取消和确定 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFontReset">重置</el-button>
        <el-button @click="addFont = false">取 消</el-button>
        <el-button type="primary" @click="determineFont">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改颜色的对话框 -->
    <el-dialog title="更换主题" :visible.sync="addColor" width="30%" :before-close="handleColorClose">
      <span class="span_color">
        <div class="colorBox_wrap" @click="handleColor1">
          <div class="colorBox_wrap_handre" style="background:#0f84ba" ref="handerColor1"></div>
          <div class="colorBox_wrap_mian" style="background:#111a29" ref="mianColor1"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor1"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor2">
          <div class="colorBox_wrap_handre" style="background:#373f5f" ref="handerColor2"></div>
          <div class="colorBox_wrap_mian" style="background:#32323c" ref="mianColor2"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor2"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor3">
          <div class="colorBox_wrap_handre" style="background:#279dda" ref="handerColor3"></div>
          <div class="colorBox_wrap_mian" style="background:#003a7a" ref="mianColor3"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor3"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor4">
          <div class="colorBox_wrap_handre" style="background:#4c4c4c" ref="handerColor4"></div>
          <div class="colorBox_wrap_mian" style="background:#2b82cf" ref="mianColor4"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor4"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor5">
          <div class="colorBox_wrap_handre" style="background:#e3eaf4" ref="handerColor5"></div>
          <div class="colorBox_wrap_mian" style="background:#495466" ref="mianColor5"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor5"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor6">
          <div class="colorBox_wrap_handre" style="background:#111a29" ref="handerColor6"></div>
          <div class="colorBox_wrap_mian" style="background:#0f0f1b" ref="mianColor6"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor6"></div>
        </div>
        <div class="colorBox_wrap" @click="handleColor7">
          <div class="colorBox_wrap_handre" style="background:#a3a4a8" ref="handerColor7"></div>
          <div class="colorBox_wrap_mian" style="background:#777d8b" ref="mianColor7"></div>
          <div class="colorBox_wrap_color" style="background:#fff" ref="colorColor7"></div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleColorReset">重置</el-button>
        <el-button @click="addColor = false">取 消</el-button>
        <el-button type="primary" @click="addColor = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['refDome'],
  data() {
    return {
      // 控制修改字体弹出框显示与隐藏
      addFont: false,
      //   滑块的值
      value: 190,
      //   控制修改颜色的对话框
      addColor: false,
      //   控制全屏跟小屏的切换
      screen: 1,
      // 面包屑
      breadcrumb: [],
    }
  },
  created() {},
  mounted() {
    let self = this
    let breadcrumb = window.sessionStorage.getItem('breadcrumb')
    let breadcrumb1 = breadcrumb.split(',')[0]
    let breadcrumb2 = `${breadcrumb.split(',')[1]},${breadcrumb.split(',')[2]}`
    let breadcrumb3 = breadcrumb.split(',')[3]
    let breadcrumb4 = [breadcrumb1, breadcrumb2, breadcrumb3]
    let breadcrumb5 = breadcrumb.split(',')[4]
    let breadcrumb6 = `${breadcrumb.split(',')[5]},${breadcrumb.split(',')[6]}`
    let breadcrumb7 = breadcrumb.split(',')[7]
    let breadcrumb8 = [breadcrumb5, breadcrumb6, breadcrumb8]
    this.breadcrumb = [breadcrumb4, breadcrumb8]
    if (this.breadcrumb[1][0] == undefined) {
      this.breadcrumb.splice(1, 1)
    }
    eventBus.$on('breadcrumb', function (val) {
      self.breadcrumb = val
    })
  },
  methods: {
    // 点击修改字体弹出框x的事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 点击确定按钮
    determineFont() {
      document.querySelector('html').style.fontSize = `${this.value}px`
      this.addFont = false
    },
    // 点击更换主题弹出框x的事件
    handleColorClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 点击更换主题弹出事件
    addColorHandle() {
      this.addColor = true
    },
    // 点击退出登录
    handleCommand(command) {
      this.$message({ message: command, type: 'success' })
    },
    // 点击切换全屏
    handleFullScreen() {
      if (this.screen % 2 == 0) {
        this.refDome.style.position = 'static'
        this.screen++
      } else {
        this.refDome.style.width = '100%'
        this.refDome.style.height = '100%'
        this.refDome.style.position = 'absolute'
        this.refDome.style.top = '0'
        this.refDome.style.left = '0'
        this.refDome.style.zIndex = '10'
        this.refDome.style.background = '#fff'
        this.screen++
      }
    },
    // 点击返回首页
    handleGoHome() {
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
      eventBus.$emit('breadcrumb', breadcrumb9)
      window.sessionStorage.setItem('activePath', `\index`)
      location.reload();
    },
    // 点击更换主题颜色
    handleColor1() {
      // 1.mian.js全局引入bus
      // 2.在要往外传的页面写eventBus.$emit('eventBusName', [里面写要传出去的值])
      // 3.Home页面接受传出去的值eventBus.$on('eventBusName', function(val) {val是传过去的值})
      // 4.记得在接受传出去的界面清楚bus, beforeDestroy() {eventBus.$off('eventBusName')}
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor1.style.background,
        this.$refs.mianColor1.style.background,
        this.$refs.colorColor1.style.background,
      ])
      this.addColor = false
    },
    handleColor2() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor2.style.background,
        this.$refs.mianColor2.style.background,
        this.$refs.colorColor2.style.background,
      ])
      this.addColor = false
    },
    handleColor3() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor3.style.background,
        this.$refs.mianColor3.style.background,
        this.$refs.colorColor3.style.background,
      ])
      this.addColor = false
    },
    handleColor4() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor4.style.background,
        this.$refs.mianColor4.style.background,
        this.$refs.colorColor4.style.background,
      ])
      this.addColor = false
    },
    handleColor5() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor5.style.background,
        this.$refs.mianColor5.style.background,
        this.$refs.colorColor5.style.background,
      ])
      this.addColor = false
    },
    handleColor6() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor6.style.background,
        this.$refs.mianColor6.style.background,
        this.$refs.colorColor6.style.background,
      ])
      this.addColor = false
    },
    handleColor7() {
      eventBus.$emit('eventBusName', [
        this.$refs.handerColor7.style.background,
        this.$refs.mianColor7.style.background,
        this.$refs.colorColor7.style.background,
      ])
      this.addColor = false
    },
    // 字体重置按钮
    handleFontReset() {
      document.querySelector('html').style.fontSize = '213.333px'
      this.value = 213.333
      this.addFont = false
    },
    // 颜色重置
    handleColorReset() {
      eventBus.$emit('eventBusName', ['#192438', '#243352'])
      this.addColor = false
    },
  },
  beforeDestroy() {
    eventBus.$off('breadcrumb')
  },
}
</script>

<style lang="less" scoped>
.title_handre_wrap {
  height: 58px;
  width: 100%;
  border-bottom: 1px solid #d1d4d9;
  line-height: 58px;
  .title_handre_iconTitle {
    float: left;
    .icon-list-check {
      font-size: 11px;
      margin-left: 23px;
      margin-right: 28px;
    }
  }
  .el-breadcrumb {
    float: left;
    .title_imgTitle {
      float: left;
      line-height: 58px;
      .title_img {
        width: 16px;
        height: 13px;
        margin-right: 5px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title_text {
        float: left;
        font-size: 14px;
      }
    }
  }

  .title_operation_wrap {
    float: right;
    .font_text {
      border: 0;
      padding: 0;
      color: #5a6060;
      font-weight: 600;
      float: left;
      margin-right: 43px;
      line-height: 58px;
      font-size: 13px;
    }
    .icon-fangda {
      float: left;
      margin-right: 43px;
      font-size: 13px;
    }
    .icon-fangzi {
      float: left;
      margin-right: 43px;
      font-size: 13px;
    }
    .color_wrap {
      border: 0;
      float: left;
      padding: 0;
      line-height: 58px;
      color: #655f61;
      margin-right: 59px;
      .icon-yanse {
        font-size: 13px;
        float: left;
        margin-right: 14px;
      }
      .color_wrap_text {
        float: left;
        font-size: 14px;
        .color_text {
          float: left;
          margin-right: 8px;
        }
        .el-icon-arrow-down {
          float: left;
          line-height: 58px;
        }
      }
    }
    .user_wrap {
      float: left;
      margin-right: 32px;
      .user_button {
        .icon-wo {
          font-size: 14px;
          float: left;
          margin-right: 5px;
        }
        .user_name {
          float: left;
          margin-right: 5px;
          font-size: 11px;
        }
        .el-icon-arrow-down {
          float: left;
          padding: 0;
          line-height: 58px;
        }
      }
    }
  }
}
.el-slider {
  .el-slider__stop {
    background: #ccc;
  }
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.span_color {
  display: block;
  height: 220px;
  .colorBox_wrap {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    float: left;
    margin: 10px;
    .colorBox_wrap_handre {
      width: 100%;
      height: 30%;
    }
    .colorBox_wrap_mian {
      width: 20%;
      height: 70%;
    }
  }
}
</style>