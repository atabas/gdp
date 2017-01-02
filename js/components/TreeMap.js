//require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {loadCountries, loadGDPData} from '../actions/index';
var connect = require('react-redux').connect;

class TreeMap extends React.Component{
  constructor(props){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state={ year: ""};
  }
  loadCountryByContinent(callback){
    this.props.dispatch(loadCountries())
    // axios.get('/data/countries.json', {
    .then(callback)
    .catch(function(error){
      console.log(error);
    });
  }
  componentWillMount(){
    let histogram = this;
    
    this.loadCountryByContinent(function(response){
      // histogram.countries = response.data.countries;
      // histogram.full_continents = response.data.continents;
      histogram.props.dispatch(loadGDPData())
      .then(function (response) {
        // histogram.completeData = response.data[1];
        histogram.updateChart(histogram.state.year);
        })
      .catch(function (error) {
        console.log(error);
      });
    });    
  }

  updateChart(year){
    let histogram = this;
    this.data = this.props.gdp_data.filter(function(el){
      if(histogram.props.countries.countries[el.country.id] && el.value && (!year || el.date==year) && isNaN(el.country.id.split('')[1]) && isNaN(el.country.id.split('')[0]) && el.country.id.split('')[0]!=='X'){
        return el;
      }
    }).map(function(objs){
      let continent = null;
      if(histogram.props.countries.countries[objs.country.id]){
        continent = histogram.props.countries.continents[histogram.props.countries.countries[objs.country.id].continent];
      }
    
      return {
        country: objs.country.value,
        date: parseInt(objs.date),
        value: parseInt(objs.value),
        continent: continent
      }  
    });

    if(this.visualization){
      this.visualization.data(this.data).draw();
    }
    else{      
      this.visualization = d3plus.viz()
      .container("#viz")
      .data(this.data)
      .type("tree_map")
      .id(["continent","country"])
      .size("value")
      .time({"value": "date", "solo": "2015"})
      .height(400)
      .width(1100)
      .draw();
    }  
  }
  render(){
    return(
      <div>
        <div id="viz"></div>
      </div>
    );
  }  
}

var mapStateToProps = function(state, props) {
  return {
    countries:state.countries,
    gdp_data: state.gdp_data
  };
};

var Container = connect(mapStateToProps)(TreeMap);


module.exports = Container;