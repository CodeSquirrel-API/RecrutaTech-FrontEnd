<template>
  
  <div class="center">

    <div class="icon">
      <img src="../../public/squirrel.png" width="100" height="100" />
    </div>


    <h2 class="titulo ">Esqueceu a sua senha?</h2>
    <form>
            <div>
              <label for="username" class="font" >Para redefinir a sua senha, informe o seu email cadastrado <br> na sua conta e lhe enviaremos um link com as instruções.</label>    
            </div>

            <div class="style">
              <input type="text" maxlength="75" class="campoInput" id="email" v-model="username" placeholder="exemplo@gmail.com"/>
            </div>

            <div class="center">
            
            <RouterLink to="/login">
              <button class="entrar" @click="Codigo">Proximo</button>
            </RouterLink>
            <RouterLink to="/login">
              <button class="entrar">Voltar</button>
            </RouterLink>
 
          </div>
        </form>
    
  </div>  
</template>

<style scoped>
.style{
margin: 30px 30px 30px 30px;
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
margin-top:10px ;
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
border: none;
margin-top: 10px;
width: 100%;
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
  if (this.username && this.password) {
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