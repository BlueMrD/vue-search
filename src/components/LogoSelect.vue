<template>
  <div class="main-logo">
    <img :src="logoData[selectedNow].imgSrc" alt @click="toggleFlag">
    <span class="logoList-arrow" @click="toggleFlag"></span>

    <transition name="logofade">
      <ul v-show="logoListFlag" class="logoList" @mouseleave="mouseLeaveList">
        <li
          v-for="(item, index) in logoData"
          :key="index"
          class="logoItem"
          :class="{selectback: index==logoNow}"
          @click="logoSelected(index)"
          @mouseover="logoListHover(index)"
        >
          <img :src="item.imgSrc" alt>
        </li>
      </ul>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selectedNow: 0,
      logoNow: -1,
      logoListFlag: false,
      mouseLeaveFlag: false,
      logoData: [
        {
          imgSrc: require("../assets/360_logo.png")
        },
        {
          imgSrc: require("../assets/baidu_logo.png")
        },
        {
          imgSrc: require("../assets/sougou_logo.png")
        }
      ]
    };
  },
  methods: {
    toggleFlag() {
      //console.log(this.logoNow);
      this.logoListFlag = !this.logoListFlag;
      //this.mouseLeaveFlag = true;
    },
    mouseLeaveList() {
      this.logoListFlag = false;
      //this.mouseLeaveFlag = false;
    },
    logoListHover(index) {
      this.logoNow = index;
    },
    logoSelected(index) {
      this.selectedNow = index;
      this.logoListFlag = false;
      this.$emit("getindex", this.selectedNow);
    }
  }
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.main-logo {
  width: 600px;
  height: 140px;
  position: relative;
}
.main-logo img {
  display: block;
  margin: 0 auto;
  user-select: none;
  cursor: pointer;
}
.logoList-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid;
  border-color: #000 transparent transparent transparent;
  right: 100px;
  top: 66px;
  cursor: pointer;
}
.logoList {
  position: absolute;
  top: 100%;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  z-index: 999999;
  border: 1px solid #d4d4d4;
}
.logoList li {
  width: 100%;
  height: 80px;
  background-color: #fefefe; /*少个封号报错*/
  line-height: 80px;
  padding-top: 1px;
}
.logoList li img {
  width: 100%;
  margin-top: 10px;
}
.logofade-enter-active,
.logofade-leave-active {
  transition: all 0.5s;
}
.logofade-enter,
.logofade-leave-active {
  opacity: 0;
  transform: translateY(20px);
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
</style>
