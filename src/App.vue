<template>
  <div class="container" :style="bgColor[selectedBackground]">

  <transition 
    appear
    type="animation"
    enter-active-class="animate__animated animate__fadeInDown animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast"
  >
    <div v-if="isEditingBox1 || isEditingBox3 || isEditingBox6" class="editing-notice">
      Düzenlemeniz bittiğinde enter'a basın veya herhangi bir yere tıklayın!
      
    </div>
  </transition>

  <transition 
    appear
    type="animation"
    enter-active-class="animate__animated animate__fadeInDown animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast"
  >
    <div v-if="selectedBackground == 2 && isNoticeDismissed ==false " class="editing-notice">
      Bu istediğiniz herhangi bir yüksek çözünürlüklü görsel olabilir -- fakat gerçekten çok yüksek çözünürlük gerekiyor.
      <span class="dismiss" @click="isNoticeDismissed = true"> X </span>
    </div>
  </transition>

  <transition 
    appear
    type="animation"
    enter-active-class="animate__animated animate__fadeInDown animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast"
  >
    <div v-if="selectedBackground == 7 && isNoticeDismissed ==false " class="editing-notice">
      Bu da istediğimiz herhangi bir tek renk olabilir
      <span class="dismiss" @click="isNoticeDismissed = true"> X </span>
    </div>
  </transition>

  <div class="small-media-warning"> Bu çalışma spesifik olarak büyük bilgilendirme ekranları için tasarlanmıştır. Lütfen daha büyük bir ekranda tekrar deneyin.</div>

    <vue-particles v-if="particlesShown" :style="bgColor[selectedBackground]" class="particles-container"
      color="#dedede"
      :particleOpacity="0.4"
      :particlesNumber="65"
      shapeType="polygon"
      :particleSize="2"
      linesColor="#dedede"
      :linesWidth=".9"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="160"
      :moveSpeed="4">  
    </vue-particles>

    <div v-if="isShowingDashboard" class="content-container">
      <div class="date-time">
        <div class="date">{{dateTime.date}}</div>
         <div class="time">{{dateTime.time}}</div>
      </div>


      <div class="world-map" :class="{'world-map-overriden': selectedBackground == 2 || selectedBackground == 3}">
              <img class="world-map__map" src="./assets/map.png" alt="">
      </div>



      <div @dblclick="isEditingBox1 = true" 
            class="reg-grid-item item-1"
            :class="isColoredModeActive ? 'bg-color-4' : 'bg-pale-1'">
        <img src="./assets/icons/ac.gif" alt="" class="reg-grid-item__icon">
        <div class="reg-grid-item__title">{{stats.box1.title}}</div>
        
        <div v-if="!isEditingBox1" class="reg-grid-item__content"> {{stats.box1.content}} </div>
        <textarea 
            v-else
            class="infoboard-edit"
            v-focusSelect
            v-model="stats.box1.content"
            v-on:blur="isEditingBox1 = false"
            @keydown.enter.exact.prevent
            @keydown.enter.exact="isEditingBox1 = false"
            type="text"></textarea>
        <div class="reg-grid-item__explanation"> </div>
      </div>
      
      
      
      
      
      
      <div @click="updateInfoShown=true" v-if="!isChartActive" class="reg-grid-item item-2 interactive"
      :class="isColoredModeActive ? 'bg-color-7' : 'bg-pale-1'">
          <div class="reg-grid-item__title-sm">{{stats.box2.title}}</div>
            <span style="font-size: 13rem" class="material-icons"> update </span>
            <div class="reg-grid-item__content"> {{stats.box2.content}} </div>
            <div class="reg-grid-item__explanation"> {{stats.box2.explanation}} </div>
      </div>

      <chart class="item-chart" v-else></chart>

      


      <div class="reg-grid-item item-3" @dblclick="isEditingBox3 = true"
      :class="isColoredModeActive ? 'bg-color-1' : 'bg-pale-1'">
        <img src="./assets/icons/energy.png" alt="" class="long-grid-item__icon">
        <div class="long-grid-item__title">{{stats.box3.title}}</div>
        <div v-if="!isEditingBox3" class="long-grid-item__content"> {{stats.box3.content}} </div>
        <input 
            v-else
            class="long-infoboard-edit"
            v-focusSelect
            v-model="stats.box3.content"
            v-on:blur="isEditingBox3 = false"
            @keydown.enter.exact.prevent
            @keydown.enter.exact="isEditingBox3 = false"
            type="text">
        <div class="long-grid-item__explanation"> {{stats.box3.explanation}} </div>
      </div>




      <div class="reg-grid-item item-6" @dblclick="isEditingBox6 = true"
      :class="isColoredModeActive ? 'bg-color-2' : 'bg-pale-1'">
        <img src="./assets/icons/project.png" alt="" class="long-grid-item__icon">
        <div class="long-grid-item__title">{{stats.box6.title}}</div>
        <div v-if="!isEditingBox6" class="long-grid-item__content"> {{stats.box6.content}} </div>
        <input 
            v-else
            class="long-infoboard-edit"
            v-focusSelect
            v-model="stats.box6.content"
            v-on:blur="isEditingBox6 = false"
            @keydown.enter.exact.prevent
            @keydown.enter.exact="isEditingBox6 = false"
            type="text">
        <div class="long-grid-item__explanation"> {{stats.box6.explanation}} </div>
      </div>

      <div class="row-three-switches">
        <div class="item-4 interactive" @click="activateWebView"
         :class="isColoredModeActive ? 'bg-color-3' : 'bg-pale-2'">
          <div class="action-grid">Web Sitesi</div>
        </div>
        <div class="item-4 interactive" @click="activatePresentation"
        :class="isColoredModeActive ? 'bg-color-7' : 'bg-pale-3'">
          <div class="action-grid">Sunum</div>
        </div>
      </div>

      <div class="row-three-switches-bottom">
        <div class="small-grid-item item-4 interactive" @click="particlesShown = !particlesShown"
        :class="isColoredModeActive ? 'bg-color-6' : 'bg-pale-3'">
              <div class="action-grid"> Animasyon </div>
          </div>
        <div class="item-4 interactive" @click="isColoredModeActive = !isColoredModeActive"
        :class="isColoredModeActive ? 'bg-color-5' : 'bg-pale-2'">
          <div class="action-grid">Renk</div>
        </div>
      </div>
      
      <div class="wip-explanation">
        Bu kısım şu anda bilinçli olarak boş. Burası ekran boyutuna göre üst kısımla eş olarak boş kalabilir veya yine ekran boyutuna göre burada da modüller kullanılabilir.
      </div>

      <div class="single-row-two-column interactive"
      :class="isColoredModeActive ? 'bg-color-4' : 'bg-pale-3'"
      @click="isChartActive = !isChartActive">
        Grafik (wip)
      </div>
      
      <transition
          appear
          type="animation"
          enter-active-class="animate__animated animate__fadeInDown animate__fast"
          leave-active-class="animate__animated animate__fadeOutUp animate__fast">
        <update-info @closed="updateInfoShown = false" v-if="updateInfoShown"></update-info>
      </transition>
      



      </div>
      
      <div v-else class="alternative-containers">
        <component :is="selectedComponent"> </component>
      </div>

