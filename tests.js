/*global window, Q, module, ok, alert, test, asyncTest, expect, equals, notEqual, start*/
module("Q(uestions)");
test("isFun", function () {
    ok(typeof(Q.isFun) === "function", "isFun() objHas");
    ok(Q.isFun(function () {}), "accepts functions");
    ok(!Q.isFun({}), "rejects objects");
    ok(!Q.isFun([]), "rejects arrays");
    ok(!Q.isFun(""), "rejects strings");
    ok(!Q.isFun(6), "rejects numbers");
});
test("isObj", function () {
    ok(Q.isFun(Q.isObj), "isObj() objHas");
    ok(Q.isObj({}), "accepts object");
    ok(!Q.isObj(function () {}), "rejects functions");
    ok(!Q.isObj([]), "rejects arrays");
    ok(!Q.isObj(""), "rejects strings");
    ok(!Q.isObj(6), "rejects numbers");
});
test("isArr", function () {
    ok(Q.isFun(Q.isArr), "isArr() objHas");
    ok(Q.isArr([]), "accepts array");
    ok(!Q.isArr(function () {}), "rejects functions");
    ok(!Q.isArr({}), "rejects objects");
    ok(!Q.isArr(""), "rejects strings");
    ok(!Q.isArr(6), "rejects numbers");
});
test("isStr", function () {
    ok(Q.isFun(Q.isStr), "isStr() objHas");
    ok(Q.isStr(""), "accepts string");
    ok(!Q.isStr(function () {}), "rejects functions");
    ok(!Q.isStr({}), "rejects objects");
    ok(!Q.isStr([]), "rejects arrays");
    ok(!Q.isStr(6), "rejects numbers");
});
test("isNum", function () {
    ok(Q.isFun(Q.isNum), "isNum() objHas");
    ok(Q.isNum(1.1), "accepts number");
    ok(!Q.isNum(function () {}), "rejects functions");
    ok(!Q.isNum({}), "rejects objects");
    ok(!Q.isNum([]), "rejects arrays");
    ok(!Q.isNum(""), "rejects strings");
    ok(!Q.isNum(NaN), "rejects NaN");
});
test("isBool", function () {
    ok(Q.isFun(Q.isBool), "isBool() objHas");
    ok(Q.isBool(true), "accepts boolean");
    ok(!Q.isBool(new Boolean(true)), "rejects new Boolean");
    ok(!Q.isBool(function () {}), "rejects functions");
    ok(!Q.isBool({}), "rejects objects");
    ok(!Q.isBool([]), "rejects arrays");
    ok(!Q.isBool(""), "rejects strings");
});
test("isUndef", function () {
    ok(Q.isFun(Q.isUndef), "isUndef() objHas");
    ok(Q.isUndef(), "no args returns true");
    ok(Q.isUndef((function (e) {
        return e;
    })()), "true if undefined passed as argument");
    ok(!Q.isUndef("") && !Q.isUndef({}) && !Q.isUndef(function () {
        return true;
    }), "rejects bad args");
});
test("isEmptyArr", function () {
    ok(Q.isFun(Q.isEmptyArr), "isEmptyArr() objHas");
    ok(Q.isEmptyArr([]), "isEmptyArr accepts empty array");
    ok(!Q.isEmptyArr([1, 2, 3]), "isEmptyArr rejects none empty array");
    ok(!Q.isEmptyArr(""), "isEmptyArr rejects bad args");
});
test("isEmptyStr", function () {
    ok(Q.isFun(Q.isEmptyStr), "isEmptyStr() objHas");
    ok(Q.isEmptyStr(""), "isEmptyStr accepts empty string");
    ok(!Q.isEmptyStr("dsdsd"), "isEmptyStr rejects none empty string");
    ok(!Q.isEmptyStr({}), "isEmptyStr rejects bbad args");
});
test("isEq", function () {
    ok(Q.isFun(Q.isEq), "isEq() objHas");
    ok(Q.isEq(1, 1), "identical number values pass");
    ok(Q.isEq("str", "str"), "identical string values pass");
    ok(!Q.isEq(1, "str"), "none identical values fail");
});
module("Q(ueues)");
test("(h)ead", function () {
    ok(Q.isFun(Q.h), "h() objHas");
    ok(Q.h([1, 2, 3]) === 1, "returns the head of a list");
    ok(Q.h([]) === undefined, "returns undefined for empty list");
});
test("t(ail)", function () {
    ok(Q.isFun(Q.t), "t() objHas");
    ok(Q.h(Q.t([1, 2, 3])) === 2, "returns the tail of list");
    ok(Q.isEmptyArr(Q.t([])), "returns empty arr is empty arr in");
    ok(Q.isEmptyArr(Q.t([1])), "returns empty arr is 1 ele array in");
});
test("con(s/catinate list)", function () {
    ok(Q.isFun(Q.con), "con() objHas");
    ok(Q.con() === undefined, "cons needs args");
    ok(!Q.con(undefined, []) && !Q.con("", ""), "rejects bad args");
    ok(Q.h(Q.con(1, [])) === 1, "Q.h(Q.con(1, [])) === 1");
});
test("same", function () {
    ok(Q.isFun(Q.same), "same() objHas");
    ok(Q.same(), "no args is true");
    ok(Q.same(1, 1, 1) && Q.same("", "", ""), "identical values is true");
    ok(!Q.same(1, "", {}), "rejects none same args");
});
test("fold", function () {
    ok(Q.isFun(Q.fold), "fold objHas");
    ok(Q.fold() === undefined, "rejects bad args");
    ok(Q.fold(function (a, b) {
        return a + b;
    }, 0, []) === 0, "works with an add function");
    ok(Q.fold(function (a, b) {
        return a + b;
    }, 0, [1, 2, 3]) === 6, "works with an add function");
});
test("map", function () {
    ok(Q.isFun(Q.map), "map objHas");
    ok(Q.map() === undefined && Q.map({}, "") === undefined, "rejects bad ags");
    ok(Q.map(function (num) {
        return num * 2;
    }, [1, 2])[0] === 2, "map double to list");
});
test("objHas", function () {
    var t = function () {
        return this.cache;
    };
    t.cache = 1;
    ok(Q.isFun(Q.objHas), "Q.objHas objHas");
    ok(!Q.objHas() && !Q.objHas("", {}) && !Q.objHas(function () {
        return true;
    }), "rejects bad args");
    ok(Q.objHas(t, "cache"), "accepts obj with well formed str");
    t = {
        a: {
            b: {
                c: 123
            }
        }
    };
    ok(Q.objHas(t, "a.b.c"), "accepts obj with well formed str");
    ok(!Q.objHas(t, ".a.d.c"), "rejects obj with badly formed str");
    ok(!Q.objHas("", "a.d.c"), "rejects obj with bad 1st arg");
    ok(Q.objHas(t, ""), "empty chain is true");
});
test("inArr", function () {
    ok(Q.isFun(Q.inArr), "inArr is a function");
    ok((Q.inArr()) === false, "returns false for no/bad args");
    var tArr1 = [1, "a", true], tValA = {a: 2}, tValB = {a: 2};
    ok(Q.inArr(1, tArr1), "returns true if match found");
    ok(Q.inArr("a", tArr1), "returns true if match found");
    ok(Q.inArr(true, tArr1), "returns true if match at any position");
    ok(Q.inArr(123, tArr1) === false, "returns false for no match");
    ok(Q.inArr(tValA, [tValB]) === false, "can't compare similar objects");
    ok(Q.inArr(tValB, [tValB]), "can compare objects from same memory loc");
    tValA = function () {
        return true;
    };
    tValB = function () {
        return true;
    };
    ok(Q.inArr(tValA, [tValB]) === false, "can't compare similar functions");
    ok(Q.inArr(tValB, [tValB]), "can compare functions from same memory loc");
});