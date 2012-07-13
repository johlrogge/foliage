define (
  ['lego', 'jquery', 'when', 'ko',  'jquery-ui'],
  function (l, $, when, ko) {

    function confirmationDialog (message) {
      var defered = when.defer();
      function closeAnd(action){
	  return function() {
	      $(this).dialog("close"); 
	      return action();
	  }
      }

      message($ ("<div></div>")).dialog ({
        resizable: false,
        height:400,
        modal: true,
        buttons: {
          Ok: closeAnd(defered.resolve),
          Cancel: closeAnd(defered.reject)
        }
      })
      return defered.promise;
    }

    return {
      confirm: confirmationDialog
    }
  }
)
