<script setup lang="ts">
import Cha from '../components/Cha.vue'

</script>

<template>
    <div>
      <h1 class="title">Descrição da Vaga</h1>
      <label for="descricao" class="input-label">Digite o título do cargo:</label>
      <input class="custom-input" type="text" placeholder="Digite aqui...">
      
      <div class="nivel-container">
        <span class="span-nivel">Selecione o nível de atuação profissional:</span> <br>
        <select name="nivel" class="select-option txt-select">
          <option value="" class="select-option txt-select">Junior</option>
          <option value="" class="select-option txt-select">Pleno</option>
          <option value="" class="select-option txt-select">Sênior</option>
        </select>
      </div>
  
      <!-- Botões Limpar e Salvar -->
      <div class="button-container">
        <button class="custom-button clear-button">Limpar</button>
        <button class="custom-button save-button">Gerar CHA</button>

      </div>
    </div>
  </template>
  
  <style scoped>
  .title {
    color: rgb(255, 255, 255); 
    font-size: 35px; 
    font-weight: bold; 
    margin-left: 25px;
  }
  .input-label {
    color: #ffffff; 
    font-size: 20px; 
    margin-bottom: 8px; 
    margin-left: 25px;
  }
  .custom-input {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 6px; 
  }
  
  .custom-input:focus {
    border-color: #007bff;
  }
  
  .nivel-container {
    margin-left: 25px;
    margin-top: 30px; 
  }
  
  .span-nivel {
    color: #ffffff; 
    font-size: 20px; 
    margin-bottom: 8px; 
  }
  
  .select-option {
    width: 30%;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s;
    margin-top: 5px;
  }
  
  .select-option:focus {
    border-color: #007bff;
  }
  
  /* Estilos dos botões */
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 55px;
  }
  
  .custom-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.2s;
  }
  
  .clear-button {
    background-color: #6666;
    color: #fff;
  }
  
  .save-button {
    background-color: #5D5DFF;
    color: #fff;
  }
  
  .custom-button:hover {
    filter: brightness(0.9); /* Escurece a cor ao passar o mouse */
  }
  </style>
  