const mix = require('laravel-mix');
let mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer');

var isCore  = false,
    isStyle = true
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

if(isCore){
    mix.js('resources/js/jquery.js', 'public/contents/js')
    mix.js('resources/js/vue.js', 'public/contents/js')
    mix.js('resources/js/uikit.js', 'public/contents/js')
    mix.sass('resources/sass/framework.scss', 'public/contents/css')
    .options({
        postCss: [
            autoprefixer({
                browsers: [
                    'last 3 versions',
                    'iOS >= 8',
                    'Safari >= 8',
                    'ie 11',
                ]
            }),
            mqpacker({
                sort: true
            }),
            cssnano()
        ]
    });
}

if(isStyle){
    mix.js('resources/js/app.js', 'public/contents/js')
    // mix.js('resources/js/main.js', 'public/contents/js')
    mix.sass('resources/sass/app.scss', 'public/contents/css')
        .options({
            postCss: [
                autoprefixer({
                    browsers: [
                        'last 3 versions',
                        'iOS >= 8',
                        'Safari >= 8',
                        'ie 11',
                    ]
                }),
                mqpacker({
                    sort: true
                }),
                cssnano()
            ]
        });
}
