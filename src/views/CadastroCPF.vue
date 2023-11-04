<template>
  <div>
    <h2 class="titulo">Cadastre-se</h2>

    <div class="center">
      <RouterLink to="/CadastroCPF">
        <button class="entrar1">CPF</button>
      </RouterLink>

      <RouterLink to="/CadastroCNPJ">
        <button class="entrar2">CNPJ</button>
      </RouterLink>
    </div>

    <form ref="form" @submit.prevent="CadastroCPF">
      <div>
        <label for="username" class="font">Nome Completo:</label>
      </div>
      <div class="center">
        <input type="text" class="background" id="username" v-model="username" placeholder="Digite o seu nome" />
      </div>
      <div>
        <label for="username" class="font">CPF:</label>
      </div>
      <div class="center">
        <input type="text" class="background" id="cpf" v-model="cpf" placeholder="000.000.000-00" />
      </div>
      <div>
        <label for="username" class="font">E-mail:</label>
      </div>
      <div class="center">
        <input type="text" class="background" id="email" v-model="email" placeholder="email@exemplo.com" />
      </div>
      <div>
        <label for="password" class="font">Senha:</label>
      </div>
      <div class="center">
        <input type="password" class="background" id="password" v-model="password" placeholder="senha" />
      </div>
      <div class="center">
        <button class="open-popup-button entrar1" @click="cadastrar">Cadastrar</button>

        <div class="custom-popup" v-if="isPopupVisible">
          <div class="popup-content">
            <p class="popup-message">{{ popupMessage }}</p>
            <button class="close-popup-button" @click="closePopup">Fechar</button>
          </div>
        </div>
      </div>
      <div class="center">
        <label for="text">Já tem uma conta?</label>
        <RouterLink to="/login">Entre</RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-recrutatech.onrender.com/',
  // Outras configurações, se necessário
});

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      cpf: '',
      isPopupVisible: false,
      popupMessage: 'Seu cadastro foi realizado com sucesso, verifique o seu email para poder realizar a ativação da sua conta.',
    };
  },
  methods: {
    async cadastrar() {
      await api.post('/user/create', {
        name: this.username,
        password: this.password,
        email: this.email,
        cpf_cnpj: this.cpf,
        userType: 0,
      }).then((response) => {
        alert('Usuário Cadastrado');
        console.log(response.data);
      });
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
  },
};

</script>

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
.background {
  padding: 7px;
  background-color: #33363A;
  width: 400px;
  height: 38px;
  color: #707D86;
  font-size: 16px;
  margin: 5px 5px;
}
.font {
  color: #FFFFFF;
  margin-left: 475px;
}
.titulo {
  text-align: center;
  font-size: 35px;
  font-weight: bolder;
}
.entrar1 {
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}
.entrar2 {
  margin: 30px 30px 30px 30px;
  border-radius: 10px;
  width: 133px;
  height: 40px;
  background-color: #666666;
  color: white;
  font-size: 20px;
}
.direita {
  margin-left: 280px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>