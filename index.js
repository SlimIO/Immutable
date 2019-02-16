// Require Third-party Dependencies
const is = require("@slimio/is");

/**
 * @func getObjectType
 * @param {any} value any javascript value
 * @returns {String}
 */
function getObjectType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * @func seal
 * @param {!Object} target target
 * @returns {Object}
 *
 * @throws {TypeError}
 */
function seal(target) {
    if (!is.plainObject(target)) {
        throw new TypeError("target must be a plain Object");
    }
    if (Object.isFrozen(target)) {
        throw new Error("Unable to handle freezed Object");
    }

    const ref = Object.isSealed(target) ? target : Object.seal(target);

    return new Proxy(ref, {
        get(target, propertyKey) {
            if (!Reflect.has(ref, propertyKey)) {
                throw new Error(`Unable to found propertyKey ${propertyKey} on ${getObjectType(target)}`);
            }

            return ref[propertyKey];
        },
        set(target, propertyKey, propertyValue) {
            if (!Reflect.has(ref, propertyKey)) {
                throw new Error(`Unable to found propertyKey ${propertyKey} on ${getObjectType(target)}`);
            }

            const propertyType = getObjectType(propertyValue);
            const currType = getObjectType(ref[propertyKey]);
            if (propertyType !== currType) {
                throw new TypeError(`Unable to cast ${currType} to ${propertyType} for propertyKey ${propertyKey}`);
            }

            ref[propertyKey] = propertyValue;
        }
    });
}

/**
 * @func freezedProperty
 * @desc Define a private (non-enumable, non-configurable) property on the target
 * @param {!Object} target target object
 * @param {!String | Symbol} propertyKey The name of the property we want to define in target
 * @param {*} [value=null] The property value
 * @returns {void}
 *
 * @throws {Error}
 * @throws {TypeError}
 */
function freezedProperty(target, propertyKey, value = null) {
    if (!is.symbol(propertyKey) && !is.string(propertyKey)) {
        throw new TypeError("propertyKey must be a symbol or a string");
    }

    const ok = Reflect.defineProperty(target, propertyKey, {
        value,
        enumerable: false,
        configurable: false,
        writable: false
    });

    if (!ok) {
        throw new Error(`Unable to define propertyKey ${propertyKey} on target ${getObjectType(target)}`);
    }
}

module.exports = { seal, freezedProperty };
