<template>
  <div>
    <div class="mph_wrap" v-for="item in mphList" :key="item.fwId">
      <div class="mph_wrap_title">门牌号：{{item.mph}}</div>
      <div class="mph_wrap_content">
        <div class="mph_wrap_xx">
          <div class="mph_wrap_xx_ldh">{{item.ldh}}栋</div>
          <div class="mph_wrap_xx_dyh">{{item.dyh}}单元</div>
          <div class="mph_wrap_xx_lch">{{item.lch}}层</div>
          <div class="mph_wrap_xx_size">{{item.fwmj}}m²</div>
        </div>
        <div class="mph_wrap_yz">业主：{{item.xm}}</div>
        <div class="mph_wrap_xz">
          <div v-if="item.fwztdm == 1">
            <div class="mph_wrap_xz_xz">性质:出租</div>
          </div>
          <div v-else-if="item.fwztdm == 2">
            <div class="mph_wrap_xz_xz">性质:自住</div>
          </div>
          <div v-else-if="item.fwztdm == 4">
            <div class="mph_wrap_xz_xz">性质:空置</div>
          </div>
          <div v-else-if="item.fwztdm == 9">
            <div class="mph_wrap_xz_xz">性质:其他</div>
          </div>

          <div class="mph_wrap_xz_js">家属:{{item.jsNum}}人</div>
          <div class="mph_wrap_xz_zk">租客:{{item.zkNum}}人</div>
        </div>
        <div class="mph_wrap_gn">
          <div class="mph_wrap_gn_ck" @click="handleGofwxxck(item.fwbm)">查看</div>
          <div class="mph_wrap_gn_bj" @click="handleGofwxxbj(item.fwbm)">编辑</div>
          <div v-if="item.isupload == 1">
            <div class="mph_wrap_gn_zt">已上传</div>
          </div>
          <div v-else>
            <div class="mph_wrap_gn_zt" style="color:#123cf2">未上传</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bm: {
        xqbm: '',
        ldbm: '',
        ldh: '',
        mph: '',
        isupload: '',
        order: '',
      },
      // 门牌号
      mphList: [],
    }
  },
  created() {
    // console.log(this.$route.query.bm)
    this.bm = {
      xqbm: this.$route.query.bm[0],
      ldbm: this.$route.query.bm[1],
    }
    // 获取门牌号的列表
    this.handleMPHList()
  },
  watch: {
    $route(to, from) {
      //   console.log(from.query.bm) //从哪来
      //   console.log(to.query.bm) //到哪去
      //   console.log(to.query.bm.length) //到哪去
      if (
        from.query.bm[1] !== to.query.bm[1] ||
        from.query.bm[0] !== to.query.bm[0] ||
        from.query.bm.length !== to.query.bm.length ||
        from.query.bm[2] !== to.query.bm[2] ||
        from.query.bm[3] !== to.query.bm[3] ||
        from.query.bm[4] !== to.query.bm[4] ||
        from.query.bm[5] !== to.query.bm[5]
      ) {
        if (to.query.bm.length == 2) {
          this.bm = {
            xqbm: to.query.bm[0],
            ldbm: to.query.bm[1],
          }
          this.handleMPHList()
        } else {
          this.bm = {
            xqbm: to.query.bm[0],
            ldbm: to.query.bm[1],
            ldh: to.query.bm[2],
            mph: to.query.bm[3],
            isupload: to.query.bm[4],
            order: to.query.bm[5],
          }
          this.handleMPHList()
        }
      }
    },
  },
  methods: {
    // 点击查看
    handleGofwxxck(fwbm) {
      // console.log(fwbm)
      this.$router.push({ path: 'fwxxck', query: { fwbm } })
    },
    // 点击编辑
    handleGofwxxbj(fwbm) {
      // console.log(fwbm)
      this.$router.push({ path: 'fwxxbj', query: { fwbm } })
    },
    // 获取门牌号列表信息
    async handleMPHList() {
      // console.log(this.bm)
      let res = await this.$http.get('/fw/selFangWo.do', { params: this.bm })
      // console.log(res)
      this.mphList = res.data
    },
  },
}
</script>
<style lang="less" scoped>
.mph_wrap {
  line-height: 1;
  width: 260px;
  height: 136px;
  background: #e2e4e1;
  margin: 18px 6px;
  float: left;
  .mph_wrap_title {
    width: 100%;
    height: 26px;
    text-align: center;
    line-height: 26px;
    color: #e0390d;
    font-size: 14px;
  }
  .mph_wrap_content {
    height: 109px;
    width: 100%;
    background: #fff;
    margin: 0 0 0 1px;
    .mph_wrap_xx {
      display: flex;
      justify-content: space-around;
      .mph_wrap_xx_ldh {
        width: 50px;
        height: 22px;
        // font-size: 14px;
        color: #fff;
        background: #1f819e;
        text-align: center;
        line-height: 22px;
        margin: 8px 0 11px 0;
      }

      .mph_wrap_xx_dyh {
        width: 50px;
        height: 22px;
        // font-size: 14px;
        color: #fff;
        background: #1f819e;
        text-align: center;
        line-height: 22px;
        margin: 8px 0 11px 0;
      }

      .mph_wrap_xx_lch {
        width: 42px;
        height: 22px;
        // font-size: 14px;
        color: #fff;
        background: #1f819e;
        text-align: center;
        line-height: 22px;
        margin: 8px 0 11px 0;
      }

      .mph_wrap_xx_size {
        width: 58px;
        height: 22px;
        // font-size: 14px;
        color: #fff;
        background: #1f819e;
        text-align: center;
        line-height: 22px;
        margin: 8px 0 11px 0;
      }
    }

    .mph_wrap_yz {
      margin: 0 0 13px 8px;
      font-size: 12px;
    }

    .mph_wrap_xz {
      font-size: 12px;
      margin: 0 0 10px 8px;
      display: flex;
      .mph_wrap_xz_xz {
        margin: 0 19px 0 0;
      }

      .mph_wrap_xz_js {
        margin: 0 13px 0 0;
      }

      .mph_wrap_xz_zk {
      }
    }

    .mph_wrap_gn {
      display: flex;
      margin: 0 0 0 8px;
      .mph_wrap_gn_ck {
        cursor: pointer;
        color: #e7360a;
        font-size: 12px;
        margin: 0 13px 0 0;
      }

      .mph_wrap_gn_bj {
        cursor: pointer;
        color: #e7360a;
        font-size: 12px;
        margin: 0 13px 0 0;
      }

      .mph_wrap_gn_zt {
        color: #019040;
        font-size: 12px;
      }
    }
  }
}
</style>