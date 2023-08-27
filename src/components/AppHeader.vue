<script setup lang="ts">
// Vue Router
import { RouterLinkProps } from 'vue-router'

const links: (RouterLinkProps & { label: string })[] = [
	{ to: '/', label: 'Home' },
	{ to: '/todos', label: 'Todo' },
	{ to: '/about', label: 'About' }
]
</script>

<template>
	<header>
		<nav>
			<ul>
				<li v-for="link in links" :key="link.label">
					<router-link :to="link.to" active-class="active">
						{{ link.label }}
					</router-link>
				</li>
			</ul>
		</nav>
		<hr />
	</header>
</template>

<style scoped>
ul {
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

ul li {
	font-size: 18px;
	font-weight: bold;
}

li:hover {
	cursor: pointer;
}

a {
	text-decoration: none;
	color: white;
	font-weight: 400;
}

.active {
	font-weight: 800;
}
</style>
