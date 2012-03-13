exports._docTypes = {
  '5': 'html'
};
exports._open = [];
exports._options = {
  'crunch': true,
  'spaces': 2
};
exports._rootTemplate = null;
exports._spaces = 2;
exports._templates = {};
exports._view = null;

exports.parse = function(view, tpl, options) {
  var close,
      doc = '',
      docType,
      parts,
      spaces,
      tag,
      tpl = tpl.split('\n'),
      i, j;

  // add doctype
  docType = tpl[0].match(/^@ (.*)?/);

  if (docType !== null && this._docTypes[docType[1]]) {
    doc += '<!DOCTYPE ' + this._docTypes[docType[1]] + '>';
  } else {
    throw 'no doctype matching';
  }

  // go row for row
  for (i = 1; tpl[i]; ++i) {
    parts = tpl[i].match(/^([ ]{0,})([a-z]+)( = ){0,1}(.*)?/);
    spaces = parts[1];
    tag = parts[2];
    text = parts[4] || '';

    if (
      parts.length === 5 &&
      parts[0] === tpl[i] &&
      spaces.length % this._options['spaces'] === 0
    ) {
      if (spaces.length <= (this._open.length - 1) * this._options['spaces']) {
        close = this._open.splice(
          spaces.length / this._options['spaces'],
          this._open.length
        );
        close.reverse();

        for (j = 0; close[j]; ++j) {
          doc += '</' + close[j] + '>';
        }
      }

      doc += '<' + tag + '>' + text;
      this._open.push(tag);
    } else {
      throw 'syntax error at line ' + (i + 1);
    }
  }

  this._open.reverse();
  for (i = 0; this._open[i]; ++i) {
    doc += '</' + this._open[i] + '>';
  }

  // return document
  return doc;
};