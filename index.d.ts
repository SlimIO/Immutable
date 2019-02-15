declare namespace Immutable {
    export function seal<T extends object>(target: T): T;
}

export as namespace Immutable;
export = Immutable;
