function addFav(id){
  var user = localStorage.flagUser;
var array;
var array2;
  if (user=="default"){

    if (localStorage.getItem("defaultFav") == null){
      array  = "iniciar,iniciar";
    }
    else if (localStorage.getItem("defaultFav").length <2) {
      array  = "iniciar,iniciar";
    }
    else{
      array =localStorage.defaultFav;
    }

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
          document.getElementById("label"+id).innerHTML = "Adicionar aos favoritos";
          document.getElementById(id).checked =false;
          $("#li"+id).remove();
          break;
        }
      }
    }
    localStorage.setItem('defaultFav', array);
    //alert(array);
  }


    if (user=="proprietario"){

      if (localStorage.getItem("proprietarioFav") == null){
        array2  = "iniciar,iniciar";
      }
      else if (localStorage.getItem("proprietarioFav").length <2) {
        array2  = "iniciar,iniciar";
      }
      else{
        array2 =localStorage.proprietarioFav;
      }

      array2= array2.split(",")
      if (!array2.includes(id)){
        array2.push(id);
        document.getElementById("label"+id).innerHTML = "Favorito!";
        f="'"+id+"'";
        $("#tabelaFav").append('<li id="li'+id+'"><div class="col-lg-10"><a href="'+document.getElementById(id).name +'"<div class="notification_desc"><p>'+document.getElementById("titulo"+id).innerText+'</p> </div></a></div><div class="col-lg-2"><a href="javascript:void(0)" onclick="addFav('+f+')" ><img src="https://openclipart.org/image/2400px/svg_to_png/154975/remove.png"  style="width:15px;height:15px;"></a> </div></li>');
      }
      else{
        for (var i=array2.length-1; i>=0; i--) {
          if (array2[i] === id) {
            array2.splice(i, 1);
            document.getElementById("label"+id).innerHTML = "Adicionar aos favoritos";
            document.getElementById(id).checked =false;
            $("#li"+id).remove();
            break;
          }
        }
      }
      localStorage.setItem('proprietarioFav', array2);
      //alert(array2);

    }



  else if (user!="proprietario" & user !="default"){
    document.getElementById(id).checked =false;
    $('#erroFav').modal('show');
  }
}
