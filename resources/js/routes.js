import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {TokenService} from './services/storage.service'
// components
import Master from './components/layouts/Master'
import Chat from './components/chat/Chat'
import Login from './components/auth/Login'
// NotFound
import NotFound from './components/NotFound/NotFound'
const router = new Router({
	mode: 'history', 
	base: process.env.BASE_URL,
	linkActiveClass: 'open active',
	routes: [
		{
			path:'/',
			name:'master',
			redirect:'chat',
			components:{
				default:Master,
			},
			children:[
				{
					path:'chat',
					name:'chat',
					component:Chat,
					meta:{
						requiredAuth:true
					},
				},
				{
					path:'login',
					name:'login',
					component:Login
				}
			]
		},
		{
			path:'*',
			component:NotFound
		},
	]
});

// checking each router
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
  	const loggedIn = TokenService.getToken();
    if (!loggedIn || loggedIn == 'undefined'){
      // if the router doesnt have a permission 
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } 
    next() 
  } else {
    next() 
  }
})

export default router;
