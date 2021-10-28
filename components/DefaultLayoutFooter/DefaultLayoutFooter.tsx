import React from 'react';
import { Typography, Layout as LayoutComp } from 'antd';

import { Container } from '../../components';

import './DefaultLayoutFooter.less';

const { Text } = Typography;

const DefaultLayoutFooter = () => {
  return (
    <LayoutComp.Footer>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Text>© 2021 LiJianying</Text>
      </Container>
    </LayoutComp.Footer>
  );
};

export default DefaultLayoutFooter;
