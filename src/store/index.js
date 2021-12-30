import { init } from '@rematch/core'
import counter from './reducers/counter'

const store = init({
  redux: {
    reducers: {
      counter
    }
  }
})

export default store
