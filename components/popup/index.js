import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import './index.less';

class Popup extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    overlay: PropTypes.bool, // 是否显示遮罩
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']), // 弹出层位置
    visible: PropTypes.bool, // 是否显示弹框
    overlayClosable: PropTypes.bool, // 点击遮罩是否可以关闭弹框
    onClose: PropTypes.func,
    round: PropTypes.bool, // 是否是圆角
    closable: PropTypes.bool, // 是否显示关闭icon
    duration: PropTypes.number, // 动画时长，单位毫秒
    transitionName: PropTypes.string // 主体过渡动画名称
  };

  static defaultProps = {
    prefixCls: 'sty-popup',
    overlay: true,
    position: 'center',
    visible: false,
    overlayClosable: true,
    onClose: () => {},
    round: false,
    closable: false,
    duration: 300
  };

  onOverlayClick = () => {
    if (this.props.overlayClosable) {
      this.props.onClose();
    }
  };

  state = {};
  render() {
    let {
      prefixCls,
      position,
      overlay,
      visible,
      overlayClosable,
      duration,
      className,
      onClose,
      round,
      closable,
      children,
      transitionName,
      ...other
    } = this.props;
    const isCenter = position === 'center';
    if (!transitionName) {
      transitionName = isCenter ? 'sty-fade' : `sty-slide-${position}`;
    }
    return (
      <React.Fragment>
        {overlay && (
          <CSSTransition
            in={visible}
            timeout={duration}
            classNames={'sty-fade'}
            unmountOnExit
          >
            <div
              className={`${prefixCls}-overlay`}
              onClick={this.onOverlayClick}
            />
          </CSSTransition>
        )}
        <CSSTransition
          in={visible}
          timeout={duration}
          classNames={transitionName}
          unmountOnExit
        >
          <div
            {...other}
            className={classnames({
              [className]: className,
              [prefixCls]: true,
              [`${prefixCls}-${position}`]: true,
              [`${prefixCls}-round`]: round
            })}
          >
            {closable && (
              <Icon
                onClick={this.props.onClose}
                className='close-icon'
                type='cross'
              />
            )}
            {children}
          </div>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default Popup;
