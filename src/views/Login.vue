<template>
	<div class="login-box">
	  <!-- /.login-logo -->
	  <img width="200" class="logo-image" alt="Vue logo" src="@/assets/Bookme-logo.png"> <br>
	  <div class="card card-outline card-primary">
	    <div class="card-header text-center">
	      	<a class="h3"><b>Rider App</b> Admin panel</a>
	    </div>
	    <div class="card-body">
	    	<p class="login-box-msg">Sign in to start your session</p>
			<p v-if="error_message" class="error-message" role="alert">
				<strong>{{ error_message }}</strong>
			</p>

	      	<form @submit.prevent="submitLogin()">
		        <div class="input-group mb-3">
		          <input v-model="data.email" type="email" class="form-control" placeholder="Email">
		          <div class="input-group-append">
		            <div class="input-group-text">
		              <span class="fas fa-envelope"></span>
		            </div>
		          </div>
		          <span v-if="errors.email" class="invalid-feedback" role="alert">
                      <strong>{{ errors.email[0] }}</strong>
                  </span>
		        </div>
		        <div class="input-group mb-3">
		          <input v-model="data.password" type="password" class="form-control" placeholder="Password">
		          <div class="input-group-append">
		            <div class="input-group-text">
		              <span class="fas fa-lock"></span>
		            </div>
		          </div>
		          <span v-if="errors.password" class="invalid-feedback" role="alert">
                      <strong>{{ errors.password[0] }}</strong>
                  </span>
		        </div>
		        <div class="row">
		        	<div class="col-8">
		          	</div>
		          	<!-- /.col -->
		          	<div class="col-4">
		            	<button type="submit" class="btn btn-primary btn-block">Sign In</button>
		          	</div>
		          <!-- /.col -->
		        </div>
	      	</form>
	    </div>
	    <!-- /.card-body -->
	  </div>
	  <!-- /.card -->
	</div>
</template>
<script>
// @ is an alias to /src

export default {
name: 'LoginView',
data () {
    return {
		data         : {},
		errors       : {},
		error_message: '',
    };
},
components: {
},
methods: {
	submitLogin() {
		// console.log('here');
		// return false;
		/*axios code started*/
  		axios.post('api/admin/login', this.data
  		).then(response => {      
  			this.errors = {};
  			this.error_message = '';
  			this.$store.dispatch("LogIn", response.data.data);
  			this.$swal({
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500
  			});
  			this.$router.push("/");
  		}).catch(error => {
  			this.errors = {};
  			this.error_message = '';
  			if (error.response?.data.errors) {
  			  this.errors = error.response.data.errors;
  			}
  			this.$swal({
  			  icon: 'error',
  			  text: error.response?.data.message,
  			});
  			this.error_message = error.response?.data.message;
  		}).finally(() => {
  			
  		});
	}
},

mounted() {
	document.body.classList.add('login-page');
	// console.log(this.$store.state?.user);
},

};
</script>

<style scoped>
	.login-box {
	    width: 452px;
	    margin-top: -167px;
	}
	.logo-image{
	    margin-bottom: 30px;
		margin-left: 108px;
	}
	.error-message{
		text-align: center;
		margin: 0;
		color: red;
	}

</style>