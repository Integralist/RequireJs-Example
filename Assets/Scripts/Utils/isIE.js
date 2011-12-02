define(function(){
	
	/**
	 * Following property indicates whether the current rendering engine is Trident (i.e. Internet Explorer)
	 * 
	 * @return v { Integer|undefined } if IE then returns the version, otherwise returns 'undefined' to indicate NOT a IE browser
	 */
	var isIE = (function() {
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
	
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
	
		return v > 4 ? v : undef;	
	}());
	
	return isIE;
	
});