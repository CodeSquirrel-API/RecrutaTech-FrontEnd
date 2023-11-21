<template>
  <div class="container" style="color: rgb(255, 255, 255);">

    <div class="select-btn">

      <input v-model="searchQuery" @input="filterCandidates" class="autocomplete-input"
        placeholder="Search for a cargo" />

      <select v-model="selectedCargo" class="select-option txt-select" @change="getNivel(selectedCargo)">
        <option value="" disabled selected>Selecione o cargo</option>
        <option v-for="(item, index) in sortedCandidates" :key="index" :value="item" class="select-option txt-select">
          {{ item }}
        </option>
      </select>

      <select v-model="nivel" name="experience" class="select-option txt-select">
        <option value="" disabled selected>Selecione o nível</option>
        <option v-for="(experience, index) in positionsExperience" :key="index" :value="experience">
          {{ experience }}
        </option>
      </select>

      <button class="btn-buscar" @click="buscarCandidatosPorFiltro">Buscar</button>
    </div>

    <div v-for="(candidato, index) in candidatosFiltrados" :key="index" class="candidato-container">
      <div class="candidato-card">
        <div class="info">
          <span class="candidato">{{ candidato.name }}</span>
          <span class="match">{{ candidato.match }}%</span>
          <button class="visualizar-button" @click="toggleVisualizar(candidato)">
            {{ visualizar && candidatoSelecionado === candidato ? 'Fechar' : 'Visualizar' }}
          </button>
        </div>
        <div class="bar">
          <div class="ranked-bar" :style="{ width: `${candidato.match}%` }"></div>
        </div>
      </div>

      <div class="candidato-info" v-if="visualizar && candidatoSelecionado === candidato">
        <p class="infos"><strong>Informações do Candidato</strong></p>
        <p class="texto-info">Nome: {{ candidato.name }}</p>
        <p class="texto-info">E-mail: {{ candidato.email }}</p>

        <hr>

        <p class="infos"><strong>Conhecimentos</strong></p>
        <ul>
          <li v-for="(conhecimento, index) in candidato.knowledgeList" :key="index">
            <p class="texto-info">{{ conhecimento.name }}</p>
          </li>
        </ul>

        <hr>

        <p class="infos"><strong>Habilidades</strong></p>
        <ul>
          <li v-for="(habilidade, index) in candidato.skillsList" :key="index">
            <p class="texto-info"><strong>{{ habilidade.name }}</strong>: {{ habilidade.description }}</p>
          </li>
        </ul>

        <hr>

        <p class="infos"><strong>Atitudes</strong></p>
        <ul>
          <li v-for="(atitude, index) in candidato.attitudeList" :key="index">
            <p class="texto-info">{{ atitude.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import AutoComplete from 'Select.vue';
export default {
  data() {
    return {
      candidates: [],
      selectedCargo: '',
      nivel: '',
      candidatesProfessions: [],
      positionsExperience: [],
      candidatosFiltrados: [],
      isDropdownVisible: false,
      candidatoSelecionado: null,
      visualizar: false,
      searchQuery: "",
    };
  },

  computed: {
    filteredCandidates() {
      return this.candidatesProfessions.filter(candidate =>
        candidate.toLowerCase().includes(this.searchQuery.toLowerCase())

      );
    },

    showSelect() {
      return this.searchQuery.length > 0;
    },

    sortedCandidates() {
      const sortedList = [...this.filteredCandidates];
      
      sortedList.sort();

      return sortedList;
    }
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

    filterCandidates() {
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

    toggleVisualizar(candidato) {
      this.visualizarCandidato(candidato);
      this.visualizar = !this.visualizar;
    },
  },

  sortedCandidates() {
      return this.filteredCandidates.slice().sort();
    },

  beforeMount() {
    this.getCandidates();
    this.getPositions();
  },
};
</script>

<style scoped>
.container {
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
  margin: 10px;
  margin-left: 27vh;
  width: 170%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  /* border: none; */
  align-items: center;
  box-shadow: inset 0px -2px 0.5px #ffffffa8;
  flex: 1;
}

.candidato-info {
  background: #0e1011;
  padding: 16px;
  margin: 10x 2px;
  margin-left: 27vh;
  width: 170%;
  padding: 10px 50px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px #ffffffa8;
  flex: 1;
}

.btn-buscar {
  background-color: #5D5DFF;
  color: white;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 8px 56px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgb(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  position: relative;
}

.btn-buscar:hover {
  opacity: 0.8;
}


.select-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2vw;
  margin-left: 70%;
  justify-content: center;
  text-align: center;
}

.select-option,
.btn-buscar {
  display: block;
  margin: 5px;
}

.select-btn select {
  display: block;
  cursor: pointer;
  width: 400px;
  height: 50px;
  margin: 8px;
  color: #fff;
  font-size: 22px;
  background: #0e1011;
  border-radius: 7px;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.infos {
  margin-bottom: 2vh;
  margin-top: 2vh;
}

.texto-info {
  margin: 1vh 0;
}

.autocomplete-input {
  display: block;
  width: 400px;
  height: 50px;
  margin: 8px;
  color: #fff;
  font-size: 22px;
  background: #0e1011;
  border-radius: 7px;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
