<script setup lang="ts">
// Components
import AppHeader from './components/AppHeader.vue'
</script>

<template>
	<!-- Header -->
	<app-header />
	<!-- End Header -->

	<!-- Entry Point For Router -->
	<router-view />
	<!-- End Entry Point For Router -->
</template>
