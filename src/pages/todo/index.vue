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
const todoList = ref<TTodo[]>([])
const todoFilter = ref<TTodoFilter>('all')
const filteredTodoList = computed(() => {
	return todoList.value.filter(todo => {
		if (todoFilter.value === 'active') return !todo.completed
		if (todoFilter.value === 'completed') return todo.completed
		if (todoFilter.value === 'all') return todo
	})
})

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
	try {
		const { data } = await axios.get('/todos', {
			params: {
				_limit: 5
			}
		})

		todoList.value = data
	} catch (_) {
		//
	}
}

/**
 * @description Create new todo
 *
 * @param {string} title
 *
 * @return {Promise<void>} Promise<void>
 */
const createTodo = async (title: string): Promise<void> => {
	try {
		const newTodo = {
			id: Math.random(),
			title,
			completed: false
		}

		const { data } = await axios.post('/todos', newTodo)

		console.log('DATA', data)

		todoList.value = [newTodo, ...todoList.value]
	} catch (_) {
		//
	}
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
	<todo-form :title="todoForm.title" @update:form="onChangeForm" />
	<!-- End Form -->

	<!-- Filter -->
	<todo-filter :filter="todoFilter" @change="filter => (todoFilter = filter)" />
	<!-- End Filter -->

	<!-- List -->
	<todo-list :todo-list="filteredTodoList" />
	<!-- End List -->
</template>

<style scoped>
h1 {
	font-size: 100px;
	margin: 0;
	text-align: center;
	font-weight: 100;
}
</style>
