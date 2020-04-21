import React, { Component } from 'react';
import NavBar from '@components/nav-bar';
import { createHashHistory } from 'history';

const history = createHashHistory();

function renderHeader(title) {
  return function (C) {
    // eslint-disable-next-line react/display-name
    return class extends Component {
      componentDidMount() {
        document.title = title || 'sty-react-ui';
      }

      goBack() {
        history.goBack();
      }

      render() {
        return (
          <div>
            <NavBar onLeftClick={this.goBack} title={title} />
            <C {...this.props} />
          </div>
        );
      }
    };
  };
}

export default renderHeader;
