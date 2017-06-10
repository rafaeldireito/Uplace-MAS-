$( document ).ready(function() {
	var user = localStorage.flagUser;

	if (user=="gestor"){
		//alert("entrei")
		//alert(document.getElementById("aprovarB").style.display)
		document.getElementById("indice").style.display="block";
		document.getElementById("logbook").style.display="none";
		document.getElementById("adicionar").style.display="none";
		document.getElementById("meus").style.display="none";
		document.getElementById("aprovar").style.display="block";
		document.getElementById("conta").style.display="block";
		document.getElementById("logreg").style.display="none";
		document.getElementById("logout").style.display="block";
		document.getElementById("fav").style.display="none";
	}

	else if (user=="proprietario"){
		//alert(document.getElementById("aprovarB").style.display)
		document.getElementById("indice").style.display="block";
		document.getElementById("logbook").style.display="block";
		document.getElementById("adicionar").style.display="block";
		document.getElementById("meus").style.display="block";
		document.getElementById("aprovar").style.display="none";
		document.getElementById("conta").style.display="block";
		document.getElementById("logreg").style.display="none";
		document.getElementById("logout").style.display="block";
		document.getElementById("fav").style.display="block";



	}
	else if (user=="analise"){
	window.open ('analisar.html','_self',false);
	}

	else if (user=="default"){
		//alert(document.getElementById("aprovarB").style.display)
		document.getElementById("indice").style.display="block";
		document.getElementById("logbook").style.display="block";
		document.getElementById("adicionar").style.display="none";
		document.getElementById("meus").style.display="none";
		document.getElementById("aprovar").style.display="none";
		document.getElementById("conta").style.display="block";
		document.getElementById("logreg").style.display="none";
		document.getElementById("logout").style.display="block";
		document.getElementById("fav").style.display="block";

	}
	else{
		document.getElementById("indice").style.display="block";
		document.getElementById("logbook").style.display="none";
		document.getElementById("adicionar").style.display="none";
		document.getElementById("meus").style.display="none";
		document.getElementById("aprovar").style.display="none";
		document.getElementById("conta").style.display="none";
		document.getElementById("logreg").style.display="block";
		document.getElementById("logout").style.display="none";
		document.getElementById("fav").style.display="none";
	}
	});
