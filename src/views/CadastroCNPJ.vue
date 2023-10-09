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
            <button class="open-popup-button entrar1" @click="showPopup">Cadastrar</button>

            <div class="custom-popup" v-if="isPopupVisible">
              <div class="popup-content">
                <p class="popup-message">{{ popupMessage }}</p>
                <button class="close-popup-button" @click="closePopup">Fechar</button>
              </div>
            </div>
        </div>
        <div class="center">
          <label for="text" >Já tem uma conta?</label>
          <RouterLink to="/login">Entre</RouterLink>
        </div>
      </form>
    </div>  
  </template>

<style scoped>
.custom-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #33363A;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
  z-index: 1000;
}
.popup-content {
  text-align: center;
}
.popup-message {
  font-size: 18px;
  color: #FFFFFF;
}
.close-popup-button {
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}
.close-popup-button:hover {
  background-color: #2980b9;
}
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
        isPopupVisible: false,
        popupMessage: 'O cadastro da sua empresa foi registrado com sucesso!',
      };
    },
    methods: {
      showPopup() {
        this.isPopupVisible = true;
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
      this.$router.push('/')
      },
    },
  };
  </script>