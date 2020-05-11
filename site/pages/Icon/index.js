import React, { Component } from 'react';
import { Tabs, Icon } from '@components';
import data from './data';
import renderHeader from '../renderHeader';
import './index.less';

const TabPane = Tabs.TabPane;

@renderHeader('Icon')
class IconPage extends Component {
  state = {}
  render() {
    return (
      <div className='icon-demo demo-box'>
        <Tabs animated={true}>
          {data.map(item => (
            <TabPane title={item.title} key={item.title}>
              <div className="icons-box">
                {item.icons.map(i => (
                  <div className='icon-box' key={i}>
                    <Icon type={i} />
                    <span className='icon-name'>{i}</span>
                  </div>
                ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default IconPage;
