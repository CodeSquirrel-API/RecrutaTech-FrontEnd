
<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import Btn_Salvar from './components/Btn_Salvar.vue'
</script>

 

<template>

  <header>

    <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

 

    <div class="wrapper">

      <HelloWorld msg="You did it!" />
      <Btn_Salvar />

 

      <nav>

        <RouterLink to="/">Home</RouterLink>

        <RouterLink to="/about">About</RouterLink>

      </nav>

    </div>

  </header>

 

  <RouterView />

</template>

 

<style scoped>

header {

  line-height: 1.5;

  max-height: 100vh;

}

 

.logo {

  display: block;

  margin: 0 auto 2rem;

}

 

nav {

  width: 100%;

  font-size: 12px;

  text-align: center;

  margin-top: 2rem;

}

 

nav a.router-link-exact-active {

  color: var(--color-text);

}

 

nav a.router-link-exact-active:hover {

  background-color: transparent;

}

 

nav a {

  display: inline-block;

  padding: 0 1rem;

  border-left: 1px solid var(--color-border);

}

 

nav a:first-of-type {

  border: 0;

}

 

@media (min-width: 1024px) {

  header {

    display: flex;

    place-items: center;

    padding-right: calc(var(--section-gap) / 2);

  }

 

  .logo {

    margin: 0 2rem 0 0;

  }

 

  header .wrapper {

    display: flex;

    place-items: flex-start;

    flex-wrap: wrap;

  }

 

  nav {

    text-align: left;

    margin-left: -1rem;

    font-size: 1rem;

 

    padding: 1rem 0;

    margin-top: 1rem;

  }

}

</style>

<!-- <template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <span v-if="message.role === 'system'">Sistema: {{ message.content }}</span>
      <div v-else-if="message.role === 'user'">Você: {{ message.content }}</div>
      <div v-else>Assistente: {{ message.content }}</div>
    </div>

    <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem" />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userMessage: '',
      messages: [
        { role: 'system', content: 'Você está conversando com o assistente de bate-papo.' },
      ],
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({ role: 'user', content: this.userMessage });
      axios
        .post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: this.messages,
        }, {
          headers: {
            'Authorization': 'Bearer YOUR_API_KEY', // Substitua YOUR_API_KEY pela sua chave de API
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const assistantMessage = response.data.choices[0].message.content;
          this.messages.push({ role: 'assistant', content: assistantMessage });
          this.userMessage = '';
        })
        .catch(error => {
          console.error('Erro na solicitação à API:', error);
        });
    },
  },
};
</script>
 -->

 <!-- <template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <span v-if="message.role === 'system'">Sistema: {{ message.content }}</span>
      <div v-else-if="message.role === 'user'">Você: {{ message.content }}</div>
      <div v-else>Assistente: {{ message.content }}</div>
    </div>

    <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem" />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
//const axios = require('axios');

const azureApiKey = '66a6b8c8d3c449d4b53fa75d09b04366'; // Substitua pelo seu Azure API Key
const azureResourceName = 'interactai';
const azureDeploymentId = 'modelgpt35t';
const azureVersion = '2023-05-15';
const openaiEndpoint = `https://${azureResourceName}.openai.azure.com/openai/deployments/${azureDeploymentId}/completions?api-version=${azureVersion}`;

const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'Você está conversando com o assistente de bate-papo.' },
    { role: 'user', content: 'Qual é a resposta para a pergunta XYZ?' },
  ],
};

axios.post(openaiEndpoint, requestData, {
  headers: {
    'Authorization': `Bearer ${azureApiKey}`,
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    const assistantMessage = response.data.choices[0].message.content;
    console.log(`Resposta do assistente: ${assistantMessage}`);
  })
  .catch(error => {
    console.error('Erro na solicitação à API:', error);
  });

import axios from 'axios';

export default {
  data() {
    return {
      userMessage: '',
      messages: [
        { role: 'system', content: 'Você está conversando com o assistente de bate-papo.' },
      ],
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({ role: 'user', content: this.userMessage });
      axios
        .post('AZURA_API_ENDPOINT', {
          model: 'gpt-3.5-turbo',
          messages: this.messages,
        }, {
          headers: {
            'Authorization': '66a6b8c8d3c449d4b53fa75d09b04366', // Substitua AZURA_API_KEY pela sua chave de API fornecida pela Azura
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const assistantMessage = response.data.choices[0].message.content;
          this.messages.push({ role: 'assistant', content: assistantMessage });
          this.userMessage = '';
        })
        .catch(error => {
          console.error('Erro na solicitação à API:', error);
        });
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
