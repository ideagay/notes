# 4种前端模块化方案

## AMD （Asynchronous Module Definition）

异步模块定义，AMD是伴随requirejs而推出的模块化规范，采用异步加载(async)的方式，模块加载和元素渲染同时进行，加载完毕即执行，不保证执行顺序，先加载完先执行。

主要解决两个问题
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

## CMD （Common Module Definition）

同步模块定义，通用模块定义，是[seaJS](https://seajs.github.io/seajs/docs/)推广中产生的，推崇就近依赖，要使用时require,即用即返回。

使用

index.html
```
<!DOCTYPE html>
<html>
    <head>
        <title>My Sample Project</title>
        
    </head>
    <body>
        <h1>My Sample Project</h1>

        <script src="../bower_components/seajs/dist/sea.js"></script>
        <script>
            // Set configuration
            seajs.use('./sea_fn', function(sea_fn) {
                sea_fn.a(); // i am sea fn a
            })
        </script>
    </body>
</html>
```

定义模块

sea_fn.js
```
define(function(require, exports) {
    exports.a = function () {
        console.log('i am sea fn a');
    }
})

```

## CommonJS

nodejs是commonjs规范的主要实践者，有4个环境变量module, exports, require，global

### module对象

module对象表示当前模块，它的exports属性是模块对外的接口，require该模块时，其实是加载module.exports

### exports

exports指向module.exports,相当于模块开头有一句 var exports = module.exports

exports 不能直接指向一个值，会切断对module.exports的引用。可以这样使用 
```
exports.add = function() {}
```

### 加载机制

CommonJS输出的是值的拷贝，一旦输出，模块内部的变化就不会影响到这个值了,

lib.js
```
var count = 1;
var addCount = function() {
    count++;
}
module.exports = {
    count,
    addCount
}
```

main.js
```
var {count, addCount} = require('./lib');
//相当于
// var lib = require('./lib');
// var count = lib.count;
// var addCount = lib.addCount;

console.log(count);  // 1
addCount();
console.log(count); // 1
```

实质上是加载整个模块，生成一个对象，再从对象上取值，这种加载机制称为“运行时加载”，因为只有运行时
才能得到这个对象，导致没办法在编译时“静态优化”。

## ES6 Module

ES6 module 主要由2个命令，export和import

ES6模块不是对象。import命令会被js引擎静态分析，在编译时就引入该模块代码，而不是运行时加载，所以无法实现条件加载，也正因为如此，使得静态分析成为可能。

```
import {stat, exists} from 'fs'
```
实际上是从fs加载2个方法，其他方法不加载，这种加载方式称为“静态加载”,
引用的不是模块本身

### 命令

// lib.js

```
// 写法一
export var a = '333';
export var b = function() {console.log(a)}
// 等同于
export {
    a,
    b
}

// 对应的import
import {a, b} from './lib';
console.log(a); // 333
b(); // 333


// 写法二
export default function () {
    console.log(333)
}

// 对应的import
import abc from './lib';
abc(); // 333
```
