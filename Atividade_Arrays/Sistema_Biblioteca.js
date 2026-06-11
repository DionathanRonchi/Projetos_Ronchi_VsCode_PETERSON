// 5. Mini Sistema de Biblioteca

let livros = ["Dom Casmurro", "O Pequeno Príncipe", "1984", "Harry Potter"];

console.log(livros);

console.log(livros.includes("1984"));

console.log(livros.indexOf("Harry Potter"));

livros.shift();

livros.push("Senhor dos Anéis");

livros.sort();

for (let i = 0; i < livros.length; i++) {
    console.log(livros[i]);
}

console.log(livros.length);