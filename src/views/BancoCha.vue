<script lang="ts">
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';

export default {
  data() {
    return {
      positions: null,
      positionsExperience: [],
      positionsName: [],
      positions: [],
      cargo: '',
      conhecimento: '',
      habilidade: '',
      atitude: '',
      nivel: '',
      buscaRealizada: false, // Variável para rastrear se uma busca foi realizada
      showPopup1: false,
      showPopup2: false,
      showPopup3: false,
      popupMessage2: ('Busca feita com sucesso'),
      popupMessage3: ('Salvo com sucesso!'),
      carregando: false,
      loading: '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#5D5DFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#5D5DFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>',
    };
  },

  methods: {
    async getPositions() {
      await axios.get('/position/getAll').then((response) => {
        this.positions = response.data;
        this.positionsName = [...new Set(this.positions.map((pos) => pos.name))];
      });
    },

    getNivel(cargo) {
      this.positionsExperience = [];
      this.positionsExperience = [
        ...new Set(this.positions.filter((pos) => pos.name == cargo).map((posi) => posi.experience)),
      ];
      console.log(this.positionsExperience);
    },

    async BuscarCha() {
      this.carregando = true;
      if (this.buscaRealizada) {
        // Verifica se uma busca anterior foi realizada
        this.LimparCampos(false); // Limpa apenas os campos do CHA, mantém o "cargo"
      }
      const CHA = this.positions.find((cha) => cha.name == this.cargo && cha.experience == this.nivel);
      this.conhecimento = CHA.knowledge;
      this.habilidade = CHA.skill;
      this.atitude = CHA.attitude;
      this.buscaRealizada = true; // Marca que uma busca foi realizada
      this.carregando = false;
    },


    async salvarCha() {
      if (this.cargo && this.nivel) {
        // Buscar o objeto correspondente com base em "cargo" e "nivel"
        const chaIndex = this.positions.findIndex(
          (cha) => cha.name == this.cargo && cha.experience == this.nivel
        );

        if (chaIndex !== -1) {
          // Atualizar os campos do CHA no objeto existente
          this.positions[chaIndex].knowledge = this.conhecimento;
          this.positions[chaIndex].skill = this.habilidade;
          this.positions[chaIndex].attitude = this.atitude;
        } else {
          // Se não encontrou um objeto correspondente, criar um novo objeto
          const position = {
            name: this.cargo,
            knowledge: this.conhecimento,
            skill: this.habilidade,
            attitude: this.atitude,
            experience: this.nivel,
          };
          this.positions.push(position);
        }

        try {
          const response = await axios.post('/position/create', this.positions[chaIndex]);
          console.log(response);
          this.showPopupcomAtraso3();
          this.LimparCampos();
        } catch (error) {
          console.error(error);
        }
      } else {
        // Exiba uma mensagem ou tome a ação apropriada para lidar com campos vazios.
        console.error('Por favor, preencha todos os campos antes de salvar.');
      }
    },

    LimparCampos(clearCargo = true) {
      this.conhecimento = '';
      this.habilidade = '';
      this.atitude = '';
      this.nivel = '';

      if (clearCargo) {
        this.cargo = '';
      }
      this.buscaRealizada = false;
    },

    showPopupcomAtraso2() {
      this.showPopup2 = !true;
      setTimeout(() => {
        this.showPopup2 = !false;
      }, 500);
    },

    showPopupcomAtraso3() {
      this.showPopup3 = !true;
      setTimeout(() => {
        this.showPopup3 = !false;
      }, 500);
    },

    closePopup1() {
      this.showPopup1 = false;
    },

    closePopup2() {
      this.showPopup2 = false;
    },

    closePopup3() {
      this.showPopup3 = false;
    },
  },

  beforeMount() {
    this.getPositions();
  },

  components: {
    Sidebar, Header,
  },

  computed: {
    sortedPositions() {
      const lowercasePositions = this.positionsName.map(item => item.toUpperCase());
      return lowercasePositions.slice().sort();
    },
  },

  watch: {
    cargo(newValue, oldValue) {
      if (this.buscaRealizada && newValue !== oldValue) {
        // Se uma busca foi realizada e o cargo mudou, limpe os campos do CHA
        this.LimparCampos(true);
      }
    },
    nivel(newValue, oldValue) {
      if (this.buscaRealizada && newValue !== oldValue) {
        // Se uma busca foi realizada e o nível mudou, limpe os campos do CHA
        this.LimparCampos(false);
      }
    },
  },
};
</script>


