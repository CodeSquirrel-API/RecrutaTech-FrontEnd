<template>
    <div class="container" style="color: white">
      <div>
        <h1>Buscar candidatos</h1>
        <p>Para encontrar um candidato, selecione o cargo e nível de atuação profissional:</p>
      </div>
  
      <div class="select">
        <select v-model="selectedCargo" class="select-option txt-select" @change="getNivel(selectedCargo)">
          <option v-for="(item, index) in candidatesProfessions" :key="index" :value="item" class="select-option txt-select">
            {{ item }}
          </option>
        </select>
  
        <select v-model="nivel" name="experience" class="select-option txt-select">
          <option v-for="(experience, index) in positionsExperience" :key="index" :value="experience">
            {{ experience }}
          </option>
        </select>
      </div>
  
      <div class="listaCandidatos">
        <button @click="getByProfessionAndExperience(selectedCargo, nivel)" style="background-color: blueviolet;">Buscar candidatos</button>
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
        candidatesCurrentProfession: [],
        ProfessionExperience: [],
        positionsExperience: [],
        positions: [],
        positionsName: [],
        candidatesProfession: [],
        ProfessionName: [],
        candidatesProfessions: [],
      };
    },
    methods: {
      async getCandidates() {
        try {
          const response = await axios.get('/candidates/getAll');
          this.candidates = response.data;
          this.candidatesProfessions = [...new Set(this.candidates.map((cand) => cand.currentProfession))];
          console.log(this.candidatesProfessions);
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      },
  
      async getByProfessionAndExperience(selectedCargo, nivel) {
        try {
          // Aqui você pode usar 'selectedCargo' e 'nivel' nos parâmetros da sua requisição
          const response = await axios.get(`/candidates/byProfessionAnaExperience?cargo=${selectedCargo}&nivel=${nivel}`);
          this.ProfessionExperience = response.data;
          console.log(this.ProfessionExperience);
          this.ProfessionName = [...new Set(this.ProfessionExperience.map(profession => profession.currentProfession))];
          
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      },
  
      async getPositions() {
        try {
          const response = await axios.get('/position/getAll');
          this.positions = response.data;
          this.positionsName = [...new Set(this.positions.map((pos) => pos.name))];
        } catch (error) {
          console.error('Erro na requisição de posições:', error);
        }
      },
  
      getNivel(selectedCargo) {
        // Filtra os candidatos com o cargo selecionado
        const filteredCandidates = this.candidates.filter(cand => cand.currentProfession === selectedCargo);

        // Mapeia os níveis de experiência dos candidatos filtrados
        this.positionsExperience = [...new Set(filteredCandidates.map(cand => cand.experiences))];
        console.log(this.positionsExperience);
        },


    },
  
    beforeMount() {
      this.getCandidates();
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  