import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import { logger } from './middlewares/logger'
import thunk from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store