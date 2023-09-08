<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <span class="nav-link">
          <i class="fa fa-users"></i>
          {{ name }}
          
        </span>
      </li>
      <li class="nav-item">
        <a
            class="nav-link"
            href="#"
            @click="logOut"
        >
          <p style="color: red;">
            Logout
          </p>
        </a>
      </li>
    </ul>

  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    name: String
  },
  methods: {
    logOut() {
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('api/admin/logout').then(response => {
            console.log(response);
            this.$store.dispatch('LogOut');
            this.$router.push("/login");
          }).catch(error => {
            // console.log(error);
            this.$swal({
              icon: 'error',
              text: error.response.data.message,
            });
          })
        }
      })
    }
  }
}
</script>
