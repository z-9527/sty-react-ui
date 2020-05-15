import React, { Component } from 'react';
import { classnames } from '../_utils';
import Popup from '../popup';
import Icon from '../icon';
import Button from '../button';
import PropTypes from 'prop-types';
import './index.less';

class ActionSheet extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    visible: PropTypes.bool, // 是否显示弹框
    onClose: PropTypes.func,
    actions: PropTypes.array, // 面板选项列表
    title: PropTypes.string, // 顶部标题
    description: PropTypes.string, // 选项上方的描述信息
    cancelText: PropTypes.string, // 取消按钮文字
    onSelect: PropTypes.func // 选中的回调函数
  };

  static defaultProps = {
    prefixCls: 'sty-actionSheet',
    visible: false,
    onClose: () => {},
    actions: [],
    title: '',
    description: '',
    onSelect: () => {}
  };

  Header = () => {
    const { title, onClose, prefixCls } = this.props;
    if (title) {
      return (
        <div className={`${prefixCls}-header`}>
          {title}
          <Icon className='icon' type='cross' onClick={onClose} />
        </div>
      );
    }
  };

  Description = () => {
    const { description, prefixCls } = this.props;
    if (description) {
      return <div className={`${prefixCls}-description`}>{description}</div>;
    }
  };

  Actions = () => {
    const { prefixCls, actions, onSelect } = this.props;
    return actions.map((item, index) => (
      <Button
        onClick={() => {
          onSelect(index);
        }}
        key={index}
        loading={item.loading}
        disabled={item.disabled}
        className={classnames(
          'sty-hairline',
          'sty-hairline--top',
          item.className,
          `${prefixCls}-action`
        )}
      >
        {item.name && !item.loading && (
          <span
            className={`${prefixCls}-action-name`}
            style={{ color: item.color }}
          >
            {item.name}
          </span>
        )}
        {item.subname && !item.loading && (
          <span className={`${prefixCls}-action-subname`}>{item.subname}</span>
        )}
      </Button>
    ));
  };

  CancelText = () => {
    const { cancelText, prefixCls, onClose } = this.props;
    if (cancelText) {
      return (
        <div className={`${prefixCls}-cancelText`}>
          <Button onClick={onClose}>{cancelText}</Button>
        </div>
      );
    }
  };

  state = {};
  render() {
    const {
      prefixCls,
      className,
      visible,
      onClose,
      title,
      description,
      children,
      cancelText,
      actions,
      ...other
    } = this.props;
    return (
      <Popup
        className={prefixCls}
        visible={visible}
        position='bottom'
        round
        onClose={onClose}
        {...other}
      >
        {this.Header()}
        {this.Description()}
        {this.Actions()}
        {children}
        {this.CancelText()}
      </Popup>
    );
  }
}

export default ActionSheet;
