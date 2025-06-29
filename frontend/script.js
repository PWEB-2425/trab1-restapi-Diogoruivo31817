const API = 'http://localhost:3001/alunos';   

const ul   = document.getElementById('lista-alunos');
const form = document.getElementById('form-adicionar');


async function listar() {
  const alunos = await fetch(API).then(r => r.json());

  ul.replaceChildren();
  alunos.sort((a, b) => +a.id - +b.id);     

  alunos.forEach((a, idx) => {
    ul.insertAdjacentHTML('beforeend', `
      <li class="list-group-item d-flex justify-content-between" data-id="${a.id}">
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

  const res = await fetch(API, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(novo)
  });
  if (!res.ok) { alert('Erro ao adicionar aluno.'); return; }

  form.reset();
  listar();
});


ul.addEventListener('click', async e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const li   = btn.closest('li[data-id]');
  const id   = li.dataset.id;                               
  const url  = `${API}/${encodeURIComponent(id)}`;
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

    if ([nome, ape, cur, ano].some(v => v === null)) return;

    const corpo = {
      
      nome:          nome.trim() || dados.nome,
      apelido:       ape.trim()  || dados.apelido,
      curso:         cur.trim()  || dados.curso,
      anoCurricular: Number(ano) || dados.anoCurricular
    };

    const resPut = await fetch(url, {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(corpo)
    });
    if (!resPut.ok) { alert('Erro ao actualizar aluno.'); return; }

    listar();
  }
});


listar();



