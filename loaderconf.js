curl({
    baseUrl: 'lib/',

    paths: {
	jquery: 'jquery-1.7.1.min',
	underscore: 'ext/underscore',
	'test' : '../test'
    }
});

window.require = curl;


