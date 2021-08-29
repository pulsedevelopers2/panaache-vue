<template>
  <div class="items row">
    <div v-for="(item) in items" :key="item.id" class="itemblock col-xs-6 col-md-4">
      <span class="hyperlink">
        <div class="image">
          <img :src="item.image_link[0]">
        </div>
        <span class="row item_details">
          <span class="col-xs-12 col-sm-12 details container">
            <span class="title">{{ item.title }}</span><br>
          </span>
        </span>
        <span class="centered">
          <span class="title">
            {{ item.title }}<br>
            <button class="hover-button"><a class="hover-link" :href="'/item?&item=' + item.id">View</a></button>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            items: state => state.items.items,
            loaded: state => state.items.loaded
        })
    }
}
</script>
<style scoped>
.items {
  padding-left: 5% !important;
  padding-right: 5% !important;
  min-height: 25vmax;
}
.itemblock {
    min-height: calc(30vmax + 20vmin);
    display: inline-block;
    border: 20px solid rgb(0, 0, 0);
    text-align: center;
    background-color: rgba(77, 55, 52, 0.1);
    /* background: linear-gradient(40deg, black, rgb(34, 34, 34)) */
}
@media screen and (orientation: portrait) {
  .items {
    padding: none;
    min-height: 60vmax;
  }
  .itemblock { 
    border: 2px solid rgb(0, 0, 0);
  }
}
.item_details {
    width: 100%;
    min-height: 20%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
}
.itemblock:hover {
    border: 1px solid rgb(117, 76, 76);
}
.centered {
    display: none;
    width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 0;
    left: 0;
}
.centered .title {
    width: 100%;
}
.itemblock:hover .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fading;
    animation-duration: 0.6s;
}
.hover-button {
    border: 1px solid rgb(117, 76, 76);
    color: white;
    min-width: 50%;
    margin: 1%;
    padding: 1%;
    background: rgb(117, 76, 76);
}
.hover-link {
    display: block;
    width: 100%;
    height: inherit;
    text-decoration: none;
}
a {
    color: white;
}
.image {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0;
}
.image img {
    max-width: 53%;
    object-fit: contain;
}
</style>