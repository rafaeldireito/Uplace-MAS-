function sair(){

	var utilizador = "geral";
  localStorage.setItem('flagUser', utilizador);
	window.open('index.html','_self',false);
}
