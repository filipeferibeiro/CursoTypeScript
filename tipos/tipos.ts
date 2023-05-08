// STRING
let nome: string = "João";
console.log(nome);
// nome = 28

// NUMBERS
let idade: number = 24;
// idade = 'Ana'
idade = 27.5;
console.log(idade);

// BOOLEAN
let possuiHobbies: boolean = false;
// possuiHobbies = 1;
console.log(possuiHobbies);

// TIPOS EXPLICITOS
let minhaIdade: number;
minhaIdade = 24;
console.log(typeof minhaIdade);
// minhaIdade = "24";

// ARRAY
let hobbies: any[] = ["Cozinhar", "Praticar Esportes"];
console.log(hobbies[0]);
console.log(typeof hobbies);

hobbies = [100, 200, 300];
// hobbies = 100
console.log(hobbies);

// TUPLAS
let endereco: [string, number, string?] = ["Av Principal", 99];
console.log(endereco);

endereco = ["Rua Importante", 1260, "Bloco B"];
console.log(endereco);

// ENUMS
enum Cor {
	Cinza, // 0
	Verde = 100, // 100
	Azul = 10, // 10
	Laranja, // 11
	Amarelo, // 12
	Vermelho = 100, // 100
}

let minhaCor: Cor = Cor.Verde;
console.log(minhaCor);

console.log(Cor.Azul);
console.log(Cor.Laranja, Cor.Amarelo);
console.log(Cor.Verde, Cor.Vermelho);

// ANY
let carro: any = "BMW";
console.log(carro);
carro = { marca: "BMW", ano: 2019 };
console.log(carro);

// FUNCOES
function retornaMeuNome(): string {
	// return minhaIdade;
	return nome;
}

console.log(retornaMeuNome());

function digaOi(): void {
	console.log("Oi");
	// return minhaIdade;
}

digaOi();

function multiplicar(numA: number, numB: number): number {
	return numA * numB;
}

console.log(multiplicar(2, 5));

// TIPO FUNCAO
let calculo: (numberA: number, numberB: number) => number;
// calculo = digaOi;
// calculo();

calculo = multiplicar;
console.log(calculo(5, 6));

// OBJETOS
let usuario: { nome: string; idade: number } = {
	nome: "Filipe",
	idade: 24,
};

console.log(usuario);

// usuario = {}
// usuario = {
//   name: "Maria",
//   age: 18
// }

usuario = {
	idade: 34,
	nome: "Maria",
};

console.log(usuario);
// ALIAS
type Funcionario = {
	supervisores: string[];
	baterPonto: (hora: number) => string;
};

let funcionario: Funcionario;

funcionario = {
	supervisores: ["João", "Maria", "Teo"],
	baterPonto(hora): string {
		return hora <= 8 ? "Ponto normal" : "Fora do horário";
	},
};

let funcionario2: Funcionario = {
	supervisores: ["Bia", "Carlos", "Mauro"],
	baterPonto(hora): string {
		return hora <= 8 ? "Ponto normal" : "Fora do horário";
	},
};

console.log(funcionario.supervisores);
console.log(funcionario.baterPonto(5));
console.log(funcionario.baterPonto(9));

console.log(funcionario2.supervisores);
console.log(funcionario2.baterPonto(5));
console.log(funcionario2.baterPonto(9));

// UNION TYPES
let nota: number | string = 10;
console.log(`Minha nota é ${nota}`);
nota = "100";
console.log(`Minha nota é ${nota}`);

// CHECANDO TIPOS
let valor = 30;

if (typeof valor === "number") {
	console.log("É um number!");
} else {
	console.log(typeof valor);
}

// NEVER
function falha(msg: string): never {
	throw new Error(msg);
}

const produto = {
	nome: "Sabão",
	preco: 7,
	validarProduto() {
		if (!this.nome || this.nome.trim().length === 0) {
			falha("Precisa ter um nome");
		}
		if (this.preco <= 0) {
			falha("Preço inválido!");
		}
	},
};

produto.validarProduto();

let altura = 12;
// altura = null

let alturaOpcional: null | number;
alturaOpcional = null;

type Contato = {
	nome: string;
	tel1: string;
	tel2: string | null;
};

const contato1: Contato = {
	nome: "Fulano",
	tel1: "222345235",
	tel2: null,
};

console.log(contato1.nome);
console.log(contato1.tel1);
console.log(contato1.tel2);

let podeSerNulo = null; // Assume o tipo any!
podeSerNulo = 12;
console.log(podeSerNulo);
podeSerNulo = "ABC";
console.log(podeSerNulo);

// Desafio
type Conta = {
	saldo: number;
	depositar: (valor: number) => void;
};
type Correntista = {
	nome: string;
	contaBancaria: Conta;
	contatos: string[];
};

let contaBancaria: Conta = {
	saldo: 3456,
	depositar(valor: number) {
		this.saldo += valor;
	},
};

let correntista: Correntista = {
	nome: "Ana Silva",
	contaBancaria,
	contatos: ["34567890", "98765432"],
};

correntista.contaBancaria.depositar(3000);
console.log(correntista);
