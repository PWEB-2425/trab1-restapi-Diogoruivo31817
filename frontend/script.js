// script.js

const API_ALUNOS  = 'https://trab1-restapi-diogoruivo31817.onrender.com/alunos';
const API_CURSOS  = 'https://trab1-restapi-diogoruivo31817.onrender.com/cursos';

const ul            = document.getElementById('lista-alunos');
const form          = document.getElementById('form-adicionar');
const selectCurso   = document.getElementById('curso');


async function carregarCursos() {
  try {
    const cursos = await fetch(API_CURSOS).then(r => r.json());
    
    selectCurso.innerHTML = `<option value="">Escolhe um curso…</option>`;
    cursos.forEach(c => {
      
      const nome = c.nomeDoCurso ?? c.nome;
      const opt  = document.createElement('option');
      opt.value  = nome;
      opt.text   = nome;
      selectCurso.append(opt);
    });
  } catch (err) {
    console.error('Erro ao carregar cursos:', err);
    alert('Não foi possível carregar a lista de cursos.');
  }
}


 
async function listar() {
  
  const alunos = await fetch(API_ALUNOS).then(r => r.json());

  
  ul.replaceChildren();

  
  alunos.sort((a, b) => a._id.localeCompare(b._id));

  
  alunos.forEach((a, idx) => {
    ul.insertAdjacentHTML('beforeend', `
      <li class="list-group-item d-flex justify-content-between align-items-center"
          data-id="${a._id}">
        <span><strong>Aluno ${idx + 1}</strong> – ${a.nome} ${a.apelido}
              • ${a.curso} (${a.anoCurricular})</span>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-primary" data-acao="editar">Editar</button>
          <button class="btn btn-danger"  data-acao="apagar">Apagar</button>
        </div>
      </li>
    `);
  });
}


form.addEventListener('submit', async e => {
  e.preventDefault();

  const novo = {
    nome:          form.nome.value.trim(),
    apelido:       form.apelido.value.trim(),
    curso:         form.curso.value.trim(),
    anoCurricular: +form.ano.value
  };

  const res = await fetch(API_ALUNOS, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(novo)
  });
  if (!res.ok) {
    alert('Erro ao adicionar aluno.');
    return;
  }

  form.reset();
  listar();
});


ul.addEventListener('click', async e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const li   = btn.closest('li[data-id]');
  const id   = li.dataset.id;
  const url  = `${API_ALUNOS}/${encodeURIComponent(id)}`;
  const acao = btn.dataset.acao;

  
  if (acao === 'apagar') {
    if (!confirm('Apagar este aluno?')) return;
    await fetch(url, { method: 'DELETE' });
    li.remove();
    return;
  }

  
  if (acao === 'editar') {
    const dados = await fetch(url).then(r => r.json());

    const nome = prompt('Nome:',     dados.nome);
    const ape  = prompt('Apelido:',  dados.apelido);
    const cur  = prompt('Curso:',    dados.curso);
    const ano  = prompt('Ano:',      dados.anoCurricular);

    // se cancelou
    if ([nome, ape, cur, ano].some(v => v === null)) return;

    const corpo = {
      nome:          nome.trim()  || dados.nome,
      apelido:       ape.trim()   || dados.apelido,
      curso:         cur.trim()   || dados.curso,
      anoCurricular: Number(ano)  || dados.anoCurricular
    };

    const resPut = await fetch(url, {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(corpo)
    });
    if (!resPut.ok) {
      alert('Erro ao actualizar aluno.');
      return;
    }

    listar();
  }
});


(async () => {
  await carregarCursos();
  await listar();
})();



