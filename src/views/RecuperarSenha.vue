<template>
  <div class="center">
    <div class="icon">
      <img src="../../public/squirrel.png" width="100" height="100" />
    </div>
    <h2 class="titulo ">Esqueceu a sua senha?</h2>
    <form>
            <div>
              <label for="input1" class="font" >Para redefinir sua senha, digite o e-mail associado à sua conta.</label>    
              <label for="input1" class="font" >Enviaremos um link com as instruções necessárias.</label>    
            </div>
            <div class="style">
              <input type="text" maxlength="75" @focus="onInputFocus('input1')" class="campoInput" :class="{ 'empty-required': email === '' && focusedInput === 'input1' }" id="input1" v-model="email" placeholder="exemplo@gmail.com" required/>
            </div>
            <div class="center">
            <RouterLink to="/login">
              <button class="entrar" @click="Codigo">Enviar</button>
            </RouterLink>
             <!-- <RouterLink to="/login">
              <button class="entrar">Voltar</button>
            </RouterLink> -->
            </div>
      </form>
  </div>  
</template>

<script lang="ts">
import baseURL from '../service/api';
import axios from 'axios';

export default {
  data() {
    return {
      numero: null,
      code: '',
      email:'',
      focusedInput: null,
      initialized: false,
    };
  },
  methods: {
    async Codigo () {
      try{
       const response = await axios.put(`${baseURL}login/changePassword`, {
        "email": this.email,
      })
      console.log(response.data)
      console.log("codigo enviado!", this.email)
      }
      catch (error) {
        console.error('error')
        
      }
    },
    onInputFocus(inputId) {
      this.focusedInput = inputId
      if(this.initialized){
        this.initialized = true;
      }
    },
    validarNumero(){
      if (isNaN(this.numero)) {
        this.numero = null;
      }
    },

    entrar() {
    this.$router.push('/login')
    },
  },
};
</script>

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
margin: 5px auto;
border-style:solid;
border-color:#33363A;
display: block;
}
.font{
color: #FFFFFF;
text-align: center;
}
.titulo{
text-align: center;
font-size: 35px;
margin-top: 20px;
font-weight: bolder;
color: white;
}
.entrar{
margin-top:5px ;
margin-bottom: 25px;
border-radius: 10px;
width: 200px;
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

.empty-required {
  border: 1px solid rgb(255, 30, 30);
}
</style>