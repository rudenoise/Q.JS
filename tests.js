module("Helpers", {
  setup: function () {
  },
  teardown: function () {
  }
});
test("q.toS - q.to string", function () {
  ok(typeof(q.toS) === "function");
  ok(q.toS({}) === "[object Object]");
});
test("q.toA = q.to Array", function () {
  ok(typeof(q.toA) === "function", "q.toA q.is a function");
  ok((function () {
    return q.toA(arguments);
  }(1,2, 3)).length === 3, "Slices arrays correctly");
});
module("assertions");
test("q.isU - q.is undefinded?", function () {
  ok(typeof(q.isU) === "function", "q.isU q.is a function");
  var t;
  ok(q.isU() && q.isU(t), "returns true for no/undefinded args");
  ok(q.isU({}) === false, "rejects a defined arg");
});
test("q.isF - q.is function?", function () {
  ok(typeof(q.isF) === "function", "q.isF q.is a function");
  ok((q.isF() && q.isF({})) === false, "rejects args that are not functions");
  ok(q.isF(function () {}), "accepts a function");
});
test("q.isO - q.is object", function () {
  ok(q.isF(q.isO), "q.isO() q.objHas");
  ok(q.isO() === false, "rejects undefined");
  ok(q.isO({}), "accepts object");
  ok(!q.isO(function () {}), "rejects functions");
  ok(!q.isO([]), "rejects arrays");
  ok(!q.isO(""), "rejects strings");
  ok(!q.isO(6), "rejects numbers");
});

