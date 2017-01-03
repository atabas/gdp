require('babel-polyfill');

//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';

var Provider = require('react-redux').Provider;
var store = require('./store');

var TreeMap = require('./components/TreeMap');
var HistogramByCountry = require('./components/HistogramByCountry');
var TwoCountriesComparison = require('./components/TwoCountriesComparison');

class App extends React.Component{
  render(){
    return(
      <div className="container">
        <h1>GDP Comparison by Continent</h1>
        <TreeMap />
        <HistogramByCountry />

        {this.props.children}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
  );
});