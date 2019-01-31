import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/login/login').default
    },
		{
			path: '/home',
			name: 'home',
			component: require('@/components/home/home').default,
			redirect: '/home/chat',
			children:[
				{
					path: '/home/chat',
					name: 'chat',
					component: require('@/components/chat/chat').default
				},
				{
					path: '/home/mailList',
					name: 'mailList',
					component: require('@/components/mailList/mailList').default
				},
				{
					path: '/home/collection',
					name: 'collection',
					component: require('@/components/collection/collection').default
				},
			]
		},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
