import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Button from '../button';
import Popup from '../popup';
import './index.less';

class Modal extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    visible: PropTypes.bool, // 是否显示弹框
    overlayClosable: PropTypes.bool, // 点击遮罩是否可以关闭弹框
    onClose: PropTypes.func, // 关闭弹框的函数
    title: PropTypes.string, // 弹框标题
    footer: PropTypes.array // 底部按钮内容
  }

  static defaultProps = {
    prefixCls: 'sty-modal',
    overlayClosable: false,
    footer: []
  }

  renderFooter = () => {
    const { footer, prefixCls, onClose } = this.props;
    if (!footer.length) {
      return null;
    }
    return (
      <div className={`${prefixCls}-footer ${prefixCls}-footer-${footer.length > 2 ? 'v' : 'h'}`}>
        {footer.map((item, index) => (
          <Button
            className={`${prefixCls}-button`}
            key={index}
            style={item.style}
            onClick={() => {
              item.onPress && item.onPress();
              onClose();
            }}>
            {item.text}
          </Button>
        ))}
      </div>
    );
  }

  state = {}
  render() {
    const {
      prefixCls, className, visible, overlayClosable, onClose, children,
      title, ...other
    } = this.props;
    return (
      <Popup
        visible={visible}
        onClose={onClose}
        className={prefixCls}
        overlayClosable={overlayClosable}
        transitionName='sty-zoom'
        position='center'
      >
        {title && <div className={`${prefixCls}-header`}>{title}</div>}
        {children && <div className={`${prefixCls}-body`}>{children}</div>}
        {this.renderFooter()}
      </Popup>
    );
  }
}

Modal.alert = function ({ title, actions, message }) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }
  ReactDOM.render((
    <Modal
      visible={true}
      title={title}
      onClose={close}
      footer={actions}
    >
      {message}
    </Modal>
  ), div);
  return {
    close
  };
};

export default Modal;
