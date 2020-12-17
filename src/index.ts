import * as React from 'react'
import {dequal as deepEqual} from 'dequal'

type UseEffectParams = Parameters<typeof React.useEffect>
type EffectCallback = UseEffectParams[0]
type DependencyList = UseEffectParams[1]
// yes, I know it's void, but I like what this communicates about
// the intent of these functions: It's just like useEffect
type UseEffectReturn = ReturnType<typeof React.useEffect>

function checkDeps(deps: DependencyList) {
  if (!deps || !deps.length) {
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    )
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    )
  }
}

function isPrimitive(val: unknown) {
  return val == null || /^[sbn]/.test(typeof val)
}

function useDeepCompareMemoize(value: DependencyList) {
  const ref = React.useRef<DependencyList>()
  const signalRef = React.useRef<number>(0)

  if (!deepEqual(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return [signalRef.current]
}

function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export function useDeepCompareEffectNoCheck(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useDeepCompareEffect
