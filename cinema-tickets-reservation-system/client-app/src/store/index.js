import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { getFirestore } from 'redux-firestore';
import { rootReducer } from './redusers/rootReducer';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['toastr', 'order', 'seatsSelect', 'autosuggest'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirestore }))),
);

export const persistor = persistStore(store);
