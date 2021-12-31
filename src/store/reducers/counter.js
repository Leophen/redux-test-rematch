import * as actionTypes from '../actionTypes'

const defaultState = {
  count: 0
}

// const handleAddCount = (state, action) => {
//   const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
//   newState.count += 1
//   return newState
// }

// const handleSubCount = (state, action) => {
//   const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
//   newState.count -= 1
//   return newState
// }

// const handleMultiCount = (state, action) => {
//   const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
//   newState.count *= action.payload
//   return newState
// }

// function counter(state = defaultState, action) {
//   switch (action.type) {
//     case actionTypes.ADD_COUNT:
//       return handleAddCount(state, action)
//     case actionTypes.SUB_COUNT:
//       return handleSubCount(state, action)
//     case actionTypes.MULTI_COUNT:
//       return handleMultiCount(state, action)
//     default:
//       return state
//   }
// }

const handleAddCount = (state, payload) => {
  const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
  newState.count += 1
  return newState
}

const handleSubCount = (state, payload) => {
  const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
  newState.count -= 1
  return newState
}

const handleMultiCount = (state, payload) => {
  const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
  newState.count *= payload
  return newState
}

const counter = {
  state: defaultState,
  reducers: {
    addCount: (state, payload) => handleAddCount(state, payload),
    subCount: (state, payload) => handleSubCount(state, payload),
    multiCount: (state, payload) => handleMultiCount(state, payload)
  }
}

export default counter
