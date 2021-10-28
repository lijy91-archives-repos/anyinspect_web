import React from 'react';
import App from 'next/app';
import { Router, withRouter } from 'next/router';
import { ConfigProvider } from 'antd';
import { ArticleLayout } from '../layouts';

import '../styles/global.less';

// Router.events.on('routeChangeComplete', (url) => {});

const antdCustomConfig = {
  autoInsertSpaceInButton: false,
};

class MyApp extends App<any> {
  _renderPageComponent() {
    const { Component, pageProps } = this.props;
    if (Component?.isMDXComponent) {
      return (
        <ArticleLayout>
          <Component {...pageProps} />
        </ArticleLayout>
      );
    }

    return <Component {...pageProps} />;
  }

  render() {
    return (
      <ConfigProvider {...antdCustomConfig}>
        {this._renderPageComponent()}
      </ConfigProvider>
    );
  }
}

export default withRouter(MyApp);
