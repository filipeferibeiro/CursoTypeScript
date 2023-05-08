function echo(objeto: any) {
	return objeto;
}

console.log(echo("João").length);
console.log(echo(27).length);
console.log(echo({ nome: "João", idade: 27 }));

// Usando Generics
function echoMelhorado<T>(objeto: T): T {
	return objeto;
}

console.log(echoMelhorado("João").length);
console.log(echoMelhorado<number>(27));
console.log(echoMelhorado({ nome: "João", idade: 27 }));

// Generics disponiveis na API
const avaliacoes: Array<number> = [10, 9.3, 7.7];
avaliacoes.push(8.4);
// avaliacoes.push("5.5");
console.log(avaliacoes);

// Array
function impimir<T>(args: T[]) {
	args.forEach((elemento) => console.log(elemento));
}

impimir([1, 2, 3]);
impimir<number>([1, 2, 3]);
impimir<string>(["Ana", "Bia", "Carlos"]);
impimir<{ nome: string; idade: number }>([
	{ nome: "Fulano", idade: 22 },
	{ nome: "Cicrano", idade: 23 },
	{ nome: "Beltrano", idade: 24 },
]);

type Aluno = { nome: string; idade: number };

impimir<Aluno>([
	{ nome: "Fulano", idade: 22 },
	{ nome: "Cicrano", idade: 23 },
	{ nome: "Beltrano", idade: 24 },
]);

// Tipo Generico
type Echo = <T>(data: T) => T;
const chamarEcho: Echo = echoMelhorado;

console.log(chamarEcho<String>("Alguma coisa"));

// Class com Generics
abstract class OperacaoBinaria<T, R> {
	constructor(public operando1: T, public operando2: T) {}

	abstract executar(): R;
}

// console.log(new OperacaoBinaria("Bom ", "dia").executar());
// console.log(new OperacaoBinaria(3, 7).executar());
// console.log(new OperacaoBinaria(3, "Opa").executar());
// console.log(new OperacaoBinaria({}, {}).executar());

class SomaBinaria extends OperacaoBinaria<number, number> {
	executar(): number {
		return this.operando1 + this.operando2;
	}
}

console.log(new SomaBinaria(3, 4).executar());

class DiferencaEntreDatas extends OperacaoBinaria<Data, string> {
	getTime(data: Data): number {
		let { dia, mes, ano } = data;
		return new Date(`${mes}/${dia}/${ano}`).getTime();
	}
	executar(): string {
		const t1 = this.getTime(this.operando1);
		const t2 = this.getTime(this.operando2);
		const diferenca = Math.abs(t1 - t2);
		const dia = 1000 * 60 * 60 * 24; // Milissegundos em um dia

		return `${Math.ceil(diferenca / dia)} dia(s)`;
	}
}

const d1 = new Data(6, 2, 2020);
const d2 = new Data(8, 5, 2021);

console.log(new DiferencaEntreDatas(d1, d2).executar());

// Desafio Classe Fila
// Atributo: fila (Array)
// Metodos: entrar, proximo, imprimir

class Fila<T extends string | number> {
	private fila: Array<T>;

	constructor(...args: T[]) {
		this.fila = args;
	}

	entrar(item: T) {
		this.fila.push(item);
	}
	proximo(): T | null {
		if (this.fila.length === 0) return null;

		const first = this.fila[0];
		this.fila.splice(0, 1);
		return first;
	}
	imprimir() {
		console.log(this.fila);
	}
}

const fila: Fila<number> = new Fila(1, 2, 3, 4, 5, 6);
fila.entrar(7);
fila.entrar(8);
fila.imprimir();
console.log(fila.proximo());
fila.imprimir();

const novaFila = new Fila<string>("a", "b", "c");
// const outraFila = new Fila<boolean>(true, false)

// Desafio Mapa
// Array de Objetos (Chave/Valor) -> itens
// Metodos: obter(chave), colocar({ C, V })
// limpar(), imprimir()

type Par<C, V> = { chave: C; valor: V };

class Mapa<C, V> {
	itens: Map<C, V> = new Map();

	colocar(item: Par<C, V>) {
		this.itens.set(item.chave, item.valor);
	}
	obter(chave: C) {
		return this.itens.get(chave);
	}
	limpar() {
		this.itens.clear();
	}
	imprimir() {
		console.log(this.itens);
	}
}

const mapa = new Mapa<number, string>();
mapa.colocar({ chave: 1, valor: "Pedro" });
mapa.colocar({ chave: 2, valor: "Rebeca" });
mapa.colocar({ chave: 3, valor: "Maria" });
mapa.colocar({ chave: 1, valor: "Gustavo" });

console.log(mapa.obter(2));
mapa.imprimir();
mapa.limpar();
mapa.imprimir();
