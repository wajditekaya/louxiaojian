/* CopyRight (c) 2010 Baidu */
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.page.createStyleSheet
 * @version: 2010-06-12
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/ie.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */

/**
 * 声明baidu包
 */
var baidu = baidu || {version: "1-2-2"}; // meizz 20100513 将 guid 升级成 \x06
baidu.guid = "$BAIDU$";//提出guid，防止修改window[undefined] 20100504 berg

/**
 * meizz 2010/02/04
 * 顶级域名 baidu 有可能被闭包劫持，而需要页面级唯一信息时需要用到下面这个对象
 */

window[baidu.guid] = window[baidu.guid] || {};


/**
 * 声明baidu.browser包
 */
baidu.browser = baidu.browser || {};


/**
 * 判断是否为ie浏览器
 */
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.ie = baidu.browser.ie = document.documentMode || parseFloat(RegExp['\x241']);
}


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/insertHTML.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/04
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/g.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/17
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.dom包
 */
baidu.dom = baidu.dom || {};


/**
 * 从文档中获取指定的DOM元素
 * 
 * @param {string|HTMLElement} id 元素的id或DOM元素
 * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
 */
baidu.dom.g = function (id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        //todo: 以后把这个判断去掉，不做验证。
        return id;
    }
    return null;
};

// 声明快捷方法
baidu.g = baidu.G = baidu.dom.g;


/**
 * 获取目标元素所属的window对象
 * 如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
 *
 * @param {HTMLElement|string} element  目标元素或目标元素的id
 * @param {string}             position 插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string}             html     要插入的html
 */
baidu.dom.insertHTML = function (element, position, html) {
    element = baidu.dom.g(element);

    if (element.insertAdjacentHTML) {
        element.insertAdjacentHTML(position, html);
    } else {
        // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
        // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
        var range = element.ownerDocument.createRange();
        range.setStartBefore(element);
        var fragment = range.createContextualFragment(html),
            parent = element.parentNode, tmpEl;
        switch (position.toUpperCase()) {
            case 'BEFOREBEGIN':
                parent.insertBefore(fragment, element);
                break;
            case 'AFTERBEGIN':
                element.insertBefore(fragment, element.firstChild);
                break;
            case 'BEFOREEND':
                element.appendChild(fragment);
                break;
            case 'AFTEREND':
                (tmpEl = element.nextSibling) ? parent.insertBefore(fragment, tmpEl) : parent.appendChild(fragment);
        }
    }

        // 如果要代码最精简，还有一种写法
        // var fragment = range.createContextualFragment(html),
        //     parent = element.parentNode, tmpEl = element;
        // switch (position.toUpperCase()) {
        //     case 'AFTERBEGIN':
        //         element = element.firstChild;
        //     case 'BEFOREBEGIN':
        //         parent.insertBefore(fragment, element);
        //         break;
        //     case 'BEFOREEND':
        //         element.appendChild(fragment);
        //         break;
        //     case 'AFTEREND':
        //         (element = element.nextSibling) ? parent.insertBefore(fragment, element) : parent.appendChild(fragment);
        // }


        // 增加一次判断，代码可以更少
        // var fragment = range.createContextualFragment(html),
        //     parent = element.parentNode, tmpEl = element;
        // switch (position.toUpperCase()) {
        //     case 'AFTERBEGIN':
        //         element = element.firstChild;
        //         break;
        //     case 'BEFOREEND':
        //         parent = element;
        //         element = null;
        //         break;
        //     case 'AFTEREND':
        //         element = element.nextSibling;
        // }
        // element ? parent.insertBefore(fragment, element) : parent.appendChild(fragment);
};

baidu.insertHTML = baidu.dom.insertHTML;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 声明baidu.page包
 */
baidu.page = baidu.page || {};


/**
 * 创建CSS样式集对象 style sheet
 * 
 * @param   {JSON}      options     配置信息
 * @config  {Document}  document    指定在哪个document下创建，默认是当前文档
 * @config  {String}    url         css文件的URL
 * @config  {Number}    index       在文档里的排序索引
 * @return  {Object}                styleSheet对象
 */
baidu.page.createStyleSheet = function(options){
    var op = options || {},
        doc = op.document || document,
        s;

    if (baidu.browser.ie) {
        return doc.createStyleSheet(op.url, op.index);
    } else {
        s = "<style type='text/css'></style>";
        op.url && (s="<link type='text/css' rel='stylesheet' href='"+op.url+"'/>");
        baidu.dom.insertHTML(doc.getElementsByTagName("HEAD")[0],"beforeEnd",s);
        //如果用户传入了url参数，下面访问sheet.rules的时候会报错
        if(op.url){
            return null;
        }

        var sheet = doc.styleSheets[doc.styleSheets.length - 1],
            rules = sheet.rules || sheet.cssRules;
        return {
            self : sheet
            ,rules : sheet.rules || sheet.cssRules
            ,addRule : function(selector, style, i) {
                if (sheet.addRule) {
                    return sheet.addRule(selector, style, i);
                } else if (sheet.insertRule) {
                    isNaN(i) && (i = rules.length);
                    return sheet.insertRule(selector +"{"+ style +"}", i);
                }
            }
            ,removeRule : function(i) {
                if (sheet.removeRule) {
                    sheet.removeRule(i);
                } else if (sheet.deleteRule) {
                    isNaN(i) && (i = 0);
                    sheet.deleteRule(i);
                }
            }
        }
    }
};
/*
 * styleSheet对象 有两个方法 
 *  addRule(selector, style, i)
 *  removeRule(i)
 *  这两个方法已经做了浏览器兼容处理
 * 一个集合
 *  rules
 */

