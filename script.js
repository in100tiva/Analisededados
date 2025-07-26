const vendasMensais = [15000, 22000, 18000, 25000, 12000, 30000, 27000, 21000, 19000, 24000, 26000, 28000]

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const relatorioVendas = {
    dadosOriginais: [],
    estatisticas: {
        total: 0,
        media: 0,
        melhorMes: {mes: '', valor: 0, indice: 0},
        piorMes: {mes: '', valor: Infinity, indice: 0},
        vendasAcimaMedia: 0,
        vendasAbaixoMedia: 0,
    },
    categorizacao: [],

    categorizarVenda: function(valor) {
        let categoria;
        let cor;

        switch (true) {
            case valor >= 30000:
                categoria = 'Excelente'
                cor = '🟢'
                break
            case valor >= 25000:
                categoria = 'Muito Bom'
                cor = '🔵'
                break
            case valor >= 20000:
                categoria = 'Bom'
                cor = '🟡'
                break
            case valor >= 15000:
                categoria = 'Regular'
                cor = '🟠'
                break
            case valor >= 10000:
                categoria = 'Ruim'
                cor = '🔴'
                break
        }

        return {categoria, cor}
    },

    processarDados: function(vendas, nomesMeses) {
        console.log(`Iniciando análise de vendas ...\n`);

        for (let i = 0; i < vendas.length; i++) {
            this.dadosOriginais.push({
                mes: nomesMeses[i],
                valor: vendas[i],
                indice: i,
            });
        }

        let soma = 0;
        for (let i = 0; i < vendas.length; i++) {
            soma += vendas[i];

            if (vendas[i] > this.estatisticas.melhorMes.valor) {
                this.estatisticas.melhorMes = {
                    mes: nomesMeses[i],
                    valor: vendas[i],
                    indice: i,
                };
            }

            if (vendas[i] < this.estatisticas.piorMes.valor) {
                this.estatisticas.piorMes = {
                    mes: nomesMeses[i],
                    valor: vendas[i],
                    indice: i,
                };
            }
        }

        this.estatisticas.total = soma
        this.estatisticas.media = soma / vendas.length;

        for (let i = 0; i < this.dadosOriginais.length; i++) {
            const dadosMes = this.dadosOriginais[i];
            const categorizacao = this.categorizarVenda(dadosMes.valor);

            this.categorizacao.push({
                mes: dadosMes.mes,
                valor: dadosMes.valor,
                categoria: categorizacao.categoria,
                cor: categorizacao.cor,
                acimaDaMedia: dadosMes.valor > this.estatisticas.media
            });
        }

        let indice = 0;
        while (indice < this.categorizacao.length) {
            if (this.categorizacao[indice].acimaDaMedia) {
                this.estatisticas.vendasAcimaMedia++
            } else {
                this.estatisticas.vendasAbaixoMedia++
            }
            indice++;
        }
    },
}

