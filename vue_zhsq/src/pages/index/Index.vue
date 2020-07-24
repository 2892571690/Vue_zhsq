<template>
  <div ref="index">
      <Title :refDome='refDome'></Title>
  </div>
</template>
<script>
import Title from '../../components/title'
export default {
    components:{
        Title
    },
    data(){
        return{
            refDome:null
        }
    },
    mounted(){
        this.refDome = this.$refs.index
    }
}
</script>
<style lang="less" scoped>
</style>