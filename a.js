var i=Number(process.argv[2]);

if (i<95)
	asciiCode = String.fromCharCode(i + 32);
else if (i=95)
	asciiCode = 'À';
else if (i=96)
	asciiCode = '\xC1';
else if (i=97)
	asciiCode = '\xC2';
else if (i=98)
	asciiCode = '\xC3';
else if (i=99)
	asciiCode = '\xC4';
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

console.log(i);
console.log(asciiCode);
console.log(asciiCode.charAt(0));
alert(asciiCode.charCodeAt(0));
console.log('ÌSP15-Ç{|}~ÃÄÅÆÇ$Î'.charAt(0))

console.log('Hello ',asciiCode);