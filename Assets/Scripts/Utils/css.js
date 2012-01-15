define(['require'], function(require){

	return {
		style: require('Utils/getAppliedStyle'),
		classes: require('Utils/getArrayOfClassNames'),
		add: require('Utils/addClass'),
		remove: require('Utils/removeClass'),
		has: require('Utils/hasClass')
	}

});