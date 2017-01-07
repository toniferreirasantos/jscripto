var formulario = document.getElementById('myForm');
var login = document.getElementById('login');
var pass = document.getElementById('senha');
var codeResult = document.getElementById('codeResult');

//----------------------------------------------------------------------------
//var pivos = geraArrayPivos(login.value + pass.value);
//----------------------------------------------------------------------------
// Retorna um caractere aleatorio de str
function caractere(str) {
	return str[randomRange(0, str.length-1)]; 
}
//----------------------------------------------------------------------------
/*
function embaralha(tam) {
	var numeros = "";
	console.log('Aguarde...');
	cont = 0;
	for (var i = 0; i < tam; i++) {

		contem = true;
		while( contem ) {
			posicao = randomRange(0, tam-1).toString();
			if ( !numeros.includes(posicao) ) {
				contem = false;
			}
			cont++;
		}
		console.log('Valor ' +i+ ' => ' + cont + ' vez(es) = ' + posicao);
		numeros += ( posicao + ".");
		cont = 0;
	}
	
	numeros = numeros.split(''); numeros.pop();
	numeros = numeros.join('');
	return numeros;
}
*/
//----------------------------------------------------------------------------
function embaralha(str) {
	str = str.split('');
    var index_atual = str.length, valor_temporario, index_aleatorio, indices = "";
 
    while (0 !== index_atual) {
        // index_aleatorio = Math.floor(Math.random() * index_atual);
        index_aleatorio = randomRange(0, str.length-1);
        index_atual -= 1;

        valor_temporario = str[index_atual];
        str[index_atual] = str[index_aleatorio];
        str[index_aleatorio] = valor_temporario;
		
		indices += index_aleatorio.toString();
    }
    console.log('Indices => ' + indices);
    return str.join('');
}
//----------------------------------------------------------------------------
// http://www.utf8-chartable.de/unicode-utf8-table.pl?utf8=dec
// Geral uma string de tam aleatorio (faixa de valores em randomRange)
// com caracteres tbm aleatorios (dentro da faixa de valores em randomRange)
function encriptPrefix() {
  var tamPre = randomRange(4, 11);
  var strPre = "";

  for (var i = 0; i < tamPre; i++) {
  	// se o caractere de strPre não forem os dois ultimos...
  	if( (strPre.length != tamPre-1) || (strPre.length != tamPre-2) ) {
		strPre += String.fromCharCode(randomRange(33, 126));;
  	}
  	else { // Caso forem os 2 ultimos, impedir que sejam numeros
		strPre += String.fromCharCode(randomRange(58, 126));;
  	}
  }

  // Retorna
  /*
  strPre: str de tamanha tamPre
  */
  return strPre + 'pivo()' + inverte( fat(tamPre).toString() ) + '-' + tamPre.length-1;
}
//----------------------------------------------------------------------------
function encriptSufix() {
  // Provisório, usando o mesmo algorítmo do prefixo
  return encriptPrefix();
}
//----------------------------------------------------------------------------
/*
	Caracteres pivôs
		- Conjunto de delimitadores entre pre, pass, login, sufix, etc
		- Conjunto de caracteres intra str

	1 - Inverter a string
	2 - inserir caracteres entre a str já invertida
	3 - Definir um padrão de "embaralhamento" das str's pass e log
*/
function encriptLogin(str) {
	var pivos = geraArrayPivos(str);
	var criptoStr = "";

	criptoStr = inverte(str);

	// Aqui a área para embaralhar...
	criptoStr = embaralha(criptoStr);
	//...............................

	criptoStr = criptoStr.split(''); // transf em 'vetor'

	for (var i = 0; i < str.length; i++) {
		criptoStr[i] += caractere(pivos); // a cada caractere, concatena um dos pivos
	}

	criptoStr = criptoStr.join(''); // transf em string novamente
	return criptoStr;
}
//----------------------------------------------------------------------------
function encriptPass() {
 	return pass.value;
} 
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
/*
Caso for tentado gerar um iD com campos vazios, uma mensagem é enviada em um <input> informando e
esse mesmo input será desabilitado. O botão select tbm não aparecerá.

Quando for gerada uma iD válida, esta é mostrada no <input> e o mesmo se tornará habilitado.
Isso para o botão 'select' funcionar, uma vez que ele aparecerá nessa situação.
Seja clicado em 'generate' novamente com um dos campos limpos, o botao 'select' sumirá novamente	
*/
function finalId() {
	if (!pass.value.length || !login.value.length) {
		codeResult.disabled = true;
		codeResult.style.width = '99%';
		document.getElementById("select").style.display = 'none';
		return "UM OU MAIS CAMPOS VAZIOS!";
	} // 'else'
	codeResult.disabled = false;
	codeResult.style.width = '89%';
	document.getElementById("select").style.display = 'inline';
	//return encriptPrefix() + encriptLogin() + encriptPass() + encriptSufix();
	return encriptLogin(login.value);
}
//----------------------------------------------------------------------------
formulario.addEventListener('submit', function(e) {
	var final = finalId();

	// document.getElementById("show").innerHTML = final; / DIV
	//document.getElementById("show").style.visibility = 'visible';
	codeResult.value = final;
	document.getElementById("show").style.display = 'inline';
	e.preventDefault();
});
//----------------------------------------------------------------------------
