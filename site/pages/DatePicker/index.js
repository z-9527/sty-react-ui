import React, { Component } from 'react';
import renderHeader from '../renderHeader';

@renderHeader('DatePicker')
class DatePickerPage extends Component {
  state = {};
  render() {
    return <div className='date-picker-demo demo-box'></div>;
  }
}

export default DatePickerPage;
