<template>
	<Header></Header>
	<Sidebar></Sidebar>
	<div class="page-content">
		<div class="container">
			<h2 class="title">Buscar Candidatos</h2>
        	<p>Encontre o candidato ideal ao selecionar o cargo e o nível de atuação profissional desejados. Após efetuar a busca, clique em "Visualizar" para acessar o currículo completo do candidato.</p>
			<!-- <SelectMenu></SelectMenu> -->
		</div>	
		<div class="container-candidato">
			<div class="resultado">
				<!-- <Resultados></Resultados> -->
				<Candidatos />
			</div>
		
			
		</div>

		
	</div>		
</template>
  
<script>
import SelectMenu from "../components/Select.vue";
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Candidatos from '../components/Candidatos.vue';

export default {
	components: {
		SelectMenu, Sidebar, Header, Candidatos,

	},

	methods: {
		created() {
    	this.getCandidates();},
  	},
};



</script>

<style>
/*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');*/


/* 

* {
	font-family: Poppins;
} */

.title {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 30px;
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
	color: #999898;
	margin: 10px 20px 15px 20px;
	font-size: 17px;	
}
</style>
  
