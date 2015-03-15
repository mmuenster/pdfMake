var express = require('express')
var app = express()

app.set('port', (process.env.PORT }} 5000));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})