<template>
  <!-- <div class="loader loader-20">
    <div class="css-diamond" />
  </div> -->
  <div class="image-box">
    <img src="../assets/logo.png" class="breath">
  </div>
</template>
<style scoped>
.breath {
    animation: breath;
    object-fit: contain;
    animation-duration: 1.3s;
    animation-iteration-count: infinite;
}
.image-box {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100%;
}
 .loader {
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
    }
     .loader-20 {
        width: 80px;
        height: 80px;
        border: 3px dashed #8b6224;
        -webkit-animation: rotate-clock 2s linear both infinite;
        animation: rotate-clock 2s linear both infinite;
    }
    .loader-20 .css-diamond {
        position: absolute;
        left: calc(50% - 50px);
        top: calc(50% - 50px);
        -webkit-transform: scale(0.3);
            -ms-transform: scale(0.3);
                transform: scale(0.3);
        -webkit-transform-origin: 50% 100%;
            -ms-transform-origin: 50% 100%;
                transform-origin: 50% 100%;
        border-color: transparent transparent #b88539 transparent;
    }
    .loader-20 .css-diamond:after {
        border-color: #a57731 transparent transparent transparent;
    }
    
    .css-diamond {
        border-style: solid;
        border-color: transparent transparent #8b6224 transparent;
        border-width: 0 25px 35px 25px;
        width: 125px;
        position: relative;
        margin: 10px 10px 10px -12px;
    }
    
    .css-diamond:after {
        content: "";
        position: absolute;
        top: 40px;
        left: -25px;
        width: 0;
        height: 0;
        border-style: solid;
        border-color: #c28d3e transparent transparent transparent;
        border-width: 90px 63px 0 63px;
    } 
    .loader-20 .css-diamond {
        position: absolute;
        left: calc(50% - 50px);
        top: calc(50% - 50px);
        -webkit-transform: scale(0.3);
            -ms-transform: scale(0.3);
                transform: scale(0.3);
        -webkit-transform-origin: 50% 100%;
            -ms-transform-origin: 50% 100%;
                transform-origin: 50% 100%;
        border-color: transparent transparent #d6bb92 transparent;
    }
</style>