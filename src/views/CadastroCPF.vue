<template>
    <div class="center">

      <h2 class="titulo">Cadastre-se</h2>

      <div class=" style">

        <RouterLink to="/CadastroCPF">
          <button class="opcao1">CPF</button>
        </RouterLink>
        
        <RouterLink to="/CadastroCNPJ">
          <button class="opcao2">CNPJ</button>
        </RouterLink>

      </div>

      <div class="style">
        <form @submit.prevent="CadastroCPF">
            <div>
              <label for="username" class="font" >Nome Completo:</label>    
            </div>

            <div class="">
              <input type="text" class="" id="username" v-model="username" placeholder="Digite o seu nome" />
            </div>

            <div>
              <label for="cpf" class="font" >CPF:</label>
            </div>

            <div class="">
              <input type="text" maxlength="11" id="cpf" v-model="numero" @input="validarNumero"  placeholder="000.000.000-00" />
            </div>

            <div>
              <label for="email" class="font" >E-mail:</label>
            </div>

            <div class="">
              <input type="text" class="" id="email" v-model="email" placeholder="email@exemplo.com"/>
            </div>

            <div>
              <label for="password" class="font" >Senha:</label>
            </div>

            <div class="">
              <input type="password" class="" id="password" v-model="password" placeholder="********"/>
            </div>

            <div class="center">
              <button @click="entrar" class="btnCadastrar entrar">Cadastrar</button>
            </div>

            <div class="center font">
              <label for="text">Já tem uma conta?
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

.style{
  margin-left: 30px;
}



.font{
  color: #FFFFFF;
}

.titulo{
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: bolder;
}

.opcao1{
  border-radius: 5px;
  margin-right: 10px;
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
  margin-left: 10px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-top: 10px;
}
</style>
  
  <script lang="ts">
  export default {
    data() {
      return {
        numero: null,
        username: '',
        cpf:'',
        email:'',
        password: '',
        aceitarTermos: false,
      };
    },
    methods: {
      validarNumero(){
        if (isNaN(this.numero)) {
        this.numero = null;
        }
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/')
      },
    },
  };
  </script>