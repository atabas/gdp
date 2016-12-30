require('babel-polyfill');

//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';

var TreeMap = require('./components/TreeMap');
var HistogramByCountry = require('./components/HistogramByCountry');

//var store = require('./store');

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>GDP Comparison by Continent</h1>
        <TreeMap />
        <HistogramByCountry />
        {this.props.children}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App/>, document.getElementById('app'));
});
