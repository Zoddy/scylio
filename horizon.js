var RandExp = require('randexp'),
    doctypes = {
      '5': 'html',
      'html': 'html'
    },
    elementStartChar = 'a-zA-Z:_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF' +
      '\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF' +
      '\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u10000-\uEFFFF',
    elementParse = '[' + elementStartChar + ']' +
      '[-\\.0-9\u00B7\u0300-\u036F\u203F-\u2040' + elementStartChar + ']*',
    idParse = '#[a-zA-Z]{1}[a-zA-Z0-9-_:]*',
    lineParse = new RegExp(
      '^(' +
      '(!(' + Object.keys(doctypes).join('|') + '))' + // doctype
      '|([ ]*(' + elementParse + ')(' + idParse + ')?(\\.[\\w\\d]+)*( = (.*))?)' + // element with id, class and text content
      '|([ ]+' + idParse + ')' + // only id
      '|([ ]+[\\.]{1}[\\w\\d]+)' + // only class
      '|([ ]+= .*)' + // only text content
      '|([ ]+@[a-zA-Z0-9-]+? = .*)' + // attributes
      '|([ ]*:(template|applyTemplates|callTemplate|set|import){1}\\(.*?\\))' + // functions
      ')$'
    );

console.log(new RandExp(new RegExp(lineParse)).gen());
