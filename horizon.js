exports._doctypes = {
  '5': 'html',
  'html': 'html'
};
exports._doctypeMatch = '^@(' + Object.keys(this._doctypes).join('|') + ')$';
exports._lineMatch = /^([ ]*)([a-z]+)(\(.*?\))?(([ ]+=[ ]+)(.+))?$/;
exports._options = {
  'crunch': true,
  'spaces': 2
};
exports._indent = 0;


exports.parse = function(view, template, options) {
  var template = template.split('\n'),
      doctype = template[0].match(new RegExp(this._doctypeMatch)),
      lineParts,
      spaces,
      element,
      attributes,
      text,
      doc = '',
      i;

  // create document type
  if (doctype !== null) {
    doc += '<!DOCTYPE ' + this._doctypes[doctype[1]] + '>';
  } else {
    throw 'error at line 1: no doctype -> ' + template[0];
  }

  // go line for line
  for (i = 1; template[i]; ++i) {
    // check correct syntax
    lineParts = template[i].match(this._lineMatch);

    if (lineParts === null) {
      throw 'error at line ' + (i + 1) + ' -> ' + template[i];
    } else {
      spaces = lineParts[1];
      element = lineParts[2];
      attributes = lineParts[3];
      text = lineParts[6];

      // indentation correct?
      if (spaces.length / this._options.spaces !== this._indent) {
        throw 'wrong indentation at line ' + (i + 1) +
          ': expect ' + this._indent * this._options.spaces +
          ' but got ' + spaces.length;
      }
    }
  }

  // return document
  return '';
};