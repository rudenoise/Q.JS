var Q = Q || {};
(function (Q, recursive) {
    recursive = recursive || false;
    var toStr = Object.prototype.toString,
        toArr = Array.prototype.slice;
    //add basic questions/assertions to an object
    Q.isFun = function (item) {
        return toStr.call(item) === "[object Function]";
    };
    Q.isObj = function (item) {
        return toStr.call(item) === "[object Object]";
    };
    Q.isArr = function (item) {
        return toStr.call(item) === "[object Array]";
    };
    Q.isStr = function (item) {
        return toStr.call(item) === "[object String]";
    };
    Q.isNum = function (item) {
        return toStr.call(item) === "[object Number]" && !isNaN(item);
    };
    Q.isBool = function (item) {
        // check for straight boolean, reject new Boolean(true)
        return typeof(item) === "boolean";
    };
    Q.isEmptyArr = function (item) {
        return Q.isArr(item) && item.length === 0;
    };
    Q.isEmptyStr = function (item) {
        return Q.isEq(item, "");
    };
    Q.isEq = function (itemA, itemB) {
        return itemA === itemB;
    };
    Q.isUndef = function (item) {
        return typeof(item) === "undefined";
    };
    // (Q)ueue/list/array handeling
    Q.h = function (arr) {
        if (Q.isArr(arr)) {
            return arr[0];
        }
    };
    Q.t = function (arr) {
        if (Q.isArr(arr)) {
            return arr.slice(1, arr.length);
        }
    };
    Q.con = function (inPut, list) {
        if (Q.isArr(list) && inPut !== undefined) {
            return [inPut].concat(list);
        }
    };
    //switch between recursive and iterative methods
    if (recursive !== false) {
        Q.same = function () {
            var args = toArr.call(arguments);
            return Q.isEmptyArr(args) ? true :
                args.length === 1 ? true : 
                    Q.isEq(Q.h(args), Q.h(Q.t(args))) ? Q.same.apply(null, Q.t(args)) :
                        false;
        };
        // check property chain, false
        Q.objHas = function (obj, chain) {
            if (Q.isStr(chain) && chain[0] !== ".") {
                chain = chain.split(".");
                return Q.isEmptyStr(Q.h(chain)) ? true :
                    (obj.hasOwnProperty(Q.h(chain))) ? Q.objHas(obj[Q.h(chain)], Q.t(chain).join(".")) :
                        false;
            }
        };
        Q.fold = function (fun, start, arr) {
            if (Q.isFun(fun) && (start !== undefined) && Q.isArr(arr)) {
                return Q.isEmptyArr(arr) ? start :
                    Q.fold(fun, fun(start, Q.h(arr)), Q.t(arr));
            }
        };
    } else {
        Q.same = function () {
            var args = toArr.call(arguments), rtn = true, i = 1;
            if (args.length > 1) {
                while (i < args.length && rtn) {
                    rtn = Q.isEq(args[(i - 1)], args[i]);
                    i += 1;
                }
            }
            return rtn;
        };
        Q.objHas = function (obj, chain) {
            var rtn = true, i = 0;
            if (Q.isStr(chain) && chain[0] !== ".") {
                chain = chain.split(".");
                while (i < chain.length && rtn) {
                    if (obj.hasOwnProperty(chain[i]) || Q.same(chain[i], "")) {
                        obj = obj[chain[i]];
                    } else {
                        rtn = false;
                    }
                    i += 1;
                }
                return rtn;
            }
        };
        Q.fold = function (fun, start, arr) {
            var i;
            arr = toArr.call(arr, 0);
            if (Q.isFun(fun) && (start !== undefined) && Q.isArr(arr)) {
                for (i = 0; i < arr.length; i += 1) {
                    start = fun(start, arr[i]);
                }
                return start;
            }
        };
    }
    Q.map = function (fun, arr) {
        var i, result = [];
        if (Q.isFun(fun) && Q.isArr(arr)) {
            return Q.fold(function (arr, element) {
                return arr.concat(fun(element));
            }, [], arr);
        }
    };
})(Q);
