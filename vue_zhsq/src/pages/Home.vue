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
          <!-- <div class="index_wrap">
            <div class="index_img">
              <img :src="index.pidimg" />
            </div>
            <div class="index_text">{{index.mname}}</div>
          </div>-->
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="#243352"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.m_id + ''" v-for="item in sidebarList" :key="item.m_id">
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图片 -->
                <div class="menu_item_img">
                  <img :src="item.pidimg" />
                </div>
                <!-- 文本 -->
                <span class="menu_item_text">{{item.mname}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/'+items.pathUrl"
                v-for="items in item.items"
                :key="items.m_id"
                @click="saveNavStart([item,items])"
              >
                <!-- 二级菜单模板区域 -->
                <template slot="title">
                  <!-- 图片 -->
                  <div class="menu_items_img">
                    <img :src="items.pidimg" />
                  </div>
                  <!-- 文本 -->
                  <span class="menu_items_text">{{items.mname}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
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
  data() {
    return {
      // 侧边栏数据
      sidebarList: [],
      // 被激活的链接地址
      activePath: '',
      // 面包屑
      breadcrumb: [],
      indexList: [],
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {
    this.getSidebar()
    // 更改主题颜色
    let self = this
    eventBus.$on('eventBusName', function (val) {
      self.$refs.handre.$el.style.background = val[0]
      self.$refs.mian.$el.style.background = val[1]
      self.$refs.index.style.color = val[2]
    })
  },
  methods: {
    // 获取侧边栏的数据
    async getSidebar() {
      let res = await this.$http.get('/zhsq/navigation.do')
      // console.log(res.data.message)
      this.sidebarList = res.data.message
      this.saveNavStart(this.sidebarList[0])
    },
    // 保存链接的激活状态
    saveNavStart(activePath) {
      // console.log(activePath)
      if (activePath.length == 2) {
        let breadcrumb1 = [
          activePath[0].mname,
          activePath[0].pidimg,
          activePath[0].m_id,
        ]
        let breadcrumb2 = [
          activePath[1].mname,
          activePath[1].pidimg,
          activePath[1].m_id,
        ]
        window.sessionStorage.setItem('activePath', `/${activePath[1].pathUrl}`)
        this.activePath = `/${activePath[1].pathUrl}`
        this.breadcrumb = [breadcrumb1, breadcrumb2]
        window.sessionStorage.setItem('breadcrumb', this.breadcrumb)
        eventBus.$emit('breadcrumb', this.breadcrumb)
      } else {
        let breadcrumb1 = [activePath.mname, activePath.pidimg, activePath.m_id]
        let breadcrumb2 = [
          activePath.items[0].mname,
          activePath.items[0].pidimg,
          activePath.items[0].m_id,
        ]
        this.breadcrumb = [breadcrumb1, breadcrumb2]
        window.sessionStorage.setItem('breadcrumb', this.breadcrumb)
        window.sessionStorage.setItem(
          'activePath',
          `/${activePath.items[0].pathUrl}`
        )
        this.activePath = `/${activePath.items[0].pathUrl}`
      }
    },
  },
  beforeDestroy() {
    eventBus.$off('eventBusName')
  },
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
    font-size: 14px;
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
.menu_item_img {
  width: 22px !important;
  height: 21px !important;
  float: left !important;
  margin-right: 18px;
  img {
    width: 100%;
    height: 100%;
    vertical-align: baseline !important;
  }
}
.menu_items_img {
  width: 22px !important;
  height: 21px !important;
  float: left !important;
  margin-right: 18px;
  img {
    width: 100%;
    height: 100%;
    vertical-align: baseline !important;
  }
}
.menu_item_text {
  font-size: 14px;
}
.menu_items_text {
  font-size: 14px;
}
.el-menu {
  border-right: none;
  margin-top: 61px;
}
// .index_wrap {
//   &:hover{
//     background: #192438;
//   }
//   width: 210px;
//   height: 56px;
//   padding-left: 19px;
//   line-height:56px ;
//   box-sizing: border-box;
//   .index_img {
//     width: 22px !important;
//     height: 21px !important;
//     float: left !important;
//     margin-right: 18px;
//     img {
//       width: 100%;
//       height: 100%;
//       vertical-align: baseline !important;
//     }
//   }
//   .index_text {
//     font-size: 14px;
//     color: #fff;
//   }
// }
</style>
