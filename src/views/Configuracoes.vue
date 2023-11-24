<template>
	<div class="page-content">
		<h2 class="title">Alterar Senha</h2>
		<div class="descricao">
			<p>Insira a nova senha nos campos indicados e finalize o processo clicando em 'Alterar'. 
		Proteja sua conta com uma senha forte e atualizada.</p>
		</div>
		<Sidebar></Sidebar>
		<Header></Header>
		<form @submit.prevent="changePassword">
			<label for="password">Nova senha</label>
			<input v-model="password" type="password" id="password" placeholder="Insira sua nova senha">
			<label for="cnfrm-password">Confirmar senha</label>
			<input v-model="cnfrmPassword" type="password" id="cnfrm-password" placeholder="Confirme sua nova senha">
			<p :style="{ backgroundColor: messageBackgroundColor, color: '#fff', padding: '5px 25px', marginTop: '10px', marginLeft: '11vh', borderRadius: '5px' }">
				{{ message }}</p>
			<button type="submit">Alterar</button>
		</form>
	</div>
</template>

<script lang="ts">
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import baseURL from '../service/api';
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Header,
  },

  data() {
    return {
      password: '',
      cnfrmPassword: '',
      message: '',
      messageBackgroundColor: '',
    };
  },
  methods: {
    async changePassword() {
      if (this.password.length !== 0) {
        if (this.password === this.cnfrmPassword) {
          try {
            const token = localStorage.getItem('token');

            if (!token) {
              console.error('Token not found in localStorage');
              this.message = 'Token não encontrado. Faça o login novamente.';
              this.messageBackgroundColor = '#ff4d4d';
              return;
            }
			
            const response = await axios.put(
              `${baseURL}user/changePassword/${token}/${this.password}`,
              null,
              {
                headers: {
				'Content-Type': 'application/json', // Adicione esta linha
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            this.message = 'Senha alterada com sucesso';
            this.messageBackgroundColor = '#1dcd59';
            console.log(response.data);
          } catch (error) {
            console.error('Erro ao alterar senha:', error);

            if (error.response) {
              // O servidor respondeu com um status de erro
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              // A solicitação foi feita, mas não houve resposta do servidor
              console.error('No response received. Request details:', error.request);
            } else {
              // Algo aconteceu durante a configuração da solicitação que acionou um erro
              console.error('Error setting up the request:', error.message);
            }

            this.message =
              'Erro ao alterar senha. Verifique o console para obter mais detalhes.';
            this.messageBackgroundColor = '#ff4d4d';
          }
        } else {
          this.message = 'Senhas divergentes';
          this.messageBackgroundColor = '#ff4d4d';
        }
      } else {
        alert('A senha não pode ser vazia');
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>
.title {
  color: rgb(255, 255, 255);
  font-size: 35px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 30px;
}
.descricao {
  color: #999898;
  margin-top: -5px;
  margin-left: -20px;
  font-size: 25px;
}

form {
	background-color: #121415;
	width: 450px;
	padding: 50px 40px;
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 58%;
	border-bottom: solid 1px #ffffff4d;
	border-radius: 8px;
	box-shadow: 0 0px 5px rgb(0,0,0, 0.5);
}

label {
	font-weight: 500;
	color: #fff;
}

input {
	display: block;
	width: 100%;
	margin-top: 5px;
	padding: 12px;
	border-radius: 5px;
	outline: none;
	color: #101010;
}

#password {
	margin-bottom: 30px;
}

input[type="password"] {
	border: 2px solid #c2c2c2;
}

button {
	background-color: #5D5DFF;
	border: none;
	color: #ffffff;
	padding: 10px 40px;
	display: block;
	margin-left: 17.5vh;
	font-weight: 500;
	font-size: 19px;
	letter-spacing: 1px;
	cursor: pointer;
	border-radius: 5px;
	margin-top: 20px;
	transition: all 1s ease;
	box-shadow: 20px 20px 30px rgba(0, 0, 0, 30%);
}

button:hover {
	opacity: 0.8;
	transform: translateY(-5px);
}

.page-content {
	justify-content: space-between;
	margin-left: 18%;
	width: 100%;
	height: 100vh;
	/* overflow: hidden; */
}

p {
	font-size: 14px;
	margin: 15px 0;
	display: inline-block;
	color: #ffffff;
}

.page-content h1 {

	color: #fff;
	min-height: 10vh;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	font-size: 35px;
	margin-left: 40px;
	margin-top: 4vh;
}

.page-content p {
	color: #999898;
	margin: 0vh 0vh 1vh 6vh;
	font-size: 17px;
}
</style>