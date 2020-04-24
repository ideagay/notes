console.log(Object.prototype.toString.call(requirejs));
console.log(require.config)
require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery'
    }
})
require(['jquery'], function($) {
    require(['fn'], function(fn) {
        $("h1").click(function(){
            fn();
        });
    })
})
