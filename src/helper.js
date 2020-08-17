export function sleep(time = 0) {
  if (!isNumber(time)) {
    throw new Error('time expected a number')
  }
  
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

function whatType(obj) {
  return Object.prototype.toString.call(obj)
}

export function isType(...objs) {
  return (
    objs.map(item => whatType(item) === whatType(objs[0])).filter(item => !item)
      .length === 0
  )
}

export function isObject(...objs) {
  return isType(...objs, {})
}

export function isArray(...objs) {
  return isType(...objs, [])
}

export function isOb(...objs) {
  return objs.every(obj => inType(obj, [{}, []]))
}

export function isBoolean(...objs) {
  return isType(...objs, true)
}

export function isString(...objs) {
  return isType(...objs, '')
}

export function isNumber(...objs) {
  return isType(...objs, 1) && !isNaN(...objs)
}

export function isSymbol(...objs) {
  return isType(...objs, Symbol('Symbol'))
}

export function isPromise(...objs) {
  return isType(...objs, Promise.resolve())
}

export function isNaN(...objs) {
  return objs.every(obj => Number.isNaN(obj))
}

export function isNull(...objs) {
  return isType(...objs, null)
}

export function isUndef(...objs) {
  return isType(...objs, undefined)
}

export function isReg(...objs) {
  return isType(...objs, /d/)
}

export function isNil(...objs) {
  return objs.every(obj => inType(obj, [undefined, null]))
}

export function isFunction(...objs) {
  return objs.every(obj => isType(obj, () => {}))
}

export function isAsyncFunction(...objs) {
  return objs.every(obj => isType(obj, async () => {}))
}

export function isFunc(...objs) {
  return objs.every(obj => inType(obj, [() => {}, async () => {}]))
}

export function isImagePath(...objs) {
  return objs.every(obj => /\.(png|jpg|gif|jpeg|webp|bmp|psd|tiff|tga|eps)$/.test(obj))
}

export function inType(params, list) {
  if (!isType(list, [])) {
    throw new Error(`list expect a ${whatType([])}`)
  }
  let flag = false
  for (const i in list) {
    if (isType(list[i], params)) {
      flag = true
      break
    }
  }
  return flag
}