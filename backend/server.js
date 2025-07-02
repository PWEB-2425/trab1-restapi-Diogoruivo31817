// backend/server.js

import 'dotenv/config';           
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Ligado ao MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Erro ao ligar ao MongoDB:', err);
    process.exit(1);
  });


const alunoSchema = new mongoose.Schema({
  nome:          String,
  apelido:       String,
  curso:         String,
  anoCurricular: Number
}, { versionKey: false });

const Aluno = mongoose.model('Aluno', alunoSchema);

const cursoSchema = new mongoose.Schema({
  nomeDoCurso: String,
  duracao:     Number
}, { versionKey: false });

const Curso = mongoose.model('Curso', cursoSchema);




app.get('/alunos', async (_req, res) => {
  const lista = await Aluno.find();
  res.json(lista);
});


app.get('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).send('Aluno não encontrado');
    res.json(aluno);
  } catch (err) {
    res.status(400).send('ID inválido');
  }
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


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`🚀 Servidor em http://localhost:${port}`);
});




