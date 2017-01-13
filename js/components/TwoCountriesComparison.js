//require('babel-polyfill');
//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chips, { Chip } from 'react-chips';
import {Panel, Col, Row, DropdownButton, MenuItem} from 'react-bootstrap';
import {loadCountries, loadGDPData} from '../actions/index';
var connect = require('react-redux').connect;

class TwoCountriesComparison extends React.Component{
  constructor(props){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { chips: [], test: []};
  }
  loadCountryByContinent(callback){
    this.props.dispatch(loadCountries()).then(callback)
    .catch(function(error){
      console.log(error);
    });
  }
  componentWillMount(){
    let chart = this;
    this.loadCountryByContinent(function(response){
      chart.props.dispatch(loadGDPData())

      axios.get('/data/gdp_data.json', {
      })
      .then(function (response) {
        //chart.updateChart(chart.props.countries.countries);
        })
      .catch(function (error) {
        console.log(error);
      });
    }); 
  }

  onChange(chips){
    this.setState({ chips });
    this.updateChart(chips);
  }

  updateChart(country_selected){
    let chart = this;

    chart.setState({ test: [...chart.state.test, country_selected]})

    this.data = this.props.gdp_data.filter(function(el){
      var found = country_selected.filter(function(item){
        return item == el.country.value;
      });
      if(found.length > 0){
        return el;
      }
    }).map(function(objs){
        return {
          country: objs.country.value,
          date: parseInt(objs.date),
          value: parseInt(objs.value)
        }  
      });

    if(this.visualization){
      this.visualization.data(this.data).draw();
    }
    else{
      this.visualization = d3plus.viz()
      .container("#viz_comparison")
      .data(this.data)
      .type("line")
      .id(["country"])
      .x("date")
      .y("value")
      .height(400)
      .width(1100)
      .shape({
        "interpolate": "basis"  // takes accepted values to change interpolation type
      })
      .draw();
    } 
  }

 
  render(){
    let countries= [];
    let chips;
    if(this.props.countries){
      let countries_arr = [];
      for (var country in this.props.countries.countries){
        countries_arr.push(this.props.countries.countries[country].name);
        countries.push(<MenuItem eventKey={country} value={country}>{this.props.countries.countries[country].name}</MenuItem>)
      }
      chips = (<Chips
          value={this.state.chips}
          onChange={this.onChange}
          suggestions={countries_arr}/>);
    }
    
    return(
      <div>
        <h1 className="text-center">GDP Comparison by Country</h1>
        {chips}
        <br/>
        <div id="viz_comparison"></div>
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

var Container = connect(mapStateToProps)(TwoCountriesComparison);
module.exports = Container;
