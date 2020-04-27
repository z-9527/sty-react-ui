import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '@components/icon';
import RadioGroup from './RadioGroup';
import Cell from '@components/cell';
import './index.less';

class Radio extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool, // 是否禁用
    value: PropTypes.any, // 当前radio代表的值
    shape: PropTypes.oneOf(['square', 'round']), // 默认图标形状
    color: PropTypes.string, // 选中颜色
    cell: PropTypes.bool// 是否配合cell使用
  }

  static defaultProps = {
    prefixCls: 'sty-radio',
    disabled: false
  }

  state = {}

  onChange = (event) => {
    event.persist && event.persist();
    const value = event.currentTarget.value;
    this.props.onChange(value);
  }

  onCellClick = (value) => {
    if (this.props.disabled) {
      return;
    }
    this.props.onChange(value);
  }

  render() {
    const {
      prefixCls, className, disabled, value, selectValue,
      shape, color, children, onChange, cell, ...other
    } = this.props;
    const checked = selectValue == value;

    const icon = (
      <div
        className={classnames({
          [`${prefixCls}-icon`]: true,
          [`${prefixCls}-icon-${shape}`]: true,
          [`${prefixCls}-icon-checked`]: checked
        })}
      >
        <Icon type='success' style={checked && color ? { backgroundColor: color, borderColor: color } : {}} />
      </div>
    );

    if (cell) {
      return (
        <Cell className={classnames({ [prefixCls]: true, [`${prefixCls}-disabled`]: disabled })} center title={children} onClick={() => this.onCellClick(value)}>
          {icon}
        </Cell>
      );
    }

    return (
      <label className={classnames({ [prefixCls]: true, [`${prefixCls}-disabled`]: disabled })} {...other}>
        <input
          type='radio'
          disabled={disabled}
          value={value}
          onChange={this.onChange}
          checked={checked}
        />
        {icon}
        <div className={`${prefixCls}-label`}>{children}</div>
      </label>
    );
  }
}

Radio.RadioGroup = RadioGroup;

export default Radio;
