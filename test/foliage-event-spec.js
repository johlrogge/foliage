define(['buster', 'foliage', 'jquery', 'foliage-event'],
       function(buster, f, $, on) {

	   var assert = buster.assert;
	   var refute = buster.refute;

	   function elemTest(test) {
	       var div = $("<div />");
	       return _.bind(test, this, div);
	   }

	   buster.testCase("events", {
	       "event can be assigned by name" : elemTest(function(e) {
		   var value;
		   on('click', function(){value = "clicked"})(e);
		   e.click();
		   assert.equals(value, "clicked");
	       }),
	       "many events can be assigned at once" : elemTest(function(e) {
		   var value = "";
		   on({'click': function(){value = value + "clicked"},
		       'blur': function(){value = value + "blurred"}
		      })(e);
		   e.click();
		   e.blur();
		   e.click();
		   assert.equals(value, "clickedblurredclicked");
	       }),
	       "events can be assigned with sugar" : elemTest(function(e) {
		   var value = "";
		   on.click(function(){value = value + "clicked"})(e);
		   e.click();
		   assert.equals(value, "clicked");
	       })


           });
       });
