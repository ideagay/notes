require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery'
    }
})
require(['jquery', 'fn'], function($, fn) {
    $("h1").click(function(){
        fn();
    });
})
