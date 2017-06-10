var user=0;
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

function acesso(){
  var utilizador = document.getElementById("username").value;
  if( utilizador=="default" || utilizador=="proprietario"|| utilizador=="gestor" || utilizador=="analise"){
  localStorage.setItem('flagUser', utilizador);
  if ( utilizador == "analise"){
  window.open ('analisar.html','_self',false);
  }
  else{
    window.open ('index.html','_self',false)
  }
  }
  else {
    alert("Login Inválido!")
  }
}


function selecionarBarra(){
  var user = localStorage.flagUser;
  if (user=="gestor"){

    document.getElementById("aprovar").style.display="block";

  }
}

window.load=selecionarBarra();
