<script setup lang="ts">
import Btn_Salvar from '../components/Btn_Salvar.vue'
import Btn_Limpar from '../components/Btn_Limpar.vue'
</script>


<template>
<HelloWorld msg="Banco de CHA" txt="Procure os CHA's que você jáaaaaaaaaa criou na plataforma." />
<div class="btn-container">
  <div class="btn-group">
    <Btn_Limpar />
    <Btn_Salvar />
  </div>
</div>
<hr class="linha-horizontal">



<!-- menu elaborado -->
<nav> 

  <RouterLink to="/">Inserir Descrição</RouterLink>
  <RouterLink to="/">Resultados</RouterLink>
  <RouterLink to="/about">Banco de CHA</RouterLink>
  <RouterLink to="/about">Configurações</RouterLink>

</nav>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
