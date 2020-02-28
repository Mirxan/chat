import ApiService from './api.service'

const ChatService = {
	usersList(data){
		return ApiService.get('/api/contacts')
	},
	userMessages(id){
		return ApiService.get(`/api/userMessage/${id}`)
	},
	sendMessage(data){
		return ApiService.post(`/api/sendMessage`,data)
	}
};

export { ChatService };
