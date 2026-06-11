// 2. Controle de Pedidos

let pedidos = ["Hambúrguer", "Batata Frita", "Refrigerante"];

pedidos.push("Milk Shake");

pedidos.shift();

console.log(pedidos.length);

for (let pedido of pedidos) {
    console.log(pedido);
}

for (let indice in pedidos) {
    console.log(indice);
}