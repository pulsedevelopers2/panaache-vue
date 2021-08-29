<template>
  <div class="dropdown">
    <span>Gold Metal</span>
    <div class="dropdown-content">
      <p>Hello World!</p>
      <p>Hello World!</p>
    </div>
  </div>
</template>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  text-align: center;
  border-right: 1px solid grey;
  padding: 0.5%;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  color: black;
  text-align: center;
  min-width: 160px;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  animation: forwards 2s;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>