const dobro = (numero) => numero * 2;

console.log("Dobro de 5 =", dobro(5));


const media = (nota1, nota2) => {
    let resultado = (nota1 + nota2) / 2;

    if (resultado >= 7) {
        console.log("Aprovado");
    } else {
        console.log("Reprovado");
    }
};

media(8, 6);


const maiorNumero = (num1, num2) => {
    return num1 > num2 ? num1 : num2;
};

console.log(maiorNumero(8, 20));


const converterTemperatura = (celsius) => {
    return (celsius * 9 / 5) + 32;
};

console.log(converterTemperatura(30));


const login = (usuario, senha) => {
    if (usuario === "admin" && senha === "1234") {
        console.log("Login realizado");
    } else {
        console.log("Usuário ou senha incorretos");
    }
};

login("admin", "1234");
login("joao", "1111");