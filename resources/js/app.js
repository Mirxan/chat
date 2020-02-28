require('./bootstrap');
import Vue from 'vue'

// Router
import router from './routes'
//Vuex
import store from "./store/store"

import Master from './components/layouts/Master'

// Some services
import {TokenService} from './services/storage.service'
import ApiService from './services/api.service'

//Fire For Listers
window.Fire = new Vue();

// SET THE BASE_URL OF THE API
ApiService.init(process.env.VUE_APP_ROOT_API);
ApiService.mount401Interceptor();

// IF TOKEN EXISTS SET HEADER
if (TokenService.getToken()) {
	ApiService.setHeader();
	ApiService.mount401Interceptor();
}

const app = new Vue({
    el: '#app',
    router,
    components:{
      Master,
    },
	store,
});
