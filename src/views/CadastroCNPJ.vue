<template>
  <div class="center">
    <h2 class="titulo">Cadastre-se</h2>
    <div class="style">
      <RouterLink to="/CadastroCPF">
        <button class="opcao2">CPF</button>
      </RouterLink>
      <RouterLink to="/CadastroCNPJ">
        <button class="opcao1">CNPJ</button>
      </RouterLink>
    </div>
    <div class="style">
      <form @submit.prevent="cadastrar">
        <div>
          <label for="empresa" class="font" >Nome da Empresa:</label>    
        </div>
        <div>
          <input type="text" maxlength="50" id="empresa" v-model="empresa" placeholder="Razão Social" />
        </div>
        <div>
          <label for="cnpj" class="font" >CNPJ:</label>
        </div>
        <div class="">
          <input type="text" maxlength="14" id="cnpj" v-model="cnpj" @input="validarNumero" placeholder="XX.XXX.XXX/0001-XX" />
        </div>
        <div>
          <label for="email" class="font" >E-mail:</label>
        </div>
        <div class="">
          <input type="text" maxlength="50" id="email" v-model="email" placeholder="email@exemplo.com"/>
        </div>
        <div>
          <label for="password" class="font" >Senha:</label>
        </div>
        <div class="">
          <input type="password" maxlength="20" id="password" v-model="password" placeholder="********"/>
        </div>
        <div class="center">
          <button class="btnCadastrar" @click="cadastrar(); showPopup()">Cadastrar</button>
          <div class="custom-popup" v-if="isPopupVisible">
            <div class="popup-content">
              <p class="popup-message">{{ popupMessage }}</p>
              <button class="close-popup-button" @click="closePopup">Fechar</button>
            </div>
          </div>
        </div>
        <div class="center font">
          <label for="text" >Já tem uma conta?
            <RouterLink to="/login">Entre</RouterLink>
          </label>
        </div>
      </form>
    </div>
  </div>  
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      empresa: '',
      cnpj:'',
      email:'',
      password: '',
      isPopupVisible: false,
      popupMessage: 'O cadastro da sua empresa foi registrado com sucesso!',
    };
   },

    computed: {
      camposPreenchidos() {
    if (this.empresa && this.cnpj && this.email && this.password) {
      return true; // Retorna false se pelo menos um campo estiver vazio.
    } else {
      return false; // Retorna true quando todos os campos estão preenchidos.
        }
      }
    },

    methods: {
      async cadastrar() {
      try {
        const response = await axios.post('/user/create', {
          "name": this.empresa,
          "password": this.password,
          "email": this.email,
          "cpf_cnpj": this.cnpj,
          "userType": 1
        });

        alert("Empresa Cadastrada");
        console.log(response.data);

      } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        alert('Ocorreu um erro ao cadastrar a empresa. Verifique o console para obter mais detalhes.');
      }
    },
      
      showPopup() {
        if (this.camposPreenchidos){
          this.isPopupVisible = true;
        }
        else{
          alert('Por favor, preencha todos os campos antes de exibir o pop-up');
          
        }
      },

      closePopup() {
        this.isPopupVisible = false;
      },

      validarNumero(){
        if (isNaN(this.cnpj)) {
        this.cnpj = null;
        }
      },

      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('name:', this.empresa);
        console.log('Senha:', this.password);
        console.log('cpf', this.cnpj);
        console.log('Email:', this.email);
      },

      entrar() {
      this.$router.push('/login')
      },
    },
  };
  </script>

<style scoped>
input{
  padding: 7px;
  background-color: #33363a00;
  width: 400px;
  height: 38px;
  color: #707D86;
  font-size: 16px;
  margin: 5px 5px;
  border-style:solid;
  border-color:#33363A;
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
.style{
  margin-left: 30px;
  margin-top: 10px;
}
.font{
  color: #FFFFFF;
}
.titulo{
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: bolder;
  margin-top: 25px;
}
.opcao1{
  border-radius: 5px;
  margin-left: 10px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
  border: none;
}
.opcao1:hover {
  background-color: #2980b9;
}
.opcao2{ 
  border-radius: 5px;
  margin-right: 10px;
  width: 133px;
  height: 40px;
  background-color: #666666;
  color: white;
  font-size: 20px;
  border: none;
}
.opcao2:hover {
  background-color: #2980b9;
}
.btnCadastrar{
  margin-left: 10px;
  margin-top: 5px;
  border-radius: 5px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
  border: none;
}
.btnCadastrar:hover {
  background-color: #2980b9;
}
label {
  display: block;
  margin-top: 15px;
  margin-left: 5px; 
  align-items: flex-start;
}
.center {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-top: 10px;
  width: 100%;
}
</style>
  
