declare namespace Immutable {
    export function seal<T extends object>(target: T): T;
    export function freezedProperty(target: object, propertyKey: symbol | string, value?: any): void;
}

export as namespace Immutable;
export = Immutable;
