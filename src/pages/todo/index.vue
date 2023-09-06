<script setup lang="ts">
// Vue
import { ref, onMounted } from 'vue'

// Components
import TodoForm from '../../components/Todo/Form/index.vue'
import TodoFilter from '../../components/Todo/Filter/index.vue'
import TodoList from '../../components/Todo/List/index.vue'

// Store
import { useTodoStore } from '../../store/modules/todo/todo.store'

// Types
import { TTodoForm } from '../../types/todo.type'

// Store instance
const todoStore = useTodoStore()

// Common State
let todoForm = ref<TTodoForm>({ title: '' })

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
 * @description Create new todo
 *
 * @param {string} title
 *
 * @return {Promise<void>}
 */
const onCreateTodo = async (title: string): Promise<void> => {
	try {
		await todoStore.createTodo(title)

		todoForm.value.title = ''
	} catch (_) {
		//
	}
}

// Do when user came to this page
onMounted(() => {
	todoStore.fetchTodoList()
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
		:filter="todoStore.filter"
		:todo-list-length="todoStore.getActiveTodoList.length"
		@change="todoStore.SET_TODO_FILTER"
		@clear-completed="todoStore.CLEAR_COMPLETED"
	/>
	<!-- End Filter -->

	<!-- List -->
	<todo-list
		:list="todoStore.getFilteredList"
		@delete="todoStore.deleteTodo"
		@update-status="id => todoStore.updateTodo(id)"
	/>
	<!-- End List -->

	<p v-if="todoStore.loading" class="text-center">Loading...</p>
</template>

<style scoped>
h1 {
	font-size: 100px;
	margin: 0;
	text-align: center;
	font-weight: 100;
}
</style>
