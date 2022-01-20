import { test, expect } from 'vitest'
import { effect, ref, reactive } from '../src'
// const { effect, ref, reactive } = require('../dist/index.js')

test('test effect', () => {
  const count = ref(0)
  let dummy = 0
  effect(() => {
    dummy = count.value
  })
  expect(dummy).toBe(0)
  count.value++
  expect(dummy).toBe(1)
})

test('test effect', () => {
  const count = reactive({
    value: 0,
  })
  let dummy = 0
  effect(() => {
    dummy = count.value
  })
  expect(dummy).toBe(0)
  count.value++
  expect(dummy).toBe(1)
})
