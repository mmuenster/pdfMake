var PDFDocument= require('pdfkit');
var express = require('express')
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	console.log(request.body)
	response.send("Yo mamma dude!", request.body)
});

app.put('/', function (request, response) {
  console.log(request.body.A);

  response.send('Got a put request', request.body);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


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