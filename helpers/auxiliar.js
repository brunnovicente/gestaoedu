function gerarCodigo(t){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < t; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function definirTurno(codigo){
    if (codigo.includes('N')) {
        return 2; // Noturno
    } else if (codigo.includes('V')) {
        return 1; // Vespertino
    } else if (codigo.includes('M')) {
        return 0; // Matutino
    }
    return -1; // Caso não tenha nenhum dos identificadores
}

function pegarDias(){

}

export default {gerarCodigo, definirTurno}