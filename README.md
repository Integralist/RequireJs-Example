[Integralist](http://www.integralist.co.uk/) - RequireJs/AMD
================================

Description
-----------

Basic RequireJs Example with code comments to explain how everything works.
See a post related to this repo: http://integralist.co.uk/post/11705798780/beginners-guide-to-amd-and-requirejs

r.js and almond.js
------------------

If you're planning on just using RequireJs (even for when your site/app goes 'live') then running a `build script` will work fine…

```js
// FOR EXAMPLE…
({	
    appDir: '../../../',
    baseUrl: 'Assets/Scripts',
    dir: '../../../project-build',
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
```

…but if you want to swap out RequireJs for Almond (which is a much smaller footprint of an AMD loader, developed by @jrburke who also created RequireJs) then you can't (currently) use a build script for Almond, you need to run the terminal command for each script.

See: [https://github.com/jrburke/almond/issues/3](https://github.com/jrburke/almond/issues/3) for more info.

The command to run is (for example) `node r.js -o baseUrl=../ name=Almond.min.js include=main out=main-built.js wrap=true` - notice that the `baseUrl` is relative to where the `r.js` file is located (and so where you would be located in the Terminal when running the command). The `name` flag corresponds to the `baseUrl`.


Update
-----------

Have started adding more examples (like plugins) to show how they work.

* Async Plugin (helps with loading 3rd party services such as Google Maps and JSONP services - e.g. Twitter feed)
* JSONP (my own attempt at loading JSONP data)
* Template Plugin (uses the same template engine as found in _underscore.js)
* Lazy-Loading (although *not really* when you're deploy via a build script as all modules are concatenated into single script!)
* jQuery Plugins (there are a couple of plugins that our company uses which I've ported over to support AMD)
* Useful Modules (an example of utilising common modules such as when.js / morpheus.js / pubsubz.js etc)