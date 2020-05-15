import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

function LoadingIcon(type) {
  if (type === 'spinner') {
    const Spin = [];
    for (let i = 0; i < 12; i++) {
      Spin.push(<i key={i} />);
    }
    return Spin;
  }
  return (
    <svg viewBox='25 25 50 50'>
      <circle cx='50' cy='50' r='20' fill='none' />
    </svg>
  );
}

class Loading extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.oneOf(['spinner', 'circular']), // loading形状
    size: PropTypes.number,
    color: PropTypes.string,
    vertical: PropTypes.bool // 文字是否垂直排列
  };

  static defaultProps = {
    prefixCls: 'sty-loading',
    type: 'circular',
    vertical: false
  };

  state = {};
  render() {
    const {
      prefixCls,
      className,
      type,
      size,
      color,
      vertical,
      children,
      ...other
    } = this.props;
    const cls = {
      [`${prefixCls}-spinner`]: true,
      [`${prefixCls}-type-${type}`]: type
    };
    const style = { color };
    if (size) {
      style.width = `${size}px`;
      style.height = `${size}px`;
    }
    return (
      <div
        className={classnames(prefixCls, className, {
          [`${prefixCls}-vertical`]: vertical
        })}
        {...other}
      >
        <span className={classnames(cls)} style={style}>
          {LoadingIcon(type)}
        </span>
        {children && <span className={`${prefixCls}-text`}>{children}</span>}
      </div>
    );
  }
}

export default Loading;
