import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '../icon';
import './index.less';

class NavBar extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string, // 标题
    leftText: PropTypes.string, // 左侧文字
    leftArrow: PropTypes.bool, // 是否显示左侧箭头
    leftContent: PropTypes.any, // 自定义左侧内容
    rightContent: PropTypes.any, // 自定义右侧内容
    onLeftClick: PropTypes.func // 左侧点击事件
  };

  static defaultProps = {
    prefixCls: 'sty-navbar',
    leftArrow: true,
    onLeftClick: () => {}
  };

  state = {};
  render() {
    const {
      className,
      prefixCls,
      leftArrow,
      title,
      rightContent,
      leftText,
      leftContent,
      onLeftClick,
      ...other
    } = this.props;
    return (
      <div className={classnames(`${prefixCls}`, className)} {...other}>
        <div className={`${prefixCls}-left`} onClick={onLeftClick}>
          {leftContent || (
            <React.Fragment>
              {leftArrow && (
                <Icon type='arrow-left' style={{ marginRight: '4px' }} />
              )}
              {leftText}
            </React.Fragment>
          )}
        </div>
        <div className={`${prefixCls}-title`}>{title}</div>
        <div className={`${prefixCls}-right`}>{rightContent}</div>
      </div>
    );
  }
}

export default NavBar;
