<template>
  
    <div class="center">

      <div class="icon">
        <img src="../../public/squirrel.png" width="100" height="100" />
      </div>


      <h2 class="titulo ">Entrar</h2>
      <form @submit.prevent="Codigo">

        <div class="">
          <label for="email" class="font" >E-mail:</label>
          <input type="text" class="campoInput" id="email" v-model="email" placeholder="exemplo@gmail.com"/>
        </div>

        <div class="">
          <label for="password" class="font" >Senha:</label>
          <input type="password" class="campoInput" id="password" v-model="password" placeholder="********"/>
        </div>

        <div class="checkbox font">
          <input type="checkbox" id="meuCheckbox" v-model="manterConectado"/>
          <label for="meuCheckbox" class="">Manter conectado </label>
          <RouterLink class="a direita" to="">Esqueci minha senha</RouterLink>
        </div>       
        
        <div class="center">
            <button class="open-popup-button entrar" @click="Codigo, showPopupNow()">Entrar</button>
            <div class="custom-popup" v-if="showPopup">
              <div class="popup-content">
                <p class="popup-message">{{ popupMessage }}</p>
                <br>
                <input type="number" v-model="code">
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
  margin-top: 50px;
  margin-bottom: 25px;
  width: 400px;
  height: 48px;
  background-color: #5D5DFF;
  color: white;
  border: none;
  font-size: 20px;
  box-shadow: 0, 5px, 15px rgb(0,0,0,0.4);
  transition: all 0.4s ease;
}

.entrar:hover{
  transform: translateY(-3px);
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: none;
  margin-top: 10px;
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
        code: '',
        showPopup: false,
        email:'',
        username: '',
        password: '',
        manterConectado: false,
        popupMessage:'seu codigo será enviado em 5 minutos para o seu e-mail: ***@***.com, verifique o seu codigo para prosseguir com o seu login!'
      };
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
      showPopupNow() {
        this.showPopup = true;
      },
      closePopup() {
        this.showPopup = false;
      },

      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('Usuário:', this.username);
        console.log('Senha:', this.password);
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/home')
      },
    },
  };
  </script>