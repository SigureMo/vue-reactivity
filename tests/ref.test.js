const { ref } = require('../dist/index.js')

test('test ref', () => {
  const count = ref(0)
  expect(++count.value).toBe(1)
})
