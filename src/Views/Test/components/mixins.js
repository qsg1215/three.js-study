export function mixins(...list) {
    return function (target) {
        return Object.assign(target, ...list)
    }
}