test("q.isA - q.is Array?", function () {
  ok(q.isF(q.isA), "q.isA() exists");
  ok(q.isA() === false, "rejects no args");
  ok(q.isA([]), "accepts array");
  ok(!q.isA(function () {}), "rejects functions");
  ok(!q.isA({}), "rejects objects");
  ok(!q.isA(""), "rejects strings");
  ok(!q.isA(6), "rejects numbers");
  ok(!q.isA(null), "rejects null");
});
test("q.isS - q.is string?", function () {
  ok(q.isF(q.isS), "q.isS() exists");
  ok(q.isS() === false, "rejects undefined");
  ok(q.isS(""), "accepts string");
  ok(!q.isS(function () {}), "rejects functions");
  ok(!q.isS({}), "rejects objects");
  ok(!q.isS([]), "rejects arrays");
  ok(!q.isS(6), "rejects numbers");
});
test("q.isN - q.is number?", function () {
  ok(q.isF(q.isN), "q.isN() exists");
  ok(q.isN() === false, "rejects undefined");
  ok(q.isN(1.1) && q.isN(1), "accepts number");
  ok(!q.isN(function () {}), "rejects functions");
  ok(!q.isN({}), "rejects objects");
  ok(!q.isN([]), "rejects arrays");
  ok(!q.isN(""), "rejects strings");
  ok(!q.isN(NaN), "rejects NaN");
});
test("q.isB - id boolean?", function () {
  ok(q.isF(q.isB), "q.isB() exists");
  ok(q.isB() === false, "rejects undefined");
  ok(q.isB(true), "accepts boolean");
  ok(!q.isB(new Boolean(true)), "rejects new Bean");
  ok(!q.isB(function () {}), "rejects functions");
  ok(!q.isB({}), "rejects objects");
  ok(!q.isB([]), "rejects arrays");
  ok(!q.isB(""), "rejects strings");
});
test("q.isEA - q.is empty array", function () {
  ok(q.isF(q.isEA), "q.isEA() exists");
  ok(q.isEA([]), "q.isEA accepts empty array");
  ok(!q.isEA([1, 2, 3]), "q.isEA rejects none empty array");
  ok(!q.isEA(""), "q.isEA rejects bad args");
});
test("q.isES - q.is empty string?", function () {
  ok(q.isF(q.isES), "q.isES() exists");
  ok(q.isES(""), "q.isES accepts empty string");
  ok(!q.isES("dsdsd"), "q.isES rejects none empty string");
  ok(!q.isES({}), "q.isES rejects bbad args");
});
test("q.isEq - q.is equal?", function () {
  ok(q.isF(q.isEq), "q.isEq() exists");
  ok(q.isEq(1, 1), "identical number values pass");
  ok(q.isEq("str", "str"), "identical string values pass");
  ok(!q.isEq(1, "str"), "none identical values fail");
});
test("q.isDOM - is the argument a DOM element", function () {
  ok(q.isF(q.isDOM), "isDOM is a function");
  ok((q.isDOM() &&
    q.isDOM({})) === false, "rejects undefined and bad args");
  ok(q.isDOM(document.createElement("div")), "recognises DOM element");
});
test("q.h - head of a list", function () {
  ok(q.isF(q.h), "q.h() exists");
  ok(q.h([1, 2, 3]) === 1, "returns the head of a list");
  ok(q.h([]) === undefined, "returns undefined for empty list");
});
test("q.t - tail of a list)", function () {
  ok(q.isF(q.t), "q.t() exists");
  ok(q.h(q.t([1, 2, 3])) === 2, "returns the tail of list");
  ok(q.isEA(q.t([])), "returns empty arr is empty arr in");
  ok(q.isEA(q.t([1])), "returns empty arr is 1 ele array in");
});
test("q.cons - catinate/cons a list", function () {
  ok(q.isF(q.cons), "q.cons() exists");
  ok(q.cons() === undefined, "q.cons needs args");
  ok(!q.cons(undefined, []) && !q.cons("", ""), "rejects bad args");
  ok(q.h(q.cons(1, [])) === 1, "q.h(q.cons(1, [])) === 1");
});
test("q.areEq - are the arguments all equal", function () {
  ok(q.isF(q.areEq), "q.areEq q.is a function");
  ok(q.areEq(), "return true for no args default");
  ok(q.areEq(1, 2, "a") === false, "rejects none matching args");
  ok(q.areEq(1, 1, 1, 1), "accepts all matching values");
});
test("inA - q.is the value in an array", function () {
  ok(q.isF(q.inA), "inA q.is a function");
  ok(q.inA() === false, "returns false for no/bad args");
  ok(q.inA(1, 2) === false, "rejects bad types");
  var tArr1 = [1, "a", true], tValA = {a: 2}, tValB = {a: 2};
  ok(q.inA(1, tArr1), "returns true if match found");
  ok(q.inA("a", tArr1), "returns true if match found");
  ok(q.inA(true, tArr1), "returns true if match at any position");
  ok(q.inA(123, tArr1) === false, "returns false for no match");
  ok(q.inA(tValA, [tValB]) === false, "can't compare similar objects");
  ok(q.inA(tValB, [tValB]), "can compare objects from same memory loc");
  tValA = function () {
    return true;
  };
  tValB = function () {
    return true;
  };
  ok(q.inA(tValA, [tValB]) === false, "can't compare similar functions");
  ok(q.inA(tValB, [tValB]), "can compare functions from same memory loc");
});
test("q.flat - flatten an array", function () {
  ok(q.isF(q.flat), "q.flat q.is a function");
  ok(q.flat() === false, "return false by default");
  ok(q.isEA(q.flat([])), "empty list retuens empty list");
  ok((q.flat([1])[0] === 1 && q.flat([1, 2])[1] === 2), "q.flat returns same array if not nested");
  ok(q.flat([1, [2, [3, 4], 5], 6]).join("") === "123456", "q.flattens nested arr");
});
test("q.objHas - does an object contain this chain?", function () {
  var t = function () {
    return this.cache;
  };
  t.cache = 1;
  ok(q.isF(q.objHas), "q.objHas q.is a function");
  ok(!q.objHas() && !q.objHas("", {}) && !q.objHas(function () {
    return true;
  }), "rejects bad args");
  ok(q.objHas(t, "cache"), "accepts obj with well formed str");
  t = {
    a: {
      b: {
        c: 123
      }
    }
  };
  ok(q.objHas(t, "a.b.c"), "accepts obj with well formed str");
  ok(!q.objHas(t, ".a.d.c"), "rejects obj with badly formed str");
  ok(!q.objHas("", "a.d.c"), "rejects obj with bad 1st arg");
  ok(q.objHas(t, ""), "empty chain q.is true");
});