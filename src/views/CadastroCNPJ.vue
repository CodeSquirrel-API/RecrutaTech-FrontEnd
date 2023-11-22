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
      <form @submit.prevent="">
        <div>
          <label for="empresa" class="font" >Nome da Empresa:</label>    
        </div>
        <div>
          <input type="text" maxlength="50" @focus="onInputFocus" :class="{ 'empty-required': empresa === '' && showEmptyWarning  }" id="empresa" v-model="empresa" placeholder="Razão Social" required/>
        </div>
        <div>
          <label for="cnpj" class="font" >CNPJ:</label>
        </div>
        <div class="">
          <input type="text" maxlength="14" @focus="onInputFocus" :class="{ 'empty-required': cnpj === '' && showEmptyWarning }" id="cnpj" v-model="cnpj" @input="validarNumero" placeholder="XX.XXX.XXX/0001-XX" required/>
        </div>
        <div>
          <label for="email" class="font" >E-mail:</label>
        </div>
        <div class="">
          <input type="text" maxlength="50" @focus="onInputFocus" :class="{ 'empty-required': email === '' && showEmptyWarning }" id="email" v-model="email" placeholder="email@exemplo.com" required/>
        </div>
        <div>
          <label for="password" class="font" >Senha:</label>
        </div>
        <div class="">
          <input type="password" maxlength="20" @focus="onInputFocus" :class="{ 'empty-required': password === '' && showEmptyWarning }" id="password" v-model="password" placeholder="********" required/>
        </div>
        <div v-if="showEmptyWarning">
          Por favor, preencha todos os campos.
        </div>
        <div class="center">
          <button class="btnCadastrar" @click="cadastrar" v-if="carregando === false">Cadastrar</button>
          <div class="loader loader--style1" title="0" v-if="carregando === true" v-html="loading"></div>
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
import baseURL from '@/service/api';
import axios from 'axios';

export default {
  data() {
    return {
      empresa: '',
      cnpj:'',
      email:'',
      password: '',
      showEmptyWarning: false,
      isPopupVisible: false,
      popupMessage: 'O cadastro da sua empresa foi registrado com sucesso!',
      carregando: false,
      loading: '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#5D5DFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#5D5DFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>'
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
    this.carregando = true;
      try {
        const response = await axios.post(`${baseURL}login/register`, {
          "name": this.empresa,
          "password": this.password,
          "email": this.email,
          "cpf_cnpj": this.cnpj
        });

        alert("Empresa Cadastrada");
        console.log(response.data);
        this.$router.push('/login');  

      } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        alert('Ocorreu um erro ao cadastrar a empresa. Verifique o console para obter mais detalhes.');
      } finally {
      this.carregando = false;
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
      
      onInputFocus() {
      this.showEmptyWarning = this.empresa === ''|| this.password === '' || this.cnpj === '' || this.email === '';
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
  border-radius: 10px;
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
  border-radius: 10px;
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
  border-radius: 10px;
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
  border-radius: 10px;
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
  border-radius: 10px;
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
.empty-required {
  border: 1px solid rgb(255, 30, 30);
}
</style>
  
