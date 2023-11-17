<template>
  
    <div class="center">

      <div class="icon">
        <img src="../../public/squirrel.png" width="100" height="100" />
      </div>


      <h2 class="titulo ">Entrar</h2>
      <form @submit.prevent="Codigo">

        <div class="style">
          <label for="email" class="font" >E-mail:</label>
          <input type="text" maxlength="50" class="campoInput" id="email" v-model="username" placeholder="exemplo@gmail.com"/>
        </div>

        <div class="style">
          <label for="password" class="font" >Senha:</label>
          <input type="password" class="campoInput" id="password" v-model="password" placeholder="********"/>
        </div>

        <div class="checkbox font style">
          <input type="checkbox" id="meuCheckbox" v-model="manterConectado"/>
          <label for="meuCheckbox" class="">Manter conectado </label>
          <RouterLink class="a direita" to="/resetPassword">Esqueci minha senha</RouterLink>
        </div>       
        
        <div class="center">
            <button class="close-popup-button entrar" @click="Codigo, showPopup(), VerificarCodigo2()">Entrar</button>
            <div class="custom-popup" v-if="isPopupVisible">
              <div class="popup-content">
                <p class="popup-message">{{ popupMessage }}</p>
                <br>
                <input v-model="numero" @input="validarNumero" maxlength="6" :class="{ 'campo-vazio': numero === '' }"/>
                <br>
                <button class="close-popup-button" @click="VerificarCodigo">Login</button>
                <button class="close-popup-button" @click="closePopup">Fechar</button>
              </div>
            </div>
          </div>

        <div class="center">
          <label for="text" class="font">Não tem uma conta?
          <RouterLink to="/CadastroCPF">Cadastre-se</RouterLink></label>
        </div>

      </form>
      
    </div>  
  </template>

<style scoped>

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
  margin: 30px 30px 30px 30px;
}

.checkbox{
  display:flex;
}

.campoInput{
  padding: 7px;
  background-color: #33363a00;
  width: 400px;
  height: 38px;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px 5px;
  border-style:solid;
  border-color:#33363A;
}
.font{
  color: #FFFFFF;
}
.titulo{
  text-align: center;
  font-size: 35px;
  font-weight: bolder;
  color: white;
}
.entrar{
  margin-top:50px ;
  margin-bottom: 25px;
  border-radius: 10px;
  width: 400px;
  height: 48px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}
.entrar:hover {
  background-color: #2980b9;
}
.direita{
  margin-left: 80px;
}


.icon{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.center {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: none;
  margin-top: 10px;
  width: 100%;
}
.campo-vazio{
  border: 1px solid red;
}
label {
  display: block;
  margin-top: 5px;
  margin-left: 5px; 
  align-items: flex-start;
}


</style>
  
  <script lang="ts">
import baseURL from '../service/api';
import axios from 'axios';

  export default {
    data() {
      return {
        numero: null,
        code: '',
        isPopupVisible: false,
        email:'',
        username: '',
        password: '',
        manterConectado: false,
        popupMessage:'seu codigo será enviado em 5 minutos para o seu e-mail: ***@***.com, verifique o seu codigo para prosseguir com o seu login!'
      };
    },
    computed: {
      camposPreenchidos() {
    if (this.email) {
      return true; // Retorna false se pelo menos um campo estiver vazio.
    } else {
      return false; // Retorna true quando todos os campos estão preenchidos.
        }
      }
    },
    methods: {
      async Codigo () {
        try{
         const response = await axios.post(`${baseURL}/email/send-code`, {
          "email": this.email,
        })
        console.log(response.data)
        console.log("codigo enviado!", this.email)
        }
        catch (error) {
          console.error('error')
          
        }
      },
      async VerificarCodigo () {
        try{
         const responseCheck = await axios.post(`${baseURL}/email/check-code`, {
          "email": this.email,
          "code": this.code,
        })
        console.log(responseCheck.data);
        console.log(this.email);

        if (responseCheck.data.valid) {
          this.$router.push('/home');
        } else {
          this.$router.push('/login')
          alert("Codigo incorreto!!");
          }
        }
        catch (error) {
          console.error(error);
          
        }
          
      },
      async VerificarCodigo2 () {
        try{
         const responseCheck = await axios.post(`${baseURL}/email/check-code`, {
          "email": this.email,
          "senha": this.password,
        })
        console.log(responseCheck.data);
        console.log(this.email);

        if (responseCheck.data.valid) {
          this.$router.push('/home');
        } else {
          this.$router.push('/login')
          alert("Senha incorreto!!");
          }
        }
        catch (error) {
          console.error(error);
          
        }
          
      },
      validarNumero(){
        if (isNaN(this.numero)) {
          this.numero = null;
        }
      },
      showPopup() {
        if (this.camposPreenchidos){
          this.isPopupVisible = true;
        }
        else{
          alert('Por favor, preencha todos os campos antes de prosseguir');
          
        }
      },
      closePopup() {
        this.isPopupVisible = false;
      },

      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('E-mail:', this.email);
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/home')
      },
    },
  };
  </script>