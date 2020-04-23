# 4种前端模块化方案

## AMD （Asynchronous Module Definition）

AMD是伴随requirejs而推出的模块化规范，采用异步加载的方式，主要解决两个问题
* 被依赖的文件要先于依赖它的文件加载
* js加载阻塞渲染线程，越多的js文件，页面卡死时间越长

AMD推崇前置依赖，在定义模块的时候要声明依赖的模块

index.html
```
/// data-main 指定的js文件会在require.js加载完毕后加载
<!DOCTYPE html>
<html>
    <head>
        <title>My Sample Project</title>
        <!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
        <script data-main="main" src="../bower_components/requirejs/require.js"></script>
    </head>
    <body>
        <h1>My Sample Project</h1>
    </body>
</html>
```

定义模块

fn.js
```
define(function() {
    var fn = function () {
        console.log('i am fn module')
    }
    return fn;
})
```

使用模块

main.js
```
// config方法对模块加载行为进行自定义，并变为全局可用
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
```
浏览器打开html，点击h1，控制台输出 i am fn module



