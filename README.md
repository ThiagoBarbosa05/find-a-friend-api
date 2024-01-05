![Logo](./public/logo.png)


# Find a friend API
Esta é uma simples aplicação desenvolvida como solução do desafio do módulo 3 da trilha de node.js da Rocketseat, onde é possível se registrar como uma ORG para cadastrar alguns pets para adoção, o usuário que deseja adotar algum pet consegue filtra-los pelas caracteristicas e pela cidade da ORG. Essa aplicação foi construída usando SOLID, que representa um conjunto de cinco princípios de design de software orientado a objetos destinados a criar sistemas mais compreensíveis, flexíveis e sustentáveis, e também usando a abordagem de desenvolvimento de software TDD (Test-Driven Development). 

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

## 🛠 Tecnologias

The following tools were used to build the project:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
## Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

## Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada


## Instalação

```bash
  # clone o repositório do projeto
  git clone https://github.com/ThiagoBarbosa05/find-a-friend-api.git

  # Entre no diretório do projeto clonado
  cd find-a-friend-api

  # Instale as dependências do projeto
  npm install

  # Inicialize o banco de dados em sua máquina
  docker-compose up -d

  ## Se não estiver o docker instalado na sua máquina pode seguir o guia de instalação
    disponível na guia de instalação no site oficial do docker ou pode usar 
    o banco de dados relacional de sua preferência


  ## Rode as migrations para o banco de dados
  npx prisma migrate dev

  ## Por fim para rodar o projeto
  npm run dev
```
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar algumas variáveis de ambiente no arquivo `.env`, você encontrará um exemplo de como prenncher essas variáveis no seguinte arquivo `.env.example`




## Rodando os testes

Para rodar os testes, siga os seguintes passos:

```bash
  # Para rodar os testes unitários
  npm run test

  # Para rodar os testes end-to-end
  npm run test:e2e
```
