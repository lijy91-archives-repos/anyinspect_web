import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import { Container } from '..';
import { httpClient } from '../../networking';

import './index.less';

const { Text, Title, Link } = Typography;

const ReleaseNotes = () => {
  const [versions, setVersions] = useState<Array<any>>([]);

  const handleLoadData = async () => {
    const resp = await httpClient.get('/versions');
    setVersions(resp.data);
  };

  useEffect(() => {
    setTimeout(() => handleLoadData(), 100);
  }, []);
  const platformBadges = {
    linux:
      'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
    macos:
      'https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0',
    windows:
      'https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white',
  };
  return (
    <div className="comp-release-notes">
      <Container>
        {versions.map((version) => (
          <div id={`${version.version}`}>
            <Title level={2}>{version.version} </Title>
            <Text
              type="secondary"
              style={{ fontSize: 14, fontWeight: 'normal' }}
            >
              {version.date}
            </Text>
            <Title level={4}>Download</Title>
            <div>
              <img src={``} />
              <img src={``} />
              {version.platforms.map((e) => (
                <Link href={e.url}>
                  <img
                    src={platformBadges[e.platform]}
                    style={{ marginRight: 10 }}
                  />
                </Link>
              ))}
            </div>
            <Title level={4}>Changelog</Title>
            <div>
              <ul>
                {version.changelogs.map((e) => (
                  <li>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default ReleaseNotes;
