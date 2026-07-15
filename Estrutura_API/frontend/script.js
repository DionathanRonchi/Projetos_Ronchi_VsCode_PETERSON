async function listarCursos() {
    const resposta = await fetch('http://localhost:3023/cursos');
    const cursos = await resposta.json();
    

    const lista = document.getElementById('lista');
    lista.innerHTML='';

    cursos.forEach(curso => {
        lista.innerHTML += `
        
    <li> ${curso.id} - ${curso.nome}
        
        <button>Excluir</button> 
        <button>Editar</button>
    </li>`;
   
    });
    
}


async function cadastrarCurso() {
    const campoNome = document.getElementById('nomeCurso');
    const nome = campoNome ? campoNome.value.trim() : '';

    if(nome === '') {
        alert('Digite o nome do curso!!');
        return;
    }

    const resposta = await fetch('http://localhost:3023/cursos', {
        method: 'POST',
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);

    document.getElementById('nomeCurso').value = '';
    listarCursos();
}