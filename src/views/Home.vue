<template>
  <Sidebar></Sidebar>
  <div class="home">
    <h1 class="title">Descrição da Vaga</h1>
    <label for="descricao" class="input-label">Digite o título do cargo:</label>
    <input class="custom-input" type="text" placeholder="Digite aqui..." v-model="cargo">

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
      <button class="custom-button clear-button">Limpar</button>
      <button class="custom-button save-button" @click="getCargoGpt()">Gerar CHA</button>
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
      <button class="custom-button search-button" @click="salvarCha">Salvar</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue';

const chaContent = ref ({}) 

export default {
  components: {
		Sidebar,
	},
  data() {
    return {
      cargo: '',
      experience: '',
      conhecimentos: '',
      habilidades: '',
      atitudes: '',
      chaContent,
    };
  },
  methods: {
    async getCargoGpt() {
      const azureOpenAIAPI = {
        ResourceName: 'interactai',
        DeploymentId: 'modelgpt35t',
        Key: 'API_KEY',
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
            const conteudoJson = JSON.parse (content)
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
      try {
        const payload = chaContent.value
        console.log (payload)
        const response = await axios.post('/position/create', payload);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    chaContent (){
    this.salvarCha()
   }
  }
};
</script>
  
<style scoped>

.home{
  width: 100%;
}
  .title {
    color: rgb(255, 255, 255); 
    font-size: 30px; 
    font-weight: bold; 
    margin-left: 25px;
  }
  .input-label {
    color: #ffffff; 
    font-size: 20px; 
    margin-bottom: 8px; 
    margin-left: 25px;
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
    box-shadow: 0 5px 10px rgb(0,0,0, 0.3);
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
    filter: brightness(0.9); /* Escurece a cor ao passar o mouse */
  }

  .line {
  border: none;
  border-top: 1px solid #999898;
  margin-top: 10px; /* Espaçamento acima da linha */
  margin-bottom: 10px; /* Espaçamento abaixo da linha */
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
  