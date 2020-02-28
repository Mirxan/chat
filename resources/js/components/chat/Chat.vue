<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light navbar-header">
		  <a class="navbar-brand" href="#">Chat</a>
		  <div>
		    <ul class="navbar-nav mr-auto"></ul>
		    <span class="userInfo">{{user.name}}</span>
		    <button class="btn" type="button" @click.prevent="logoutUser">
		    	<b>Sign out</b>
		    	<i class="fas fa-sign-out-alt"></i>
		    </button>
		  </div>
		</nav>
		<div class="container py-5 px-4">
		  <div class="row rounded-lg overflow-hidden shadow">
		    <!-- Users -->
		    <div class="col-5 px-0">
		      <div class="bg-white">

		        <div class="bg-gray px-4 py-2 bg-light">
		          <p class="h5 mb-0 py-1">Contacts</p>
		        </div>

		        <div class="messages-box">
		          <div class="list-group rounded-0">

		            <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0" v-for="(item,index) in getUsers" :key="item.id" @click.prevent="getMessageById(item.id)">
		              <div class="media"><img :src="item.profile_image" alt="user" width="50" class="rounded-circle">
		                <div class="media-body ml-4">
		                  <div class="d-flex align-items-center justify-content-between mb-1">
		                    <h6 class="mb-0">{{item.name}}</h6>
		                  </div>
		                  <p class="font-italic text-muted mb-0 text-small">{{item.email}}</p>
		                </div>
		              </div>
		            </a>

		          </div>
		        </div>
		      </div>
		    </div>
		    <!-- Chat Box-->
		    <div class="col-7 px-0 content_block">
		    <div class="px-4 py-5 chat-box bg-white">

		      <div class="media w-50 mb-3" :class="mgs.from==contactId ? '' : ' ml-auto' " v-for="(mgs,index) in messages">
		        <div class="media-body ml-3">
		          <div class="rounded py-2 px-3 mb-2" :class="mgs.from==contactId ? ' bg-light' : ' bg-primary' ">
		            <p class="text-small mb-0" :class="mgs.from==contactId ? ' text-muted' : ' text-white' ">{{mgs.text}}</p>
		          </div>
		          <p class="small text-muted">{{mgs.created_at}}</p>
		        </div>
		      </div>

		    </div>
		    <!-- Typing area -->
		    <form class="bg-light" @submit.enter.prevent="send">
		      <div class="input-group" v-if="contactId">
		        <input type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light" v-model="text">
		        <div class="input-group-append">
		          <button id="button-addon2" type="submit" class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
		        </div>
		      </div>
		    </form>
		  </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import { TokenService } from './../../services/storage.service'
	import {mapActions,mapGetters} from 'vuex'
	export default{
		data(){
			return{
				contactId:null,
				user:[],
				messages:[],
		        text:null,
			}
		},
		watch:{
	      getMessages:{
	        handler(){
	          this.messages=this.getMessages
	        }
	      },
	    },
		computed:{
	      ...mapGetters('chat',['getUsers','getMessages'])
	    },
		async mounted(){
			await this.ActionUsers()
			this.user = TokenService.getCurrentUser()
		},
		methods:{
			...mapActions('chat',['ActionUsers','ActionSendMessage','ActionGetMessages']),
			...mapActions(['logout']),
			async logoutUser(){
				await this.logout()
				this.$router.push('/login')
			},
			async getMessageById(id){
		        await this.ActionGetMessages(id)
		        this.contactId = id
	      	},
	      	async send(){
		        let data = {
		          contact_id:this.contactId,
		          text: this.text
		        }
		        if (this.text && this.contactId) {
		          await this.ActionSendMessage(data)
		          await this.ActionGetMessages(this.contactId)
		          this.text = null
		        }
	      	}
		},
	}
</script>
<style scoped>
	.navbar-header{
		display:flex;
		justify-content: space-between;
	}
	.userInfo{
	    border: 1px solid #ccc;
	    margin-right: 20px;
	    padding: 4px;
	}
</style>