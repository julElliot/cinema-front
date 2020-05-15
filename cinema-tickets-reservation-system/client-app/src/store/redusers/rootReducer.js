import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { searchReducer } from './searchReducer';
import { seatsSelectionReducer } from './seatsSelectionReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';
import { adminReducer } from './adminReducer';
import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  toastr: toastrReducer,
  search: searchReducer,
  user: userReducer,
  order: orderReducer,
  seatsSelect: seatsSelectionReducer,
  admin: adminReducer, 
  form: formReducer,
});
