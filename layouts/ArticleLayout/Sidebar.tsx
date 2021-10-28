import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import './Sidebar.less';
import { Menu, Image, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { SubMenu } = Menu;

const sidebar: any = {
  '/docs': [
    {
      key: 'Getting Started',
      children: [
        {
          title: 'Introduction',
          path: '/docs',
        },
      ],
    },
    {
      key: 'plugins',
      children: [
        {
          title: 'Network',
          path: '/docs/plugins/network',
        },
        {
          title: 'SharedPreferences',
          path: '/docs/plugins/shared_preferences',
        },
      ],
    },
    {
      key: 'about',
      children: [
        {
          title: 'Sponsor',
          path: '/sponsor',
        },
      ],
    },
  ],
};

// interface SidebarProps {
// }

const Sidebar = () => {
  const router = useRouter();
  if (!router.pathname.startsWith('/docs')) return <div />;

  return (
    <div className="sidebar">
      <div className="mobile">
        <Dropdown
          overlay={
            <Menu defaultSelectedKeys={[router.pathname]} defaultOpenKeys={[]}>
              {sidebar['/docs'].map((section: any) => {
                const { key, key: title, children: subPaths } = section;
                return (
                  <Menu.ItemGroup key={key} title={title.toUpperCase()}>
                    {subPaths.map((subPath: any) => {
                      return (
                        <Menu.Item key={subPath.path}>
                          <Link href={`${subPath.path}`}>
                            <a>{subPath.title}</a>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.ItemGroup>
                );
              })}
            </Menu>
          }
        >
          <a
            className="ant-dropdown-link"
            style={{
              width: '100%',
              border: '1px solid #ced4da',
            }}
            onClick={(e) => e.preventDefault()}
          >
            Navigation
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="desktop">
        <Menu
          defaultSelectedKeys={[router.pathname]}
          defaultOpenKeys={sidebar['/docs'].map((e) => e.key)}
          mode={'inline'}
        >
          {sidebar['/docs'].map((section: any) => {
            const { key, key: title, children: subPaths } = section;
            return (
              <SubMenu key={key} title={title.toUpperCase()}>
                {subPaths.map((subPath: any) => {
                  return (
                    <Menu.Item key={subPath.path}>
                      <Link href={`${subPath.path}`}>
                        <a>{subPath.title}</a>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
