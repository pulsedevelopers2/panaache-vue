<template>
  <carousel :perPage="1"
            :autoplay="true"
            :autoplayTimeout="8000"
            :adjustableHeight="false"
            :centerMode="true"
            autoplayDirection="forward"
            :loop="true"
            paginationPosition="bottom-overlay"
            :autoplayHoverPause="false"
            paginationActiveColor="grey"
            :navigationEnabled="true"
            paginationColor="rgb(117, 76, 76)"
  >
    <slide
      data-index="0"
      data-name="MySlideName"
    >
      <img class="slide-image" src="../assets/SAMPLE- 3.png"><br>
    </slide>
    <slide
      data-index="1"
      data-name="MySlideName2"
    >
      <img class="slide-image" src="../assets/SAMPLE-1.jpg"><br>
    </slide>
    <slide
      data-index="2"
      data-name="MySlideName3"
    >
      <img class="slide-image" src="../assets/SAMPLE-4.png"><br>
    </slide>
    <slide
      data-index="3"
      data-name="MySlideName4"
    >
      <img class="slide-image" src="../assets/SAMPLE-2.jpg"><br>
    </slide>
    <slide
      data-index="4"
      data-name="MySlideName5"
    >
      <img class="slide-image" src="../assets/ring.png"><br>
    </slide>
    <slide
      data-index="5"
      data-name="MySlideName6"
    >
      <img class="slide-image" src="../assets/ring.png"><br>
    </slide>
  </carousel>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
    components: {
        Carousel,
        Slide
  }
}
</script>
<style scoped>

.VueCarousel-slide {
    width: 100vw !important;
    overflow: hidden;
    background: black;
    border-radius: 10px;
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    margin-left: 0%;
}
.slide-image {
    object-fit: contain !important;
    min-height: 100% !important;
    max-height: 80vh;
    padding: 2%;
    width: 100%;
}
@media screen and (orientation: portrait) {
    .slide-image {
        max-width: 80%;
    }
    .hover-link {
        font-size: 70%;
        padding: 5%;
    }
    .VueCarousel-slide {
      width: 100vw;
      height: 80vh;
    }
}
.hover-button {
    border: 1px solid rgb(117, 76, 76);
    color: white;
    min-width: 50%;
    margin: 1%;
    background: transparent;
}
.hover-link {
    display: block;
    width: 100%;
    height: inherit;
    color: white;
    padding: 3%;
    text-decoration: none !important;
}
</style>