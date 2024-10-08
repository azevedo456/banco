class ContaBancaria {
    // Construtor da classe, inicializa os atributos da conta
    constructor(titular, numeroConta) {
        this.titular = titular; // Nome do titular da conta
        this.saldo = 0.0; // Saldo inicial da conta
        this.numeroConta = numeroConta; // Número identificador da conta
    }

    // Método para depositar um valor na conta
    depositar(valor) {
        if (valor > 0) { // Verifica se o valor é positivo
            this.saldo += valor; // Adiciona o valor ao saldo
            console.log(`Depósito de R$${valor.toFixed(2)} realizado com sucesso.`);
        } else {
            console.log("O valor do depósito deve ser positivo."); // Mensagem de erro
        }
    }

    // Método para sacar um valor da conta
    sacar(valor) {
        if (valor <= this.saldo) { // Verifica se há saldo suficiente
            this.saldo -= valor; // Deduz o valor do saldo
            console.log(`Saque de R$${valor.toFixed(2)} realizado com sucesso.`);
        } else {
            console.log("Saldo insuficiente para o saque."); // Mensagem de erro
        }
    }

    // Método para consultar o saldo atual da conta
    consultarSaldo() {
        console.log(`Saldo atual: R$${this.saldo.toFixed(2)}`); // Exibe o saldo
    }
}

class SistemaBancario {
    // Construtor da classe, inicializa o objeto que armazenará as contas
    constructor() {
        this.contas = {}; // Objeto para armazenar contas, usando número da conta como chave
    }

    // Método para criar uma nova conta
    criarConta(titular, numeroConta) {
        if (!this.contas[numeroConta]) { // Verifica se o número da conta já existe
            this.contas[numeroConta] = new ContaBancaria(titular, numeroConta); // Cria nova conta
            console.log("Conta criada com sucesso!");
        } else {
            console.log("Número da conta já existe."); // Mensagem de erro
        }
    }

    // Método para depositar em uma conta específica
    depositar(numeroConta, valor) {
        const conta = this.contas[numeroConta]; // Obtém a conta pelo número
        if (conta) {
            conta.depositar(valor); // Chama o método de depósito da conta
        } else {
            console.log("Conta não encontrada."); // Mensagem de erro
        }
    }

    // Método para sacar de uma conta específica
    sacar(numeroConta, valor) {
        const conta = this.contas[numeroConta]; // Obtém a conta pelo número
        if (conta) {
            conta.sacar(valor); // Chama o método de saque da conta
        } else {
            console.log("Conta não encontrada."); // Mensagem de erro
        }
    }

    // Método para consultar o saldo de uma conta específica
    consultarSaldo(numeroConta) {
        const conta = this.contas[numeroConta]; // Obtém a conta pelo número
        if (conta) {
            conta.consultarSaldo(); // Chama o método de consulta de saldo
        } else {
            console.log("Conta não encontrada."); // Mensagem de erro
        }
    }

    // Método para listar todas as contas registradas
    listarContas() {
        if (Object.keys(this.contas).length === 0) {
            console.log("Não há contas cadastradas."); // Mensagem caso não haja contas
        } else {
            for (const numeroConta in this.contas) { // Itera sobre as contas
                const conta = this.contas[numeroConta];
                // Exibe as informações da conta
                console.log(`Titular: ${conta.titular}, Número da Conta: ${conta.numeroConta}, Saldo: R$${conta.saldo.toFixed(2)}`);
            }
        }
    }
}

// Função para simular o menu interativo
function menu() {
    const sistema = new SistemaBancario(); // Cria uma instância do sistema bancário
    const readline = require('readline').createInterface({
        input: process.stdin, // Entrada padrão
        output: process.stdout // Saída padrão
    });

    // Função para perguntar ao usuário e mostrar o menu
    const perguntar = () => {
        console.log("\n--- Menu ---");
        console.log("1. Criar nova conta");
        console.log("2. Depositar");
        console.log("3. Sacar");
        console.log("4. Consultar saldo");
        console.log("5. Listar todas as contas");
        console.log("6. Sair");

        // Pergunta ao usuário qual opção escolher
        readline.question("Escolha uma opção: ", opcao => {
            switch (opcao) {
                case '1': // Criar nova conta
                    readline.question("Nome do titular: ", titular => {
                        readline.question("Número da conta: ", numeroConta => {
                            sistema.criarConta(titular, numeroConta); // Cria a conta
                            perguntar(); // Pergunta novamente
                        });
                    });
                    break;

                case '2': // Depositar
                    readline.question("Número da conta: ", numeroConta => {
                        readline.question("Valor a depositar: ", valor => {
                            sistema.depositar(numeroConta, parseFloat(valor)); // Realiza o depósito
                            perguntar(); // Pergunta novamente
                        });
                    });
                    break;

                case '3': // Sacar
                    readline.question("Número da conta: ", numeroConta => {
                        readline.question("Valor a sacar: ", valor => {
                            sistema.sacar(numeroConta, parseFloat(valor)); // Realiza o saque
                            perguntar(); // Pergunta novamente
                        });
                    });
                    break;

                case '4': // Consultar saldo
                    readline.question("Número da conta: ", numeroConta => {
                        sistema.consultarSaldo(numeroConta); // Consulta o saldo
                        perguntar(); // Pergunta novamente
                    });
                    break;

                case '5': // Listar todas as contas
                    sistema.listarContas(); // Lista as contas
                    perguntar(); // Pergunta novamente
                    break;

                case '6': // Sair do sistema
                    console.log("Saindo do sistema.");
                    readline.close(); // Fecha a interface de leitura
                    break;

                default: // Opção inválida
                    console.log("Opção inválida. Tente novamente."); // Mensagem de erro
                    perguntar(); // Pergunta novamente
                    break;
            }
        });
    };

    perguntar(); // Inicia o menu
}

menu(); // Chama a função para iniciar o sistema
