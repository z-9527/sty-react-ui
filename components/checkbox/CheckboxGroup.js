import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class CheckboxGroup extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    direction: PropTypes.oneOf(['vertical', 'horizontal']), // 排列方向
    shape: PropTypes.oneOf(['square', 'round']), // 默认图标形状
    color: PropTypes.string, // 选中颜色
    value: PropTypes.array, // 当前选中值
    defaultValue: PropTypes.array, // 默认选中值
    onChange: PropTypes.func, // 选项变化的函数
    cell: PropTypes.bool// 是否配合cell使用
  }

  static defaultProps = {
    prefixCls: 'sty-checkbox-group',
    direction: 'horizontal',
    shape: 'square',
    onChange: () => { },
    cell: false
  }

  state = {
    value: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if (value !== undefined && value !== prevState.value) {
      return {
        value
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      value: this.props.defaultValue || []
    });
  }

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({
      value
    });
  }

  renderItem = () => {
    const { children, shape, color, cell } = this.props;
    const { value } = this.state;

    return React.Children.map(children, child => {
      if (typeof child.type === 'function') {
        return React.cloneElement(child, {
          ...child.props,
          shape,
          color,
          cell,
          onCheckChange: this.onChange,
          selectValue: value
        });
      }

      return child;
    });
  }

  render() {
    let {
      prefixCls, direction, shape, color, value, defaultValue,
      onChange, children, className, cell, ...other
    } = this.props;

    direction = cell ? 'vertical' : direction;

    const cls = {
      [className]: className,
      [prefixCls]: true,
      [`${prefixCls}-${direction}`]: true
    };
    return (
      <div className={classnames(cls)} {...other}>
        {this.renderItem()}
      </div>
    );
  }
}

export default CheckboxGroup;
