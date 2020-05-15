import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Loading from '@components/loading';
import './index.less';

class Switch extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    checked: PropTypes.bool, // 是否选中
    defaultChecked: PropTypes.bool, // 是否默认选中
    disabled: PropTypes.bool, // 是否可选
    loading: PropTypes.bool, // 加载状态
    color: PropTypes.string, // 选中的背景色
    onChange: PropTypes.func,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // switch大小
  };

  static defaultProps = {
    prefixCls: 'sty-switch',
    defaultChecked: false,
    disabled: false,
    loading: false,
    onChange: () => {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.value) {
      return {
        value: checked
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      value: this.props.defaultChecked
    });
  }

  state = {
    value: false
  };

  onChange = event => {
    event.persist && event.persist();
    const checked = event.currentTarget.checked;
    this.props.onChange(checked);
    this.setState({
      value: checked
    });
  };

  render() {
    const {
      prefixCls,
      className,
      defaultChecked,
      disabled,
      checked,
      color,
      loading,
      onChange,
      style = {},
      size,
      ...other
    } = this.props;
    const { value } = this.state;
    const cls = {
      [prefixCls]: true,
      [className]: className,
      [`${prefixCls}-${value ? 'on' : 'off'}`]: true,
      [`${prefixCls}-disabled`]: disabled
    };
    const sty = style;
    if (value && color) {
      sty.backgroundColor = color;
    }
    if (size) {
      sty.fontSize = `${size}px`;
    }
    return (
      <label className={classnames(cls)} style={sty} {...other}>
        <input
          type='checkbox'
          onChange={this.onChange}
          disabled={disabled}
          checked={value}
          value={value ? 'on' : 'off'}
        />
        <div className={`${prefixCls}-node`}>
          {loading && <Loading className='switch-loading' />}
        </div>
      </label>
    );
  }
}

export default Switch;
