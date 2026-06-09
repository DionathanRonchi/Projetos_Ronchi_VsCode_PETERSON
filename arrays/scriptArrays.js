//Criando um Array
let usuarios = ["Maria", "João", "Pedro", "Ana"]
console.log(usuarios)

//Acessando Itens
console.log(usuarios[3])

//Alterando Itens   push()
usuarios.push("Moises")
usuarios.push("Noel")
console.log(usuarios)

//Removendo Itens   pop()
usuarios.pop()
console.log(usuarios)

//Removendo o Primeiro Item   shift()
usuarios.shift()
console.log(usuarios)

//Mostrando a quantidade de itens   length()
console.log(usuarios.length)

//Verificar se um item existe   includes()
console.log(usuarios.includes("João"))
console.log(usuarios.includes("Maria"))

//Mostrar a posição de um item   indexOf()
console.log(usuarios.indexOf("Pedro"))
console.log(usuarios.indexOf("Maria"))

//Remover um item específico   splice()
usuarios.splice(1, 1) //Removendo o item na posição 1 (João)
console.log(usuarios)

//Copia parte do Array   slice()
let novosUsuarios = usuarios.slice(1, 3) //Copia os itens da posição 1 até a posição 2 (3-1)
console.log(novosUsuarios)

//Inverter Ordem
//reverse()

usuarios2.reverse()
console.log(usuarios2)

//Ordena em ordem alfabética
//sort()

usuarios2.sort()
console.log(usuarios2)

//Percorrer um Array
for (let usuarios of usuarios2) {
    console.log(usuarios)
}

//Percorrer um Array com índice
for (let indice in usuarios) {
    console.log(indice)
    console.log(usuarios2[indice])
}

//Transforma o Array em Texto
let nomes = usuarios2.join(" - ") 
console.log(nomes);

//Juntar os Arrays
let admin = ["admin1", "admin2"]
let sistema = usuarios.concat(admin) 
console.log(sistema)
