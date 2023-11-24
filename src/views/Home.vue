<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="page-content">
  <div class="home">
    <h1 class="title">Descrição da Vaga</h1>
    
    <p class="descricao">Preencha os campos abaixo para gerar o CHA (Conhecimento, Habilidades e Atitudes) necessário para o cargo desejado, indicando as competências essenciais que um profissional da área deve possuir.</p>

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

    <div class="button-container">
      <button class="custom-button save-button" @click="gerarCHA" :disabled="!cargo || !experience">Gerar CHA</button>
    </div>

    <!-- Linha cinza abaixo dos botões -->
    <hr class="line" />

    <!-- Título "CHA" -->
    <h2 class="title">CHA - Conhecimento, Habilidade e Atitude</h2>
    <p class="descricao">Este é o CHA específico para a profissão desejada. Sinta-se à vontade para ajustar as informações conforme necessário. 
      Ao finalizar, clique em 'Salvar' para armazenar o CHA, tornando-o disponível para futuras consultas ao buscar candidatos ideais.
    </p>

    <div v-if="carregando" v-html="loading" class="loading-icon"></div>
    <h2 class="cha-title">Conhecimento</h2>

    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="conhecimentos" class="cha-textarea"></textarea>
    </div>
    
    <h2 class="cha-title">Habilidade</h2>
    
    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="habilidades" class="cha-textarea"></textarea>
    </div>

    <h2 class="cha-title">Atitude</h2>
    
    <div class="textarea-container">
      <div v-if="carregando" v-html="loading" class="loading-icon"></div>
      <textarea v-model="atitudes" class="cha-textarea"></textarea> 
    </div>

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
      popupMessage2: ('Salvo com sucesso!'),
      cargoUppercase: '',
      carregando:false,
      loading: '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#5D5DFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#5D5DFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>',
      

    };
  },
  methods: {
    async getCargoGpt() {
      this.carregando = true;
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
      finally {
      this.carregando = false; // Desativar o indicador de carregamento
    }
    },

    async salvarCha() {
    const payload = chaContent.value;

      let position = {
        name: payload.name,
        knowledge: Array.isArray(payload.knowledge) ? payload.knowledge.join("") : payload.knowledge,
        skill: Array.isArray(payload.skill) ? payload.skill.join("") : payload.skill,
        attitude: Array.isArray(payload.attitude) ? payload.attitude.join("") : payload.attitude,
        experience: Array.isArray(payload.experience) ? payload.experience.join("") : payload.experience,
      };

        try {
        const response = await axios.post('/position/create', position);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },

    atualizarCHA() {
      chaContent.value = {
        name: this.cargo,
        knowledge: this.conhecimentos,
        skill: this.habilidades,
        attitude: this.atitudes,
        experience: this.experience
      };
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
      console.log()
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
      this.cargo = this.cargo.toUpperCase();
    },

  },

    watch: {
    cargo: {
      handler: 'limparCHA',
      deep: true,
    },
    experience: {
      handler: 'limparCHA',
      deep: true,
    },
    conhecimentos: 'atualizarCHA',
    habilidades: 'atualizarCHA',
    atitudes: 'atualizarCHA',
  },

};

</script>
  
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
}

/* Estilos de hover para os botões "Editar" e "Buscar" */
.edit-button:hover,
.search-button:hover {
  background-color: #4455cc;
  border-color: #4455cc;
}

.descricao{
  color: #999898;
  margin: 1vh 0vh 4vh 4vh;
  font-size: 17px;
}
</style>
  