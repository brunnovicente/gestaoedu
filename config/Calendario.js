export default {
    gerarDatas: async function (inicio, fim) {

        return new Promise((resolve, reject) => {
            try{
                let datas = [];
                let dataAtual = new Date(inicio);

                while (dataAtual <= new Date(fim)) {
                    datas.push({
                        data: dataAtual.toISOString().split("T")[0], // Formato YYYY-MM-DD
                        dia: dataAtual.getDay(),//this.obterDiaSemana(dataAtual),
                    });
                    //console.log('Data Atual: '+dataAtual.toISOString());
                    dataAtual.setDate(dataAtual.getDate() + 1); // Incrementa 1 dia
                }
                resolve(datas)
            }catch(e){
                reject(e);
            }
        })

    },

    obterDiaSemana: function (data) {
        const diasSemana = [
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
            "Domingo",
        ];
        return diasSemana[data.getDay()];
    }
}


