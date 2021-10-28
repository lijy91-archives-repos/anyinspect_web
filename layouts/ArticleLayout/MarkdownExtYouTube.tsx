import React from 'react';

import './MarkdownExtYouTube.less';

type MarkdownExtYouTubeProps = JSX.IntrinsicElements['div'] & {
  children: string;
};

const MarkdownExtYouTube = (props: MarkdownExtYouTubeProps) => {
  const { children, ...restProps } = props;

  return (
    <div className={'ext-youtube-wrapper'} {...restProps}>
      <iframe
        width="100%"
        height="100%"
        src={`${props.children.replace(
          'youtube: https://youtu.be/',
          'https://www.youtube.com/embed/'
        )}?rel=0`}
      ></iframe>
    </div>
  );
};

export default MarkdownExtYouTube;
