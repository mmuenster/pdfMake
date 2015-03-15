
var PDFDocument= require('pdfkit');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;

var codeBTable = { "95":"À", "À":95,
                   "96":"Á", "Á":96, 
                   "97":"Â", "Â":97,
                   "98":"Ã", "Ã":98,
                   "99":"Ä", "Ä":99,
                   "100":"Å", "Å":100,
                   "101":"Æ", "Æ":101,
                   "102":"Ç", "Ç":102,
                   "103":"È", "È":103,
                   "104":"É", "É":104,
                   "105":"Ê", "Ê":105,
                   "106":"Ë", "Ë":106  };

 console.log(codeBTable['!'], codeBTable["53"])
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
          var code128Base = startCode.concat(prefixAndHyphen,setCSwitchCode,caseNumValue1,caseNumValue2,caseNumValue3); //SP15-ÇÂ5bX
          var checkDigit = getCheckDigit(code128Base);
          var datext = code128Base.concat(checkDigit,stopCode);

          console.log(datext);
          var barcodeFont = 'Helvetica';
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
      doc.fontSize(14)
      doc.text(datext, 102,10)

      doc.end();

});

}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

function setCCode(i) {

    if (i<95) { 
      return String.fromCharCode(i + 32);
    }
    else {
      return codeBTable[i];
    }
}

function getCheckDigit(code) {
  console.log(code);
  var sum = 0;
    for(var i=0; i<code.length; i++) {
      console.log(i, code.charCodeAt(i), codeBTable[code.charAt(i)]);
      if (code.charCodeAt(i)<95) {
        if (i==0) {
          sum = code.charCodeAt(i)-32;
        } else {
          sum += (code.charCodeAt(i)-32)*i
        }
      } else {
        if(i>0) {
          sum += codeBTable[code.charAt(i)]*i;
        } else {
          sum += codeBTable[code.charAt(i)];
        }
      }
     console.log(i,sum) 
  }
  console.log(sum, sum%103, setCCode(sum%103));
  return setCCode(sum%103);
}