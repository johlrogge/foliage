define(['jquery', 'underscore'], function($, _) {
  function groupArgs(args) {
    var children = [];
    var attributes  = {};
    function textNode(text) {
	return function(element) {
	    element.append('\n');
	    return element.append(text);
	}

    }
    
    _.each (args, function (arg) {
      switch(typeof arg) {
        case "string": children.push(textNode(arg)); break;
        case "object": attributes = _.extend(attributes, arg); break;
        case "undefined" : break;
	
        default: children.push(arg);
      }
    });
    
    return {
      children: children,
      attributes: attributes
    }
  }
  
  var e = function(name, decorate) {
    return function() {
      var args = groupArgs(arguments);
      return function(parent) {
	var me = $('<'+name+' />');
	me.attr(args.attributes);
	for ( child in args.children ) {
	  var ch = args.children[child]
	  ch(me);
	}
        if (decorate) {
          decorate (me);
        }
	return me.appendTo(parent);
      }
    }
  }
    
  function all() {
      var children = arguments;
      return function(element) {
	  _.each(children, function(child){child(element)})
      }                          
  }

var res = _.reduce(
    ['a',
     'abbr',
     'acronym',
     'address',
     'area',
     'b',
     'base',
     'bdo',
     'big',
     'blockquote',
     'body',
     'br',
     'button',
     'caption',
     'cite',
     'code',
     'col',
     'colgroup',
     'dd',
     'del',
     'dfn',
     'div',
     'dl',
     'dt',
     'em',
     'fieldset',
     'form',
     'h1',
     'h2',
     'h3',
     'h4',
     'h5',
     'h6',
     'head',
     'hr',
     'html',
     'i',
     'img',
     'input',
     'ins',
     'kbd',
     'label',
     'legend',
     'li',
     'link',
     'map',
     'meta',
     'noscript',
     'object',
     'ol',
     'optgroup',
     'option',
     'p',
     'param',
     'pre',
     'q',
     'samp',
     'script',
     'select',
     'small',
     'span',
     'strong',
     'style',
     'sub',
     'sup',
     'table',
     'tbody',
     'td',
     'textarea',
     'tfoot',
     'th',
     'thead',
     'title',
     'tr',
     'tt',
     'ul',
     'var'],
    function(res, name) {
	res[name] = e(name);
	return res;
    },
    {element:e});
    
    res.all = all;

    return res;
});
