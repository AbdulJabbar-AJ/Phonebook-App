import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer)
const stateProvider = page => <Provider store={store}>{page}</Provider>

export default stateProvider

