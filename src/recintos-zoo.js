class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, bioma, carnivoro } = this.animais[animal];
        const espacoNecessario = tamanho * quantidade;

        const recintosViaveis = this.recintos.filter(recinto => {
            
            const biomasCompatíveis = bioma.includes(recinto.bioma) || recinto.bioma === 'savana e rio';
            if (!biomasCompatíveis) {
                return false;
            }

            
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            
            if (espacoDisponivel < espacoNecessario) {
                return false;
            }

            
            if (carnivoro) {
                
                return recinto.animais.every(a => a.especie === animal) || recinto.animais.length === 0;
            }

            
            if (animal === 'HIPOPOTAMO') {
                return recinto.bioma === 'savana e rio' || recinto.animais.length === 0;
            }

            
            if (recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== animal)) {
                return false;
            }

            return true;
        }).map(recinto => {
            
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            
            const novoEspacoDisponivel = espacoDisponivel - espacoNecessario;
            return `Recinto ${recinto.numero} (espaço livre: ${novoEspacoDisponivel} total: ${recinto.tamanho})`;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
