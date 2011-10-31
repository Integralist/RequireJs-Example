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
 */
({
    appDir: '../../../',
    baseUrl: 'Assets/Scripts',
    dir: '../../../project-build',
    // if you set relative paths then do them relative to the baseUrl
    paths: {
        'jquery': 'Utils/jquery',
        async: 'Utils/async'
    },
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
            name: 'example-lazyload'
        }
    ]
})