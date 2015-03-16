var PDFDocument= require('pdfkit');
var express = require('express')
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get("/", function(request,response) {
	response.send("This is it!", Date.now());
});

app.get('/key/:key', function (request, response) {
	var FBrequest = require("request");
	FBrequest('https://dazzling-torch-3393.firebaseio.com/SlidePrinting/'+request.param("key")+'.json', function(error, head, body) {
		body = JSON.parse(body);
		//console.log(body);

		var barcodeFont = 'etn128w-a.ttf';
		body.encodedCaseNum = encodeCaseNum(body.caseNum);

		console.log(body.encodedCaseNum);
		console.log(body.caseNum);

		response.status(200);
		response.type('application/pdf');

		var doc = new PDFDocument({ size:[288, 72], margin:1}); 
		doc.pipe(response);
		var pages = Math.floor(body.slides.length/4) + Math.ceil((body.slides.length%4)/4);
		//console.log("pages=", pages)

		for(var j=0; j<pages; j++) {
			if (j>0) { doc.addPage(); }
			var pageLength = (j+1) < pages  ? 4 : (body.slides.length-(j*4)<4 ? (body.slides.length - j*4) : 4);
			
			//console.log("pageLength=", pageLength);

			for(var i=0; i<pageLength; i++) {
				doc.font(barcodeFont);  
				doc.fontSize(11.36);  //The Etel font requires printing at this size only for proper scanning on 203dpi thermal printers
				doc.text(body.encodedCaseNum, 72*i, 0); 
				doc.moveDown(0.2);
				doc.font('Helvetica');
				doc.fontSize(7);
				doc.text(body.caseNum, 72*i+3);
				doc.fontSize(7);
				doc.text(body.slides[j*4 + i][0] + '          ' + body.slides[j*4 + i][1]);
				doc.text(body.slides[j*4 + i][2]);
				doc.text(body.patientName);
				doc.fontSize(4);
				doc.fontSize(7);
				doc.text(body.collectionDate)
				doc.fontSize(6);
				doc.text('Avero Diagnostics');
			}
		}


		doc.end();
	});
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

function encodeCaseNum(casenum) {
		var startCode = 'É';
		var setCSwitchCode = 'Ä';
		var prefixAndHyphen = casenum.substring(0,casenum.search('-')+1);
		var justCaseNum = casenum.substring(casenum.search('-') + 1, casenum.length);
		var caseNumValue1 = setCCode(Number(justCaseNum.substring(0,2)));
		var caseNumValue2 = setCCode(Number(justCaseNum.substring(2,4)));
		var caseNumValue3 = setCCode(Number(justCaseNum.substring(4,6)));
		//console.log(caseNumValue1,caseNumValue2,caseNumValue3);
		var stopCode = 'Ë';

		//console.log(prefixAndHyphen);
		var code128Base = startCode.concat(prefixAndHyphen,setCSwitchCode,caseNumValue1,caseNumValue2,caseNumValue3); 
		var checkDigit = getCheckDigit(code128Base);
		return code128Base.concat(checkDigit,stopCode);
}

function setCCode(i) {

	console.log(i);
    if (i==0) {
      return 'Ì';
    } else if (i<95) { 
      return String.fromCharCode(i + 32);
    } else {
      return codeBTable[i];
    }
}

function getCheckDigit(code) {
 console.log(code);
  var sum = 0;
    for(var i=0; i<code.length; i++) {
      console.log(i, code.charCodeAt(i), codeBTable[code.charAt(i)]);
      if (code.charCodeAt(i)<127) {
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
                   "106":"Ë", "Ë":106,
                   "204":"Ì", "Ì":0 };