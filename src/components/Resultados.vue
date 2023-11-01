<template>
	<Sidebar></Sidebar>
		<div class="resultados">
			<!-- <div class="title">
				<h1>Resultados</h1>
				<p>Lista de candidatos</p>
			</div> -->
			<div class="candidatos">
				<div v-for="(candidato, index) in candidatos" :key="index" class="candidato-card">
					<div class="info">
						<span class="candidato">{{ candidato.nome }}</span>
						<span class="match">{{ candidato.match }}%</span>
							<button class="visualizar-button" @click="Visualizar =! Visualizar">Visualizar</button>
					</div>
					<div class="bar">
						<div class="ranked-bar" :style="{ width: `${candidato.match}%` }"></div>
					</div>


					<div v-if="Visualizar">
						<Candidatos />
					</div>
				</div>
			</div>
		</div>
</template>


<script>

import Sidebar from '../components/Sidebar.vue'
import Candidatos from '../components/Candidatos.vue'

export default {
	data() {
		return {
			candidatos: [
				{ id: 1, nome: 'Candidato 1', match: 50 },
				{ id: 2, nome: 'Candidato 2', match: 70 },
				{ id: 3, nome: 'Candidato 3', match: 60 },
				{ id: 4, nome: 'Candidato 4', match: 90 },
				{ id: 5, nome: 'Candidato 5', match: 35 },
				{ id: 6, nome: 'Candidato 6', match: 85 },
				{ id: 7, nome: 'Candidato 7', match: 95 },
				{ id: 8, nome: 'Candidato 8', match: 65 },
			],

			Visualizar: false

		};
		
	},
	components: 
	{
		Sidebar,
		Candidatos,
	},
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
	font-family: Poppins;
}

.resultados {
	width: 100%;
	margin-left: 10vh;
}

.title h1 {
	color: #fff;
	min-height: 10vh;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	font-size: 40px;
	margin-top: 4vh;
	margin-left: 40px;
}

.title p {
	color: #fff;
	font-size: 20px;
	margin-left: 5vh;
	margin-left: 10vh;
	margin-bottom: 4vh;
}

.candidato-card {
	background: #0e1011;
	padding: 16px;
	margin: 5px 2px;
	width: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	/* border: none; */
	align-items: center;
	border-bottom: solid 1px #ffffff4d;
}

.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.candidato {
	font-weight: normal;
	color: #fff;
}

.bar {
	width: 100%;
	background-color: #eee;
	height: 10px;
	margin-top: 8px;
	border-radius: 5px;
}

.ranked-bar {
	height: 100%;
	background-color: #5D5DFF;
	border-radius: 5px;
}

.match {
	color: #fff;
}

.visualizar-button {
	background-color: #5D5DFF;
	color: white;
	margin-bottom: 1vh;
	padding: 8px 16px;
	display: inline-block;
	cursor: pointer;
	border-radius: 5px;
	box-shadow: 0 5px 15px rgb(0, 0, 0, 0.5);
	transition: all 0.5s ease;
}
.visualizar-button:hover {
	background-color: #5858ee;
	transform: translateY(-3px);
}</style>