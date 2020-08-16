import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import employeeReducer from './reducers/employeeReducer';
import departmentReducer from './reducers/departmentReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleWare = [thunk];

const reducers = combineReducers({
    employeeR: employeeReducer,
    departmentR: departmentReducer,
    uiR: uiReducer
});

const store = createStore(reducers, initialState, applyMiddleware(...middleWare));

export default store; 