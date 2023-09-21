<template>
    <div >
      <h2 class="titulo">Cadastre-se</h2>

      <div class="center">
      <RouterLink to="/CadastroCPF">
        <button @click="entrar" class="entrar2">CPF</button>
      </RouterLink>
      
      <RouterLink to="/CadastroCNPJ">
        <button @click="entrar" class="entrar1">CNPJ</button>
      </RouterLink>
      </div>

      <form @submit.prevent="CadastroCPF">
        <div>
          <label for="username" class="font" >Nome da Empresa:</label>    
        </div>
        <div class="center">
          <input type="text" class="background" id="username" v-model="username" placeholder="Razão Social" />
        </div>
        <div>
          <label for="username" class="font" >CNPJ:</label>
        </div>
        <div class="center">
          <input type="text" class="background" id="username" v-model="username" placeholder="XX.XXX.XXX/0001-XX" />
        </div>
        <div>
          <label for="username" class="font" >E-mail:</label>
        </div>
        <div class="center">
          <input type="text" class="background" id="username" v-model="username" placeholder="email@exemplo.com"/>
        </div>
        <div>
          <label for="password" class="font" >Senha:</label>
        </div>
        <div class="center">
          <input type="password" class="background" id="password" v-model="password" placeholder="senha"/>
        </div>
        <div class="center">
            <button @click="entrar" class="entrar1">Cadastrar</button>
        </div>
        <div class="center">
          <label for="text" >Não tem uma conta?</label>
          <RouterLink to="/login">Entre</RouterLink>
        </div>
      </form>
    </div>  
  </template>

<style scoped>

.background{
  padding: 7px;
  background-color: #33363A;
  width: 400px;
  height: 38px;
  color: #707D86;
  font-size: 16px;
  margin: 5px 5px;
}
.font{
  color: #FFFFFF;
  margin-left: 475px;
}
.titulo{
  text-align: center;
  font-size: 35px;
  font-weight: bolder;
}
.entrar1{
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}
.entrar2{
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #666666;
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