/*
 Gera uma str de tamanho aleatorio (entre str.length e str.length*2), que possui 
 em um conjunto de caracteres tbm aleatorios onde nenhum destes são iguais aos da str
 passada como parâmetro.
 O objetivo é usar esse conj. de caracteres como pivo para demais operações como delimitadores, etc
*/
function geraArrayPivos(str) {
  var tamArray = randomRange(str.length, str.length*2);
  var pivo = "";
  var pivos = "";

  for (var i = 0; i < tamArray; i++) {
    pivo = String.fromCharCode(randomRange(65, 126));
    if( !str.includes(pivo) ) {
      pivos += pivo;
    }
  }
  return pivos;
}
//----------------------------------------------------------------------------
// Retorna UM int aleatorio entre os valores min e max (ambos inclusivos)
function randomRange(valMin, valMax) {
  if (valMax < valMin) {
    var aux = valMax;
    valMax = valMin;
    valMin = aux;
  }
  return Math.floor(Math.random() * ((valMax + 1) - valMin)) + valMin;
}
//----------------------------------------------------------------------------
// Olhar a string digitada no campo de senha | Disparada ao clicar no button 'Look'
// Tbm altera o valor do botão
function look() {
	var see = '';
  if(pass.type == 'password') {
    pass.type = 'input';
    see = 'unSee';
  } else {
    pass.type = 'password';
    see = 'See';
  }
  document.getElementById("see").innerText = see;
}
//----------------------------------------------------------------------------
// Selecionar o conteúdo de um campo <input>
function sel() {
	codeResult.select();
}
//----------------------------------------------------------------------------
// Fatorial de num
function fat(num) {
  var f = 1;
  for (var i = num; i > 1; i--) {
    f = f*i;
  }
  return f;
}
//----------------------------------------------------------------------------
// Inverte str
function inverte(str) {
  return str.split('').reverse().join('');
}
