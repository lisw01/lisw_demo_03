
function aniMy(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            //返回当前属性值
            var currnets = 0;
            var step = 0;
            if (attr == "opacity") {
                currnets = Math.round(parseInt(getAttr(obj, attr) * 10));
                step = (parseInt(json[attr] * 10) - currnets) / 10;
            }
            else {
                currnets = parseInt(getAttr(obj, attr));
                step = (json[attr] - currnets) / 10;
            }
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (attr == "opacity") {
                //高版本
                if ("opacity" in obj.style) {
                    // obj.style.opacity = json[attr];
                    obj.style.opacity = (currnets + step) / 10;
                }
                else {
                    // obj.style.filter = "alpha(opacity = " + json[attr] * 100 + ")";
                    obj.style.filter = "alpha(opacity = " + currnets + step + ")";
                }
            }
            else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            }
            else {
                obj.style[attr] = currnets + step + "px";
            }
            if (attr == "opacity") {
                currnets = currnets / 10;
            }
            if (currnets != json[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 10);
}
function getAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}