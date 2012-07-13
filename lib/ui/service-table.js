define (['ui/table', 'ui/kolego', 'ko', 'lego'], function (table, kol, ko, l) {
  return function (model) {

    return l.all ([
      kol.kif ('loaded', table (model))
      //kol.kifnot ('loaded', l.img ({src:  '/bo/ajax-loader.gif'}))
]
    )
  }
})
