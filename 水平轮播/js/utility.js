/**
 * Created by Administrator on 2018/3/13.
 */

function getCookie(name) {
    'use strict';
    //当前函数要使用严格模式，例如：不允许重复var同一个变量
    var cookie = document.cookie;
    //cookie在保存时，可能被进行URL编码，我们在使用之前，还需将其解码。
    // decodeURIComponent
    cookie = decodeURIComponent(cookie);

    var array = cookie.split('; ');

    var name_value;
    var i;
    for (i = 0; i < array.length; i++) {
        name_value = array[i].split('=');
        //name_value[0] 为cookie的name
        //name_value[1] 为cookie的value
        if (name_value[0] === name) {
            return name_value[1];
        }
    }

    //当cookie中没有对应的name则返回null
    return null;
}

function setCookie(name, value, path, expires, secure) {
    //为了兼容性，我们最好将name和value，进行URL编码之后在存到cookie中
    //我们可以使用window下的一个函数来实现该功能,window.encodeURIComponent
    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (path) {
        str += ';path=' + path;
    }

    //expires通常情况下，表示cookie几天有效
    if (expires) {
        var date = new Date();
        date.setDate(date.getDate() + expires);
        str += ';expires=' + date;
    }

    if (secure) {
        str += ';secure';
    }


    document.cookie = str;
}


function removeCookie(name, path) {
    //删除cookie的思路，就是讲日期设置为过去时
    setCookie(name, '', path, -1);
}


/*
 * 功能：让指定元素运动起来
 * 参数：
 * 1. 元素
 * 2. 属性
 * {
 *      left: 100,
 *      top: 200,
 *      opacity: 100    //[0,100]
 * }
 * 返回值：
 * */
function animation(el, properties, callback) {
    clearInterval(el.phgap_id);
    el.phgap_id = setInterval(function () {

        var isAllFinished = true;
        for (var property in properties) {
            var target = properties[property];
            var current;
            if (property === 'opacity') {
                current = Math.round(100 * parseFloat(getStyle(el, property)));
            } else {
                current = parseInt(getStyle(el, property));
            }


            if (target !== current) {
                isAllFinished = false;
            }

            //步进
            var speed = (target - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (property === 'opacity') {
                el.style[property] = (current + speed) / 100;
            } else {
                el.style[property] = current + speed + 'px';
            }

        }

        if (isAllFinished) {
            clearInterval(el.phgap_id);
            //TODO:动画结束后，要执行的操作
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 20);
}
/*
 * 功能：取得最终应用到某个元素上的样式(行内/内部/外部)
 * 参数：
 * 1、元素
 * 2、属性
 *
 * */
function getStyle(el, property) {
    //该函数返回一个对象，包含了元素的所有css属性，
    // 其key为属性名，value为属性值
    if (window.getComputedStyle) {
        return window.getComputedStyle(el)[property]
    } else {
        return el.currentStyle[property]
    }
}