<template>
  <span>
    <carousel :perPage="5"
              :scrollPerPage="false"
              :autoplay="true"
              :autoplayTimeout="3000"
              :adjustableHeight="false"
              :centerMode="true"
              autoplayDirection="forward"
              :loop="true"
              :autoplayHoverPause="false"
              paginationActiveColor="grey"
              paginationColor="rgb(236, 154, 140)"
              class="hidden-xs hiden-sm"
    >
      <slide
        data-index="0"
        data-name="MySlideName"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="1"
        data-name="MySlideName2"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="2"
        data-name="MySlideName3"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="3"
        data-name="MySlideName4"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="4"
        data-name="MySlideName5"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="5"
        data-name="MySlideName6"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="6"
        data-name="MySlideName7"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="7"
        data-name="MySlideName8"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="8"
        data-name="MySlideName9"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
    </carousel>
    <carousel :perPage="2"
              :scrollPerPage="false"
              :autoplay="true"
              :autoplayTimeout="3000"
              :adjustableHeight="false"
              :centerMode="true"
              autoplayDirection="forward"
              :loop="true"
              :autoplayHoverPause="false"
              paginationActiveColor="grey"
              class="hidden-lg hidden-md"
              paginationColor="rgb(236, 154, 140)"
    >
      <slide
        data-index="0"
        data-name="MySlideName"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="1"
        data-name="MySlideName2"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="2"
        data-name="MySlideName3"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="3"
        data-name="MySlideName4"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="4"
        data-name="MySlideName5"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="5"
        data-name="MySlideName6"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="6"
        data-name="MySlideName7"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="7"
        data-name="MySlideName8"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
      <slide
        data-index="8"
        data-name="MySlideName9"
      >
        <img class="slide-image" src="../assets/round.png"><br>
        <h4>abc</h4>
        <button class="hover-button">
          <a class="hover-link" href="'/item?&item='">View</a>
        </button>
      </slide>
    </carousel>
  </span>
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
    height: 60vh;
    border: 5px solid rgb(0, 0, 0);
    background: rgb(24, 10, 10);
    border-radius: 10px;
    padding: 1%;
    margin-left: 0%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.slide-image {
    object-fit: contain;
    max-width: 60%;
    padding: 10%;
}
@media screen and (orientation: portrait) {
    .slide-image {
        max-width: 80%;
    }
    .VueCarousel-slide {
      height: 50vh;
    }
    .hover-link {
        font-size: 70%;
        padding: 5%;
    }
}

</style>