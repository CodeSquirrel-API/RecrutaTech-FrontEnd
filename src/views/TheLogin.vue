<template>
    <div >
      <h2 class="titulo font"><strong>Entrar</strong></h2>
      <br/>
      <br/>
      <form @submit.prevent="login">
        <div class="center">
          <label for="username" class="font" >E-mail:</label>
        </div>
        <div class="center">
          <input type="text" class="background" id="username" v-model="username" placeholder="Seu email"/>
        </div>
        <div class="center">
          <label for="password" class="font" >Senha:</label>
        </div>
        <div class="center">
          <input type="password" class="background" id="password" v-model="password" placeholder="senha"/>
        </div>
        <div class="center">
          <input type="checkbox" id="meuCheckbox" v-model="aceitarTermos" />
          <label for="meuCheckbox" class="font">   Manter conectado </label>
          <RouterLink class="a direita" to="">Esqueci minha senha</RouterLink>
        </div>
        <div class="center">
          <button @click="entrar" class="entrar">Entrar</button>
        </div>
        <div class="center">
          <label for="text" class="font">Não tem uma conta?</label>
          <RouterLink to="/CadastroCPF">   Cadastre-se   </RouterLink>
        </div>
      </form>
    </div>  
  </template>

<style scoped>

.background{
  padding: 7px;
  background-color: #33363A;
  width: 568px;
  height: 50px;
  color: #707D86;
  font-size: 16px;
  margin: 5px 5px;
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
  border-radius: 10px;
  margin-top: 50px;
  margin-bottom: 25px;
  width: 568px;
  height: 50px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}
.direita{
  margin-left: 280px;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  
  <script lang="ts">
  export default {
    data() {
      return {
        username: '',
        password: '',
        aceitarTermos: false,
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