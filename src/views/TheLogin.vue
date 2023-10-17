<template>

  
    <div class="center">

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

        <div class="checkbox">
          <input type="checkbox" id="meuCheckbox" v-model="manterConectado"/>
          <label for="meuCheckbox" class="">Manter conectado </label>
          <RouterLink class="a direita" to="">Esqueci minha senha</RouterLink>
        </div>       
        
        <div class="center">
          <button @click="entrar" class="entrar">Entrar</button>
          <RouterLink to="/Home"></RouterLink>
        </div>


        <div class="center">
          <label for="text" class="font">Não tem uma conta?
          <RouterLink to="/CadastroCPF">Cadastre-se</RouterLink></label>
        </div>

      </form>
      
    </div>  
  </template>

<style scoped>
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
  flex-direction: column;
  align-items: center;
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