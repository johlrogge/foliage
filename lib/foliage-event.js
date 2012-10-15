define(['jquery', 'underscore'], function($, _) {
    var result = function(event, handler) {
	return function(element) {
	    return $(element).bind(event, handler);
	}
    };

    return _.reduce([
    'click',
    'dblclick',
    'focusin',
    'focusout',
    'hover',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup'
    ], function(acc, current) {
	acc[current] = function(handler) {return result(current, handler)};
	return acc;
    }, result);



    return result;
    
});
