var PDFDocument= require('pdfkit');
var fs = require('fs');
var doc = new PDFDocument({ size:[279, 68], margin:1}); //{ size:[280, 68]}

doc.pipe(fs.createWriteStream('output.pdf'));


doc.font('IDAutomationSC128XS.ttf');
doc.fontSize(6);
doc.text('*SP15-001234*');
doc.font('Helvetica');
doc.fontSize(7);
doc.text('SP15-001234');
doc.fontSize(7);
doc.text('A1            L1-3');
doc.text('H&E');
doc.text('Test, Patient');
doc.fontSize(4);
doc.text('765432         87630876');
doc.fontSize(7);
doc.text('08.01.2014')
doc.fontSize(4);
doc.text('Avero Diagnostics');

doc.font('IDAutomationSC128XS.ttf');
doc.fontSize(6);
doc.text('*SP15-001234*', 76, 1);
doc.font('Helvetica');
doc.fontSize(7);
doc.text('SP15-001234');
doc.fontSize(7);
doc.text('A1            L1-3');
doc.text('H&E');
doc.text('Test, Patient');
doc.fontSize(4);
doc.text('765432         87630876');
doc.fontSize(7);
doc.text('08.01.2014')
doc.fontSize(4);
doc.text('Avero Diagnostics');

doc.font('IDAutomationSC128XS.ttf');
doc.fontSize(6);
doc.text('*SP15-001234*', 149, 1);
doc.font('Helvetica');
doc.fontSize(7);
doc.text('SP15-001234');
doc.fontSize(7);
doc.text('A1            L1-3');
doc.text('H&E');
doc.text('Test, Patient');
doc.fontSize(4);
doc.text('765432         87630876');
doc.fontSize(7);
doc.text('08.01.2014')
doc.fontSize(4);
doc.text('Avero Diagnostics');

doc.font('IDAutomationSC128XS.ttf');
doc.fontSize(6);
doc.text('*SP15-001234*', 226, 1);
doc.font('Helvetica');
doc.fontSize(7);
doc.text('SP15-001234');
doc.fontSize(7);
doc.text('A1            L1-3');
doc.text('H&E');
doc.text('Test, Patient');
doc.fontSize(4);
doc.text('765432         87630876');
doc.fontSize(7);
doc.text('08.01.2014')
doc.fontSize(4);
doc.text('Avero Diagnostics');
doc.end();