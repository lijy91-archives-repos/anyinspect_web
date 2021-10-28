import React from 'react';
import Head from 'next/head';
import { Layout as LayoutComp } from 'antd';
import classNames from 'classnames';

import { DefaultLayoutFooter, DefaultLayoutHeader } from '../../components';

import './index.less';

interface LayoutProps {
  children?: any;
  title?: string;
  className?: string;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  title = '',
}) => {
  return (
    <>
      <Head>
        <title>{`${title}`} - AnyInspect</title>
      </Head>
      <LayoutComp className={classNames('layout-default', className)}>
        <DefaultLayoutHeader />
        <LayoutComp.Content>{children}</LayoutComp.Content>
        <DefaultLayoutFooter />
      </LayoutComp>
    </>
  );
};

export default Layout;
