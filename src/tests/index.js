import React from 'react';
import { shallow } from 'enzyme';
import Typeahead from '../index';
import { expect } from 'chai';
const { describe, it } = global;

describe('Typeahead', () => {
  it('should show the input element.', () => {
    const wrapper = shallow(<Typeahead list={[]} />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should show the available options.', () => {
    const wrapper = shallow(
      <Typeahead
        list={['AngularJS', 'React', 'Vue.js']}
        showOnEmpty
      />
    );
    expect(wrapper.find('li')).to.have.length(3);
  });

  it('should filter list to match search val.', () => {
    const wrapper = shallow(
      <Typeahead
        list={['AngularJS', 'React', 'Redux']}
        initialSearchVal="Re"
      />
    );
    expect(wrapper.find('li')).to.have.length(2);
  });
});
