<script setup lang="ts">
defineProps<{
  msg: string;
  txt: string;
}>()

import axios from 'axios';
import { ref } from 'vue';

const resposta = ref('');

const azureOpenAIAPI = {
  ResourceName: 'interactai',
  DeploymentId: 'modelgpt35t',
  Key: '',
  Version: '2023-05-15'
};

const apiUrl = `https://${azureOpenAIAPI.ResourceName}.openai.azure.com/openai/deployments/${azureOpenAIAPI.DeploymentId}/chat/completions?api-version=${azureOpenAIAPI.Version}`;

const headers = {
  'Content-Type': 'application/json',
  'api-key': azureOpenAIAPI.Key
};
const data = {
  messages: [
    {"role": "user", "content": "Quais as competencias, habilidades e atitudes que um desenvolvedor front-end pleno precisa ter?"}
  ]
};

axios.post(apiUrl, data, { headers })
  .then(response => {
    console.log(response.data.choices[0].message)
    resposta.value = response.data.choices[0].message.content;
  })
  .catch(error => {
    console.error(error);
  });


  const Copiar = () => {
  const el = document.createElement('textarea');
  el.value = resposta.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

</script>

<template>
  <div class="campo-cha">
    <h3 class="cha">
      {{`${resposta}`}}
    </h3>
  </div>

  <div class="">
    
    <button class="btn-copiar" @click=Copiar>Copiar</button>
  </div>
    
</template>


<style scoped>

  .campo-cha{
    background-color: #E3E3E3;
    width: auto;
    height: auto;
  }
  .cha{
    color: black;
    font-size: 15px;
  }
  .btn-copiar{
    height: 30px;
    width: 60px;
    background-color: #5D5DFF;
    color: white;
    font-weight: bold;
    border: none;
  }
  .btn-copiar:hover{
    background-color: rgba(93, 0, 130, 0.344);
    border: 2px solid #ffffff;
    border-radius: 10%;
  }
</style>