// backend/seed.js
import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';


console.log('DEBUG: MONGODB_URI =', process.env.MONGODB_URI);


const caminho = new URL('../mock-data/bd.json', import.meta.url);
console.log('DEBUG: caminho para bd.json =', caminho.href);

let data;
try {
  data = JSON.parse(fs.readFileSync(caminho, 'utf8'));
  console.log(`DEBUG: lidos ${data.alunos.length} alunos e ${data.cursos.length} cursos`);
} catch (err) {
  console.error('❌ Erro a ler bd.json:', err);
  process.exit(1);
}

const { alunos, cursos } = data;

async function seed() {
  console.log('🔌 A ligar ao MongoDB…');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Ligado ao MongoDB');

  
  const Aluno = mongoose.model('Aluno', new mongoose.Schema({}, { strict: false }));
  const Curso = mongoose.model('Curso', new mongoose.Schema({}, { strict: false }));

  console.log('🗑️  A limpar coleções…');
  await Aluno.deleteMany({});
  await Curso.deleteMany({});

  console.log('📥 A inserir alunos…');
  await Aluno.insertMany(alunos);
  console.log('📥 A inserir cursos…');
  await Curso.insertMany(cursos);

  console.log('✅ Base de dados povoada com sucesso!');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Erro no seed():', err);
  process.exit(1);
});

