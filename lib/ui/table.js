define(['ko', 'lego', 'ui/jqlego', 'ui/kolego'],
       function(ko, l, jq, kol) {
	 return function(model) {
	   return function(element) {
             function newItem(x) {
               return l.td( kol.value (l.input) ({name:  'new_row.'+x.name}));
             }

	     l.table({'class' : 'ui-helper-reset ui-widget ui-corner-tl'},
		     l.thead({'class' : 'ui-widget-header ui-corner-tl'},
			     l.tr(
			       l.all(_.map(model.header.concat([{text: ''}]), l.text(l.th)))
			     )
			    ),
		     l.tbody({'class' : 'ui-widget-content'},
/*                             l.tr(
                               l.all(_.map(model.header, newItem).concat(
                                 l.td ( jq.button.add('add'))))
                             ),*/
			     kol.each('{data: rows}', 
                                      l.tr(
                                        l.all(_.map(model.header, kol.text(l.td)).concat (
                                          l.td ( jq.button.status ('status'))))
			              )
                                     )
		               ),
                     l.tfoot())(element);
           }
         }
       });
