import React, { Component } from 'react';
import NavBar from '@components/nav-bar';

class NavBarPage extends Component {
  state = { }
  render() {
    return (
      <div className='navbar-demo page-box'>
        <div className='section-title-pl'>基本用法</div>
        <NavBar title='标题' leftText='返回' rightContent='搜索' onLeftClick={() => console.log('click')}/>
      </div>
    );
  }
}

export default NavBarPage;
