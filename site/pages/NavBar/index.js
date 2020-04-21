import React, { Component } from 'react';
import NavBar from '@components/nav-bar';
import renderHeader from '../renderHeader';

@renderHeader('NavBar')
class NavBarPage extends Component {
  state = { }
  render() {
    return (
      <div className='navbar-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <NavBar title='标题' leftText='返回' rightContent='搜索' onLeftClick={() => console.log('click')}/>
      </div>
    );
  }
}

export default NavBarPage;
