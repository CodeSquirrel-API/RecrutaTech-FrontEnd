<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="page-content">
  <div class="home">
    <h1 class="title">Descrição da Vaga</h1>
    <label for="descricao" class="input-label">Digite o título do cargo:</label>
    <input class="custom-input" type="text" placeholder="Digite aqui..." v-model="cargo" @input="updateCargoUppercase">
    

    <div class="nivel-container">
      <span class="span-nivel">Selecione o nível de atuação profissional:</span><br>
      <select v-model="experience" name="nivel" class="select-option txt-select">
        <option value="JUNIOR" class="select-option txt-select">Junior</option>
        <option value="PLENO" class="select-option txt-select">Pleno</option>
        <option value="SENIOR" class="select-option txt-select">Sênior</option>
      </select>
    </div>

    <!-- Botões Limpar e Salvar -->
    <div class="button-container">
      <button class="custom-button save-button" @click="gerarCHA" :disabled="!cargo || !experience">Gerar CHA</button>
      <div class="custom-popup" v-if="showPopup1">
        <div>
          <p class="popup-message">{{ popupMessage1 }}</p>
          <button class="close-popup-button" @click="closePopup1">Fechar</button>
        </div>
      </div>
    </div>

    <!-- Linha cinza abaixo dos botões -->
    <hr class="line" />

    <!-- Título "CHA" -->
    <h2 class="title">CHA - Conhecimento, Habilidade e Atitude</h2>

    <h2 class="cha-title">Conhecimento</h2>
    <textarea v-model="conhecimentos" class="cha-textarea"></textarea>

    <h2 class="cha-title">Habilidade</h2>
    <textarea v-model="habilidades" class="cha-textarea"></textarea>

    <h2 class="cha-title">Atitude</h2>
    <textarea v-model="atitudes" class="cha-textarea"></textarea>

    <!-- Botões Editar e Buscar -->
    <div class="button-container">
      <button class="custom-button search-button"
        @click="salvarCha(); showPopupcomAtraso2(); limparCHA();limparDescricao();">Salvar</button>

      <div class="custom-popup" v-if="showPopup2">
        <div>
          <p class="popup-message">{{ popupMessage2 }}</p>
          <button class="close-popup-button" @click="closePopup2">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';

const chaContent = ref({})

export default {
  components: {
    Sidebar, Header,


  },
  data() {
    return {
      cargo: '',
      experience: '',
      conhecimentos: '',
      habilidades: '',
      atitudes: '',
      chaContent,
      showPopup1: false,
      showPopup2: false,
      popupMessage1: ('Gerando CHA...'),
      popupMessage2: ('salvo com sucesso!'),
      cargoUppercase: '',
    };
  },
  methods: {
    async getCargoGpt() {
      if (!this.cargo || !this.experience) {
      this.showPopup1 = true;
      return;
      }

      const azureOpenAIAPI = {
        ResourceName: 'interactai',
        DeploymentId: 'modelgpt35t',
        Key: '66a6b8c8d3c449d4b53fa75d09b04366',
        Version: '2023-05-15',
      };

      const apiUrl = `https://${azureOpenAIAPI.ResourceName}.openai.azure.com/openai/deployments/${azureOpenAIAPI.DeploymentId}/chat/completions?api-version=${azureOpenAIAPI.Version}`;

      const data = {
        messages: [
          {
            role: 'user',
            content: `Quais os conhecimentos, habilidades e atitudes que um ${this.cargo} ${this.experience} precisa ter? Devolver a resposta como um json que possui as chaves "conhecimento", "habilidade" e "atitude" com os respectivos valores`,
          },
        ],
      };

      try {
        const response = await axios.post(apiUrl, data, {
          headers: {
            'Content-Type': 'application/json',
            'api-key': azureOpenAIAPI.Key,
          },
        });

        const content = response.data.choices[0].message.content;
        if (content) {
          try {
            const conteudoJson = JSON.parse(content)
            this.conhecimentos = conteudoJson.conhecimento
            this.habilidades = conteudoJson.habilidade
            this.atitudes = conteudoJson.atitude
            chaContent.value = {
              name: this.cargo,
              knowledge: this.conhecimentos,
              skill: this.habilidades,
              attitude: this.atitudes,
              experience: this.experience
            }
          } catch (error) {
            console.log(`error: ${error}`)
          }

        } else {
          console.error('Erro');

        }

      } catch (error) {
        console.error(error);
      }
    },

    async salvarCha() {
      const payload = chaContent.value

      let position = {
        name: payload.name,
        knowledge: payload.knowledge.join(""),
        skill: payload.skill.join(""),
        attitude: payload.attitude.join(""),
        experience: payload.experience.join(""),
      }
      try {
        // console.log (payload)
        // console.log( payload.skill.join(""))
        // payload.skill = payload.skill.join("")
        const response = await axios.post('/position/create', position);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    },

    limparCHA() {
      this.conhecimentos = '';
      this.habilidades = '';
      this.atitudes = '';
    },

    limparDescricao(){
      this.experience = '';
      this.cargo = '';
    },

    gerarCHA() {
    this.getCargoGpt();
    this.showPopupcomAtraso1();
    },

    showPopupcomAtraso1() {
      this.showPopup1 = !true;
      setTimeout(() => {
        this.showPopup1 = !false;
      }, 500);
    },

    showPopupcomAtraso2() {
      this.showPopup2 = !true;
      setTimeout(() => {
        this.showPopup2 = !false;
      }, 500);
    },

    closePopup1() {
      this.showPopup1 = false;
    },

    closePopup2() {
      this.showPopup2 = false;
    },

    updateCargoUppercase() {
    this.cargoUppercase = this.cargo.toUpperCase();
  },

  },

  watch: {
    cargo: 'limparCHA',
    experience: 'limparCHA',
  },

};
</script>
  
<style scoped>
.page-content {
  margin-left: 18%; /* Use o mesmo valor da largura do menu */
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

.home {
  width: 100%;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: bold;
  margin-left: 25px;
  margin-top: 20px; 
}

.input-label {
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 8px;
  margin-left: 25px;
}

.custom-input {
  text-transform: uppercase;
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

.custom-input::placeholder {
  text-transform: none;
}

.custom-input:focus {
  border-color: #007bff;
}

.nivel-container {
  margin-left: 25px;
  margin-top: 30px;
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
  height:35px ;
  text-transform: uppercase;
}

.select-option:focus {
  border-color: #007bff;
}

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
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.3);
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
  margin-top: 35px;
  color: #fff;
  margin-left: 25px;
}

/* Estilos para o campo de texto multilinear */
.cha-textarea {
  width: 80%;
  height: 100px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  margin-top: 5px;
  margin-left: 25px;
  margin-bottom: 15px;
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
}

/* Estilos de hover para os botões "Editar" e "Buscar" */
.edit-button:hover,
.search-button:hover {
  background-color: #4455cc;
  border-color: #4455cc;
}
</style>
  