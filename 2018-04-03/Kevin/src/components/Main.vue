<template>
  <div class="main">
      <div class="titleArea">
          <p class="title">每週資訊分享活動</p>
          <button class="addActiveBtn">發佈/管理活動</button>
          <div class="selectorTable">
              <div :class="['selectorItem',  'left' , {checked: type=='all'}]" @click="type = 'all'">全部活動</div>
              <div :class="['selectorItem', {checked: type=='ongoing'}]" @click="type = 'ongoing'">即將開始活動</div>
              <div :class="['selectorItem',  'right', {checked: type=='end'}]" @click="type = 'end'">已經結束活動</div>
          </div>
      </div>
      <ul class="speechList">
        <app-speech v-for="item in filterSpeech" :key=" item.title" :speech="item"></app-speech>
      </ul>
  </div>
</template>
<script>
import axios from "axios";
import Speech from './Speech.vue';

export default {
  data() {
    return {
      type:'all',
      allSpeach: ""
    };
  },
  computed:{
    filterSpeech () {
      let today = new Date ();
      if (this.type === 'end') {
        return this.allSpeach.filter(speech => {
          return new Date(speech.speech_date) < today
        })
      } else if (this.type ==='ongoing') {
        return this.allSpeach.filter(speech => {
          return new Date(speech.speech_date) > today
        })
      } else {
        return this.allSpeach
      }
    }
  },
  components:{
    appSpeech:Speech
  },
  created() {
    axios
      .get("https://devche.com/api/speech/data")
      .then(res => {
        this.allSpeach = res.data.result.sort(function (a, b) {
          return parseInt(b.speech_date.split('-').join('')) - parseInt(a.speech_date.split('-').join(''))
        });
      })
      .catch(error => console.log(error));
      console.log(this.allSpeach);
  }
};
</script>
<style scoped>
::-webkit-scrollbar { 
    display: none; 
}

.main {
  width: calc(100% - 290px);
  padding: 0 145px;
  /* height: 500px; */
}

.titleArea {
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title {
  font-family: PingFangTC;
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #0f375b;
}

button {
  width: 196px;
  height: 40px;
  border-radius: 5px;
  background-color: #1e8ba6;
  outline: none;
  border: none;
  font-family: PingFangTC;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  position: absolute;
  right: 0;
}

.selectorTable {
  width: 100%;
  display: flex;
  margin-top: 16px;
  border: solid 1px #0f375b;
  border-radius: 10px;
  overflow: hidden;
}

.selectorItem {
  flex: 1;
  height: 50px;
  line-height: 50px;
  background-color: #ffffff;
  border: solid 1px #0f375b;
  font-family: PingFangTC;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #0f375b;
  text-align: center;
  cursor: pointer;
}

.selectorItem.left {
  border-radius: 8px 0 0 8px;
}

.selectorItem.right {
  border-radius: 0 8px 8px 0;
}

.selectorItem.checked {
  background-color: #0f375b;
  color: #ffffff;
}

ul {
  margin-top: 16px;
  height: 760px;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
}
</style>
