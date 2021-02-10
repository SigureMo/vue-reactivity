import { trigger, track } from './effect'
import { isObject } from './share'

const handler: ProxyHandler<any> = {
  get(target, property, receiver) {
    track(target, 'GET', property)
    const res = Reflect.get(target, property, receiver)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  },

  set(target, property, value, receiver) {
    const res = Reflect.set(target, property, value, receiver)
    trigger(target, 'SET', property)
    return res
  },

  deleteProperty(target, property) {
    const res = Reflect.deleteProperty(target, property)
    trigger(target, 'DELETE', property)
    return res
  },

  has(target, property) {
    track(target, 'HAS', property)
    return Reflect.has(target, property)
  },

  ownKeys(target) {
    track(target, 'OWN_KEYS', '')
    return Reflect.ownKeys(target)
  },
}

const proxyMap = new WeakMap<any>()

export function reactive<T extends object>(target: T): T
export function reactive(target: object) {
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, handler)
  proxyMap.set(target, proxy)
  return proxy
}
