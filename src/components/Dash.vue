<template>
  <div class="wrapper">
    <sidebar></sidebar>
    <navbar :name="user?.name"></navbar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from '@/layout/SideBar.vue';
import navbar from '@/layout/NavBar.vue';

export default {
  components: {
    sidebar,
    navbar,
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = this.$store.state.auth.user
  },
  mounted() {
    document.body.classList.remove('login-page');
    // this.$store.dispatch("LogOut");
  },
};
</script>

<style>
</style>
