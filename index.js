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
 * @param {!Object} target
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
            const currType = getObjectType(ref[propertyKey])
            if (propertyType !== currType) {
                throw new TypeError(`Unable to cast ${currType} to ${propertyType} for propertyKey ${propertyKey}`);
            }

            ref[propertyKey] = propertyValue;
        }
    });
}

module.exports = { seal };
