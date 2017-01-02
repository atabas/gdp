import axios from 'axios';
export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';

export function loadCountries() {
  return {
    type: LOAD_COUNTRIES,
    promise: axios.get('../../data/countries.json')
  }; 
}

export const LOAD_GDP_DATA = 'LOAD_GDP_DATA';

export function loadGDPData() {
  return {
    type: LOAD_GDP_DATA,
    promise: axios.get('../../data/gdp_data.json')
  };    
}