import { trigger, track } from './effect'

interface Ref<T = any> {
  // _value: T
  value: T
}

class RefImpl<T> {
  private _value: T

  public readonly __v_isRef = true

  constructor(initValue: T) {
    this._value = initValue
  }

  get value() {
    track(this, 'GET', 'value')
    return this._value
  }

  set value(newVal) {
    this._value = newVal
    trigger(this, 'SET', 'value')
  }
}

export function ref<T>(value: T): Ref<T> {
  return new RefImpl(value)
}
