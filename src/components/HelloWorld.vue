<script setup lang="ts">
defineProps<{
  msg: string;
  txt: string;
}>()
</script>

<template>
  <div class="greetings"> <!--DIV que seleciona os campos para busca;-->
    <h1 class="green">{{ msg }}</h1> <!--a mensagem esta sendo definida qnd o componente é chamado na page App.vue-->
    <h2>{{ txt }}</h2>

    <span class="span-cargo">Selecione o título do cargo:</span>

    <select name="cargo" class="select-option txt-select select-cargo">
        <option value="select-option txt-select">Selecione o Cargo</option>
        <option value="select-option txt-select">Desenvolvedor Backend</option>
        <option value="select-option txt-select">Desenvolvedor Frontend</option>
        <option value="select-option txt-select">Cientista de Dados</option>
        <option value="select-option txt-select">Scrum Master</option>
    </select>
    <br>

    <span class="span-nivel" >Selecione o nível de atuação profissional:</span> <br>

    <select name="nivel" class="select-option txt-select">
        <option value="" class="select-option txt-select">Junior</option>
        <option value="" class="select-option txt-select">Pleno</option>
        <option value="" class="select-option txt-select">Sênior</option>
    </select>
  </div>
</template>




<style scoped>
.txt-select{
  color:rgb(0, 0, 0, 50%);
  font-size: 17px;
  margin-bottom: 30px;
}
.select-cargo{
  width: 100%;
}

h1 {
  font-weight: bold;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
h2{
  font-size: 20px;
  color: rgba(255, 255, 255, 50%);
  position: relative;
  top: -20px;
  right: -10px;
  
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
