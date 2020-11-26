import * as React from 'react'
import {dequal as deepEqual} from 'dequal'

type UseEffectParams = Parameters<typeof React.useEffect>
// yes, I know it's void, but I like what this communicates about
// the intent of these functions: It's just like useEffect
type UseEffectReturn = ReturnType<typeof React.useEffect>

function checkDeps(deps: UseEffectParams[1]) {
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

function useDeepCompareMemoize(value: UseEffectParams[1]) {
  const ref = React.useRef<UseEffectParams[1]>()

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useDeepCompareEffect(
  callback: UseEffectParams[0],
  dependencies: UseEffectParams[1],
): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export function useDeepCompareEffectNoCheck(
  callback: UseEffectParams[0],
  dependencies: UseEffectParams[1],
): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useDeepCompareEffect
