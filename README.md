## Sobre

Esta aplicação consiste em uma agenda de contatos virtual, na qual é possível adicionar, editar, excluir e listar contatos de um determinado usuário, bem como gerar um relatório com todas as informações relacionadas ao usuário.

[link para aplicação](https://desafio-fullstack-mauriliotn.vercel.app/)

## Tecnologias

Foram utilizadas no projeto as seguintes tecnologias para o frontend:

- NextJS
- TypeScript
- Tailwind CSS
- Zod
- React Hook Form
- React Toastify
- React Icons

Foram utilizadas no projeto as seguintes tecnologias para o backend:

- NestJS
- BcryptJS
- Jsonwebtoken
- Passport (authentication)
- Swagger UI
- Prisma ORM
- Class-validator
- Zod

# API

## Clients & Contacts

Esta API consiste em um cadastro de clientes que poderá conter muitos contatos associados.

É possível realizar operações de criação, leitura, edição e deleção de clientes e contatos.

[link para documentação](https://desafio-fullstack-mauriliotn.onrender.com/api)

## Primeiros passos (Para rodar API localmente)

1. Clone o repositório em sua máquina.
2. Instale as dependências rodando o seguinte comando:

```shell
npm install
```

3. Crie um arquivo **.env**, seguindo os exemplos de variáveis de ambiente contidas no arquivo **.env.example**.
4. Gere as migrações com o seguinte comando:

```shell
npx prisma migrate dev
```

5. Execute as migrações com o seguinte comando:

```shell
npm run start:dev
```

6. Caso queira, você pode testar as rotas por meio da collection **Insomnia.json**. Esse arquivo está localizado na pasta **fullstack-backend**.
