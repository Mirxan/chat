import ApiService from './api.service'
import { TokenService } from './storage.service'

class AuthenticationError extends Error{
	constructor (message){
		super(message)
		this.name = this.constructor.name
	}
}

const UserService = {
	/**
	 * Login the user and store the access token to TokenService.
	 *
	 * @returns access_token
	 * @throws AuthenticationError
	 **/
	login: async function (userData){
		const requestData = {
			method: 'post',
			url: '/api/login',
			data: {
				email: userData.email,
				password: userData.password
			}
		};

		try {
			const response = await ApiService.customRequest(requestData);
			TokenService.saveToken(response.data.token);
			ApiService.setHeader();
			ApiService.mount401Interceptor();
			return response;
		} catch (error) {
			throw new AuthenticationError(error.message);
		}
	},
	/**
	 * Logout the current user by removing the token from storage.
	 *
	 * Will also remove `Authorization Bearer <token>` header from future requests.
	 **/
	logout(){
		// Remove the token and remove Authorization header from Api Service as well
		ApiService.post('/api/logout');
		TokenService.removeToken();
		TokenService.removeCurrentUser();
		ApiService.removeHeader();
		// // NOTE: Again, we'll cover the 401 Interceptor a bit later.
		ApiService.unmount401Interceptor()
	},

};

export { UserService,AuthenticationError };
