
# Desafio Final do Processo de Estágio Pitang 2024

Este projeto é a solução para o desafio final do processo de estágio da Pitang 2024. A aplicação foi desenvolvida utilizando React e oferece duas páginas: uma para realização do agendamento e outra para consulta de todos os agendamentos feitos.


## Funcionalidades


- Agendamento: Permite que os usuários agendem horários com as seguintes restrições:
  - Máximo de 2 agendamentos por hora.
  - Intervalo mínimo de 1 hora entre agendamentos.
  - Limite de 20 agendamentos por dia.

- Consulta de Horários: Permite a visualização da listagem de todos os agendamentos feitos, agrupados por dia e hora.
  - Permite informir se o agendamento foi realizado ou não.
  - Permite detalhar conclusão do atendimento (se foi realizado).


## Instalação

Clone o repositório:

```bash
  git clone
  cd desafio-pitang-frontend
```
Instale as dependências:

```bash
  npm install 
  #ou
  yarn install

```



    
## Uso

Para iniciar a aplicação, use o comando:
```
npm run dev
#ou
yarn dev

```
## Testes

Para rodar os testes, use o comando:

```
yarn test
# ou
npm test

```

```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
