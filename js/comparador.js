

function procurar() {
$('#erroPesquisa').css('display', 'none');
  //search=numero+wc+local+preco;
  var count=0;
  var divsToHide = document.getElementsByClassName("product"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        var ID = divsToHide[i].getAttribute('id');
        if (ID.includes(preco) & ID.includes(numero) & ID.includes(wc) & ID.includes(local)){
            document.getElementById(ID).style.display='block';
            count +=1;
        }
        else{
          document.getElementById(ID).style.display='none';
        }}
        if (count == 0){
        $('#erroPesquisa').css('display', 'block');
}
}

$( function() {
  $( "#datepicker" ).datepicker();
} );

$( function() {
  $( "#datepicker1" ).datepicker();
} );

var search="";
var preco="";
var numero="";
var wc="";
var local="";

$(document).ready(function() {
 $('#numero li').click(function() {
     numero = $(this).attr('id');
 });

 $('#wc li').click(function() {
     wc = $(this).attr('id');

 });

 $('#local li').click(function() {
     local = $(this).attr('id');
 });

 $('#preco li').click(function() {
     preco = $(this).attr('id');
 });

});
