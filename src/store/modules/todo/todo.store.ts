// Pinia
import { defineStore } from 'pinia'

// Types
import { TTodoStore } from './todo.store.type'

// Axios
import defaultAxios from 'axios'

// Types
import { TTodo, TTodoFilter } from '../../../types/todo.type'

// Axios Instance
const axios = defaultAxios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
})

const useTodoStore = defineStore('todo', {
	state: (): TTodoStore['state'] => ({
		loading: false,
		list: [],
		filter: 'all'
	}),
	getters: {
		getFilteredList(state): TTodo[] {
			return state.list.filter(todo => {
				if (state.filter === 'active') return !todo.completed
				if (state.filter === 'completed') return todo.completed
				if (state.filter === 'all') return todo
			})
		},
		getActiveTodoList(state): TTodo[] {
			return state.list.filter(todo => !todo.completed)
		}
	},
	actions: {
		/**
		 * @description Set todo filter
		 *
		 * @param {TTodoFilter} filter
		 *
		 * @return {void} void
		 */
		SET_TODO_FILTER(filter: TTodoFilter): void {
			this.filter = filter
		},

		/**
		 * @description Clear completed todo
		 *
		 * @return {void} void
		 */
		CLEAR_COMPLETED(): void {
			this.list = this.list.filter(todo => !todo.completed)
		},

		/**
		 * @description Fetch todo list
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		async fetchTodoList(): Promise<void> {
			this.loading = true

			try {
				const { data } = await axios.get('/todos', {
					params: {
						_limit: 5
					}
				})

				this.list = data
			} catch (_) {
				//
			} finally {
				this.loading = false
			}
		},

		/**
		 * @description Create new todo
		 *
		 * @param {string} title
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		async createTodo(title: string): Promise<void> {
			this.loading = true

			try {
				const newTodo = {
					id: Math.random(),
					title,
					completed: false
				}

				await axios.post('/todos', newTodo)

				this.list = [newTodo, ...this.list]
			} catch (_) {
				//
			} finally {
				this.loading = false
			}
		},

		/**
		 * @description Update existing todo
		 *
		 * @param {string} title
		 * @param {string} type
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		async updateTodo(id: number): Promise<void> {
			this.loading = true

			try {
				let existedTodo = this.list.find(todo => todo.id === id) as TTodo

				// Update status
				existedTodo.completed = !existedTodo.completed

				await axios.put(`/todos/${id}`, existedTodo)

				this.list = this.list.map(todo => (todo.id === id ? existedTodo : todo))
			} catch (_) {
				//
			} finally {
				this.loading = false
			}
		},

		/**
		 * @description Delete existing todo
		 *
		 * @param {number} id
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		async deleteTodo(id: number): Promise<void> {
			this.loading = true

			try {
				await axios.delete(`/todos/${id}`)

				this.list = this.list.filter(todo => todo.id !== id)
			} catch (_) {
				//
			} finally {
				this.loading = false
			}
		}
	}
})

export { useTodoStore }
