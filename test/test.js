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

    assert.throws(() => {
        console.log(obj.world);
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
