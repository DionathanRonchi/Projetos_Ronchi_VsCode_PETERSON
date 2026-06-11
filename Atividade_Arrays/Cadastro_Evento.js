// 1. Cadastro de Participantes de Evento

let participantes = ["Marcos", "Fernanda", "Juliana"];

console.log("Lista de participantes:");
console.log(participantes);

participantes.push("Gabriel");

participantes.unshift("Patrícia");

console.log("Quantidade de participantes:", participantes.length);

console.log("Juliana está inscrita?", participantes.includes("Juliana"));

console.log("Carlos está inscrito?", participantes.includes("Carlos"));

console.log("Posição da Fernanda:", participantes.indexOf("Fernanda"));

participantes.pop();

console.log("Lista atualizada:");

console.log(participantes);

console.log(participantes.join(" | "));


