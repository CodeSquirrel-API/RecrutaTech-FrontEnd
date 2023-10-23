<template>

    <div class="center">

      <h2 class="titulo">Cadastre-se</h2>

      <div class="">
      <RouterLink to="/CadastroCPF">
        <button @click="entrar" class="opcao2">CPF</button>
      </RouterLink>
      
      <RouterLink to="/CadastroCNPJ">
        <button @click="entrar" class="opcao1">CNPJ</button>
      </RouterLink>
      </div>

      <div class="center">
        <form @submit.prevent="CadastroCPF">
          <div>
            <label for="razaoSocial" class="font" >Nome da Empresa:</label>    
          </div>

          <div class="">
            <input type="text" class="" id="razaoSocial" v-model="razaoSocial" placeholder="Razão Social" />
          </div>

          <div>
            <label for="cnpj" class="font" >CNPJ:</label>
          </div>

          <div class="">
            <input type="text" class="" id="cnpj" v-model="cnpj" placeholder="XX.XXX.XXX/0001-XX" />
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
.background{
  padding: 7px;
  background-color: #33363A;
  width: 400px;
  height: 38px;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px 5px;
}
.btnCadastrar{
  background-color: #5D5DFF;
  border: none;
  border-radius: 5px;
  width: 133px;
  height: 40px;
  color: white;
  font-size: 16px;
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
.center {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-top: 10px;
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
        razaoSocial: '',
        cnpj:'',
        email:'',
        password: '',
        aceitarTermos: false,
      };
    },
    methods: {
      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('Usuário:', this.razaoSocial);
        console.log('Senha:', this.password);
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/')
      },
    },
  };
  </script>