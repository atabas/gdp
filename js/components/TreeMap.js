//require('babel-polyfill');

//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TreeMap extends React.Component{
  constructor(props){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state={ year: ""};
  }
  loadCountryByContinent(callback){
    axios.get('/data/countries.json', {
    }).then(callback)
    .catch(function(error){
      console.log(error);
    });
  }
  componentWillMount(){
    let histogram = this;
    this.loadCountryByContinent(function(response){
      histogram.countries = response.data.countries;
      histogram.full_continents = response.data.continents;
      //console.log("first continent",response.data.continents);
      axios.get('/data/gdp_data.json', {
      })
      .then(function (response) {
        histogram.completeData = response.data[1];
        histogram.updateChart(histogram.state.year);
        })
      .catch(function (error) {
        console.log(error);
      });
    });    
  }

  updateChart(year){
    let histogram = this;
    this.data = this.completeData.filter(function(el){
      if(histogram.countries[el.country.id] && el.value && (!year || el.date==year) && isNaN(el.country.id.split('')[1]) && isNaN(el.country.id.split('')[0]) && el.country.id.split('')[0]!=='X'){
        return el;
      }
    }).map(function(objs){
      let continent = null;
      if(histogram.countries[objs.country.id]){
        continent = histogram.full_continents[histogram.countries[objs.country.id].continent];
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

module.exports = TreeMap;