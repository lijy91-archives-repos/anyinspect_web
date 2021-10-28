import React from 'react';
import { Divider } from 'antd';

import TableOfContents from './TableOfContents';

import './MarkdownWrapper.less';

const MarkdownWrapper = (props: any) => {
  const { frontMatter, tocTree, children } = props;
  return (
    <div className="wrapper">
      <h1 className="title">{frontMatter.title}</h1>
      <span>{frontMatter.date || ''}</span>
      <Divider />
      <TableOfContents tocTree={tocTree} />
      <div className="content markdown-body">{children}</div>
    </div>
  );
};

export default MarkdownWrapper;
