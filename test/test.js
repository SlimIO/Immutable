"use strict";

// Require Third-party Dependencies
const avaTest = require("ava");
const is = require("@slimio/is");

// Require Internal Dependencies
const Immutable = require("../");

avaTest("Immutable must export two functions", (assert) => {
    assert.deepEqual(Reflect.ownKeys(Immutable), ["seal", "freezedProperty"]);
    assert.true(is.func(Immutable.seal));
    assert.true(is.func(Immutable.freezedProperty));
});

avaTest("seal(null) must throw a TypeError", (assert) => {
    assert.throws(() => {
        Immutable.seal(null);
    }, { instanceOf: TypeError, message: "target must be a plain Object" });
});

avaTest("seal(Readonly<{}>) must throw an Error", (assert) => {
    assert.throws(() => {
        Immutable.seal(Object.freeze({}));
    }, { instanceOf: Error, message: "Unable to handle freezed Object" });
});

avaTest("seal()", (assert) => {
    const obj = Immutable.seal({ foo: "bar" });
    const obj2 = Immutable.seal(Object.seal({ hello: "world" }));
    assert.is(obj.foo, "bar");
    assert.is(obj2.hello, "world");

    assert.throws(() => {
        console.log(obj.world);
    }, { instanceOf: Error });

    assert.throws(() => {
        obj.world = 10;
    }, { instanceOf: Error });

    assert.throws(() => {
        delete obj.foo;
    }, { instanceOf: Error });

    obj.foo = "world";
    assert.is(obj.foo, "world");

    assert.throws(() => {
        obj.foo = 10;
    }, { instanceOf: Error });
});

avaTest("freezedProperty() must throw on Freezed Object", (assert) => {
    const _o = Object.freeze({});
    assert.throws(() => {
        Immutable.freezedProperty(_o, "yo");
    }, { instanceOf: Error, message: "Unable to define propertyKey yo" });
});

avaTest("freezedProperty() propertyKey must be string or symbol", (assert) => {
    const _o = {};
    assert.throws(() => {
        Immutable.freezedProperty(_o, null);
    }, { instanceOf: TypeError, message: "propertyKey must be a symbol or a string" });
});

avaTest("freezedProperty() must be ok with Symbol", (assert) => {
    const _o = {};
    const sym = Symbol("foo");
    Immutable.freezedProperty(_o, sym, "bar");
    assert.is(_o[sym], "bar");
});

avaTest("freezedProperty() is non-enumerable", (assert) => {
    const _o = {};
    const ret = Immutable.freezedProperty(_o, "yo");
    assert.is(ret, void 0);
    assert.deepEqual(Object.keys(_o), []);
    assert.deepEqual(Reflect.ownKeys(_o), ["yo"]);
});

avaTest("freezedProperty() is non-configurable/non-writable", (assert) => {
    const _o = {};
    Immutable.freezedProperty(_o, "yo");
    const ret = Immutable.freezedProperty(_o, "foo", "bar");
    assert.is(ret, void 0);
    assert.is(_o.yo, null);
    assert.is(_o.foo, "bar");

    assert.deepEqual(Reflect.ownKeys(_o), ["yo", "foo"]);
    assert.throws(() => {
        delete _o.yo;
    }, { instanceOf: TypeError });

    assert.throws(() => {
        _o.yo = 10;
    }, { instanceOf: TypeError });
    assert.is(_o.yo, null);
});
