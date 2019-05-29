<template>
  <div>
    <logo-select @getindex="getIndex"></logo-select>
    <div class="search-input">
      <input
        type="text"
        v-model="keyword"
        @mouseup="mouseLeft($event)"
        @keyup="get($event)"
        @keydown.enter="search(1)"
        @keydown.down="selectDown()"
        @keydown.up.prevent="selectUp()"
      >
      <span class="search-reset" @click="cleanInput()">&times;</span>
      <button class="search-btn" @click="search(1)">搜一下</button>
      <div class="search-select">
        <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
          <li
            @mouseleave="selectLeave()"
            @mouseover="selectHover(index)"
            @click="selectClick(index)"
            class="search-select-option search-select-list"
            v-for="(value, index) in myData"
            :key="value"
            :class="{selectback: index==selectNow}"
          >{{value}}</li>
        </transition-group>
      </div>
    </div>
  </div>
</template>


<script>
import LogoSelect from "./LogoSelect.vue";

export default {
  components: {
    "logo-select": LogoSelect
  },
  data() {
    return {
      keyList: [],
      keyword: "",
      selectNow: -1,
      searchIndex: 0,
      myData: [],
      logoData: [
        {
          name: "360搜索",
          searchSrc: "https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="
        },
        {
          name: "百度搜索",
          searchSrc:
            "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd="
        },
        {
          name: "搜狗搜索",
          searchSrc: "https://www.sogou.com/web?query="
        }
      ]
    };
  },
  methods: {
    get(ev) {
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        //console.log(ev.keyCode);
        return;
      }
      this.$jsonp(
        "/api/suggest?word=" + this.keyword + "&encodein=utf-8&encodeout=utf-8"
      ).then(res => {
        console.log(res);
        this.myData = res.s;
        //console.log(this.myData);
      });
      console.log(this.selectNow);
    },
    search(num) {
      if (num == 1) {
        this.keyList.push(this.keyword);
      }
      window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
    },
    getIndex(index) {
      this.searchIndex = index;
    },
    cleanInput() {
      this.keyword = "";
      this.$jsonp(
        "/api/suggest?word=" + this.keyword + "&encodein=utf-8&encodeout=utf-8"
      ).then(res => {
        //console.log(res);
        this.myData = res.s;
        //console.log(this.myData);
      });
      //this.selectNow = -1;
    },
    selectHover(index) {
      this.selectNow = index;
    },
    selectClick(index) {
      this.keyList.push(this.keyword);
      this.keyword = this.myData[index];
      this.search(0);
    },
    selectDown() {
      this.selectNow++;
      if (this.selectNow == this.myData.length) {
        this.selectNow = 0;
      }
      this.keyword = this.myData[this.selectNow];
    },
    selectUp() {
      this.selectNow--;
      if (this.selectNow == -1) {
        this.selectNow = this.myData.length - 1;
      }
      this.keyword = this.myData[this.selectNow];
    },
    selectLeave() {
      this.selectNow = -1;
    },
    mouseLeft(ev) {
      if (ev.button == 0) {
        console.log(ev.button);
        this.myData = this.keyList;
      }
    }
  }
};
</script>


<style lang="less">
.search-input {
  height: 45px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}
.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 500px;
  height: 45px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}
.search-btn {
  height: 45px;
  width: 100px;
  border: 1px solid mediumseagreen;
  background-color: mediumseagreen;
  color: white;
  font-size: 16px;
  font-weight: bold;
  float: left;
}
.search-btn {
  cursor: pointer;
}
.search-select {
  position: absolute;
  top: 45px;
  width: 500px;
  box-sizing: border-box;
  z-index: 999;
}
.search-select li {
  border: 1px solid #d4d4d4;
  border-top: none;
  border-bottom: none;
  background-color: #fff;
  width: 100%;
}
.search-select-option {
  box-sizing: border-box;
  padding: 7px 10px;
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
input::-ms-clear {
  display: none;
}
.search-reset {
  width: 21px;
  height: 21px;
  position: absolute;
  display: block;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 110px;
  top: 12px;
}
.search-select-list {
  transition: all 0.5s;
}
.itemfade-enter,
.itemfade-leave-active {
  opacity: 0;
}
.itemfade-leave-active {
  position: absolute;
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
.search-select ul {
  margin: 0;
  text-align: left;
}
</style>
