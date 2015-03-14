
var PDFDocument= require('pdfkit');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;

 
http.createServer(function(request, response) {

var request = require("request");
request('https://dazzling-torch-3393.firebaseio.com/SlidePrinting.json', function(error, head, body) {
  var queueCurrent = JSON.parse(body)
  console.log(queueCurrent.slides.length);

    var doc = new PDFDocument({ size:[288, 72], margin:1}); //{ size:[280, 68]} { size:[279, 68], margin:1}
          var startCode = 'É';
          var setCSwitchCode = 'Ä';
          var prefixAndHyphen = queueCurrent.caseNum.substring(0,queueCurrent.caseNum.search('-')+1);
          var justCaseNum = queueCurrent.caseNum.substring(queueCurrent.caseNum.search('-') + 1, queueCurrent.caseNum.length);
          var caseNumValue1 = setCCode(Number(justCaseNum.substring(0,2)));
          var caseNumValue2 = setCCode(Number(justCaseNum.substring(2,4)));
          var caseNumValue3 = setCCode(Number(justCaseNum.substring(4,6)));
          console.log(caseNumValue1,caseNumValue2,caseNumValue3);
          var stopCode = 'Ë';

          console.log(prefixAndHyphen);
          var datext = startCode.concat(prefixAndHyphen,setCSwitchCode,caseNumValue1,caseNumValue2,caseNumValue3,'/',stopCode); //SP15-ÇÂ5bX
          console.log(datext);
          var barcodeFont = 'etn128w-a.ttf';
      response.writeHead(200);
      doc.pipe(response);

      doc.font(barcodeFont);  //'MattMuensterCode128.ttf'  Works when printed large.
      doc.fontSize(11.36);  //The Etel font requires printing at this size only for proper scanning on 203dpi thermal printers
      doc.text(datext); 
      doc.moveDown(0.2);
      doc.font('Helvetica');
      doc.fontSize(7);
      doc.text(queueCurrent.caseNum, 9);
      doc.fontSize(7);
      doc.text(queueCurrent.slides[0][0] + '        ' + queueCurrent.slides[0][1]);
      doc.text(queueCurrent.slides[0][2]);
      doc.text(queueCurrent.patientName);
      doc.fontSize(4);
      doc.fontSize(7);
      doc.text(queueCurrent.collectionDate)
      doc.fontSize(5);
      doc.text('Avero Diagnostics');


      doc.end();

});

}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

function setCCode(i) {
var asciiCode= "";

if (i<95)
  asciiCode = String.fromCharCode(i + 32);
else if (i=95)
  asciiCode = '\xC0';
else if (i=96)
  asciiCode = '\xC1';
else if (i=97)
  asciiCode = '\xC2';
else if (i=98)
  asciiCode = '\xC3';
else if (i=99)
  asciiCode = 'Ä';
else if (i=100)
  asciiCode = '\xC5';
else if (i=101)
  asciiCode = '\xC6';
else if (i=102)
  asciiCode = '\xC7';
else if (i=103)
  asciiCode = '\xC8';
else if (i=104)
  asciiCode = '\xC9';
else if (i=105)
  asciiCode = '\xCA';
else if (i=106)
  asciiCode = '\xCB';
else if (i=107)
  asciiCode = '\xCC';

console.log(asciiCode);

return asciiCode;
}