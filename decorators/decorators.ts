type Construtor = { new (...args: any[]): {} };

function logarClasse(construtor: Function) {
	console.log(construtor);
}

function decoratorVazio(_: Function) {}

function logarClasseSe(valor: boolean) {
	return valor ? logarClasse : decoratorVazio;
}

function decorator(a: string, b: number) {
	return function (_: Function): void {
		console.log(`${a} ${b}`);
	};
}

function logarObjeto(construtor: Construtor) {
	console.log("Carregando...");
	return class extends construtor {
		constructor(...args: any[]) {
			console.log("Antes...");
			super(...args);
			console.log("Depois...");
		}
	};
}

// new Eletrodomestico();
// new Eletrodomestico();
// new Eletrodomestico();

interface Eletrodomestico {
	imprimir?(): void;
}

// @logarClasse
// @logarClasseSe(false)
// @decorator("Teste", 123)
@logarObjeto
@imprimivel
class Eletrodomestico {
	constructor() {
		console.log("novo...");
	}
}

function imprimivel(construtor: Function) {
	construtor.prototype.imprimir = function () {
		console.log(this);
	};
}

const eletro = new Eletrodomestico();
eletro.imprimir && eletro.imprimir();

// Desafio Decorator perfilAdmin
type User = {
	nome: string;
	email: string;
	admin: boolean;
};

const usuarioLogado: User = {
	nome: "Guilherme Filho",
	email: "guigui@gmail.com",
	admin: true,
};

function perfilAdmin<T extends Construtor>(construtor: T) {
	return class extends construtor {
		constructor(...args: any[]) {
			super(...args);
			if (!usuarioLogado || !usuarioLogado.admin) throw new Error("Esse usuario nao eh admin");
		}
	};
}

@perfilAdmin
class MudancaAdministrativa {
	critico() {
		console.log("Algo critico foi alterado!");
	}
}

new MudancaAdministrativa().critico();

class ContaCorrente {
	@naoNegativo
	private saldo: number;

	constructor(saldo: number) {
		this.saldo = saldo;
	}

	@congelar
	sacar(@paramInfo valor: number) {
		if (valor > this.saldo) return false;

		this.saldo -= valor;
		return true;
	}

	@congelar
	getSaldo() {
		return this.saldo;
	}
}

const cc = new ContaCorrente(10248.57);
cc.sacar(5000);
console.log(cc.getSaldo());
cc.sacar(5248.57);
console.log(cc.getSaldo());

// cc.getSaldo = function () {
// 	return this["saldo"] + 7000;
// };

// Object.freeze()
function congelar(alvo: any, nomeMetodo: string, descritor: PropertyDescriptor) {
	console.log(alvo);
	console.log(nomeMetodo);
	descritor.writable = false;
}

function naoNegativo(alvo: any, nomePropriedade: string) {
	delete alvo[nomePropriedade];
	Object.defineProperty(alvo, nomePropriedade, {
		get: function (): any {
			return alvo["_" + nomePropriedade];
		},
		set: function (valor: any): void {
			if (valor < 0) throw new Error("Saldo Invalido");
			else alvo["_" + nomePropriedade] = valor;
		},
	});
}

function paramInfo(alvo: any, nomeMetodo: string, indiceParam: number) {
	console.log(`Alvo: ${alvo}`);
	console.log(`Metodo: ${nomeMetodo}`);
	console.log(`Indice: ${indiceParam}`);
}
