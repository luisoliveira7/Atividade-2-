# Sistema de Despesas Pessoais

## Sobre
Esse projeto é uma API que eu fiz em Node.js para controlar despesas pessoais.
Agora organizado em MVC e seguindo o padrão RESTful Level 3 (HATEOAS).

Dá pra:
- adicionar despesa
- listar todas
- buscar por id
- atualizar
- remover
- ver total gasto
- ver total por categoria

## O que usei
- Node.js
- Express

## Estrutura MVC
- models/expense.js → cuida dos dados (lê e salva no expenses.json)
- controllers/expense.js → validações e regras
- views/expense.js → recebe as requisições e chama o controller
- app.js → rotas e inicialização do servidor

## Como rodar
No terminal dentro da pasta do projeto:

```
npm install
```

Depois:

```
node app.js
```

Vai rodar em: http://localhost:3000

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /expenses | Lista todas as despesas |
| GET | /expenses/:id | Busca uma despesa pelo id |
| POST | /expenses | Cria uma nova despesa |
| PUT | /expenses/:id | Atualiza uma despesa |
| DELETE | /expenses/:id | Remove uma despesa |
| GET | /expenses/summary/total | Total gasto |
| GET | /expenses/summary/category | Total por categoria |

## Exemplo de body para POST e PUT
```json
{
  "title": "Mercado",
  "amount": 100,
  "category": "Alimentacao",
  "date": "2026-03-10",
  "description": "Compra"
}
```

## RESTful Level 3
Cada resposta retorna _links com as ações disponíveis, por exemplo:
```json
{
  "id": "1",
  "title": "Mercado",
  "_links": [
    { "rel": "self", "method": "GET", "href": "/expenses/1" },
    { "rel": "atualizar", "method": "PUT", "href": "/expenses/1" },
    { "rel": "remover", "method": "DELETE", "href": "/expenses/1" },
    { "rel": "listar", "method": "GET", "href": "/expenses" }
  ]
}
```