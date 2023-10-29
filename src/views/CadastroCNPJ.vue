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
        <form @submit.prevent="CadastroCPF">
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
            <input type="text" maxlength="14" id="cnpj" v-model="numero" @input="validarNumero" placeholder="XX.XXX.XXX/0001-XX" />
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
            <button class="open-popup-button btnCadastrar" @click="cadastrar(); showPopup()">Cadastrar</button>
            <div class="custom-popup" v-if="isPopupVisible">
              <div class="popup-content">
                <p class="popup-message">{{ popupMessage }}</p>
                <button class="close-popup-button" @click="closePopup">Fechar</button>
              </div>
            </div>
          </div>

          <div class="center">
            <label for="text" >Já tem uma conta?
              <RouterLink to="/login">Entre</RouterLink>
            </label>
          </div>

        </form>
      </div>
    </div>  
  </template>

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
}
.btnCadastrar{
  margin-left: 10px;
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
.font{
  color: #FFFFFF;
}
.titulo{
  text-align: center;
  font-size: 35px;
  color: #fff;
  font-weight: bolder;
}
.opcao1{
 margin-left: 10px;
  border-radius: 5px;
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
  margin-right: 10px;
  border-radius: 5px;

  width: 133px;
  height: 40px;
  background-color: #666666;
  color: white;
  font-size: 20px;
  border: none;
  transition: all 0.5s ease;
  box-shadow: 0 5px 10px rgb(0,0,0,0.3);
}
.opcao2:hover {
  background-color: #2980b9;
}
.center {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-top: 10px;
  color: #FFFFFF;
}

label {
  display: block;
  margin-top: 15px;
  margin-left: 5px; 
  align-items: flex-start;
}


</style>
  
  <script lang="ts">
import api2 from "../service/api"

  export default {
    data() {
      return {
        numero: null,
        empresa: '',
        cnpj:'',
        email:'',
        password: '',
        isPopupVisible: false,
        popupMessage: 'O cadastro da sua empresa foi registrado com sucesso!',
      };
    },
    methods: {
      async cadastrar() {
        await api2.post('user/create', {
          "name": this.empresa,
          "password": this.password,
          "email": this.email,
          "cpf_cnpj": this.cnpj,
          "userType": 1
        }).then((response)=>{
          alert("Empresa Cadastrado")
          console.log(response.data)
        })
      },
      showPopup() {
        this.isPopupVisible = true;
      },
      closePopup() {
        this.isPopupVisible = false;
      },
      validarNumero(){
        if (isNaN(this.numero)) {
        this.numero = null;
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
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/login')
      },
    },
  };
  </script>