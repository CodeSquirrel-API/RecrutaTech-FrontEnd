<script>
  import axios from 'axios'
  import Sidebar from '../components/Sidebar.vue';

    export default {
      data() {
        return {
          positions: null,
          loading: true,
          positionsExperience: [],
          positionsName: [],
          positions: [],
          cargo: '',
          conhecimento: '',
          habilidade: '',
          atitude: '',
          cargo:'',
          nivel:'',
        }
      },
      methods: {
        async getPositions() {
        await axios.get('/position/getAll').then((response) => {
            this.positions = response.data;
            this.positionsName = [... new Set(this.positions.map(pos => pos.name))] // Removendo os results duplicados. Arrumar no BD Depois
          });          
        },

        getNivel(cargo) {
          this.positionsExperience = [];
          this.positionsExperience = [... new Set(this.positions.filter((pos) => pos.name == cargo).map((posi) => posi.experience))];
          console.log(this.positionsExperience);
        },
        BuscarCha()
        {
          const CHA = this.positions.find((cha) => cha.name == this.cargo && cha.experience == this.nivel)
          this.conhecimento = CHA.knowledge
          this.habilidade = CHA.skill
          this.atitude = CHA.attitude
        },
        LimparCampos(){
          this.cargo = '';
          this.nivel='';
          this.conhecimento='';
          this.habilidade='';
          this.atitude='';
        }
        
      },

      beforeMount() //Chama esse metodo se quiser executar uma função ao carregar a pagina
      {
        this.getPositions();
      },
      

      components: {
        Sidebar,
      },
    }

</script>
  <template>
    <Sidebar></Sidebar>
    <div class="bancocha">
      <h1 class="title">Banco de CHA</h1>
      <div>
        <label for="descricao" class="input-label">Digite o título do cargo:</label>
        <!-- <input class="custom-input" type="text" placeholder="Digite aqui..."> -->
        <select v-model="cargo" class="select-option txt-select" @change="getNivel(cargo)">
            <option
              v-for="(item, index) in positionsName" :key="index"
              v-bind:value="item"
              class="select-option txt-select">
              {{ item }}
            </option>
          </select>
      </div>
      
      <div class="nivel-container">
        <span  class="span-nivel">Selecione o nível de atuação profissional:</span> <br> 
        <select v-model="nivel" name="experience" class="select-option txt-select">
          <option v-for="(experience, index) in positionsExperience" :key="index" v-bind:value="experience">{{ experience }}</option>
        </select>
      </div>
  
      <!-- Botões  -->
      <div class="button-container">
        <button class="custom-button clear-button" @click="LimparCampos">Limpar</button>
        <button class="custom-button save-button" @click="BuscarCha">Buscar</button>
      </div>

      <!-- Linha cinza abaixo dos botões -->
      <hr class="line" />

      <!-- Título "CHA" -->
      <h2 class="title"> Digite o CHA </h2>

      <h2 class="cha-title"> Conhecimentos </h2>

      <!-- Campo de texto multilinea -->
      <textarea v-model="conhecimento" class="cha-textarea"></textarea>

      <h2 class="cha-title"> Habilidades </h2>

      <!-- Campo de texto multilinea -->
      <textarea v-model="habilidade" class="cha-textarea"> {{ skill }}</textarea>

      <h2 class="cha-title"> Atitudes </h2>
<!--  -->
      <!-- Campo de texto multilinea -->
      <textarea v-model="atitude" class="cha-textarea"></textarea>

      <!-- Botões Editar e Buscar -->
      <div class="button-container">
        <button class="custom-button search-button">Salvar</button>
      </div>
    </div>
  </template>
  
  <style scoped>

  .bancocha{
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
  margin-top: 30px; 
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
  box-shadow: 0 5px 10px rgb(0,0,0,0.3);
}

/* Estilos de hover para os botões "Editar" e "Buscar" */
.edit-button:hover,
.search-button:hover {
  background-color: #4455cc;
  border-color: #4455cc; 
}

</style>
  