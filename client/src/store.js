import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import languageReducer from './reducers/languageReducer'
import facultiesReducer from './reducers/facultiesReducer'
import facultyReducer from './reducers/facultyReducer'
import departmentsReducer from './reducers/departmentsReducer'
import adminReducer from './reducers/adminReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  loginInfo: loginReducer,
  user: userReducer,
  products: productReducer,
  language: languageReducer,
  faculties: facultiesReducer,
  departments: departmentsReducer,
  selectedFaculty: facultyReducer,
  users: adminReducer,
  notification: notificationReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
  
  export default store