<template>
  <div class="wrapper" :class="{ active: isActive }">
    <div class="select-btn" @click="toggleDropdown">
      <span>{{ selectedCargo }}</span>
      <i class="uil uil-angle-down" style="color: #5D5DFF;"></i>
    </div>

    <div class="content">
      <div class="search">
        <i class="uil uil-search"></i>
        <input v-model="search" type="text" placeholder="Search" @input="filterCargos" />
      </div>
      
      <!-- logica para selecionar o cargo e chamar componente; -->
      <ul class="options">
        <li v-for="(cargo, index) in filteredCargos" :key="index" @click="updateCargo(cargo)"
          :class="{ selected: cargo === selectedCargo }" @change="">
          {{ cargo }}
        </li>
        <p v-if="filteredCargos.length === 0" style="margin-top: 10px; color: #fff; font-size: 20px;">Cargo não encontrado
        </p>
      </ul>
    </div>
    


    <button @click="skillGetAll()" class="btn-teste">FUNCAO AQUI</button>
    <select v-model="selectedSkillExperience" class="select-option txt-select">
      <option
        v-for="(experience, index) in skillExperience"
        :key="index"
        :value="experience"
        class="select-option txt-select">
        {{ experience }}
      </option>
</select>




  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      selectedCargo: "Selecione o cargo",
      search: "",
      isActive: false,
      cargos: [
        "Desenvolvedor de Software","Engenheiro de Software", "Desenvolvedor Web", "Desenvolvedor de Aplicativos Móveis",
        "Analista de Dados", "Engenheiro de Software", "Engenheiro de DevOps", "Engenheiro de Segurança Cibernética","Desenvolvedor de Jogos",
        "Engenheiro de Inteligência Artificial",
      ],
      candidates:[],
      candidatesCurrentProfession:[],
      skills: [],
      skillExperience:[],
      selectedSkillExperience: null,


    };
  },

  computed: {
    filteredCargos() {
      const searchWord = this.search.toLowerCase();
      return this.cargos.filter(cargo => cargo.toLowerCase().startsWith(searchWord));
    }
  },


  methods: {



    async getCandidates() {
      await axios.get('/candidates/getAll').then((response) => {
        this.candidates = response.data;
        this.candidatesCurrentProfession = [... new Set(this.candidates.map((cand) => cand.currentProfession))];
        console.log(this.candidates);
      });
    },

    getProfissao(cargo) {
          this.candidatesCurrentProfession = [];
          this.candidatesCurrentProfession = [
            ...new Set(this.candidates.filter((cand) => cand.currentProfession == cargo).map((cand) => cand.currentProfession)),
          ];
          console.log(this.candidatesCurrentProfession);
        },


        async skillGetAll() {
          await axios.get('/skill/getAll').then((response) => {
            this.skills = response.data;
            this.skillExperience = this.extractSkillExperience(this.skills);
            console.log(this.skillExperience);
          });
        },

      extractSkillExperience(skills) {
        const experience = skills.map((skill) => skill.experience);
        return [...new Set(experience)]; 
      },

    toggleDropdown() {
      this.isActive = !this.isActive;
    },
    filterCargos() {
    },
    updateCargo(cargo) {
      this.search = "";
      this.selectedCargo = cargo;
      this.isActive = false;

    },

    beforeMount() {
    this.skillGetAll();
  },

  }
};
</script>

  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

::selection {
  color: #fff;
  background: #4285f4;
}

.btn-teste{
  background-color: rgb(0, 247, 255);
}
.wrapper {
  width: 40%;
  margin: 5vh 10vh;

}

.select-btn,
li {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.select-btn {
  height: 65px;
  padding: 0 20px;
  color: #fff;
  font-size: 22px;
  background: #0e1011;
  border-radius: 7px;
  justify-content: space-between;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.select-btn i {
  font-size: 31px;
  transition: transform 0.3s linear;
}

.wrapper.active .select-btn i {
  transform: rotate(-180deg);
}

.content {
  display: none;
  padding: 20px;
  margin-top: 15px;
  background: #0e1011;
  border-radius: 7px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.wrapper.active .content {
  display: block;
}

.content .search {
  position: relative;
}

.search i {
  top: 50%;
  left: 15px;
  color: #5D5DFF;
  font-size: 20px;
  pointer-events: none;
  transform: translateY(-50%);
  position: absolute;
}

.search input {
  height: 50px;
  width: 100%;
  background: #1b1b1b;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  padding: 0 20px 0 43px;
  color: #fff;
  border: 1px solid #B3B3B3;
}

.search input:focus {
  padding-left: 42px;
  border: 2px solid #4285f4;
}

.search input::placeholder {
  color: #bfbfbf;
}

.content .options {
  margin-top: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 7px;
}

.options::-webkit-scrollbar {
  width: 7px;
}

.options::-webkit-scrollbar-track {
  background: #1b1b1b;
  color: #fff;
  border-radius: 25px;
}

.options::-webkit-scrollbar-thumb {
  background: #1b1b1b;
  color: #FFF;
  border-radius: 25px;
}

.options::-webkit-scrollbar-thumb:hover {
  background: #1b1b1b;
  color: #FFF;
}

.options li {
  height: 50px;
  padding: 0 13px;
  color: #FFF;
  font-size: 21px;
}

.options li:hover,
li.selected {
  border-radius: 5px;
  background: #1b1b1b;
}
</style>
  