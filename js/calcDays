$('#datepicker').datepicker({
   onSelect: function(dateText, inst) {
       var d1=new Date(dateText);
       // get date from other text field
       var d2=new Date($('#datepicker2').val());
       // d2 -d1 gives result in milliseconds
       // calculate number of days by Math.abs((d2-d1)/86400000, as 24*3600*1000 = 86400000
       // and populate it to some text field #textfield
       console.log((Math.abs((d2-d1)/86400000));
   }
});
