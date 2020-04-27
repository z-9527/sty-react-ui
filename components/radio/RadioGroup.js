import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class RadioGroup extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    direction: PropTypes.oneOf(['vertical', 'horizontal']), // 排列方向
    shape: PropTypes.oneOf(['square', 'round']), // 默认图标形状
    color: PropTypes.string, // 选中颜色
    value: PropTypes.any, // 当前选中值
    defaultValue: PropTypes.any, // 默认选中值
    onChange: PropTypes.func // 选项变化的函数
  }

  static defaultProps = {
    prefixCls: 'sty-radio-group',
    direction: 'vertical',
    shape: 'round',
    onChange: () => { }
  }

  state = {
    value: undefined
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
      value: this.props.defaultValue
    });
  }

  onChange = (value) => {
    console.log('value: ', value);
    this.props.onChange(value);
    this.setState({
      value
    });
  }

  renderItem = () => {
    const { children, shape, color } = this.props;
    const { value } = this.state;

    return React.Children.map(children, child => {
      if (React.isValidElement) {
        return React.cloneElement(child, {
          ...child.props,
          shape,
          color,
          onChange: this.onChange,
          selectValue: value
        });
      }

      return child;
    });
  }

  render() {
    const {
      prefixCls, direction, shape, color, value, defaultValue,
      onChange, children, className, ...other
    } = this.props;
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

export default RadioGroup;
