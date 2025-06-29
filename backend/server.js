// backend/server.js

import 'dotenv/config';
import express  from 'express';
import mongoose from 'mongoose';
import cors     from 'cors';

const app = express();

// ─── Middlewares ───────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Indentar automaticamente as respostas JSON em 2 espaços
app.set('json spaces', 2);

// ─── Conexão ao MongoDB Atlas ────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Ligado ao MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Erro ao ligar ao MongoDB:', err);
    process.exit(1);
  });

// ─── Schemas & Models (in-place) ──────────────────────────
const alunoSchema = new mongoose.Schema({
  nome:          String,
  apelido:       String,
  curso:         String,
  anoCurricular: Number
});
const Aluno = mongoose.model('Aluno', alunoSchema);

const cursoSchema = new mongoose.Schema({
  nome:    String,
  duracao: Number
});
const Curso = mongoose.model('Curso', cursoSchema);

// ─── Endpoints Alunos ────────────────────────────────────
app.get('/alunos', async (_req, res) => {
  const lista = await Aluno.find();
  res.json(lista);
});

app.post('/alunos', async (req, res) => {
  const novo = new Aluno(req.body);
  const salvo = await novo.save();
  res.status(201).json(salvo);
});

app.put('/alunos/:id', async (req, res) => {
  const atualizado = await Aluno.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(atualizado);
});

app.delete('/alunos/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ─── Endpoints Cursos ────────────────────────────────────
app.get('/cursos', async (_req, res) => {
  const lista = await Curso.find();
  res.json(lista);
});

app.post('/cursos', async (req, res) => {
  const novo = new Curso(req.body);
  const salvo = await novo.save();
  res.status(201).json(salvo);
});

app.put('/cursos/:id', async (req, res) => {
  const atualizado = await Curso.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(atualizado);
});

app.delete('/cursos/:id', async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ─── Novo endpoint “texto puro” ──────────────────────────
app.get('/alunos/text', async (_req, res) => {
  const lista = await Aluno.find();
  const linhas = lista.map(a =>
    `${a.nome} ${a.apelido} – ${a.curso} (${a.anoCurricular})`
  );
  res.type('text/plain').send(linhas.join('\n'));
});

// ─── Arranque do Servidor ─────────────────────────────────
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`🚀 Servidor em http://localhost:${port}`);
});




