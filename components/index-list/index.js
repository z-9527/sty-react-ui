import React, { Component } from 'react';
import { classnames, throttle } from '../_utils';
import PropTypes from 'prop-types';
import Section from './Section';
import './index.less';

class IndexList extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    sidebarStyle: PropTypes.object,
    sticky: PropTypes.bool // 是否开启锚点自动吸顶
  }

  static defaultProps = {
    prefixCls: 'sty-indexlist',
    sidebarStyle: {},
    sticky: true
  }

  state = {
    activeIndex: null,
    moving: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.sections = document.getElementsByClassName(`${this.props.prefixCls}-section`);
    this.firstTitle = document.getElementsByClassName(`${this.props.prefixCls}-section-title`)[0];
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  renderSidebar = () => {
    const { children, prefixCls } = this.props;
    const { activeIndex, moving } = this.state;

    return React.Children.map(children, (item, num) => {
      const index = item.props.index;
      const sidebarcls = {
        [`${prefixCls}-sidebar-item`]: true,
        [`${prefixCls}-sidebar-item-active`]: activeIndex === index
      };
      if (item.type === Section) {
        return <li data-num={num} onClick={() => this.scrollToElement(num)} className={classnames(sidebarcls)
        }> {index}
          {activeIndex === index && moving && <div className={`${prefixCls}-sidebar-item-moving`}>{index.slice(0, 1)}</div>}
        </li >;
      }
    });
  }

  scrollToElement = (num) => {
    const maxScroll = document.documentElement.offsetHeight - window.innerHeight; // 页面最大滚动距离
    const target = this.sections[num];
    const scrollTop = Math.max(0, Math.min(maxScroll, target.offsetTop));
    document.documentElement.scrollTop = scrollTop;
    document.body.scrollTop = scrollTop;
  }

  renderChildren = () => {
    const { children, prefixCls, sticky } = this.props;
    const { activeIndex } = this.state;
    return React.Children.map(children, item => {
      if (item.type === Section) {
        return React.cloneElement(item, { ...item.props, prefixCls, activeIndex, sticky, firstTitle: this.firstTitle });
      }
    });
  }

  onScroll = throttle((e) => {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 解决第一次滚动时会有弹跳的bug
    if (this.state.activeIndex) {
      scrollTop += this.firstTitle.offsetHeight;
    }
    for (const section of this.sections) {
      if (scrollTop >= section.offsetTop && scrollTop < section.offsetTop + section.offsetHeight) {
        this.setState({
          activeIndex: section.dataset.index
        });
        return;
      }
    }
    this.setState({
      activeIndex: null
    });
  })

  onSideTouchStart = (e) => {
    this.setState({
      moving: true
    });
  }

  onSideTouchMove = throttle((e) => {
    const { clientX, clientY } = e.touches[0];
    const target = document.elementFromPoint(clientX, clientY);
    if (target) {
      const { num } = target.dataset;
      num && this.scrollToElement(num);
    }
  }, 100)

  onSideTouchEnd = () => {
    this.setState({
      moving: false
    });
  }

  render() {
    const { className, style, prefixCls, sidebarStyle } = this.props;
    return (
      <div className={classnames(prefixCls, className)} style={style}>
        <ul
          className={`${prefixCls}-sidebar`}
          style={sidebarStyle}
          onTouchStart={this.onSideTouchStart}
          onTouchMove={this.onSideTouchMove}
          onTouchEnd={this.onSideTouchEnd}
          ref={el => this.sidebar = el}
        >
          {this.renderSidebar()}
        </ul>
        <ul className={`${prefixCls}-content`} onTouchMove={this.onScroll}>
          {this.renderChildren()}
        </ul>
      </div>
    );
  }
}

IndexList.Section = Section;
IndexList.Cell = Section.Cell;

export default IndexList;
