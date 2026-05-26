//FUNÇÃO TRADICIONAL
function soma(a, b) {
    return a + b;
}   
//console.log(soma(2, 10)); // Saída: 12

let resultado = soma(5, 7);
console.log(resultado); // Saída: 12

//FUNÇÃO SEM RETURN
function saudacao() {
    console.log("Bem Vindo ao Sistema!");
} saudacao(); 

//FUNÇÃO ARROW FUNCTION
const multiplicar = (a, b) => {
    return a * b;
}
console.log(multiplicar(5, 6));

//FUNÇÃO FUNCTION -> FORMA CURTA
const dobrar = numero => numero * 2;
console.log(dobrar(10));

//EXEMPLO PRÁTICO -. VERIFICAR IDADE
const verificarIdade = idade => {
    if (idade >= 18) {
        return "Você é maior de idade.";
    }else{
        return "Menor de idade.";
    }
};
console.log(verificarIdade(20)); 
console.log(verificarIdade(15)); 