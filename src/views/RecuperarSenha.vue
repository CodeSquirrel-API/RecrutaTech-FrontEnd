<template>
    <div class="center">

      <h2 class="titulo style">Esqueceu a sua senha?</h2>

      <div class="">
        <form>
            <div>
              <label for="username" class="font" >Para redefinir a sua senha, informe o seu email cadastrado na sua conta e lhe enviaremos um link com as instruções.</label>    
            </div>

            <div class="">
              <input type="text" maxlength="50" id="email" v-model="email" @input="validaremail" placeholder="insira o seu e-mail"  />
            </div>

            <div class="center">
            
            <RouterLink to="/NewPassWord">
              <button class="btnCadastrar" @click="VerificarEmail">Proximo</button>
            </RouterLink>
 
          </div>

            <div class="center font">
              <label for="text">
                <RouterLink to="/login">Cancele</RouterLink> 
              </label>
            </div>
        </form>
      </div>
    </div>  
  </template>

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
}

.style{
  margin-top: 100px;
  
}

.font{
  color: #FFFFFF;
  text-align: center;
  display: flex;
  justify-content: center;
  max-width: 350px;
  margin-left: 30px;
}

.titulo{
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: bolder;
}
.btnCadastrar{
  margin-left: 10px;
  border-radius: 5px;
  width: 133px;
  height: 40px;
  background-color: #5D5DFF;
  color: white;
  font-size: 20px;
  border: none;
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
  margin-top: 10px;
  width: 100%;
}
</style>

  <script lang="ts">
  //comentario
  export default {

    data() {
      return {
        email:'',
        isPopupVisible: false,
        popupMessage: 'Seu cadastro foi realizado com sucesso, verifique o seu email para poder realizar a ativação da sua conta.',
      };
    },
    computed: {
      camposPreenchidos() {
    if (this.email ) {
      return true; // Retorna false se pelo menos um campo estiver vazio.
    } else {
      return false; // Retorna true quando todos os campos estão preenchidos.
        }
      }
    },
    methods: {
      showPopup() {
        if (this.camposPreenchidos){
          this.isPopupVisible = true;
        }
        else{
          alert('Por favor, preencha todos os campos antes de exibir o pop-up');
          
        }
      },
      closePopup() {

        this.isPopupVisible = false;
      },
      login() {
        // Aqui você pode implementar a lógica de autenticação, como fazer uma requisição para um servidor.
        // Por simplicidade, vamos apenas imprimir os valores do nome de usuário e senha por agora.
        console.log('Email:', this.email);
      },
      async VerificarEmail () {
        try{
         const responseCheck = await axios.post(`${baseURL}/email/check-code`, {
          "email": this.email,
        })
        console.log(responseCheck.data);
        console.log(this.email);

        if (responseCheck.data.valid) {
          this.$router.push('/home');
        } else {
          this.$router.push('/login')
          alert("Codigo incorreto!!");
          }
        }
        catch (error) {
          console.error(error);
          
        }
          
      },
      validaremail(){
        if (isNaN(this.email)) {
        this.email = null;
        }
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/login')
      },
    },
  };
  </script>