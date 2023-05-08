class Data {
	// Público por padrão
	dia: number;
	public mes: number;
	ano: number;

	constructor(dia: number = 1, mes: number = 1, ano: number = 1970) {
		this.dia = dia;
		this.mes = mes;
		this.ano = ano;
	}
}

const aniversario = new Data(25, 2, 1999);
aniversario.dia = 26;
console.log(aniversario.dia);
console.log(aniversario);

const casamento = new Data(); // Posso omitir os "()"
casamento.ano = 2017;
console.log(casamento);

class DataEsperta {
	constructor(public dia: number = 1, public mes: number = 1, public ano: number = 1970) {}
}

const aniversarioEsperto = new DataEsperta(25, 2, 1999);
aniversarioEsperto.dia = 26;
console.log(aniversarioEsperto.dia);
console.log(aniversarioEsperto);

const casamentoEsperto = new DataEsperta(); // Posso omitir os "()"
casamentoEsperto.ano = 2017;
console.log(casamentoEsperto);

class Produto {
	constructor(public nome: string, public preco: number, public desconto: number = 0) {}

	public resumo(): string {
		return `${this.nome} custa R$${this.precoComDesconto().toFixed(2)} (${this.desconto * 100}% off)`;
	}

	public precoComDesconto(): number {
		return this.preco * (1 - this.desconto);
	}
}

const produto1 = new Produto("Farinha", 2.9, 0.05);
const produto2 = new Produto("Óleo", 7.4);

console.log(produto1);
console.log(produto2);

console.log(produto1.resumo());
console.log(produto2.resumo());

class Carro {
	private velocidadeAtual: number = 0;

	constructor(public marca: string, public modelo: string, private velocidadeMaxima: number = 200) {}

	protected alterarVelocidade(delta: number): number {
		const novaVelocidade = this.velocidadeAtual + delta;
		const velocidadeValida = novaVelocidade >= 0 && novaVelocidade <= this.velocidadeMaxima;

		if (velocidadeValida) this.velocidadeAtual = novaVelocidade;
		else this.velocidadeAtual = delta > 0 ? this.velocidadeMaxima : 0;

		return this.velocidadeAtual;
	}

	public acelerar(): number {
		return this.alterarVelocidade(5);
	}

	public frear(): number {
		return this.alterarVelocidade(-5);
	}
}

const carro1 = new Carro("Ford", "Ka", 185);
Array(50)
	.fill(0)
	.forEach(() => carro1.acelerar());
console.log(carro1.acelerar());

Array(25)
	.fill(0)
	.forEach(() => carro1.frear());
console.log(carro1.frear());

class Ferrari extends Carro {
	constructor(modelo: string, velocidadeMaxima: number) {
		super("Ferrari", modelo, velocidadeMaxima);
	}
	public acelerar(): number {
		return this.alterarVelocidade(20);
	}

	public frear(): number {
		return this.alterarVelocidade(-15);
	}
}

const f40 = new Ferrari("F40", 324);
console.log(f40);
console.log(`${f40.marca} ${f40.modelo}`);
console.log(f40.acelerar());
console.log(f40.frear());

// Getters & Setters
class Pessoa {
	private _idade: number = 0;

	get idade(): number {
		return this._idade;
	}
	set idade(valor: number) {
		if (valor >= 0 && valor <= 120) {
			this._idade = valor;
		}
	}
}

const pessoa1 = new Pessoa();

pessoa1.idade = 10;
console.log(pessoa1.idade);

pessoa1.idade = -200;
console.log(pessoa1.idade);

class Matematica {
	static PI: number = 3.1416;

	static areaCirc(raio: number): number {
		return Matematica.PI * raio * raio;
	}
}

console.log(Matematica.areaCirc(10));

// Classe Abstrata
abstract class Calculo {
	protected resultado: number = 0;

	abstract executar(...numeros: number[]): void;

	getResultado(): number {
		return this.resultado;
	}
}

class Soma extends Calculo {
	executar(...numeros: number[]): void {
		this.resultado = numeros.reduce((t, a) => t + a);
	}
}

class Multiplicacao extends Calculo {
	executar(...numeros: number[]): void {
		this.resultado = numeros.reduce((t, a) => t * a);
	}
}

let c1: Calculo = new Soma();
c1.executar(2, 3, 4, 5);
console.log(c1.getResultado());

c1 = new Multiplicacao();
c1.executar(2, 3, 4, 5);
console.log(c1.getResultado());

// Singleton
class Unico {
	private static instance: Unico = new Unico();
	private constructor() {}

	static getInstance(): Unico {
		return Unico.instance;
	}

	agora() {
		return new Date();
	}
}

// const errado = new Unico();
console.log(Unico.getInstance().agora());

// Somente Leitura
class Aviao {
	public readonly modelo: string;

	constructor(modelo: string, public readonly prefixo: string) {
		this.modelo = modelo;
	}
}
const turpoHelice = new Aviao("TU-114", "PT-ABC");
// turpoHelice.modelo = "DC-8";
// turpoHelice.prefixo = "PT-DEF";
console.log(turpoHelice);
