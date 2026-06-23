# Sistema de Controle de Despesas

## Sobre
API RESTful para controle de despesas pessoais feita em Node.js com Express, Sequelize e MySQL, seguindo o padrão MVC.

## Tecnologias usadas
- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcrypt

## Estrutura do projeto
```
src/
  config/        → configurações de autenticação
  controllers/   → regras e validações
  database/      → migrations e seeders
  middlewares/   → autenticação JWT
  models/        → conexão com banco e definição das tabelas
  routes/        → rotas da API
  views/         → recebe req/res e chama os controllers
app.js           → inicialização do servidor
```

## Como rodar

Instala as dependências:
```
npm install
```

Inicia o XAMPP e cria um banco MySQL chamado `mvc`.

Roda o servidor:
```
node app.js
```

Vai rodar em: http://localhost:3000

## Rotas

### Auth (públicas)
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /users | Cadastrar usuário |
| POST | /auth/login | Login, retorna token JWT |

### Categorias (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categories | Listar categorias |
| GET | /categories/:id | Buscar por id |
| POST | /categories | Criar categoria |
| PUT | /categories/:id | Atualizar categoria |
| DELETE | /categories/:id | Remover categoria |

### Despesas (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /expenses | Listar despesas do usuário |
| GET | /expenses/:id | Buscar por id |
| POST | /expenses | Criar despesa |
| PUT | /expenses/:id | Atualizar despesa |
| DELETE | /expenses/:id | Remover despesa |

### Filtros disponíveis
```
GET /expenses?status=PAGA
GET /expenses?categoriaId=1
GET /expenses?valorMin=50&valorMax=200
GET /expenses?dataInicio=2026-01-01&dataFim=2026-12-31
```

### Dashboard (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /dashboard/total-expenses | Total gasto |
| GET | /dashboard/expenses-count | Quantidade de despesas |
| GET | /dashboard/expenses-by-category | Total por categoria |

## Exemplo de uso

### Cadastrar usuário
```json
POST /users
{
  "nome": "Luis",
  "email": "luis@email.com",
  "senha": "123456"
}
```

### Login
```json
POST /auth/login
{
  "email": "luis@email.com",
  "senha": "123456"
}
```
Retorna:
```json
{ "token": "eyJ..." }
```

### Criar despesa (com token no Authorization Bearer)
```json
POST /expenses
{
  "descricao": "Mercado",
  "valor": 100,
  "data": "2026-06-01",
  "status": "PAGA",
  "categoriaId": 1
}
```

## Relacionamentos
- Um usuário possui várias despesas
- Uma categoria possui várias despesas
- Uma despesa pertence a um usuário
- Uma despesa pertence a uma categoria

## Segurança
- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Rotas protegidas por middleware
- Cada usuário acessa apenas as próprias despesas