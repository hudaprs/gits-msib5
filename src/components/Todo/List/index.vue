<script setup lang="ts">
// Vue
import { ref } from 'vue'

// Types
import { TListProps } from './index.type'

// Define props and emits
const props = defineProps<TListProps>()
</script>

<template>
	<ul>
		<li v-for="todo in props.todoList" :on-mouseenter="">
			<p>
				{{ todo.title }}
			</p>

			<button>X</button>
		</li>
	</ul>
</template>

<style scoped>
ul {
	list-style: none;
	padding: 0;
}

li {
	padding: 12px 18px;
	width: 100%;
	height: 75px;
	font-size: 24px;
	font-weight: 400;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	background-color: #3b3b3b;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

button {
	background-color: transparent;
	color: #f87171;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 400;
}

button:hover {
	border: 1px solid #f87171;
}
</style>
