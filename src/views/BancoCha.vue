<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Btn_Salvar from '../components/Btn_Salvar.vue'
import Btn_Limpar from '../components/Btn_Limpar.vue'
import Btn_Buscar from '../components/Btn_Buscar.vue'



import Cha from '../components/Cha.vue'
</script>

<template>
  <main>
      <HelloWorld msg="Banco de CHA" txt="Procure os CHA's que você já criou na plataforma." />
      <div class="btn-container">
        <div class="btn-group">
          <Btn_Limpar />
          <Btn_Buscar />
          
        </div>
      </div>
      <hr class="linha-horizontal">
      <Cha />

      <div class="btn-container">
        <div class="btn-group">
          <button class="btn">Editar CHA</button> 
          <Btn_Salvar />
        </div>
      </div>

  </main>
</template>



<style scoped> /**estilo scoped será aplicado apenas nos componentes que eu quiser, msm se ja tiver um global o scoped será aplicado por cima. */
.btn-container {
  display: flex;
  flex-grow: 1; /* Isso faz com que o contêiner dos botões cresça e empurre os botões para o canto direito */
  justify-content: flex-end; /* Isso alinha os botões à direita */
}

.btn-group {
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
}


.linha-horizontal {
  border: 1px solid #5B5B5B; /* Estilo da linha, você pode personalizar as propriedades de acordo com suas preferências */
  margin: 20px 0; /* Espaçamento acima e abaixo da linha */
  width: 100%;
}
</style>
