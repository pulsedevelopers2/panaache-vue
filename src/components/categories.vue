<template>
  <div class="category row container">
    <a class="col-md-3 hidden-xs hidden-sm cat-text" href="/items?items='rings'">
      <span class="redded">R</span>INGS
    </a>
    <div class="col-md-2 hidden-xs hidden-sm cat-text">
      <span class="redded">E</span>ARINGS
    </div>
    <div class="col-md-2 hidden-xs hidden-sm cat-text">
      <span class="redded">P</span>ENDENTS
    </div>
    <div class="col-md-2 hidden-xs hidden-sm cat-text">
      <span class="redded">T</span>ANMAIYA
    </div>
    <div class="col-md-3 hidden-xs hidden-sm cat-text">
      <span class="redded">B</span>RACLETS
    </div>
  </div>
</template>
<style scoped>
.category{
    justify-content: center;
    text-align: center;
    align-content: center;
}
.cat-text{
    font-size: 110%;
    color: rgb(185, 157, 105);
}
.redded {
    font-size: 180%;
    background: linear-gradient( to right, #c48e3e 0, rgb(116, 40, 47) 22%, rgb(154, 28, 21) 35%, #c73939 50%, #c73939 55%, #c70505 78%, rgb(121, 48, 54) 40% );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>