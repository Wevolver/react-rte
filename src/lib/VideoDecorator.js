/* @flow */
import React from 'react';
// import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock, ContentState} from 'draft-js';

type Props = {
  children: ReactNode,
  entityKey: string,
  contentState: ContentState,
  decoratedText: string
};

const VIDEO_REGEX = /@youtube\(.+\)/g;

type EntityRangeCallback = (start: number, end: number) => void;

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function Video(props: Props) {
  const rgx = /@youtube\((.+)\)/g;
  const matchArr = rgx.exec(props.decoratedText);
  const videoId = matchArr[1];
  return (
    <div
      style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: 12}}
    >
      <iframe
        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0`}
        frameBorder="0"
        allowFullScreen>
      </iframe>
    </div>
  );
}

function videoStrategy(contentBlock: ContentBlock, callback: EntityRangeCallback, contentState: ?ContentState) {
  findWithRegex(VIDEO_REGEX, contentBlock, callback);
}

export default {
  strategy: videoStrategy,
  component: Video,
};
