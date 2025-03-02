export default {
    gerarDatas: function (inicio, fim) {
        let datas = [];
        let dataAtual = new Date(inicio);

        while (dataAtual <= new Date(fim)) {
            datas.push({
                data: dataAtual.toISOString().split("T")[0], // Formato YYYY-MM-DD
                diaSemana: this.obterDiaSemana(dataAtual),
            });

            dataAtual.setDate(dataAtual.getDate() + 1); // Incrementa 1 dia
        }

        return datas;
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


