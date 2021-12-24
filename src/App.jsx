import React from 'react'
import './index.scss'
import { useStore,useSelector,useDispatch } from 'react-redux'

const App = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
  const store = useStore()
  console.log(store)

  const handleAddCount = () => {
    dispatch({ type: 'ADD_COUNT' })
  }

  const handleSubCount = () => {
    dispatch({ type: 'SUB_COUNT' })
  }

  const handleMultiCount = () => {
    dispatch({ type: 'MULTI_COUNT', payload: count })
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