</div>
</template>

<script>

import UpdateInfo from "./components/UpdateInfo.vue"
import WebView from "./components/WebView.vue"
import PDFView from "./components/PDFView.vue"
import Chart from "./components/Chart.vue"


export default {



  data() { 
    return {

      isShowingDashboard: true,
      isColoredModeActive: false,
      selectedComponent: PDFView,
      isChartActive: true,


      bgColor: { 
        "1": {backgroundImage: "radial-gradient(circle at center center, transparent,rgb(33,33,33)),repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 2px,transparent 2px, transparent 10px,rgb(33,33,33) 10px, rgb(33,33,33) 11px,transparent 11px, transparent 21px),repeating-linear-gradient(45deg, rgb(47,47,47) 0px, rgb(47,47,47) 4px,transparent 4px, transparent 8px),linear-gradient(90deg, rgb(33,33,33),rgb(33,33,33))", backgroundPosition: "right"},
        "2": {backgroundImage: "url('https://www.highreshdwallpapers.com/wp-content/uploads/2012/06/City-Skyscraper-Wallpaper.jpg')", backgroundRepeat: "no-repeat"},
        "3": {backgroundImage: "linear-gradient(to right bottom, rgba(0,0,0,.5), rgba(43,43,43,.5)), url('https://www.highreshdwallpapers.com/wp-content/uploads/2012/06/City-Skyscraper-Wallpaper.jpg')", backgroundRepeat: "no-repeat"},
        "4": {background: "repeating-linear-gradient(236deg, hsla(251,0%,52%,0.2) 0px, hsla(251,0%,52%,0.2) 0px,transparent 0px, transparent 1px,hsla(251,0%,52%,0.2) 1px, hsla(251,0%,52%,0.2) 4px,transparent 4px, transparent 5px,hsla(251,0%,52%,0.2) 5px, hsla(251,0%,52%,0.2) 8px),repeating-linear-gradient(19deg, hsla(251,0%,52%,0.2) 0px, hsla(251,0%,52%,0.2) 0px,transparent 0px, transparent 1px,hsla(251,0%,52%,0.2) 1px, hsla(251,0%,52%,0.2) 4px,transparent 4px, transparent 5px,hsla(251,0%,52%,0.2) 5px, hsla(251,0%,52%,0.2) 8px),linear-gradient(90deg, rgb(23,23,23),rgb(23,23,23))"},
        "5": {background: "repeating-linear-gradient(45deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(0deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(135deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(90deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),linear-gradient(90deg, rgb(17, 17, 17),rgb(66, 66, 66))"},
        "6": {background: "repeating-linear-gradient(22.5deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px,transparent 1px, transparent 31px,rgba(255,255,255,0.05) 31px, rgba(255,255,255,0.05) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(112.5deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px,transparent 1px, transparent 31px,rgba(255,255,255,0.05) 31px, rgba(255,255,255,0.05) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px,transparent 1px, transparent 31px,rgba(255,255,255,0.05) 31px, rgba(255,255,255,0.05) 32px,transparent 32px, transparent 92px),linear-gradient(90deg, hsl(279,0%,3%),hsl(279,0%,3%))"},
        "7": {background: "#333b54"},
        "8": {background: "#0a1737"},
      },

      particlesShown: false,
      isEditingBox1: false,
      isEditingBox3: false,
      isEditingBox6: false,
      isNoticeDismissed: false,
      selectedBackground: 6,
      updateInfoShown: false,

      dateTime: {
        time: "",
        date: ""
      },

      stats: {
        box1: {
          title: "Toplam Dış Ünite",
          icon: "./assets/icons/ac-unit.png/",
          content: "33.443",
          explanation: "",
        },



        box2: {
          title: "Verileri nasıl güncelleyeceğiz?",
          icon: "",
          content: "",
          explanation: "4 alternatifimiz var. Açıklamayı görüntülemek için tıklayın.",
        },

        box3: {
          title: "Toplam kW",
          icon: "",
          content: "445.000.000",
          explanation: "",
        },

        box6: {
          title: "Tamamlanan Proje",
          icon: "",
          content: "3400",
          explanation: "",
        },
      },
  
      }  
    },
    components: {
      "update-info": UpdateInfo,
      "web-view": WebView,
      "pdf-view": PDFView,
      "chart": Chart
    },

      directives: {
    focusSelect: {
      inserted (el) {
        el.focus()
        el.select()
      }
    }
  },

    methods: {

      setDashboard() {
        console.log("Ran set Dashboard")
        this.isShowingDashboard = true
      },

      activatePresentation() {
        this.isShowingDashboard = false
        this.selectedComponent = PDFView
      },

      activateWebView() {
        this.isShowingDashboard = false
        this.selectedComponent = WebView
      },

      closeUpdateInfo() {
        if(this.updateInfoShown) {
          this.updateInfoShown = false
        }
      },

      getNow: function() {
          const today = new Date();
          const date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
          const time = this.zeroPadding(today.getHours(), 2) + ":" + this.zeroPadding(today.getMinutes(), 2) + ":" + this.zeroPadding(today.getSeconds(), 2);
          this.dateTime.time = time;
          this.dateTime.date = date
      },
    
      zeroPadding: function(num, digit) {
        var zero = '';
          for(var i = 0; i < digit; i++) {
              zero += '0';
          }
      
        return (zero + num).slice(-digit);
        },

      incrementBackground: function() {
        this.selectedBackground = this.selectedBackground + 1
        this.isNoticeDismissed = false
        if (this.selectedBackground > 8) {
          this.selectedBackground = 1
          this.isNoticeDismissed = false
        }
      }
    },

    created() {
      setInterval(this.getNow, 1000);
    },
}

