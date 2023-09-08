<template>
  <loader 
      :is-visible="isLoading"
  ></loader>
  <router-view/>
</template>

<script>
import sidebar from '@/layout/SideBar.vue';
import navbar from '@/layout/NavBar.vue';

export default {
  components: {
    sidebar,
    navbar,
  },
  mounted() {
    document.body.classList.remove('login-page');
  }
};  
</script>

