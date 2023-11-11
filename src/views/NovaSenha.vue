<template>
    <div class="center">

      <h2 class="titulo style">Criando nova senha</h2>

      <div class="">
        <form>
            <div>
              <label for="username" class="font" >Para sua segurança, sua senha deve possuir:<br>- Minimo de 8 caractéres<br>- Ao menos um numero<br>- Ao menos uma letra</label>    
            </div>

            <div>
                <label for="password" class="font">Nova Senha</label>
            </div>
            <div class="">
              <input type="text" maxlength="25" id="password" v-model="password"/>
            </div>

            <div>
                <label for="password" class="font">Confirmar Nova Senha</label>
            </div>
            <div class="">
              <input type="text" maxlength="25" id="password" v-model="password"/>
            </div>

            <div class="center">
            
                <RouterLink to="/login">
                    <button class="btnCadastrar">Proximo</button>
                </RouterLink>
 
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
  export default {

    data() {
      return {
        password:'',
        confirmpassword:'',
        isPopupVisible: false,
        popupMessage: 'Seu cadastro foi realizado com sucesso, verifique o seu email para poder realizar a ativação da sua conta.',
      };
    },
    computed: {
      camposPreenchidos() {
    if (this.password ) {
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
        console.log('Password:', this.password);
      },
      entrar() {
      // Use o método de roteamento do Vue Router para redirecionar para a rota desejada
      this.$router.push('/login')
      },
    },
  };
  </script>