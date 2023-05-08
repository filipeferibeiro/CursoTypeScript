// let & const
let seraQuePode = "?"; // hoisting com var
console.log(seraQuePode);

let estaFrio = true;
if (estaFrio) {
	let acao = "Colocar o casaco!";
	console.log(acao);
}

const cpf: string = "123.456.000-99";
// cpf = '789.101.132-78'
console.log(cpf);

fetch("https://swapi.dev/api/people/1")
	.then((response) => response.json())
	.then((personagem) => personagem.films)
	.then((films) => fetch(films[0]))
	.then((responseFilm) => responseFilm.json())
	.then((filme) => console.log(filme.title))
	.catch((res) => console.log(`Catch!!! ${res}`));
