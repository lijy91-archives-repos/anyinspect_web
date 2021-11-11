import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Col, Layout as LayoutComp, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as Bowser from 'bowser';

import {
  Container,
  DefaultLayoutFooter,
  DefaultLayoutHeader,
} from '../components';
import { httpClient } from '../networking';

import './index.less';

const { Text, Title } = Typography;

const HomepagePage = () => {
  const [latestVersion, setLatestVersion] = useState<any>([]);

  const [platformVersionLinux, setPlatformVersionLinux] = useState<any>();
  const [platformVersionWindows, setPlatformVersionWindows] = useState<any>();
  const [platformVersionMacOS, setPlatformVersionMacOS] = useState<any>();
  const [platformVersion, setPlatformVersion] = useState<any>();

  const handleLoadData = async () => {
    const r2 = await httpClient.get('/versions/latest');
    setLatestVersion(r2.data);

    const _platformVersionLinux = r2.data.platforms.find(
      (e) => e.platform == 'linux'
    );
    const _platformVersionWindows = r2.data.platforms.find(
      (e) => e.platform == 'windows'
    );
    const _platformVersionMacOS = r2.data.platforms.find(
      (e) => e.platform == 'macos'
    );
    setPlatformVersionLinux(_platformVersionLinux);
    setPlatformVersionWindows(_platformVersionWindows);
    setPlatformVersionMacOS(_platformVersionMacOS);

    const parsedResult = Bowser.parse(window.navigator.userAgent);
    if (parsedResult.os.name === 'Linux') {
      setPlatformVersion(_platformVersionLinux);
    } else if (parsedResult.os.name === 'Windows') {
      setPlatformVersion(_platformVersionWindows);
    } else if (parsedResult.os.name === 'macOS') {
      setPlatformVersion(_platformVersionMacOS);
    }
  };

  useEffect(() => {
    setTimeout(() => handleLoadData(), 100);
  }, []);

  return (
    <>
      <Head>
        <title>AnyInspect - A tool for debugging your Flutter apps.</title>
      </Head>
      <LayoutComp className="layout-default page-homepage">
        <DefaultLayoutHeader />
        <LayoutComp.Content>
          <div className="section-jumbotron">
            <Container style={{ height: '100%' }}>
              <div
                className="introduction"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 32 }}>A tool for debugging your Flutter apps.</Text>
                <div style={{ height: 20 }} />
                <iframe
                  src={`https://ghbtns.com/github-btn.html?user=anyinspect&repo=anyinspect_app&type=star&count=true&size=large`}
                  frameBorder="0"
                  scrolling="0"
                  width="170"
                  height="30"
                  title="GitHub"
                ></iframe>
                <div style={{ height: 16 }} />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size={'large'}
                  href="#download"
                >
                  Download
                </Button>
                <div style={{ height: 10 }} />
                <Text type="secondary">
                  Version: {latestVersion.version} , Update Date:
                  {latestVersion.date}
                </Text>
                {/* <img
                  className="virtual-window app-screenshot"
                  src="/images/screenshots/anyinspect_app.png"
                /> */}
              </div>
            </Container>
          </div>
          <div className="section-plugins">
            <Container
              style={{
                paddingTop: 60,
                paddingBottom: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Title level={2}>Plugins</Title>
              <Row gutter={16}>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Network</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>SharedPreferences</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
                <Col className="gutter-row plugin_item" span={6}>
                  <img src="/images/placeholder.png" />
                  <Text>Plugin</Text>
                </Col>
              </Row>
            </Container>
          </div>
          <div id="download" className="section-downloads">
            <Container
              style={{
                paddingTop: 60,
                paddingBottom: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Row gutter={16} className="buttons">
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                >
                  <div className="download">
                    <div className="logo windows"></div>
                    <Button
                      disabled={!platformVersionWindows}
                      href={platformVersionWindows?.url}
                      target="_blank"
                      className="link-button"
                      type="primary"
                      icon={<DownloadOutlined />}
                      size={'large'}
                    >
                      Windows
                      <span style={{ display: 'block', fontSize: 12 }}>
                        Windows 10
                      </span>
                    </Button>
                  </div>
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                >
                  <div className="download">
                    <div className="logo linux"></div>
                    <Button
                      disabled={!platformVersionLinux}
                      href={platformVersionLinux?.url}
                      target="_blank"
                      className="link-button"
                      type="primary"
                      icon={<DownloadOutlined />}
                      size={'large'}
                    >
                      Linux
                      <span style={{ display: 'block', fontSize: 12 }}>
                        Debian, Ubuntu
                      </span>
                    </Button>
                  </div>
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                >
                  <div className="download">
                    <div className="logo mac"></div>
                    <Button
                      disabled={!platformVersionMacOS}
                      href={platformVersionMacOS?.url}
                      target="_blank"
                      className="link-button"
                      type="primary"
                      icon={<DownloadOutlined />}
                      size={'large'}
                    >
                      Mac
                      <span style={{ display: 'block', fontSize: 12 }}>
                        macOS 10.15+
                      </span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section-coming-soon">
            <Container>
              <Text>🎉 🎉 🎉</Text>
            </Container>
          </div>
        </LayoutComp.Content>
        <DefaultLayoutFooter />
      </LayoutComp>
    </>
  );
};

export default HomepagePage;
