import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Typeahead from '../index';
import jsLibs from '../jsLibs';

storiesOf('Typeahead', module)
  .add('default view', () => (
    <Typeahead list={jsLibs.list} />
  ));
