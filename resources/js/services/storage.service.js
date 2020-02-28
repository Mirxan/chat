const TOKEN_KEY = 'access_token'
const USER = 'user'

const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},
	saveToken(token) {
		localStorage.setItem(TOKEN_KEY, token);
	},
	saveCurrentUser(user){
		localStorage.setItem(USER, JSON.stringify(user));
	},
	getCurrentUser(){
		let data = JSON.parse(localStorage.getItem(USER));
		return data;
	},
	removeCurrentUser(){
		localStorage.removeItem(USER);
	},
	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
	}
};

export {TokenService}
