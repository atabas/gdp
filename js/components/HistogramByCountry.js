//require('babel-polyfill');

//var actions = require('./actions/index');
import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import {loadCountries, loadGDPData} from '../actions/index';
var connect = require('react-redux').connect;

class HistogramByCountry extends React.Component{
  constructor(props){
    super(props);
    this.updateYear = this.updateYear.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.state={ year: "2015"};
  }
  loadCountryByContinent(callback){
   this.props.dispatch(loadCountries())
   .then(callback)
    .catch(function(error){
      console.log(error);
    });
  }
  componentWillMount(){
    let histogram = this;
    this.loadCountryByContinent(function(response){
      histogram.props.dispatch(loadGDPData())

      axios.get('/data/gdp_data.json', {
      })
      .then(function (response) {
        histogram.updateChart(histogram.state.year);
        })
      .catch(function (error) {
        console.log(error);
      });
    }); 
  }

  updateYear(event){
    this.setState({year: event.target.value});
    this.updateChart(event.target.value);
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
      else{
        console.log(objs.country);
      }

      return {
        country: objs.country.value,
        date: parseInt(objs.date),
        value: parseInt(objs.value),
        continent: continent
      }  
      });
    // histogram.updateChart();

    if(this.visualization){
      this.visualization.data(this.data).draw();
    }
    else{
      this.visualization = d3plus.viz()
      .container("#vizhist")
      .data(this.data)
      .type("bar")
      .aggs({"value":"mean"})
      .color("continent")
      .id(["continent","country"])
      .x("date")
      .y("value")
      .height(400)
      .width(1100)
      .resize(true)
      .draw();
    }
    
  }
  render(){
    let years= []
    for(var i =2000; i<= 2015; i++){
      years.push(<option key={i} value={i}>{i}</option>)
    }
    return(
      <div>
        <Row>
          <Col sm={12}>
            <Panel header={title}>
              <select name="years" id="" onChange={this.updateYear}><option value="">Select Year</option>{years}</select>
              <div id="vizhist"></div>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }  
}

const title = (
  <h3>Histogram</h3>
);

var mapStateToProps = function(state, props) {
  return {
    countries:state.countries,
    gdp_data: state.gdp_data
  };
};

var Container = connect(mapStateToProps)(HistogramByCountry);
module.exports = Container;