
var _ = require('lodash');

module.exports = function (ctx, req, res) {

  // Copied from https://github.com/hughsk/flat
  function flatten(target, opts) {

    opts = opts || {}

    var delimiter = opts.delimiter || '.'
    var maxDepth = opts.maxDepth
    var currentDepth = 1
    var output = {}

    function step(object, prev) {
      Object.keys(object).forEach(function(key) {
        var value = object[key]
        var isarray = opts.safe && Array.isArray(value)
        var type = Object.prototype.toString.call(value)
        var isbuffer = isBuffer(value)
        var isobject = (
          type === "[object Object]" ||
          type === "[object Array]"
        )

        var newKey = prev
          ? prev + delimiter + key
          : key

        if (!opts.maxDepth) {
          maxDepth = currentDepth + 1;
        }

        if (!isarray && !isbuffer && isobject && Object.keys(value).length && currentDepth < maxDepth) {
          ++currentDepth
          return step(value, newKey)
        }

        output[newKey] = value
      })
    }

    step(target)

    return output
  }

  function isBuffer(value) {
    if (typeof Buffer === 'undefined') return false
    return Buffer.isBuffer(value)
  }

  function paramToList(target, paramName) {
    var paramList = [];
    var value = ctx.query[paramName];
    if (_.isString(value)) {
      paramList = [value];
    } else if (_.isArray(value)) {
      paramList = value;
    }
    return paramList;
  }

  var data = _.map(ctx.body, flatten);

  if (ctx.query && ctx.query.sort) {      
    var sortFields = paramToList(ctx.query, 'sort');
    data = _.sortByAll(data, sortFields);
  }

  if (ctx.query && ctx.query.cut) {
    var cutFields = paramToList(ctx.query, 'cut');
    data = _.map(data, function (entry) { 
      return _.pick(entry, cutFields); 
    });
  }

  res.writeHead(200, { 'Content-Type': 'text/html '});
  res.end(JSON.stringify(data, null, 4));
  
}

