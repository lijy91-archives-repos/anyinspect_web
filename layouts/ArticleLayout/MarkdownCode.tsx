import React from 'react';
import prism from 'prismjs';
import classnames from 'classnames';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-bash';
// import 'prismjs/themes/prism.css';
// import 'prismjs/themes/prism-coy.css';
// import 'prismjs/themes/prism-dark.css';
// import 'prismjs/themes/prism-funky.css';
// import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-solarizedlight.css';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/themes/prism-twilight.css';
import 'prism-themes/themes/prism-vs.css';

import './MarkdownCode.less';

type MarkdownCodeProps = JSX.IntrinsicElements['div'] & {
  codeString: string;
  language: string;
};

const MarkdownCode = (props: MarkdownCodeProps) => {
  const { language, codeString } = props;

  let html = prism.highlight(codeString, prism.languages[language], language);

  return (
    <div className={'code-wrapper'}>
      <pre
        className={classnames('react-prism', `language-${language}`)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownCode;
