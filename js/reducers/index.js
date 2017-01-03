var actions = require('../actions/index');
import { handle } from 'redux-pack';

var initialYearState = {};

var treeMapReducer = function(state, action){
  state = state || {initialYearState};
  if(action.type === actions.LOAD_COUNTRIES){
    return handle(state, action, {
      failure: s => ({ ...s, countriesError: action.payload }),
      success: s => ({ ...s, countries: action.payload.data }),
      });
  }
  else if(action.type === actions.LOAD_GDP_DATA){
    return handle(state, action, {
      failure: s => ({ ...s, gdpError: action.payload }),
      success: s => ({ ...s, gdp_data: action.payload.data[1] }),
    });
  }
  return state;
};

export default treeMapReducer;
