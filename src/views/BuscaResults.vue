<template>
	<Sidebar></Sidebar>
	<div class="page-content">
		<div class="container">
			
			<h1>Resultados</h1>
			<p>Lista de buscas, Selecione uma profissão para verificar os candidatos</p>
			<SelectMenu></SelectMenu>
		</div>	
		<div class="container-candidato">
			<div class="resultado">
				<Resultados></Resultados>
			</div>
		
			
		</div>

		
	</div>		
</template>
  
<script>
import SelectMenu from "../components/Select.vue";
import Sidebar from '../components/Sidebar.vue';
import Resultados from '../components/Resultados.vue';
import Candidatos from '../components/Candidatos.vue';

export default {
	components: {
		SelectMenu, Sidebar, Resultados, Candidatos,
	},

	methods: {
		created() {
    	this.getCandidates();},
  	},
};



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');




* {
	font-family: Poppins;
}

.candidatos{
	width: 50%;
	float: right;
	
}
.container-candidato{
	display: flex;
	justify-content: space-between;
}

.page-content {
	justify-content: space-between;
	margin-left: 18%; 
	width: 100%;
	height: 100vh; 
	/* overflow: hidden; */
}
.resultado{
	width: 40%;
}

.container {
	/* display: flex; */
	width: 100%;
}

.container h1 {
	
	color: #fff;
	min-height: 10vh;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	font-size: 40px;
	margin-left: 40px;
	margin-top: 4vh;
}

.container p {
	color: #fff;
	font-size: 20px;
	margin-left: 10vh;
}
</style>
  
