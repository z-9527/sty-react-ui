import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Loading from '../loading';
import './index.less';

// popup通过属性visible控制不同，Toast是API调用，
// 如何在DOM节点插入和移除的时候添加动画？进入时直接给css动画，移除时等动画结束在移除

class Toast extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    content: PropTypes.any, // 提示内容
    type: PropTypes.oneOf(['info', 'success', 'fail', 'loading']), // 类型
    duration: PropTypes.number, // 显示时间
    onClose: PropTypes.func, // 关闭后的回调
    icon: PropTypes.any// 自定义图标
  }

  static defaultProps = {
    prefixCls: 'sty-toast',
    duration: 2.5,
    onClose: () => { }
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = () => {
    this.toast.classList.add('fadeOut');
    setTimeout(() => {
      this.clearCloseTimer();
      this.props.onClose();
    }, 500);
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  renderIcon = () => {
    let { icon, type } = this.props;

    if (type === 'info' && !icon) {
      return;
    }

    if (type === 'loading') {
      return <Loading size={36} />;
    }

    if (typeof icon === 'string') {
      type = icon;
    } else if (icon) {
      return icon;
    }
    return <Icon type={type} size={36} />;
  }

  render() {
    const { prefixCls, icon, type, content, className, style, ...other } = this.props;
    return (
      <div className={`${prefixCls}-mask`}>
        <div
          ref={el => this.toast = el}
          className={classnames({
            [className]: className,
            [prefixCls]: true,
            [`${prefixCls}-text`]: true,
            [`${prefixCls}-icon`]: icon || type !== 'info'
          })}
          {...other}>
          {this.renderIcon()}
          <div className={`${prefixCls}-text-info`}>{content}</div>
        </div>
      </div >
    );
  }
}

// 返回关闭函数
function notice(config) {
  const div = document.createElement('div');
  div.className = 'sty-toast-box';
  document.body.appendChild(div);
  function onClose() {
    config.onClose && config.onClose();
    ReactDOM.unmountComponentAtNode(div);
    document.body.contains(div) && document.body.removeChild(div);
  }
  ReactDOM.render(<Toast {...config} onClose={onClose} />, div);
  return onClose;
}

export default {
  info({ content, duration, icon, onClose, className, style }) {
    return notice({ content, duration, icon, onClose, type: 'info', className, style });
  },
  loading({ content, duration, icon, onClose, className, style }) {
    return notice({ content, duration, icon, onClose, type: 'loading', className, style });
  },
  fail({ content, duration, icon, onClose, className, style }) {
    return notice({ content, duration, icon, onClose, type: 'fail', className, style });
  },
  success({ content, duration, icon, onClose, className, style }) {
    return notice({ content, duration, icon, onClose, type: 'success', className, style });
  }
};
