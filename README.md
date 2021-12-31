# redux rematch 练手项目

[rematch](https://rematch.gitbook.io/handbook/) 是对 redux 的二次封装，简化了 redux 的使用，极大的提高了开发体验（没有多余的 *action types*、*action creators*、*switch* 语句或 *thunks*）

## 一、rematch 的优点

- 省略了 action types

  不必再多次写字符串，转而使用 *model/method* 代替；

- 省略了 action creators

  可以直接调用方法，不必再生产 action type，转而使用 *dispatch.model.method* 代替；

- 省略了 switch 语句

  调用 *model.method* 方法，不必判断 action type；

- 集中书写状态，同步和异步方法

  在一个 model 中使用 state、reducers 和 effects 来写状态，同步和异步方法

## 二、rematch 的安装

```bash
# npm
npm install @rematch/core
# yarn
yarn add @rematch/core
```

## 三、rematch 的使用

### 1、init × models

init 使用 models 属性初始化 store，需要配合以下格式的 modal：

```js
const count = {
  state: 0,
  reducers: {
    upBy: (state, payload) => state + payload
  },
  effects: {
    async loadData(payload, rootState) {
      const response = await fetch('xx/data')
      const data = await response.json()
      console.log(data)
    }
  }
}

init({
  models: {
    count
  }
})
```

原 redux 写法改造如下 *▼*

**src/store/index.js：**

```diff
- import { createStore, combineReducers } from 'redux'
+ import { init } from '@rematch/core'
  import counter from './reducers/counter'

- const store = createStore(
-   combineReducers({
-     counter
-   })
- )
+ const store = init({
+   models: {
+     counter
+   }
+ })

  export default store
```

**src/store/reducers/counter.js：**

```diff
- import * as actionTypes from '../actionTypes'

  const defaultState = {
    count: 0
  }

- const handleAddCount = (state, action) => {
+ const handleAddCount = (state, payload) => {
    const newState = JSON.parse(JSON.stringify(state))
    newState.count += 1
    return newState
  }

- const handleSubCount = (state, action) => {
+ const handleSubCount = (state, payload) => {
    const newState = JSON.parse(JSON.stringify(state))
    newState.count -= 1
    return newState
  }

- const handleMultiCount = (state, action) => {
+ const handleMultiCount = (state, payload) => {
    const newState = JSON.parse(JSON.stringify(state))
    newState.count *= action.payload
    return newState
  }

- function counter(state = defaultState, action) {
-   switch (action.type) {
-     case actionTypes.ADD_COUNT:
-       return handleAddCount(state, action)
-     case actionTypes.SUB_COUNT:
-       return handleSubCount(state, action)
-     case actionTypes.MULTI_COUNT:
-       return handleMultiCount(state, action)
-     default:
-       return state
-   }
- }
+ const counter = {
+   state: defaultState,
+   reducers: {
+     addCount: (state, payload) => handleAddCount(state, payload),
+     subCount: (state, payload) => handleSubCount(state, payload),
+     multiCount: (state, payload) => handleMultiCount(state, payload)
+   }
+ }

  export default counter
```

**src/App.jsx：**

```diff
  import React from 'react'
  import './index.scss'
  import { useSelector, useDispatch } from 'react-redux'

  const App = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const handleAddCount = () => {
-     dispatch({ type: 'ADD_COUNT' })
+     dispatch.counter.addCount()
    }

    const handleSubCount = () => {
-     dispatch({ type: 'SUB_COUNT' })
+     dispatch.counter.subCount()
    }

    const handleMultiCount = () => {
-     dispatch({ type: 'MULTI_COUNT', payload: count })
+     dispatch.counter.multiCount(count)
    }

    return (
      <div>
        <button onClick={handleAddCount}>+1</button>
        <button onClick={handleSubCount}>-1</button>
        <button onClick={handleMultiCount}>× last</button>
        <span>{count}</span>
      </div>
    )
  }

  export default App
```

### 2、init × redux

init 初始化 store 的过程中，可以通过 [redux](https://rematch.gitbook.io/handbook/api-wen-dang/init-redux-api) 这个属性来兼容老项目中的 redux 配置。

使用 `init` 替代 `createStore` 创建 store *▼*

**src/store/index.js：**

```diff
- import { createStore, combineReducers } from 'redux'
+ import { init } from '@rematch/core'
  import counter from './reducers/counter'

- const store = createStore(
-   combineReducers({
-     counter
-   })
- )
+ const store = init({
+   redux: {
+     reducers: {
+       counter
+     }
+   }
+ })

  export default store
```