<template>
  <Sidebar></Sidebar>
  <Header></Header>
  <div class="page-content">
    <div class="bancocha">
      <h1 class="title">Banco de CHA</h1>

      <p class="descricao">Selecione o Cargo e Nível abaixo para obter os CHA's que foram salvos.</p>


      <div class="Cargo">
        <div>
          <label for="descricao" class="input-label">Selecione o cargo:</label>
        </div>

        <select v-model="cargo" class="select-option txt-select" @change="getNivel(cargo)">
          <option v-for="(item, index) in sortedPositions" :key="index" v-bind:value="item"
            class="select-option txt-select">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="nivel-container">
        <div>
          <label class="span-nivel">Selecione o nível de atuação profissional:</label>
        </div>

        <select v-model="nivel" name="experience" class="select-option txt-select">
          <option v-for="(experience, index) in positionsExperience" :key="index" v-bind:value="experience">{{ experience
          }}</option>
        </select>
      </div>

      <!-- Botões  -->
      <div class="button-container">
        <div>
          <button class="custom-button clear-button" @click="LimparCampos()">Limpar</button>
        </div>
        <div>
          <button class="custom-button save-button" @click="BuscarCha()">Buscar</button>
        </div>
      </div>
    </div>

    <!-- Linha cinza abaixo dos botões -->
    <hr class="line" />
    <p class="descricao">Fique a vontade para editar os campos, a edição só sera salvar quando clicar em salvar.</p>
    <!-- Título "CHA" -->

    <h2 class="cha-title"> Conhecimento </h2>
    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="conhecimento" class="cha-textarea"></textarea>
    </div>

    <h2 class="cha-title"> Habilidade </h2>
    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="habilidade" class="cha-textarea"></textarea>
    </div>

    <h2 class="cha-title"> Atitude </h2>
    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="atitude" class="cha-textarea"></textarea>
    </div>

    <div class="button-container">
      <button class="custom-button search-button" @click="salvarCha">Salvar</button>
      <div class="custom-popup" v-if="showPopup3">
        <div class="popup-content">
          <p class="popup-message">{{ popupMessage3 }}</p>
          <button class="close-popup-button" @click="closePopup3">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.textarea-container {
  position: relative;
}

.loading-icon {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Adicione outros estilos para o ícone de carregamento, como largura, altura etc. */
}

.descricao {
  color: #999898;
  margin: 1vh 0vh 4vh 4vh;
  font-size: 17px;
}

.page-content {
  margin-left: 18%;
  /* Use o mesmo valor da largura do menu */
  width: 100%;
  height: 100vh;
}

.custom-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #33363A;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
  z-index: 1000;
}

.popup-content {
  text-align: center;
}

.popup-message {
  font-size: 18px;
  color: #FFFFFF;
}

.close-popup-button {
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}

.close-popup-button:hover {
  background-color: #2980b9;
}

.bancocha {
  width: 100%;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: bold;
  margin-left: 14px;
  margin-top: 20px;
}

.input-label {
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 8px;
}

.custom-input {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 6px;
}

.custom-input:focus {
  border-color: #007bff;
}

.nivel-container {
  margin-top: 5%;
  margin-left: 1%;
}

.span-nivel {
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 8px;
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

/* Estilos dos botões */
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 55px;
}

.custom-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.2s;
}

.clear-button {
  background-color: #6666;
  color: #fff;
}

.save-button {
  background-color: #5D5DFF;
  color: #fff;
}

.custom-button:hover {
  filter: brightness(0.9);
  /* Escurece a cor ao passar o mouse */
}

.line {
  border: none;
  border-top: 1px solid #999898;
  margin-top: 10px;
  /* Espaçamento acima da linha */
  margin-bottom: 10px;
  /* Espaçamento abaixo da linha */
}

/* Estilos para o título "CHA" */
.cha-title {
  font-size: 22px;
  margin-top: 30px;
  color: #fff;
  margin-left: 25px;
}

/* Estilos para o campo de texto multilinear */
.cha-textarea {
  font-size: 17px;
  width: 80%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  margin-top: 5px;
  margin-left: 25px;
  margin-bottom: 15px;
  overflow: auto;
  min-height: 150px;
  overflow: hidden;
}

/* Estilos para os botões "Editar" e "Buscar" */
.edit-button,
.search-button {
  background-color: #5D5DFF;
  color: #fff;
  border: 1px solid #5D5DFF;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 15px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.3);
}

/* Estilos de hover para os botões "Editar" e "Buscar" */
.edit-button:hover,
.search-button:hover {
  background-color: #4455cc;
  border-color: #4455cc;
}

.Cargo {
  margin-left: 1%;
}
</style>
  