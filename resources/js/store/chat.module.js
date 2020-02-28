import {ChatService} from "../services/chat.service";

const state = {
	users: [],
	messages: [],
	status:[],
	loading:false
};

const getters = {
	getUsers(state){
		return state.users
	},
	getMessages(state){
		return state.messages
	},
	getStatus(state){
		return state.status
	}
};


const actions = {
	async ActionUsers({commit}){
		try {
			let data = await ChatService.usersList();
			await commit('setUsers',data.data.result)
			return true
		}catch(e){
			return false
		}
	},
	async ActionGetMessages({commit},id){
		try {
			let data = await ChatService.userMessages(id);
			await commit('setMessages',data.data.result)
			return true
		}catch(e){
			return false
		}
	},
	async ActionSendMessage({commit},payload){
		try {
			let data = await ChatService.sendMessage(payload);
			await commit('setStatus',data.data)
			return true
		}catch(e){
			return false
		}
	},
};

const mutations = {
	setUsers(state, users){
		state.users = users
	},
	setMessages(state, messages){
		state.messages = messages
	},
	setStatus(state, status){
		state.status = status
	},
};

export const chat = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
