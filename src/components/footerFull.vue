<template>
  <div class="col-xs-12 support-wrapper">
    <div v-for="link in support_links" :key="link['name']" class="col-xs-12 col-md-4 row support-block">
      <a :href="link['link']" class="col-xs-12 .verticle-aligned centered">{{ link.name }}</a>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            support_links: [
                {
                    name: 'Terms & condition',
                    link: '/policies'
                },
                {
                    name: 'Contact Us',
                    link: '/policies'
                },
                {
                    name: 'About us',
                    link: '/policies'
                },
                {
                    name: 'Franchise',
                    link: '/wholesale'
                },
                {
                    name: 'Feedback',
                    link: '/feedback'
                }
            ]
        }
    }
}
</script>
<style scoped>
.support-wrapper {
    padding: 1%;

}
.support-block {
    padding: 2%;
}
.support-block a {
    border: 1px solid rgb(24, 12, 12);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    background: rgb(24, 10, 10);
    text-decoration: none;
    color: white;
}
</style>