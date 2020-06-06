import React, { Component } from 'react';
import Picker from '../picker';
import PropTypes from 'prop-types';
class DatePicker extends Component {
  state = {};
  render() {
    // const {} = props;
    return <Picker />;
  }
}

DatePicker.propTypes = {
  prefixCls: PropTypes.string,
  title: PropTypes.any,
  confirmText: PropTypes.any,
  cancelText: PropTypes.any,
  data: PropTypes.arrayOf(PropTypes.array),
  visibleCount: PropTypes.number, // 可见选项个数，主要是计算高度
  loading: PropTypes.bool,
  value: PropTypes.array, // 受控值
  defaultValue: PropTypes.array,
  cascade: PropTypes.bool,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

DatePicker.defaultProps = {
  prefixCls: 'sty-picker',
  confirmText: '确认',
  cancelText: '取消',
  data: [],
  visibleCount: 5,
  loading: false,
  defaultValue: [],
  cascade: false,
  onChange: () => {},
  onCancel: () => {},
  onConfirm: () => {}
};

export default DatePicker;
