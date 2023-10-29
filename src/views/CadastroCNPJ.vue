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
            <label for="razaoSocial" class="font" >Nome da Empresa:</label>    
          </div>

          <div>
            <input type="text" class="" id="razaoSocial" v-model="razaoSocial" placeholder="Razão Social" />
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
            <input type="text" class="" id="email" v-model="email" placeholder="email@exemplo.com"/>
          </div>

          <div>
            <label for="password" class="font" >Senha:</label>
          </div>

          <div class="">
            <input type="password" class="" id="password" v-model="password" placeholder="********"/>
          </div>

          <div class="center">
              <button @click="entrar" class="btnCadastrar">Cadastrar</button>
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
  export default {
    data() {
      return {
        numero: null,
        razaoSocial: '',
        cnpj:'',
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