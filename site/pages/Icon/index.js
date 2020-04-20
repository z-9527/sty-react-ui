import React, { Component } from 'react';
import Tabs from '@components/tabs';
import Icon from '@components/icon';
import data from './data';
import './index.less';
console.log('data: ', data);

const TabPane = Tabs.TabPane;

class IconPage extends Component {
  state = {}
  render() {
    return (
      <div className='icon-demo gray-bg'>
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
