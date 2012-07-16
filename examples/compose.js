define(['foliage'], function(f) {
    return f.ol(
	f.li("It is hard"),
	f.li(f.strong("not"), "to"),
	f.ul(
	    f.li("figure"),
	    f.li("out"),
	    f.li("what this")),
	f.li("will", "look", "like"),
	f.li(f.img({src: "http://placekitten.com/g/200/200", 
		    alt: "there can not be enough cats in examples"})))
});
