<template>
	<aside class="is-expanded">
		<div class="logo">
			<img :src="logoURL" alt="Vue" />
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/home" class="button">
				<span class="material-icons">description</span>
				<span class="text">Inserir Descrição</span>
			</router-link>
			<router-link to="/busca" class="button">
				<span class="material-icons">search</span>
				<span class="text">Buscar</span>
			</router-link>
			<router-link to="/resultados" class="button">
				<span class="material-icons">timeline</span>
				<span class="text">Resultados</span>
			</router-link>
			<router-link to="/bancocha" class="button">
				<span class="material-icons">group</span>
				<span class="text">Banco CHA</span>
			</router-link>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<router-link to="/settings" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Configurações</span>
			</router-link>
		</div>
	</aside>
</template>
  
<script setup>
	import logoURL from '../assets/logo.png';
	
</script>
  
<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
	background-color: #121415;
	color: #fff;
	width: calc(2rem + 32px);
	overflow: hidden;
	width: 300px;
	min-height: 100vh;
	padding: 1rem;
	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	h3 {
		color: #fff;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;
			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: #fff;
				margin-right: 10px;
				transition: 0.2s ease-in-out;
			}

			.text {
				color: #fff;
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: #121415;

				.material-icons,
				.text {
					color: #5D5DFF;
				}
			}

			&.router-link-exact-active {
				background-color: #121415;
				border-right: 5px solid #5D5DFF;

				.material-icons,
				.text {
					color: #5D5DFF;
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: #121415;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>
  