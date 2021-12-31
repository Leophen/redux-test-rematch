import React from 'react'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const handleAddCount = () => {
    // dispatch({ type: 'ADD_COUNT' })
    dispatch.counter.addCount()
  }

  const handleSubCount = () => {
    // dispatch({ type: 'SUB_COUNT' })
    dispatch.counter.subCount()
  }

  const handleMultiCount = () => {
    // dispatch({ type: 'MULTI_COUNT', payload: count })
    dispatch.counter.multiCount(count)
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
