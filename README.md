# Immutable
![V0.1.0](https://img.shields.io/badge/version-0.1.0-blue.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)

Immutable Objects properties.

> ⚠️ this project is experimental

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/immutable
# or
$ yarn add @slimio/immutable
```

## API

<details><summary>seal< T extends object >(target: T): T</summary>
<br />

Same as [Object.seal()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/seal) but doesn't allow to cast the original property type:
```js
const obj = Immutable.seal({
    foo: "bar"
});
obj.foo = "world"; // ok
obj.foo = 10; // Error: Unable to cast string to number for propertyKey foo
```
</details>

<details><summary>freezedProperty(target: object, propertyKey: symbol | string, value?: any): void</summary>
<br />

Setup a freezed property on a given target (Same behavior as Object.freeze but for all kind of values).
```js
const obj = {};
Immutable.freezedProperty(obj, "foo", "bar");
console.log(obj.foo); // stdout bar
delete obj.foo; // Error
```
</details>

## License
MIT
