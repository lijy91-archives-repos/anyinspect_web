import React from 'react';
import { Typography } from 'antd';

import './TableOfContents.less';

const { Link } = Typography;
interface TableOfContentsProps {
  tocTree?: any;
}

const TableOfContents = ({ tocTree }: TableOfContentsProps) => {
  if ((tocTree || []).length === 0) return <div />;

  return (
    <div className="toc">
      {(tocTree || []).length === 0 ? null : <label>Table of contents</label>}
      <ol>
        {(tocTree || []).map((item: any) => (
          <li key={item.slug}>
            <Link href={`#${encodeURI(item.slug)}`}>{item.content}</Link>
            {item.children.length === 0 ? null : (
              <ul>
                {(item.children || []).map((childItem: any) => (
                  <li key={`toc-${childItem.slug}`}>
                    <Link href={`#${encodeURI(childItem.slug)}`}>
                      {childItem.content}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TableOfContents;
