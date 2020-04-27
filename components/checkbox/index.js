import React, { Component } from 'react';
import { classnames } from '../_utils';
import Cell from '@components/cell';
import Icon from '@components/icon';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';
import './index.less';

// Checkbox单独使用和配合CheckboxGroup使用时，受控的值不同，单独使用时受控为checked，组合使用时受控group的value

class Checkbox extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool, // 是否禁用
    value: PropTypes.any, // 当前checkbox代表的值
    shape: PropTypes.oneOf(['square', 'round']), // 默认图标形状
    color: PropTypes.string, // 选中颜色
    cell: PropTypes.bool, // 是否配合cell使用
    checked: PropTypes.bool, // 是否选中
    defaultChecked: PropTypes.bool, // 是否默认选中
    onCheckChange: PropTypes.func // checkboxgroup传下来的chang函数
  }

  static defaultProps = {
    prefixCls: 'sty-checkbox',
    disabled: false,
    defaultChecked: false,
    direction: 'horizontal',
    shape: 'square',
    onChange: () => { },
    onCheckChange: () => { }
  }

  state = {
    checked: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checked) {
      return {
        checked
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.checked === undefined) {
      this.setState({
        checked: this.props.defaultChecked
      });
    }
  }

  onValueChange = (value, checked) => {
    if (this.props.disabled) {
      return;
    }
    let selectValue = this.props.selectValue;
    if (selectValue) {
      if (checked) {
        selectValue.push(value);
      } else {
        selectValue = selectValue.filter(i => i !== value);
      }
      this.props.onCheckChange(selectValue);
    } else {
      this.setState({
        checked
      });
      this.props.onChange(checked);
    }
  }

  onInputChange = (event) => {
    event.persist && event.persist();
    const value = event.currentTarget.value;
    const checked = event.currentTarget.checked;
    this.onValueChange(value, checked);
  }

  render() {
    const {
      prefixCls, className, disabled, value, selectValue, checked, defaultChecked,
      cell, shape, color, children, onChange, onCheckChange, ...other
    } = this.props;
    let isCheck = this.state.checked;
    if (selectValue) {
      isCheck = selectValue.includes(value);
    }

    const icon = (
      <div
        className={classnames({
          [`${prefixCls}-icon`]: true,
          [`${prefixCls}-icon-${shape}`]: true,
          [`${prefixCls}-icon-checked`]: isCheck
        })}
      >
        <Icon type='success' style={isCheck && color ? { backgroundColor: color, borderColor: color } : {}} />
      </div>
    );

    if (cell) {
      return (
        <Cell
          className={classnames({ [prefixCls]: true, [`${prefixCls}-disabled`]: disabled })}
          center
          title={children}
          onClick={() => this.onValueChange(value, !isCheck)}>
          {icon}
        </Cell>
      );
    }

    return (
      <label
        className={classnames({
          [className]: true,
          [prefixCls]: true,
          [`${prefixCls}-disabled`]: disabled
        })}
        {...other}
      >
        <input
          type='checkbox'
          disabled={disabled}
          value={value}
          onChange={this.onInputChange}
          checked={isCheck}
        />
        {icon}
        <div className={`${prefixCls}-label`}>{children}</div>
      </label>
    );
  }
}

Checkbox.CheckboxGroup = CheckboxGroup;

export default Checkbox;
