<template>
    <div class="login">
      <div class="icon">
        <img src="../../public/favicon.ico" :height="altura" :width="largura"/>
      </div>
      <h2 class="titulo font">Entrar</h2>
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
          <input type="checkbox" id="meuCheckbox" v-model="manterConectado" />
          <label for="meuCheckbox" class="font">   Manter conectado </label>
          <RouterLink class="a direita" to="">Esqueci minha senha</RouterLink>
        </div>
        <div class="center">
          <button @click="entrar" class="entrar">Entrar</button>
          <RouterLink to="/Home"></RouterLink>
        </div>
        <div class="center">
          <label for="text" class="font">Não tem uma conta?</label>
          <RouterLink to="/CadastroCPF">Cadastre-se</RouterLink>
        </div>
      </form>
    </div>  
  </template>

<style scoped>


.login{
  width: 100%;
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
  width: 400px;
  height: 48px;
  background-color: #5D5DFF;
  color: white;
  cursor: pointer;
  border-radius: 10px;
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
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon{
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
        manterConectado: false,
        altura: 91,
        largura: 87
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