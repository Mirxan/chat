import Vue from 'vue'
import Vuex from 'vuex'
// user service
import {UserService} from "../services/user.service";
// modules
import {chat} from "./chat.module"
import { TokenService } from './../services/storage.service'
Vue.use(Vuex)

const store = new Vuex.Store(
	{
		plugins:[],
		modules:{
			chat
		},
		state:{
			message: [],
		},
		getters:{
			authMessage(state){
				return state.message
			},
		},
		mutations:{
			loginSuccess(state,user){
				TokenService.saveCurrentUser(user.user);
			},
			loginError(state,message){
				state.message = message;
			},
		},
		actions:{
			async login({ commit,dispatch }, userData) {
				try{
					const data = await UserService.login(userData);
					await commit('loginSuccess', data.data);
				}catch(e){
					return false;
				}
			},
			logout({ commit }){
				UserService.logout();
			},
		}
	}
)

export default store;

