// Vue
import { createApp } from 'vue'

// Styles
import './style.css'

// Components
import App from './App.vue'

// Pinia
import { pinia } from './store'

// Vue Router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Pages
import Home from './pages/home/index.vue'
import Todo from './pages/todo/index.vue'
import About from './pages/about/index.vue'

// List of routes
const routes: RouteRecordRaw[] = [
	{ path: '/', component: Home },
	{ path: '/todos', component: Todo },
	{ path: '/about', component: About }
]

// Vue Router
const router = createRouter({
	history: createWebHistory(),
	routes
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
