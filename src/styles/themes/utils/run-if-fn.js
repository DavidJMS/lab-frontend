const isFunction = (value) => typeof value === 'function'

export function runIfFn (
  valueOrFn,
  ...args
) {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}
