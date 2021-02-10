export function trigger(target: object, type: string, key: unknown) {
  console.log(`[Trigger] 执行了 ${type} 操作，目标属性为 ${key}`)
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  switch (type) {
    case 'SET':
      if (!depsMap.has(key)) {
        return
      }
      for (const effect of depsMap.get(key)) {
        effect()
      }
      break
  }
}

type Dep = Set<Function>
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

export function track(target: object, type: string, key: unknown) {
  console.log(`[Track] 执行了 ${type} 操作，目标属性为 ${key}`)
  if (shouldTrack) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect)
    }
  }
}

let activeEffect: Function | undefined
let shouldTrack: boolean = false

export function effect(fn: Function) {
  const _effect = () => {
    shouldTrack = true
    activeEffect = fn
    fn()
    shouldTrack = false
  }
  _effect()
}
