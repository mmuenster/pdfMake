var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('yo mamma dude!');
});

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

