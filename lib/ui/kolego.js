define (['lego', 'underscore'], function (l, _) {
  function asString (conf) {
    switch (typeof conf) {
    case 'object' : return '{'+ _.map(_.keys (conf), 
                                          function (key) {
                                            return "'"+key+"': " + 
                                              asString (conf [key])}).join (', ')+'}';
    default: return conf;
    }
  }

  function bind (factory, conf) {
    return factory ({'data-bind': asString ( conf)});
  }

  function text(factory) {
    return function(field) {
      return bind ( factory, { "text" : l.name(field)});
    }
  }

  function value(factory) {
    return function(field) {
      return bind ( factory, { "value" : l.name(field)});
    }                                 
  }

  function containerlessBinding (binding) {
    return function (bound, children) {
      return function (element) {
        $('<!-- ko '+binding+': '+bound+' -->').appendTo(element);
        children(element);
        $('<!-- /ko -->').appendTo(element);
      }
    }
  }

  var each = containerlessBinding ('foreach');
  var kif = containerlessBinding ('if');
  var kifnot = containerlessBinding ('ifnot');
  
  return {
    bind: bind,
    each: each,
    kif: kif,
    kifnot: kifnot,
    text: text,
    value: value
  }
})
