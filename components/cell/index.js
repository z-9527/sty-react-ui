import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '@components/icon';
import Ripple from '@components/ripple';
import './index.less';

class Cell extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.any, // 左侧标题
    label: PropTypes.any, // 描述信息
    clickable: PropTypes.bool, // 是否开启点击反馈
    arrow: PropTypes.oneOf(['left', 'up', 'right', 'down', 'none']), // 箭头方向
    center: PropTypes.bool, // 内容是否居中
    ripple: PropTypes.bool // 是否开启水波纹效果
  }

  static defaultProps = {
    prefixCls: 'sty-cell',
    clickable: false,
    arrow: 'none',
    center: false,
    ripple: false
  }

  state = {}
  render() {
    const {
      prefixCls, className, title, label, children, clickable, arrow, style, onClick = () => { },
      center, ripple, ...other
    } = this.props;
    const cls = {
      [prefixCls]: true,
      [className]: className,
      [`${prefixCls}-center`]: center,
      [`${prefixCls}-clickable`]: clickable
    };
    return (
      <div
        className={classnames(cls)}
        style={style}
        onClick={onClick}
      // {...other}
      >
        <div className={`${prefixCls}-title`}>
          <div>{title}</div>
          {label !== undefined && <div className={`${prefixCls}-label`}>{label}</div>}
        </div>
        <div className={`${prefixCls}-value`}>
          {React.Children.map(children, child => {
            if (typeof child.type === 'function') {
              return React.cloneElement(child, {
                ...child.props,
                ...other
              });
            }
            return child;
          })}

        </div>
        {arrow !== 'none' && <Icon className='arrow-icon' type={`arrow-${arrow}`} />}
        {ripple && <Ripple className={`${prefixCls}-ripple`} />}
      </div>
    );
  }
}

export default Cell;
