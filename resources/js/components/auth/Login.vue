<template>
	<div class="container">
		<div class="d-flex justify-content-center h-100">
			<div class="card">
				<div class="card-header">
					<h3>Sign In</h3>
					<div class="d-flex justify-content-end social_icon">
						<span><i class="fab fa-facebook-square"></i></span>
						<span><i class="fab fa-google-plus-square"></i></span>
						<span><i class="fab fa-twitter-square"></i></span>
					</div>
				</div>
				<div class="card-body">
					<form @submit.prevent="loginForm">
						<div class="input-group form-group">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="fas fa-envelope"></i></span>
							</div>
							<input type="text" class="form-control" v-model="form.email" placeholder="Email">
						</div>
						<div class="input-group form-group">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" class="form-control" v-model="form.password" placeholder="password">
						</div>
						<div class="form-group">
							<input type="submit" value="Login" class="btn float-right login_btn">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex'
	export default{
		data(){
			return{
				form:{
					email:null,
					password:null,
				}
			}
		},
		computed:{
			...mapGetters(['authMessage','getUser'])
		},
		methods:{
			...mapActions(['login']),
			async loginForm(){
				if (this.form.email != "" && this.form.password != "") {
			        await this.login(this.form);
		          	this.$router.push('/chat')
		      	}
			}
		}
	}
</script>
<style scoped>
.container{
	display:flex;
	justify-content:center;
	align-content: center;
	height: 100vh;
	padding-bottom:100px;
}
.card{
	margin-top: auto;
	margin-bottom: auto;
	width: 400px;
	background-color: rgba(0,0,0,0.5) !important;
}
.social_icon span{
	font-size: 60px;
	margin-left: 10px;
	color: #FFC312;
}
.social_icon span:hover{
	color: white;
	cursor: pointer;
}
.card-header h3{
	color: white;
}
.social_icon{
	position: absolute;
	right: 20px;
	top: -45px;
}
.input-group-prepend span{
	width: 50px;
	background-color: #FFC312;
	color: black;
	border:0 !important;
}
input:focus{
	outline: 0 0 0 0  !important;
	box-shadow: 0 0 0 0 !important;
}
.remember{
	color: white;
}
.remember input
{
	width: 20px;
	height: 20px;
	margin-left: 15px;
	margin-right: 5px;
}
.login_btn{
	color: black;
	background-color: #FFC312;
	width: 100px;
}
.login_btn:hover{
	color: black;
	background-color: white;
}
.links{
	color: white;
}
.links a{
	margin-left: 4px;
}
</style>