[Integralist](http://www.integralist.co.uk/) - RequireJs/AMD
================================

Description
-----------

RequireJs Examples/Plugins (with code comments to explain how everything works).
See a post related to this repo: http://integralist.co.uk/post/11705798780/beginners-guide-to-amd-and-requirejs

Items
-----------

* Async Plugin (helps with loading 3rd party services such as Google Maps and JSONP services - e.g. Twitter feed /by [@millermedeiros](https://github.com/millermedeiros/amd-utils))
* JSONP (my own attempt at loading JSONP data)
* Template Plugin (uses the same template engine as found in _underscore.js /by [@ZeeAgency](https://github.com/ZeeAgency/requirejs-tpl))
* Lazy-Loading
* jQuery Plugins (there are a couple of plugins that our company uses which I've ported over to support AMD)
* Useful Modules (an example of utilising common modules such as [when.js](https://github.com/briancavalier/when.js) /by [@briancavalier](https://github.com/briancavalier), [morpheus.js](https://github.com/ded/morpheus)*** /by [@ded](https://github.com/ded), [pubsubz.js](https://github.com/addyosmani/pubsubz) /by [@addyosmani](https://github.com/addyosmani))
* Library utilities (I took most of my methods from [Stand.ard.iz.er](https://github.com/Integralist/Stand.ard.iz.er) and moved them to AMD format + improved the API slightly)
* Loading GoogleMap using Deferred/Promises API example from [@pavanpodila](http://twitter.com/pavanpodila)
* Unit Tests (yes I've finally gotten around to writing Unit Tests! not for everything mind you, but it's a start - I'm using [Jasmine](https://github.com/pivotal/jasmine) as my testing framework)

***note that to get Morpheus to work in my AMD module after running a build script I had to swap out their define() method for another. See: https://github.com/ded/morpheus/issues/19

Build Script (also: r.js and almond.js)
---------------------------------------

RequireJs is fine to use for both development and production (when minified and gzip it's approx 5kb).

Note: there is an alternative loader you can use just for 'production' called Almond.js which I'll discuss later (see bottom of this page)

But if you're planning on just using RequireJs (even for when your site/app goes 'live') then you'll want to set-up a `build script` like so…

```js
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

You can then open up the command line (Terminal/Cmd) direct yourself to the folder where you have the `r.js` file saved and run the command `node r.js -o app.build.js`.

Check the build script for more information about it (as well as the [RequireJs documentation](http://requirejs.org/docs/optimization.html)).


Almond.js
---------------------------------------

If you want to swap out RequireJs for Almond (which is a much smaller footprint of an AMD loader, developed by @jrburke who also created RequireJs) then you can't (currently) use a build script for Almond, you need to run the terminal command for each script.

See: [https://github.com/jrburke/almond/issues/3](https://github.com/jrburke/almond/issues/3) for more info.

The command to run is (for example) `node r.js -o baseUrl=../ name=Almond.min include=main out=main-built.js wrap=true` - notice that the `baseUrl` is relative to where the `r.js` file is located (and so where you would be located in the Terminal when running the command). The `name` flag corresponds to the `baseUrl`.

Also, if you use any paths within `require.config` then those will have to come out and you'll have to manually specify each module's path because Almond.js ignores those `require.config`.

Personally I prefer not to use Almond.js because it causes too much disruption to my work-flow compared to how easily RequireJs works. Also, after minifying+gzip'ing, the size of RequireJs is only about 5k, and I can live with that.