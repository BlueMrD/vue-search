<template>
  <div id="app">
    <SearchPanel></SearchPanel>
  </div>
</template>


<script>
import SearchPanel from '@/components/SearchPanel.vue'
export default {
  components:{
    SearchPanel
  }
}
</script>
<style lang="less">
html{
  height: 100%;
}

body{
  height:100%;
  background: url('./assets/background.png') no-repeat;
  background-size: 100% 100%;
}

#app{
  color:#2c3e50;
  width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align:center;
  position: absolute;
  top:35%;
  left: 50%;
  margin-left: -300px;
  margin-top: -100px;
}
</style>
