
function atualizarContrato() {

  var nomeProprietario = localStorage.user;

  //ARRENDATARIO
  document.getElementById("prop").textContent=nomeProprietario;

  document.getElementById("primnome").textContent=document.getElementById("nome").value;
  document.getElementById("primcc").textContent=document.getElementById("cc").value;
  document.getElementById("primnif").textContent=document.getElementById("nif").value;
  document.getElementById("primrua").textContent=document.getElementById("rua").value;
  document.getElementById("primnr").textContent=document.getElementById("nr").value;
  document.getElementById("primcc").textContent=document.getElementById("cc").value;
  document.getElementById("primfreguesia1").textContent=document.getElementById("freguesia").value;
  document.getElementById("primpostal").textContent=document.getElementById("postal").value;
  document.getElementById("primfreguesia2").textContent=document.getElementById("freguesia").value;
  document.getElementById("primcontacto").textContent=document.getElementById("contacto").value;

  //FIADOR
  document.getElementById("fnome").textContent=document.getElementById("nomef").value;
  document.getElementById("fcc").textContent=document.getElementById("ccf").value;
  document.getElementById("fnif").textContent=document.getElementById("niff").value;
  document.getElementById("frua").textContent=document.getElementById("ruaf").value;
  document.getElementById("fnr").textContent=document.getElementById("nrf").value;
  document.getElementById("fcc").textContent=document.getElementById("ccf").value;
  document.getElementById("ffreguesia1").textContent=document.getElementById("freguesiaf").value;
  document.getElementById("fpostal").textContent=document.getElementById("postalf").value;
  document.getElementById("ffreguesia2").textContent=document.getElementById("freguesiaf").value;
  document.getElementById("fcontacto").textContent=document.getElementById("contactof").value;

//Datepickers
$( function() {
    $( "#startDate" ).datepicker({ dateFormat: 'dd/mm/yy' });
  } );

$( function() {
    $( "#finishDate" ).datepicker({ dateFormat: 'dd/mm/yy' });
  } );


//Calcular numero de dias do Contrato

  document.getElementById("dataInicio").textContent=document.getElementById("startDate").value;
  document.getElementById("dataFinal").textContent=document.getElementById("finishDate").value;
  var contrato = document.getElementById('divContrato');
    contrato.style.display = 'block';

/*  var date = $("#datepicker").datepicker('getDate'),
  month = date.getMonth() + 1
  year =  date.getFullYear();


    switch(month){
        case 1: b = "Janeiro";
            break;
        case 2: b = "Fevereiro";
            break;
        case 3: b = "Março";
            break;
        case 4: b = "Abril";
            break;
        case 5: b = "Maio";
            break;
        case 6: b = "Junho";
            break;
        case 7: b = "Julho";
            break;
        case 8: b = "Agosto";
            break;
        case 9: b = "Setembro";
            break;
        case 10: b = "Outubro";
            break;
        case 11: b = "Novembro";
            break;
        case 12: b = "Dezembro";
            break;
        }

console.log(b);*/
document.getElementById("ano").textContent="ANO";
}


function genPDF(){
  var fbcanvas = document.getElementById("divContrato");
   html2canvas($("#divContrato"),
        {

            onrendered: function (canvas) {

                var width = canvas.width;
                var height = canvas.height;
                var millimeters = {};
                millimeters.width = Math.floor(width * 0.264583);
                millimeters.height = Math.floor(height * 0.264583);

                var imgData = canvas.toDataURL(
                    'image/png');
                var doc = new jsPDF("p", "mm", "a4");
                doc.deletePage(1);
                doc.addPage(millimeters.width, millimeters.height);
                doc.addImage(imgData, 'PNG', 0, 0);
                doc.save('ContratoArrendamento.pdf');
            }
        });
      }

function esconder(){
  var contrato = document.getElementById('divContrato');
    contrato.style.display = 'none';
}
