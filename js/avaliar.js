$(document).ready(function(){
  $("#myModal").on('shown.bs.modal', function(){
    $(this).find('input[type="text"]').focus();
  });
});
function submetido(){
  alert("Avaliação Submetida com Sucesso")
}
