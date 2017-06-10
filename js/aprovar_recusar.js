

function recusar(name)
{
  var dados= document.getElementById('tabela'+name);
  var ref ='ref'+name;
  var href = document.getElementById(ref).getAttribute("href");
  var target = document.getElementById(ref).getAttribute("target");
  var text = document.getElementById(ref).innerHTML;
$('#tabela3 > tbody:last-child').append('<tr><td>'+'<a href="'+href+'" target="'+target+'">'+text+'</a>'+'</td></tr>');
  var row = document.getElementById("tr"+name);
  row.parentNode.removeChild(row);
}

function aprovar(name)
{
  var dados= document.getElementById('tabela'+name);
  var ref ='ref'+name;
  //var href = document.getElementById(ref).getAttribute("href");
  var target = document.getElementById(ref).getAttribute("target");
  var text = document.getElementById(ref).innerHTML;
  var href = document.getElementById(ref).getAttribute("href");
$('#tabela2 > tbody:last-child').append('<tr><td>'+'<a href="'+href+'" target="'+target+'">'+text+'</a>'+'</td></tr>');
var row = document.getElementById("tr"+name);
row.parentNode.removeChild(row);
}
