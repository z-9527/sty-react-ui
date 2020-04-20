import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class Icon extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    color: PropTypes.string, // icon颜色
    type: PropTypes.string // 内置icon名称
  }

  static defaultProps = {
    prefixCls: 'sty-icon'
  }

  state = {}
  render() {
    const { prefixCls, className, color, style = {}, type, ...other } = this.props;
    const cls = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: type,
      [className]: className
    };
    return (
      <i className={classnames(cls)} style={{ ...style, color }} {...other} />
    );
  }
}

export default Icon;