</script>

<style>

:root {

  --bacgkround-1: linear-gradient(to right, #00416a, #0b7cec);
  --background-2: linear-gradient(315deg, #3f0d12 0%, #a71d31 74%);
  --background-3: linear-gradient(to right, #000046, #1cb5e0);
  --background-4: linear-gradient(to right, #2c3e50, #4ca1af);
  --background-5: linear-gradient(to right, #4b6cb7, #182848);
  --background-6:  linear-gradient(to right, #bbd2c5, #536976, #292e49);
  --background-7: repeating-linear-gradient(0deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(67.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(157.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(112.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(22.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(0deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(112.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(22.5deg, hsla(83,0%,53%,0.03) 0px, hsla(83,0%,53%,0.03) 1px,transparent 1px, transparent 12px),linear-gradient(90deg, rgb(40, 24, 113),rgb(51,16,46));
  --background-8:  linear-gradient(to right, #57728c, #4b607b, #404f6a, #353f59, #2a2f48);


  --world-map-background: repeating-linear-gradient(135deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(135deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(157.5deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(0deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(0deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(67.5deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(45deg, rgba(255,255,255, 0.03) 0px, rgba(255,255,255, 0.03) 1px,transparent 1px, transparent 12px),linear-gradient(90deg, rgba(43,127,254, 0.12),rgba(13,57,248, 0.12156862745098039));
  --world-map-override-background: repeating-linear-gradient(45deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(0deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(135deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(90deg, hsla(207,0%,63%,0.05) 0px, hsla(207,0%,63%,0.05) 1px,transparent 1px, transparent 11px,hsla(207,0%,63%,0.05) 11px, hsla(207,0%,63%,0.05) 12px,transparent 12px, transparent 32px),linear-gradient(90deg, rgba(17,17,17, 0.76),rgba(66,66,66, 0.7607843137254902));
  --world-map-override-background2: repeating-linear-gradient(216deg, rgba(0,0,0, 0.51) 0px, rgba(0,0,0, 0.51) 19px,transparent 19px, transparent 22px),repeating-linear-gradient(135deg, rgba(0,0,0, 0.51) 0px, rgba(0,0,0, 0.51) 19px,transparent 19px, transparent 22px),repeating-linear-gradient(338deg, rgba(0,0,0, 0.51) 0px, rgba(0,0,0, 0.51) 19px,transparent 19px, transparent 22px),linear-gradient(90deg, rgba(5,15,123, 0.46),rgba(0,0,0, 0.51));
  
}


.small-media-warning {
  display: none;
}

@media only screen and (max-width: 1100px) {
  .small-media-warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 99;
    padding: 2rem;

    background-image:radial-gradient(circle at center center, transparent,rgb(33,33,33)),repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 2px,transparent 2px, transparent 10px,rgb(33,33,33) 10px, rgb(33,33,33) 11px,transparent 11px, transparent 21px),repeating-linear-gradient(45deg, rgb(47,47,47) 0px, rgb(47,47,47) 4px,transparent 4px, transparent 8px),linear-gradient(90deg, rgb(33,33,33),rgb(33,33,33));


    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-size: 3rem;
    line-height:3.2rem;
    color: white;
  }
}

.item-chart{
  background: var(--background-4);
  grid-column: 10 / -1;
  overflow: hidden;
  grid-row: 1 / 5;
  position: relative;
  border-radius: 6px;
  padding: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  }

.container {
  overflow: hidden;
  display: grid;
  justify-items: center;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;


  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.particles-container {
  height: 100vh;
  width: 100vw;

  grid-column: 1 / -1;
  grid-row: 1 / -1;

}

.content-container {
  width: 95vw;
  height: 93vh;

  grid-column: 1 / -1;
  grid-row: 1 / -1;

  display: grid;
  
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);

  gap: 2rem;
}

/* WORLD MAP SECTIION */

.world-map {
  grid-row: 5 / 9; 
  grid-column: 1 / 6;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-image: var(--world-map-background);

}

.world-map-overriden {
  background-image: linear-gradient(315deg, #485461B3 0%, #28313bB3 74%);
  border: 1px solid transparent;
  border-radius: 4px;
  }

.world-map__map {
  align-self: center;
  width: 100%;
  padding: 1rem;
  opacity: .9;
}

/* DATE AND TIME SECTION */

.date-time { 
  grid-row: 2 / 4;
  grid-column: 1 / 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;;

  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
  font-family: "Share Tech Mono", monospace;
}

.date{
  
  font-size: 2.8rem;
  letter-spacing: 0.1em;
}

.time{

  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
  letter-spacing: 0.05em;
  font-size: 10rem;
}


/* UNIVERSAL RULES FOR GRIDS */

  /* REGULAR GRID ITEM */

.reg-grid-item {
  opacity: .7;
  border-radius: 5px;

  color: white;

  padding: 1rem;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

}

.reg-grid-item__title{
  font-family: "Inter";
  font-size: 4rem; 
}

.reg-grid-item__title-sm{
  font-family: Inter;
  font-size: 3rem;
  text-align: center;
}

.reg-grid-item__content{
  font-family: "Inria Sans";
  font-size: 6rem;
  justify-self: center;
  text-shadow: 0px 0px 6px rgba(255,255,255,0.5);
}

.reg-grid-item__icon{
  width: 35%;
}

.reg-grid-item__explanation{
  font-family: "Inter", sans-serif;
  font-size:1.9rem;
  text-align: center;
}

.infoboard-edit {
  font-family: "Inria Sans", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  justify-self: center;
  color: white;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
  border: none;
  outline: none;
  resize: none;
  max-width: 30rem;
  max-height: 8rem;
  background: transparent;
  text-align: center;
}

/* LONG GRID ITEM */

.long-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.long-grid-item__title{
  font-size: 3rem;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  text-align: center;
}

.long-grid-item__content{
  font-size: 3.2rem;
  font-family: "Inria Sans", Arial, Helvetica, sans-serif;
  text-align: center;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
}

.long-grid-item__icon {
  width: 50%;
}

.long-infoboard-edit {
  font-family: "Inria Sans", Arial, Helvetica, sans-serif;
  font-size: 3.2rem;
  justify-self: center;
  color: white;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
  border: none;
  outline: none;
  resize: none;
  max-width: 18rem;
  max-height: 4rem;
  background: transparent;
  text-align: center;
}

/* SMALL GRID ITEM */

.small-grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  
}

/* Rows */

.row-three-switches {
  display: flex;
  justify-content: space-around;
  grid-column: 10 / 13;
  grid-row: 5 / 7;
  
}

.row-three-switches-bottom {
  display: flex;
  justify-content: space-around;
  grid-column: 10 / 13;
  grid-row: 7 / 9;
  
}

/* INDIVIDUAL GRID ITEMS */

.item-1 {
  grid-column: 6 / span 4;
  grid-row: 1 / 5;

  cursor: pointer;
}

.item-2 {
  grid-column: 10 / 13;
  grid-row: 1 / 5;
}

.item-3 {
  grid-column: 6 / 8; 
  grid-row: 5 / 9;
  
  cursor: pointer;
}

.item-6 {
  grid-column: 8 / 10; 
  grid-row: 5 / 9;
}


.item-4 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 80%;

  opacity: .7;
  border-radius: 6px;
}

.item-4:not(:last-child) {
  margin-right: 20px;
}


.item-5 {

  grid-column: 10 / 13;
  grid-row: 7 / 9;
  border-radius: 6px;
  opacity: .7;

}



/* Helper Classes */

.interactive{
  cursor: pointer;
  transition: transform .3s;
  user-select: none;
}
.interactive:hover{
  transform: scale(1.050);
}

.interactive:active{
  transform: scale(.9);
}

.action-grid {
  font-family: "Inria Sans", sans-serif;
  color: white;
  font-size: 2.4rem;
  text-align: center;
  font-weight: 300;
}

  /* Backgrounds */

.bg-pale-1{
    background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
}

.bg-pale-2{
  border: 1px solid var(--background-4);
  background-image: var(--background-4);
}

.bg-pale-3{
  background-image: var(--background-8);
  border: 1px solid var(--background-8);
}

.bg-color-1{
  background-color: #ff9800cb;
  border: 1px solid #ff9800cb;
}
.bg-color-2{
  background-color:#388e3ccb;
  border: 1px solid #388e3ccb;
}
.bg-color-3{
  background-color: #f44336cb;
  border: 1px solid #f44336cb;
}
.bg-color-4{
  background-color: #0d47a1cb;
  border: 1px solid #0d47a1cb;
}

.bg-color-7{
  background-color: #2c77e7cb;
  border: 1px solid #2c77e7cb;
}

.bg-color-5{
  background-color: #6A4C93cb;
  border: 1px solid #6A4C93cb;
}

.bg-color-6{
  background-color: #eeeb49cb;
  border: 1px solid #eeeb49cb;
}

/* Notices */

.editing-notice {
  position: absolute;
  z-index: 300;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.6rem;
  font-family: "Inter", 'Helvetica Neue', sans-serif;
  padding: 20px;
  color: white;
  
  top: 0px;
  left: 0px;
  bottom: 20px;
  margin-bottom: 40px;
  margin-left: 0px;

  background-color: rgb(139, 165, 214);
  border-bottom: 1px solid rgb(112, 152, 226);
}

.dismiss{
  font-size: 2rem;
  justify-self: flex-end;
  cursor: pointer;
  margin-right: 2rem;
}

.wip-explanation{
  display: flex;
  align-items: center;
  justify-content: center;

  grid-row: 9 / 10;
  grid-column: 1 / 10;
  width: 100%;

  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.25);
  color: white;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  letter-spacing: 0.1px;
  border: 1px solid white;
  border-radius: 5px;
  padding: 1rem;
}

.single-row-two-column{
  grid-row: 9 / 10;
  grid-column: 10 / -1;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  letter-spacing: .1px;
  padding: 1rem;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .7;
}

.alternative-containers {
  position: relative;
  z-index: 2;
  background-color: white;
  width: 100vw;
  height: 100vh;
}

</style>
