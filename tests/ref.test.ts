import { test, expect } from 'vitest'
import { ref } from '../src'

test('test ref', () => {
  const count = ref(0)
  expect(++count.value).toBe(1)
})
