<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição 

Este projeto consiste no desenvolvimento de uma API robusta para gerenciamento de investimentos, projetada para lidar com grandes volumes de dados de forma eficiente. A API adota conceitos avançados de programação e arquitetura de software, garantindo alta performance e escalabilidade. O PostgreSQL foi escolhido como banco de dados, enquanto o TypeORM é utilizado para a persistência de dados, assegurando a integridade e eficiência nas operações de armazenamento e consulta. Para validação dos dados de entrada, a biblioteca Zod é empregada, garantindo que todas as entradas sejam validadas antes de serem processadas, aumentando a segurança e confiabilidade da aplicação.

## Instalação

```bash
$ yarn install
```

## Testando o projeto

Para utilizar este projeto de gerenciamento de investimentos, é necessário seguir algumas etapas para configurar corretamente o ambiente e garantir que a aplicação funcione conforme esperado. Abaixo estão as instruções passo a passo:

1. Configuração do Banco de Dados

Certifique-se de que você possui uma imagem do banco de dados **PostgreSQL** configurada e em execução. A imagem deve conter um banco de dados chamado `invest`. Se você ainda não tiver a imagem configurada, você pode criar uma utilizando o Docker, por exemplo, ou configurar manualmente um banco de dados PostgreSQL com o nome adequado.

2. Geração de Certificado para HTTPS

Para garantir que a aplicação funcione sobre HTTPS, será necessário gerar os certificados SSL. Utilize os seguintes comandos para gerar o certificado e a chave:

```bash
mkcert create-ca
mkcert create-cert
```

Esses comandos gerarão um certificado autoassinado para rodar a aplicação em ambiente de desenvolvimento com HTTPS, em seguida crie uma pasta chamada secrets e mova os arquivos gerados para ela.

3. Executar Migrations

Com o banco de dados configurado e os certificados gerados, o próximo passo é rodar as migrations do TypeORM para configurar o esquema do banco de dados. Execute o seguinte comando:

```bash
yarn migrate
```

Esse comando aplicará todas as migrations necessárias ao banco de dados, criando as tabelas e relacionamentos conforme definido no projeto.

4. Iniciar o Projeto

Após configurar o banco de dados e rodar as migrations, você pode iniciar o projeto executando o seguinte comando:

```bash
yarn migrate
```

Isso irá iniciar a aplicação e disponibilizar a API para uso. A aplicação estará pronta para receber requisições, e você poderá começar a interagir com os endpoints disponíveis. Depois acessar a "localhost:8080/docs" e terá acesso a API.

Abaixo está disponível o diagrama relacional do banco de dados:

![Modelo de banco de dados](assets/Diagrama%20do%20banco%20de%20dados.png)