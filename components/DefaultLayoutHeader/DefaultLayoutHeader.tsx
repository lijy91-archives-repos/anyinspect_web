import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Divider, Drawer, Layout as LayoutComp, Menu } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { Container, SelectLanguage } from '../../components';

import './DefaultLayoutHeader.less';

const DefaultLayoutHeader = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <LayoutComp.Header>
        <Container>
          <Link href="/">
            <div className="brand">
              <img src="/images/icon.png" />
              <label>{'AnyInspect'}</label>
            </div>
          </Link>
          <div style={{ flex: 1 }}>
            <Menu
              mode="horizontal"
              openKeys={[router.pathname]}
              selectedKeys={[router.pathname]}
            >
              <Menu.Item key="/docs">
                <Link href="/docs">
                  <a>Docs</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/release-notes">
                <Link href="/release-notes">
                  <a>ReleaseNotes</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/faq">
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="btn-github">
            {/* <SelectLanguage />
            <Divider
              type="vertical"
              style={{
                marginRight: '24px',
                height: '32px',
              }}
            /> */}
            <Button type="primary">
              <a
                target="__blank"
                href="https://github.com/anyinspect/anyinspect_app"
              >
                GitHub
              </a>
            </Button>
          </div>
          <button
            className="drawer-trigger"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <img src="/images/ic_drawer_close.png" />
            ) : (
              <img src="/images/ic_drawer_menu.png" />
            )}
          </button>
        </Container>
      </LayoutComp.Header>
      <div className="layout-drawer-root">
        <div className="layout-drawer-wrapper">
          <Drawer
            placement="top"
            closable={false}
            onClose={() => setCollapsed(false)}
            visible={collapsed}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={600}
          >
            <Menu openKeys={[router.pathname]} selectedKeys={[router.pathname]}>
              <Menu.Item key="/">
                <Link href="/">
                  <a>Home</a>
                </Link>
                <RightOutlined />
              </Menu.Item>
              <Menu.Item key="/docs">
                <Link href="/docs">
                  <a>Docs</a>
                </Link>
                <RightOutlined />
              </Menu.Item>
              <Menu.Item key="/release-notes">
                <Link href="/release-notes">
                  <a>Release Notes</a>
                </Link>
                <RightOutlined />
              </Menu.Item>
              <Menu.Item key="/faq">
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
                <RightOutlined />
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default DefaultLayoutHeader;
