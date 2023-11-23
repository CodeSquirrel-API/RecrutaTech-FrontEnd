<template>
  <div class="center">
    <h2 class="titulo style">Criando nova senha</h2>
    <div class="">
      <form @submit.prevent="submitForm">
        <div>
          <label for="password" class="font">
            Para garantir a segurança da sua senha, certifique-se de que ela atenda aos seguintes critérios:<br />
            - Mínimo de 8 caracteres<br />
            - Pelo menos um número<br />
            - Pelo menos uma letra
          </label>
        </div>
        <div>
          <label for="input1" class="font">Nova senha</label>
        </div>
        <div class="">
          <input type="password" maxlength="25" @focus="onInputFocus('input1')" :class="{ 'empty-required': password === '' && focusedInput === 'input1' }" id="input1" v-model="password" required/>
        </div>
        <div>
          <label for="input2" class="font">Confirmar nova senha</label>
        </div>
        <div class="">
          <input type="password" maxlength="25" @focus="onInputFocus('input2')" :class="{ 'empty-required': confirmPassword === '' && focusedInput === 'input2' }" id="input2" v-model="confirmPassword" required/>
        </div>
        <div class="center">
          <button class="btnCadastrar" type="submit">Próximo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import baseURL from '../service/api';
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      isPopupVisible: false,
      focusedInput: null,
      initialized: false,
      popupMessage: 'Sua senha foi alterada com sucesso.',
    };
  },
  computed: {
    camposPreenchidos() {
      return this.password === '' || this.confirmPassword === '';
    },
  },
  methods: {
    async submitForm() {
      if (this.camposPreenchidos) {
        try {
          // Substitua 'seuToken' pelo token obtido, se necessário
          const token = 'seuToken';
          
          // Chame a API para alterar a senha
          const response = await axios.put(`${baseURL}user/changePassword/${token}/${this.password}`);
          
          // Exiba a mensagem de sucesso ou erro conforme necessário
          alert('Senha alterada com sucesso.');
          console.log(response.data);
          
          // Redirecione para a página de login
          this.entrar();
        } catch (error) {
          console.error('Erro ao alterar senha:', error);
          alert('Ocorreu um erro ao alterar a senha. Verifique o console para obter mais detalhes.');
        }
      } else {
        alert('Por favor, preencha todos os campos antes de exibir o pop-up');
      }
    },
    onInputFocus(inputId) {
      this.focusedInput = inputId
      if(this.initialized){
        this.initialized = true;
      }
    },
    entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/login');
    },
  },
};
</script>

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
  border-radius: 10px;
}
.style{
  margin-top: 70px;
}
.font{
  color: #FFFFFF;
  display: flex;
  max-width: 400px;
}
.titulo{
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: bolder;
}
.btnCadastrar{
  border-radius: 5px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
  border-radius: 10px;
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
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-top: 5px;
  width: 100%;
}
.empty-required {
  border: 1px solid rgb(255, 30, 30);
}
</style>

 