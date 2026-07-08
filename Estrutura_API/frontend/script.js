async function listarCursos() {
    const resposta = await fetch('http://localhost:3023/cursos');
    const cursos = await resposta.json();
    
    const list = Document.getElementById('lista');
    lista.innerHTML='';

    cursos.forEach(curso => {
        lista.innerHTML= `
        
        <li>
            ${curso.id} - ${curso.nome}
        </li>
    
    
        });
