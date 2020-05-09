import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Ripple from '../ripple';
import Icon from '../icon';
import Loading from '../loading';
import './index.less';

class Button extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'warning', 'ghost', 'default']), // 按钮类型
    disabled: PropTypes.bool, // 是否禁用
    inline: PropTypes.bool, // 是否是行内按钮
    loading: PropTypes.bool, // 加载状态
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 图标
    ripple: PropTypes.bool, // 触碰是否有水波纹效果
    round: PropTypes.bool // 是否为圆形按钮
  }

  static defaultProps = {
    prefixCls: 'sty-button',
    type: 'default',
    disabled: false,
    inline: false,
    loading: false,
    ripple: true,
    round: false
  }

  state = {}
  render() {
    const {
      className, type, prefixCls, disabled, ripple, round,
      children, icon, inline, loading, onClick = () => {}, ...other
    } = this.props;
    const cls = {
      [prefixCls]: true,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-round`]: round,
      [className]: className
    };

    const iconEl = loading ? <Loading size={24} className={`${prefixCls}-loading`} /> : icon;
    return (
      <div
        className={classnames(cls)}
        onClick={(event) => {
          if (loading || disabled) {
            return;
          }
          onClick(event);
        }}
        {...other}
      >
        {!disabled && !loading && ripple && <Ripple className={`${prefixCls}-ripple`} />}
        {typeof iconEl === 'string' ? <Icon className={`${prefixCls}-icon`} type={icon} /> : iconEl}
        {children && <span className={`${prefixCls}-text`}>{children}</span>}
      </div>
    );
  }
}

export default Button;
