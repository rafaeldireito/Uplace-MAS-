
function gerar(){
  var nomeProprietario= document.getElementById('proprietario').innerText;
  localStorage.setItem('user', nomeProprietario);
  var utilizador = localStorage.flagUser;
  if (utilizador!="proprietario" & utilizador !="default"){
          $('#erroContrato').modal('show');
}

}

function abrir(){
  var utilizador1 = localStorage.flagUser;
if (utilizador1=="proprietario" || utilizador1=="default"){
  window.open("EscreverContrato.html");
}
}
