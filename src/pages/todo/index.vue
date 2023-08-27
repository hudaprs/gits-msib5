<script setup lang="ts">
// Vue
import { ref, onMounted, computed } from 'vue'

// Components
import TodoForm from '../../components/Todo/Form/index.vue'
import TodoFilter from '../../components/Todo/Filter/index.vue'
import TodoList from '../../components/Todo/List/index.vue'

// Axios
import defaultAxios from 'axios'

// Types
import { TTodo, TTodoForm, TTodoFilter } from '../../types/todo.type'

const axios = defaultAxios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
})

// Common State
let todoForm = ref<TTodoForm>({ title: '' })
const loading = ref(false)
const todoList = ref<TTodo[]>([])
const todoFilter = ref<TTodoFilter>('all')
const filteredTodoList = computed((): TTodo[] => {
	return todoList.value.filter(todo => {
		if (todoFilter.value === 'active') return !todo.completed
		if (todoFilter.value === 'completed') return todo.completed
		if (todoFilter.value === 'all') return todo
	})
})
const activeTodoList = computed(() =>
	todoList.value.filter(todo => !todo.completed)
)

/**
 * @description Watch any change in todo form
 *
 * @param {string} type
 * @param {any} value
 *
 * @return {void} void
 */
const onChangeForm = (type: string, value: any) => {
	todoForm.value = { ...todoForm.value, [type]: value }
}

/**
 * @description Fetch todo list
 *
 * @return {Promise<void>} Promise<void>
 */
const fetchTodoList = async (): Promise<void> => {
	loading.value = true

	try {
		const { data } = await axios.get('/todos', {
			params: {
				_limit: 5
			}
		})

		todoList.value = data
	} catch (_) {
		//
	} finally {
		loading.value = false
	}
}

/**
 * @description Create new todo
 *
 * @param {string} title
 *
 * @return {Promise<void>} Promise<void>
 */
const onCreateTodo = async (title: string): Promise<void> => {
	if (!title) {
		alert('Please fill title!')
		return
	}

	loading.value = true

	try {
		const newTodo = {
			id: Math.random(),
			title,
			completed: false
		}

		await axios.post('/todos', newTodo)

		todoForm.value.title = ''

		todoList.value = [newTodo, ...todoList.value]
	} catch (_) {
		//
	} finally {
		loading.value = false
	}
}

/**
 * @description Update existing todo
 *
 * @param {string} title
 * @param {string} type
 *
 * @return {Promise<void>} Promise<void>
 */
const onUpdateTodo = async (id: number): Promise<void> => {
	loading.value = true

	try {
		let existedTodo = todoList.value.find(todo => todo.id === id) as TTodo

		// Update status
		existedTodo.completed = !existedTodo.completed

		await axios.put(`/todos/${id}`, existedTodo)

		todoList.value = todoList.value.map(todo =>
			todo.id === id ? existedTodo : todo
		)
	} catch (_) {
		//
	} finally {
		loading.value = false
	}
}

/**
 * @description Delete existing todo
 *
 * @param {number} id
 *
 * @return {Promise<void>} Promise<void>
 */
const onDeleteTodo = async (id: number): Promise<void> => {
	loading.value = true

	try {
		await axios.delete(`/todos/${id}`)

		todoList.value = todoList.value.filter(todo => todo.id !== id)
	} catch (_) {
		//
	} finally {
		loading.value = false
	}
}

/**
 * @description Clear completed
 *
 * @return {void} void
 */
const onClearCompleted = () => {
	todoList.value = todoList.value.filter(todo => !todo.completed)
}

// Do when user came to this page
onMounted(() => {
	fetchTodoList()
})
</script>

<template>
	<!-- Title -->
	<h1>Todos</h1>

	<!-- Form -->
	<todo-form
		:title="todoForm.title"
		@update:form="onChangeForm"
		@submit="onCreateTodo"
	/>
	<!-- End Form -->

	<!-- Filter -->
	<todo-filter
		:filter="todoFilter"
		:todo-list-length="activeTodoList.length"
		@change="filter => (todoFilter = filter)"
		@clear-completed="onClearCompleted"
	/>
	<!-- End Filter -->

	<!-- List -->
	<todo-list
		:todo-list="filteredTodoList"
		@delete="onDeleteTodo"
		@update-status="id => onUpdateTodo(id)"
	/>
	<!-- End List -->

	<p v-if="loading" class="text-center">Loading...</p>
</template>

<style scoped>
h1 {
	font-size: 100px;
	margin: 0;
	text-align: center;
	font-weight: 100;
}
</style>
