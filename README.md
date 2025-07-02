Trabalho Prático #1 – Consumo e Implementação de APIs RESTful

AutorDiogo Ruivo (n.º 31817)

📌 Publicação

Front-end (Vercel)-https://trab1-restapi-diogoruivo31817-git-dev-diogoruivo31817s-projects.vercel.app/

Back-end (Render)-https://trab1-restapi-diogoruivo31817.onrender.com

alunos-trab1-restapi-diogoruivo31817.onrender.com/alunos
cursos-trab1-restapi-diogoruivo31817.onrender.com/cursos

🚀 Como instalar e correr

Clonar repositório

git clone https://github.com/PWEB-2425/trab1-restapi-Diogoruivo31817.git
cd trab1-restapi-diogoruivo31817

Configurar e arrancar o Back-end

cd backend
npm install

Crie um ficheiro .env em backend/ com:

PORT=3002
MONGODB_URI=<a sua connection string do Atlas>

Povoar a base de dados em Atlas:

node seed.js

Arrancar o servidor:

node server.js

A API estará disponível em http://localhost:3002

Correr o Front-end

cd ../frontend
# não há dependências npm; apenas abra index.html ou use:
live-server .

A interface usa Fetch para comunicar com http://localhost:3002/alunos e …/cursos

🗄️ Estrutura da Base de Dados

Ficheiro origem: mock-data/bd.json

Coleções iniciais:

alunos (10 registos)Cada aluno tem campos:

{
  "id": 1,
  "nome": "Joana",
  "apelido": "Silva",
  "curso": "Engenharia Informática",
  "anoCurricular": 2
}

cursos (5 registos)Cada curso tem campos:

{
  "id": 1,
  "nomeDoCurso": "Engenharia Informática"
}

O script backend/seed.js lê este JSON, limpa as coleções em Atlas e insere os documentos (convertendo id em _id nativo).

🔗 API RESTful (Express + MongoDB)

Base URL: http://localhost:3002

Alunos-http://localhost:3002/alunos

GET /alunos – Listar todos os alunos

GET /alunos/:id – Obter um aluno por _id

POST /alunos – Criar um novo aluno

PUT /alunos/:id – Atualizar um aluno

DELETE /alunos/:id – Apagar um aluno

Cursos-http://localhost:3002/alunos

GET /cursos – Listar todos os cursos

POST /cursos – Criar um novo curso

PUT /cursos/:id – Atualizar um curso

DELETE /cursos/:id – Apagar um curso

🖥️ Front-end

Tecnologias: HTML5, CSS3, Bootstrap 5, JavaScript (ESModules), Fetch API

Funcionalidades:

Ver: carrega e lista alunos ordenados.

Adicionar: formulário → POST /alunos.

Editar: prompt com dados atuais → PUT /alunos/:_id.

Apagar: confirma → DELETE /alunos/:_id.

⚙️ Back-end

Node.js + Express

Mongoose para modelos e ligação a MongoDB Atlas

Middlewares:

cors()

express.json()

app.set('json spaces', 2) (para indentação JSON)

✅ Critérios cumpridos

Base JSON correta (10%)

API simulada e testada (10%)

Funcionalidade front-end (30%)

API real Node.js + MongoDB Atlas (30%)

Integração front/back local (10%)

Deploy funcional do front-end (Vercel) (10%)

Total obrigatório: 100%

📚 Links

GitHub: https://github.com/PWEB-2425/trab1-restapi-Diogoruivo31817/tree/dev

Front-end Prod: https://trab1-restapi-diogoruivo31817-git-dev-diogoruivo31817s-projects.vercel.app/

Back-end Local: trab1-restapi-diogoruivo31817.onrender.com/alunos
                trab1-restapi-diogoruivo31817.onrender.com/cursos
