require('babel-polyfill');

//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';

var Provider = require('react-redux').Provider;
var store = require('./store');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var browserHistory = router.browserHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var TreeMap = require('./components/TreeMap');
var HistogramByCountry = require('./components/HistogramByCountry');
var TwoCountriesComparison = require('./components/TwoCountriesComparison');
var Layout = require('./components/Layout');

class App extends React.Component{
  render(){
    return(
      <div className="container">
        <h1 className="text-center">GDP Comparison by Continent</h1>
        
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
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={App} />
            <Route path="comparison" component={TwoCountriesComparison}/>
          </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
  );
});