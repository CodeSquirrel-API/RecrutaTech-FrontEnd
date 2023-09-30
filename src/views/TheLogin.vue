<template>


    <div class="container">
      <div class="icon">
        <img src="../../public/squirrel.png" width="100" height="100" />
      </div>


      <h2 class="titulo ">Entrar</h2>

      <form @submit.prevent="login">

        <div class="">
          <label for="username" class="" >E-mail:</label>
          <input type="text" class="campoInput" id="username" v-model="username" placeholder="exemplo@gmail.com"/>
        </div>

        <div class="">
          <label for="password" class="" >Senha:</label>
          <input type="password" class="campoInput" id="password" v-model="password" placeholder="********"/>
        </div>

        <div class="center">
          <input type="checkbox" id="meuCheckbox" v-model="manterConectado" />
          <label for="meuCheckbox" class="">   Manter conectado </label>
          <RouterLink class="a direita" to="">Esqueci minha senha</RouterLink>
        </div>

        <div class="center">
          <button @click="entrar" class="entrar">Entrar</button>
        </div>


        <div class="center">
          <label for="text" class="font">Não tem uma conta?</label>
          <RouterLink to="/CadastroCPF">Cadastre-se</RouterLink>
        </div>

      </form>
      
    </div>  
  </template>

<style scoped>

.campoInput{
  padding: 7px;
  background-color: #33363A;
  width: 400px;
  height: 38px;
  color: #707D86;
  font-size: 16px;
  margin: 5px 5px;
  border: none;
}
.font{
  color: #FFFFFF;
}
.titulo{
  text-align: center;
  font-size: 35px;
  font-weight: bolder;
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
}
.direita{
  margin-left: 80px;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
  border:none;
  margin-top: 10px;

}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

</style>
  
  <script lang="ts">
  export default {
    data() {
      return {
        username: '',
        password: '',
        manterConectado: false,
      };
    },
    methods: {
      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('Usuário:', this.username);
        console.log('Senha:', this.password);
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/')
      },
    },
  };
  </script>