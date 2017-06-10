
$( document ).ready(function() {
	var s = localStorage.source;
  document.getElementById("tabelaFav").innerHTML=s;
});

function addFav(id){
  var user = localStorage.flagUser;

  if (user=="default"){
    var array =localStorage.defaultFav;

    if (array.length <2) {
      array  = "iniciar,iniciar";
    }
    else{
      array= array.split(",")
      if (!array.includes(id)){
        array.push(id);
        document.getElementById("label"+id).innerHTML = "Favorito!";
        f="'"+id+"'";
        $("#tabelaFav").append('<li id="li'+id+'"><div class="col-lg-10"><a href="'+document.getElementById(id).name +'"<div class="notification_desc"><p>'+document.getElementById("titulo"+id).innerText+'</p> </div></a></div><div class="col-lg-2"><a href="javascript:void(0)" onclick="addFav('+f+')" ><img src="https://openclipart.org/image/2400px/svg_to_png/154975/remove.png"  style="width:15px;height:15px;"></a> </div></li>');
      }
      else{
        for (var i=array.length-1; i>=0; i--) {
          if (array[i] === id) {
            array.splice(i, 1);
            $("#li"+id).remove();
            break;
          }
        }
      }
    }

    localStorage.setItem('defaultFav', array);
  }


  else if (user=="proprietario"){
    var array2 =localStorage.proprietarioFav;

    if (array2.length <2) {
      var array2  = "iniciar,iniciar";
    }
    else{
      array2= array2.split(",")
      if (!array2.includes(id)){
        array2.push(id);}
      else{
        for (var i=array2.length-1; i>=0; i--) {
          if (array2[i] === id) {
            array2.splice(i, 1);
            $("#li"+id).remove();
            break;
          }
        }
      }
    }

    localStorage.setItem('proprietarioFav', array2);
  }






}
