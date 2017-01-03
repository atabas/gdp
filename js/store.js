import redux from 'redux';
import reducers from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();
const store = createStore(reducers,applyMiddleware(thunk, reduxPackMiddleware, logger));
module.exports = store;

