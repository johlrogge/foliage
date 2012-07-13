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
//	me.text(args.text.join('\n'));
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

  function wrapAll(coll, elem, textorattr) {
    return function(element) {
      for (index in coll) {
	elem(textorattr, coll[index])(element);
      }
    }
  }
  var table = e('table');
  var thead = e('thead');
  var tfoot = e('tfoot');
  var th = e('th');
  var tbody = e('tbody');
  var td = e('td');
  var tr = e('tr');
 
  

  function name(m) {return m.name}

  function all(children) {
    return function(element) {
      _.each(children, function(child){child(element)})
 	}                             
  }

  function text(factory) {
    return function(field) {
      return factory(field.text);
    }                                      
  }


  return {
    name:name,
    table: table,
    thead: thead,
    th: th,
    tbody: tbody,
    td: td,
    tr: tr,
    input : e('input'),
    button: e('button'),
    a: e('a'),
    p: e('p'),
    img: e ('img'),
    tfoot: tfoot,
    name: name,
    text: text,
    all:all,
    div:e ('div'),
    span:e ('span'),
    strong: e('strong'),
    element:e
  }
});
