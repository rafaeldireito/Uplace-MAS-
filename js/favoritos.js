$( document ).ready(function() {
	//localStorage.clear(); // SERVI PARA TESTAR
	var user = localStorage.flagUser;


	if (user=="proprietario"){
		var conjuntoBoxes = localStorage.proprietarioFav;
		if(conjuntoBoxes != null){
			conjuntoBoxes=conjuntoBoxes.split(",");
			for (var i=conjuntoBoxes.length-1; i>=2; i--) {
				document.getElementById(conjuntoBoxes[i]).checked =true;
				document.getElementById("label"+conjuntoBoxes[i]).innerHTML = "Favorito!";
				f="'"+conjuntoBoxes[i]+"'";
				$("#tabelaFav").append('<li id="li'+conjuntoBoxes[i]+'"><div class="col-lg-10"><a href="'+document.getElementById(conjuntoBoxes[i]).name +'"<div class="notification_desc"><p>'+document.getElementById("titulo"+conjuntoBoxes[i]).innerText+'</p> </div></a></div><div class="col-lg-2"><a href="javascript:void(0)" onclick="addFav('+f+')" ><img src="https://openclipart.org/image/2400px/svg_to_png/154975/remove.png"  style="width:15px;height:15px;"></div></li>');
			}
		}
	}


	else if (user=="default"){
		var conjuntoBoxes = localStorage.defaultFav;
		if(conjuntoBoxes != null){
			conjuntoBoxes=conjuntoBoxes.split(",");
			for (var i=conjuntoBoxes.length-1; i>=2; i--) {
				document.getElementById(conjuntoBoxes[i]).checked =true;
				document.getElementById("label"+conjuntoBoxes[i]).innerHTML = "Favorito!";
				f="'"+conjuntoBoxes[i]+"'";
				$("#tabelaFav").append('<li id="li'+conjuntoBoxes[i]+'"><div class="col-lg-10"><a href="'+document.getElementById(conjuntoBoxes[i]).name +'"<div class="notification_desc"><p>'+document.getElementById("titulo"+conjuntoBoxes[i]).innerText+'</p> </div></a></div><div class="col-lg-2"><a href="javascript:void(0)" onclick="addFav('+f+')" ><img src="https://openclipart.org/image/2400px/svg_to_png/154975/remove.png"  style="width:15px;height:15px;"></div></li>');
			}
		}
	}

});
