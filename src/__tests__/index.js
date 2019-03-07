import {renderHook, cleanup} from 'react-hooks-testing-library'
import useDeepCompareEffect from '../'

afterEach(cleanup)

test('useDeepCompareEffect throws an error if using it with an empty array', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(() =>
    renderHook(() => useDeepCompareEffect(() => {}, [])),
  ).toThrowErrorMatchingInlineSnapshot(
    `"useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead."`,
  )
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockRestore()
})

test('useDeepCompareEffect throws an error if using it with an array of only primitive values', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(() =>
    renderHook(() => useDeepCompareEffect(() => {}, [true, 1, 'string'])),
  ).toThrowErrorMatchingInlineSnapshot(
    `"useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead."`,
  )
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockRestore()
})

test('in production mode there are no errors thrown', () => {
  const env = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  renderHook(() => useDeepCompareEffect(() => {}, [true, 1, 'string']))
  renderHook(() => useDeepCompareEffect(() => {}, []))
  process.env.NODE_ENV = env
})

test('useDeepCompareEffect handles changing values as expected', () => {
  const callback = jest.fn()
  let deps = [1, {a: 'b'}, true]
  const {rerender} = renderHook(() => useDeepCompareEffect(callback, deps))

  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  // no change
  rerender()
  expect(callback).toHaveBeenCalledTimes(0)
  callback.mockClear()

  // no-change (new object with same properties)
  deps = [1, {a: 'b'}, true]
  rerender()
  expect(callback).toHaveBeenCalledTimes(0)
  callback.mockClear()

  // change (new primitive value)
  deps = [2, {a: 'b'}, true]
  rerender()
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  // no-change
  rerender()
  expect(callback).toHaveBeenCalledTimes(0)
  callback.mockClear()

  // change (new primitive value)
  deps = [1, {a: 'b'}, false]
  rerender()
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  // change (new properties on object)
  deps = [1, {a: 'c'}, false]
  rerender()
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()
})

// this may be useful in the future, but we don't support it today so I thought
// it'd be good to include as a test as it would be a breaking change if we
// did add support. I'm inclined to not support this. Manipulation is not good.
test('useDeepCompareEffect does NOT work with manipulation', () => {
  const callback = jest.fn()
  const deps = [{a: 'b'}]
  const {rerender} = renderHook(() => useDeepCompareEffect(callback, deps))
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  deps[0].a = 'c'
  rerender()
  expect(callback).toHaveBeenCalledTimes(0)
})

test('useDeepCompareEffect works with deep object similarities/differences', () => {
  const callback = jest.fn()
  let deps = [{a: {b: {c: 'd'}}}]
  const {rerender} = renderHook(() => useDeepCompareEffect(callback, deps))
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  // change primitive value
  deps = [{a: {b: {c: 'e'}}}]
  rerender()
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()

  // no-change
  deps = [{a: {b: {c: 'e'}}}]
  rerender()
  expect(callback).toHaveBeenCalledTimes(0)
  callback.mockClear()

  // add property
  deps = [{a: {b: {c: 'e'}, f: 'g'}}]
  rerender()
  expect(callback).toHaveBeenCalledTimes(1)
  callback.mockClear()
})

/* eslint no-console:0 */
