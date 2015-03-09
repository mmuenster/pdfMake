var PDFDocument= require('pdfkit');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;
 
http.createServer(function(request, response) {
 
  var doc = new PDFDocument({ size:[279, 68], margin:1}); //{ size:[280, 68]}
      
      response.writeHead(200);
      doc.pipe(response);
      doc.font('IDAutomationSC128XS.ttf');
      doc.fontSize(7);
      doc.text('*SP15-001234*', 6, 1);
      doc.moveDown(0.5)
      doc.font('Helvetica');
      doc.fontSize(7);
      doc.text('SP15-0018jhg8');
      doc.fontSize(7);
      doc.text('A1            L1-3');
      doc.text('H&E');
      doc.text('Test, Patient');
      doc.fontSize(4);
      doc.fontSize(7);
      doc.text('08.01.2014')
      doc.fontSize(5);
      doc.text('Avero Diagnostics');
      doc.end();
}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");