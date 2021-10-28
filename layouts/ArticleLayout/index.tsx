import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Container } from '../../components';
import DefaultLayout from '../DefaultLayout';

import MarkdownCode from './MarkdownCode';
import MarkdownExtYouTube from './MarkdownExtYouTube';
import MarkdownHeading from './MarkdownHeading';
import MarkdownWrapper from './MarkdownWrapper';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

import './index.less';

const preToCodeBlock = (preProps: any) => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: match != null ? match[1] : '',
      ...props,
    };
  }
  return undefined;
};

interface ArticleProps {
  children?: any;
}

const ArticlePage: React.FunctionComponent<ArticleProps> = ({ children }) => {
  return (
    <MDXProvider
      components={{
        wrapper: (props: any) => {
          const { frontMatter, tocTree } = props;
          return (
            <DefaultLayout className="layout-article" title={frontMatter.title}>
              <Container className="layout-article-container">
                <Sidebar />
                <MarkdownWrapper {...props} tocTree={tocTree} />
                {/* <TableOfContents tocTree={tocTree} /> */}
              </Container>
            </DefaultLayout>
          );
        },
        h1: (props) => {
          return <MarkdownHeading.H1 {...props} />;
        },
        h2: (props) => {
          return <MarkdownHeading.H2 {...props} />;
        },
        h3: (props) => {
          return <MarkdownHeading.H3 {...props} />;
        },
        h4: (props) => {
          return <MarkdownHeading.H4 {...props} />;
        },
        h5: (props) => {
          return <MarkdownHeading.H5 {...props} />;
        },
        pre: (props) => {
          let codeProps = preToCodeBlock(props);
          return <MarkdownCode {...codeProps} />;
        },
        inlineCode: (props) => {
          const { children: youtubeUrl } = props;
          if (
            typeof youtubeUrl === 'string' &&
            youtubeUrl.indexOf('youtube:') >= 0
          ) {
            return <MarkdownExtYouTube {...props} />;
          }

          return <code {...props} />;
        },
      }}
    >
      {children}
    </MDXProvider>
  );
};

export default ArticlePage;
