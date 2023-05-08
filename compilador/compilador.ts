let canal: string = "Gaveta";
let inscritos: number = 423462;

// canal = inscritos;
console.log(`Canal = ${canal}`);

console.log(`Nome = ${nome}`);
// let nome = "Pedro"; // Como nao estamos usando modulos, a variavel nome ja foi declarada no arquivo de tipos e por estarem no mesmo escopo nao pode ser criada novamente
nome = "Pedro";
console.log(`Nome = ${nome}`);

function soma(a: any, b: any) {
	return a + b;
}

let qualquerCoisa;
qualquerCoisa = 12;
qualquerCoisa = "ABC";

function saudar(isManha: boolean /* , horas: number */) {
	// let a = 1;
	let saudacao: string;
	if (isManha) {
		saudacao = "Bom Dia!";
	} else {
		saudacao = "Tenha uma boa vida!";
	}
	return saudacao;
}
