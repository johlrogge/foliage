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
    
  function all(children) {
      return function(element) {
	  _.each(children, function(child){child(element)})
      }                          
  }

  return _.reduce(['table',
		   'thead',
		   'tfoot',
		   'th',
		   'tbody',
		   'td',
		   'th',
		   'input',
		   'button',
		   'a',
		   'p',
		   'img',
		   'all',
		   'div',
		   'span',
		   'strong',
		   'em'],
		  function(res, name) {
		      res[name] = e(name);
		      return res;
		  },
		  {element:e});
});
