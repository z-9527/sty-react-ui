import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class Test extends Component {
  static propTypes = {
    prefixCls: PropTypes.string
  };

  static defaultProps = {
    prefixCls: 'sty-test'
  };

  state = {};
  render() {
    const { prefixCls, className, ...other } = this.props;
    return <div></div>;
  }
}

export default Test;
