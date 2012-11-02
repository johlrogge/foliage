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

	var handleArg = function (arg) {
	    switch(typeof arg) {
	    case "string": children.push(textNode(arg)); break;
	    case "object": handleObject(arg); break;
	    case "undefined" : break;
		
	    default: children.push(arg);
	    }
	}

	var handleObject = function(obj) {
	    if($.isArray(obj)) {
		_.each(obj, function (item) {
		    handleArg(item);
		});
	    } else {
		attributes = _.extend(attributes, obj);     
	    }
	}
	

	
	_.each (args, handleArg)

	    
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
		var result = me.appendTo(parent);
		result.undo = function() {result.remove()}
		return result;
	    }
	}
    }
    
    function all() {
	var children = arguments;
	return function(element) {
	    _.each(children, function(child){child(element)})
		}                          
    }

    function into(elem, child) {
	return function(element) {
	    return child($(elem, element));
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
    res.into = into;

    return res;
});
