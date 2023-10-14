<template>
<div class="app">
		<router-view />
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Select from './components/Select.vue';
</script>

<style lang="scss">
:root {
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Poppins;
}

body {
	background: #151719;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>