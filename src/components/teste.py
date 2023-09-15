import openai
versao 9.8
https://github.com/Inodevs-6/Inodevs-back-machine-learning/tree/feature/integration-with-chatGPT


openai.api_type = "azure"
openai.api_base = "https://interactai.openai.azure.com/"
openai.api_version = "2023-05-15"
openai.api_key = "66a6b8c8d3c449d4b53fa75d09b04366"

user_competence = input("Competencia: ")
user_ability = input("Habilidade: ")
user_attitudes = input("Atitude: ")

response = openai.ChatCompletion.create(
    engine="modelgpt35t",
    messages=[
        {"role": "system", "content": "Melhore com base no CHA (Conhecimentos, Habilidades e Atitudes) e de uma forma curta os 3 tópicos a seguir também separado em Competencias, Habilidades e Atitudes, volte com isso por tópico para buscar por um profissional com uma descrição melhor: "+user_competence+user_ability+user_attitudes},
    ]
)

#print(response)
print(response['choices'][0]['message']['content'])