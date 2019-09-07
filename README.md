# Immutable

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Immutable/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Immutable/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/Immutable)
![size](https://img.shields.io/github/languages/code-size/SlimIO/Immutable)
[![Known Vulnerabilities](https://snyk.io//test/github/SlimIO/Immutable/badge.svg?targetFile=package.json)](https://snyk.io//test/github/SlimIO/Immutable?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Immutable.svg?branch=master)](https://travis-ci.com/SlimIO/Immutable) [![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/Immutable.svg)](https://greenkeeper.io/)

Group of useful functions that allow to create and manage Immutable and sealed properties and objects.

> ⚠️ Experimental Project (Please do not use in production)

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/immutable
# or
$ yarn add @slimio/immutable
```

## Usage example
```js
const { freezedProperty, seal } = require("@slimio/immutable");

class User {
    constructor(name, age) {
        // Produce readyonly properties
        freezedProperty(this, "name", name);
        freezedProperty(this, "age", age);
    }
}
User.properties = seal({
    name: "param as a string"
});
Object.preventExtensions(User);

const obj = new User("fraxken", 16);
console.log(obj.name);
console.log(obj.age);
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

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/is](https://github.com/SlimIO/is#readme)|Minor|Low|Type checker|

## License
MIT
