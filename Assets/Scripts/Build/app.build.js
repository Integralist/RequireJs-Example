/*
 * http://requirejs.org/docs/optimization.html
 *
 * Use NodeJs to execute the r.js optimization script on this build script
 * node r.js -o app.build.js
 *
 * See: https://github.com/jrburke/r.js/blob/master/build/example.build.js for an example build script
 *
 * If you specify just the name (with no includes/excludes) then all modules are combined into the "main" file.
 * You can include/exclude specific modules though if needed
 *
 * You can also set optimize: "none" (or more specific uglifyjs settings) if you need to.
 *
 * Node: if you set relative paths then do them relative to the baseUrl
 */
({	
    appDir: '../../../',
    baseUrl: 'Assets/Scripts',
    dir: '../../../project-build',
    /*
     * The below 'paths' object is useful for when using plugins/named module paths.
     * If you use plugins or named modules in your code then don't forget to specify the same paths again in your build script.
     * Otherwise your build script wont be able to find your plugins/named modules and will generate an error when building.
     */
    paths: {
        async: 'Plugins/async',
        jsonp: 'Plugins/jsonp',
        jquery: 'Utils/jquery',
        morpheus: 'Utils/morpheus',
		pubsubz: 'Utils/pubsubz',
		sizzle: 'Utils/sizzle',
        tpl: 'Plugins/tpl',
		when: 'Utils/when'
    },
    optimize: 'none',
    modules: [
        {
            name: 'main'
            /*
            include: ["App/people"],
            exclude: ["Utils/random"]
            */
        },
        {
            name: 'example-async'
        },
        {
            name: 'example-jquery-plugins'
        },
        {
            name: 'example-jsonp'
        },
        {
            name: 'example-lazyload'
        },
        {
            name: 'example-library-utilities'
        },
        {
            name: 'example-template'
        },
        {
            name: 'example-useful-modules'
        }
    ]
})