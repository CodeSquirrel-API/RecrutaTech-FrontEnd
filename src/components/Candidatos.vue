<template>
  <div class="container" style="color: rgb(255, 255, 255);">

    <div class="select-btn">
      <select v-model="selectedCargo" class="select-option txt-select" placeholder="Selecione o cargo." @change="getNivel(selectedCargo)">
        <option v-for="(item, index) in candidatesProfessions" :key="index" :value="item" class="select-option txt-select">
          {{ item }}
        </option>
      </select>

      <select v-model="nivel" name="experience" placeholder="Selecione o nível de experiência." class="select-option txt-select">
        <option v-for="(experience, index) in positionsExperience" :key="index" :value="experience">
          {{ experience }}
        </option>
      </select>
      <button @click="buscarCandidatosPorFiltro" style="display: block;" class="btn-buscar" >Buscar</button>
    </div>

    

    

    <div v-for="(candidato, index) in candidatosFiltrados" :key="index" class="candidato-card">

      <div class="info">
        <span class="candidato">{{ candidato.name }}</span>
        <span class="match">{{ candidato.match }}%</span>

    
        <button class="visualizar-button" @click="visualizarCandidato(candidato), visualizar = visualizar">Visualizar</button>
      </div>
      <div class="bar">
						<div class="ranked-bar" :style="{ width: `${candidato.match}%` }"></div>
			</div>



      
      <div v-if="visualizar">
        <div class="candidato-info" v-if="candidatoSelecionado === candidato">
          <p class=""><strong>Informações do Candidato</strong></p>
          <p style="margin-left: 20px;">Nome: {{ candidato.name }}</p>
          <p style="margin-left: 20px;">E-mail: {{ candidato.email }}</p>

          <hr>

          <p><strong>Conhecimentos</strong></p>
          <ul>
            <li v-for="(conhecimento, index) in candidato.knowledgeList" :key="index">
              <p style="margin-left: 20px;"> {{ conhecimento.name }}</p>
              <!-- <p><strong>Descrição:</strong> {{ conhecimento.description }}</p> -->

            </li>
          </ul>

          <hr>

          <p><strong>Habilidades</strong></p>
          <ul>
            <li v-for="(habilidade, index) in candidato.skillsList" :key="index">
              <p style="margin-left: 20px;"><strong></strong> {{ habilidade.name }}</p>
              <p style="margin-left: 20px;"><strong></strong> {{ habilidade.description }}</p>
            </li>
          </ul>

          <hr>

          <p><strong>Atitudes</strong></p>
          <ul>
            <li v-for="(atitude, index) in candidato.attitudeList" :key="index">
              <p style="margin-left: 20px;"> {{ atitude.name }}</p>
              <!-- <p><strong>Descrição:</strong> {{ atitude.description }}</p> -->

            </li>
          </ul>

        </div>
    </div>
  </div>

    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      candidates: [],
      selectedCargo: '',
      nivel: '',
      candidatesProfessions: [],
      positionsExperience: [],
      candidatosFiltrados: [], 
      candidatoSelecionado: null,
      visualizar: false,
    };
  },
  methods: {
    async getCandidates() {
      try {
        const response = await axios.get('/candidates/getAll');
        this.candidates = response.data;
        this.candidatesProfessions = [...new Set(this.candidates.map((cand) => cand.currentProfession))];
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },

    async getPositions() {
      try {
        const response = await axios.get('/position/getAll');
        this.positionsExperience = [...new Set(response.data)];
      } catch (error) {
        console.error('Erro na requisição de posições:', error);
      }
    },

    getNivel(selectedCargo) {
      const filteredCandidates = this.candidates.filter(cand => cand.currentProfession === selectedCargo);
      this.positionsExperience = [...new Set(filteredCandidates.map(cand => cand.experiences))];
    },


    buscarCandidatosPorFiltro() {
      this.candidatosFiltrados = this.candidates.filter(
        (cand) => cand.currentProfession === this.selectedCargo && cand.experiences === this.nivel
      );
    },

    visualizarCandidato(candidato) {
      this.candidatoSelecionado = candidato;
    },
  },

  beforeMount() {
    this.getCandidates();
    this.getPositions();
  },
};
</script>

<style scoped>


.container{
  display: block;
  
}

.select-option::placeholder {
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
  display: flex;
	background-color: #5D5DFF;
	border-radius: 5px;
}
.select-option {
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;
  margin-top: 5px;
  height: 35px;
  margin-left: 5px;
}

.select-option:focus {
  border-color: #007bff;
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
}

.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.candidato-card {
	background: #0e1011;
	padding: 16px;
	margin: 5px 2px;
  margin-left: 27vh;
	width: 170%;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	/* border: none; */
	align-items: center;
	border-bottom: solid 1px #ffffff4d;
  flex: 1;
}

.candidato-info{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.btn-buscar{
  background-color: #5D5DFF;
	color: white;
  margin-left: 18vh;
	margin-top: 2vh;
  font-size: 20px;
	padding: 8px 56px;
	cursor: pointer;
	border-radius: 5px;
	box-shadow: 0 5px 15px rgb(0, 0, 0, 0.5);
	transition: all 0.5s ease;
}


.btn-buscar:hover{
  background-color: #5D5DFF;
	color: white;
  margin-left:18vh;
	margin-bottom: 1vh;
	padding: 8px 56px;
  opacity: 0.8;
	cursor: pointer;
	border-radius: 5px;
	box-shadow: 0 5px 15px rgb(0, 0, 0, 0.5);
	transform: translateY(-3px);
}

.select-btn {
  display: block;
  padding: 20px 20px;
  color: #fff;
  margin-left: 10vh;
  font-size: 22px;
  border-radius: 7px;
  justify-content: space-between;
}

.select-btn select{
  display: block;
  cursor: pointer;
  width: 400px;
  height: 50px;
  margin: 8px;
  color: #fff;
  font-size: 22px;
  background: #0e1011;
  border-radius: 7px;
  justify-content: space-between;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}


</style>
