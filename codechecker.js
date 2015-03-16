
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

console.log("ÉTUS15-ÄÌ&{=", getCheckDigit("ÉTUS15-ÄÌ&{"))

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
