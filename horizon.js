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
  var attributes,
      attributeParts,
      close,
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
    parts = tpl[i].match(/^([ ]{0,})([a-z]+)(\(.*?\)){0,1}( = ){0,1}(.*)?/);
    spaces = parts[1];
    tag = parts[2];
    attributes = parts[3];
    text = parts[5] || '';

    if (
      parts.length === 6 &&
      parts[0] === tpl[i] &&
      spaces.length % this._options['spaces'] === 0
    ) {
      // do we need to close tags?
      close = this._open.splice(
        0,
        this._open.length - (spaces.length / this._options['spaces'])
      );

      for (j = 0; close[j]; ++j) {
        doc += '</' + close[j] + '>';
      }

      // do we have attributes?
      if (attributes) {
        attributes = (attributes.substring(
          1,
          attributes.length - 1
        )).split(', ');

        for (j = 0; attributes[j]; ++j) {
          attributeParts = attributes[j].match(/^(.*?) = (.*)?/);
          attributes[j] = attributeParts[1] + '="' + attributeParts[2] + '"';
        }
      }

      // add new tag
      doc += '<' +
             tag +
             ((attributes) ? ' ' + attributes.join(' ') : '') +
             '>' +
             text;
      this._open.unshift(tag);
    } else {
      throw 'syntax error at line ' + (i + 1);
    }
  }

  for (i = 0; this._open[i]; ++i) {
    doc += '</' + this._open[i] + '>';
  }

  // return document
  return doc;
};