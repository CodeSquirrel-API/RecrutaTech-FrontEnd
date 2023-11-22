<template>
  <div class="center">

    <div class="icon">
      <img src="../../public/squirrel.png" width="100" height="100" />
    </div>


    <h2 class="titulo ">Entrar</h2>
    <form @submit.prevent="">

      <div class="style">
        <label for="email" class="font">E-mail:</label>
        <input type="text" maxlength="50" class="campoInput" id="email" v-model="email" placeholder="exemplo@gmail.com" required/>
      </div>

      <div class="style">
        <label for="password" class="font">Senha:</label>
        <input type="password" class="campoInput" id="password" v-model="password" placeholder="********" required/>
      </div>

      <div class="checkbox font style">
        <input type="checkbox" id="meuCheckbox" v-model="manterConectado" />
        <label for="meuCheckbox" class="">Manter conectado </label>
        <RouterLink class="a direita" to="/resetPassword">Esqueci minha senha</RouterLink>
      </div>

      <div class="center">
        <button class="close-popup-button entrar" @click="login()" v-if="carregando === false">Entrar</button>
        <div class="loader loader--style1" title="0" v-if="carregando === true" v-html="loading"></div>
        <div class="custom-popup" v-if="isPopupVisible">
          <div class="popup-content">
            <p class="popup-message">{{ popupMessage }}</p>
            <br>
            <!-- <input v-model="numero" @input="validarNumero" maxlength="6" :class="{ 'campo-vazio': numero === '' }"/> -->
            <br>
            <!-- <button class="close-popup-button" @click="VerificarCodigo">Login</button> -->
            <!-- <button class="close-popup-button" @click="closePopup">Fechar</button> -->
          </div>
        </div>
      </div>

      <div class="center">
        <label for="text" class="font">Não tem uma conta?
          <RouterLink to="/CadastroCPF">Cadastre-se</RouterLink>
        </label>
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

.style {
  margin: 30px 30px 30px 30px;
}

.checkbox {
  display: flex;
}

.campoInput {
  padding: 7px;
  background-color: #33363a00;
  width: 400px;
  height: 38px;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px 5px;
  border-style: solid;
  border-color: #33363A;
}

.font {
  color: #FFFFFF;
}

.titulo {
  text-align: center;
  font-size: 35px;
  font-weight: bolder;
  color: white;
}

.entrar {
  margin-top: 50px;
  margin-bottom: 25px;
  border-radius: 10px;
  width: 400px;
  height: 48px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
}

.entrar:hover {
  background-color: #2980b9;
}

.direita {
  margin-left: 80px;
}


.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.center {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: none;
  margin-top: 10px;
  width: 100%;
}

label {
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  align-items: flex-start;
}
</style>
  
<script lang="ts">
import baseURL from '../service/api';
import axios from 'axios';

export default {
  data() {
    return {
      number: null,
      code: '',
      isPopupVisible: false,
      email: '',
      password: '',
      manterConectado: false,
      carregando: false,
      loading: '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#5D5DFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#5D5DFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>',
      popupMessage: 'seu codigo será enviado em 5 minutos para o seu e-mail: ***@***.com, verifique o seu codigo para prosseguir com o seu login!'
    };
  },
  //computed: {
  //   camposPreenchidos() {
  // if (this.email) {
  //   return false; // Retorna false se pelo menos um campo estiver vazio.
  // } else {
  //   return true; // Retorna true quando todos os campos estão preenchidos.
  //     }
  //   } kk
  // },

  methods: {
    async login() {
      this.carregando = true;

      try {
        const response = await axios.post(`${baseURL}login/login`, {
          email: this.email,
          password: this.password,
        });

        // Verifique a resposta do servidor e redirecione conforme necessário
        if (response.status === 200) {
          const token = response.data;

          // Armazene o token no localStorage
          localStorage.setItem('token', token);
          console.log('Login efetuado com sucesso');
          this.$router.push('/home');

        } else {
          console.log('Credenciais inválidas');
        }
      } catch (error) {
        console.error('Erro no login:', error);
      } finally {
        this.carregando = false;
      }
    }

    ///salvar o token numa variavel localStorage; 
    // dps ir no


    //async login(){
    // // Block Mock - initial FIXME
    //   console.log('teste');
    //   //Tecnica de mock;
    //   this.carregando = true;
    //   setTimeout(() => {
    //     // carregando = true; // -> ccontrola o spinner
    //     if(this.username === 'teste@email.com' && this.password === '123456')
    //     {
    //       console.log('Login efetuado');
    //       this.$router.push('/home');
    //       this.carregando = false;
    //     }
    //     else
    //     {
    //       console.log('deu errado'); //-> Maybe use alert by javascript
    //       this.carregando = false;
    //     }
    //     // carregando = false;
    //   }, 6000) // 1 seg = 1000 milisegundos
    //   // Block Mock - End

    //   this.carregando = true;
    //   setTimeout(() => {
    //     // carregando = true; // -> ccontrola o spinner
    //     if(this.username === this.username && this.password === this.password)
    //     {
    //       console.log('Login efetuado');
    //       this.$router.push('/home');
    //       this.carregando = false;
    //     }
    //     else
    //     {
    //       console.log('deu errado'); //-> Maybe use alert by javascript
    //       this.carregando = false;
    //     }
    //     // carregando = false;
    //   }, 6000)
    //   await axios.post(`${baseURL}/login/login`, {
    //     email: this.username,
    //     password: this.password,
    //     //token: '' -> Irs make no sense!!!!!1
    //   }).then((data) => {
    //     console.log(data);

    //     // Next Steps -> verify if data is ok and transfer user to other screem.
    //     // If not ok, show message
    //   });
    // }

    // async Codigo () {
    //   try{
    //    const response = await axios.post(`${baseURL}/email/send-code`, {
    //     "email": this.email,
    //   })
    //   console.log(response.data)
    //   console.log("codigo enviado!", this.email)
    //   }
    //   catch (error) {
    //     console.error('error')

    //   }
    // },
    // async VerificarCodigo () {
    //   try{
    //    const responseCheck = await axios.post(`${baseURL}/email/check-code`, {
    //     "email": this.email,
    //     "code": this.code,
    //   })
    //   console.log(responseCheck.data);
    //   console.log(this.email);

    //   if (responseCheck.data.valid) {
    //     this.$router.push('/home');
    //   } else {
    //     this.$router.push('/login')
    //     alert("Codigo incorreto!!");
    //     }
    //   }
    //   catch (error) {
    //     console.error(error);

    //   }

    // },
    // validarNumero(){
    //   if (isNaN(this.numero)) {
    //     this.numero = null;
    //   }
    // },
    // showPopup() {
    //   if (this.camposPreenchidos){
    //     this.isPopupVisible = true;
    //   }
    //   else{
    //     alert('Por favor, preencha todos os campos antes de prosseguir');

    //   }
    // },
    // closePopup() {
    //   this.isPopupVisible = false;
    // },


    //entrar() {
    //this.$router.push('/home')
    //},
  },
};
</script>