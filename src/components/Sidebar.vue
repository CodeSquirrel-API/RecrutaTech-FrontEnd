<template>
	<aside class="fixed-menu">
		<div class="logo">
			<img :src="logoURL" alt="Vue" />
		</div>

		<div class="menu">
			<router-link to="/home" class="button">
				<span class="material-icons">description</span>
				<span class="text">Inserir Descrição</span>
			</router-link>
			<router-link to="/busca" class="button">
				<span class="material-icons">search</span>
				<span class="text">Buscar</span>
			</router-link>
			<!-- <router-link to="/resultados" class="button">
		  <span class="material-icons">timeline</span>
		  <span class="text">Resultados</span>
		</router-link> -->
			<router-link to="/bancocha" class="button">
				<span class="material-icons">group</span>
				<span class="text">Banco CHA</span>
			</router-link>
			<router-link to="/configuracoes" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Configurações</span>
			</router-link>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<router-link to="/quit" class="button" @click="logout">
				<span class="material-icons">logout</span>
				<span class="text">Sair</span>
			</router-link>
		</div>
	</aside>
</template>
  
<script>
import logoURL from '../assets/logo.png';

export default {
  methods: {
    logout() {

      const token = localStorage.getItem('token');
      if (token) {

        localStorage.removeItem('token');

       
        this.$router.push('/login'); 
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.fixed-menu {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: 999;
	display: flex;
	flex-direction: column;
	background-color: #121415;
	color: #fff;
	width: 18%;
	overflow-y: auto;
	padding: 1rem;
	transition: 0.2s ease-in-out;
}

.fixed-menu .logo img {
	width: 50px;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 5vh;
}

.fixed-menu h3 {
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
	color: #fff;
}

.fixed-menu .menu {
	margin: 0 -1rem;
}

.fixed-menu .button {
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

.fixed-menu .flex {
	flex: 1;
}
</style>
  