curl({
    baseUrl: 'lib/',

    paths: {
	jquery: 'jquery-1.7.1.min',
	underscore: 'ext/underscore',
	'test' : '../test'
    }
});

define('buster', function() {
    return buster;
})

window.require = curl;


