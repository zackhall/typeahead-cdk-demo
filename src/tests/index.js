import React from 'react';
import { shallow } from 'enzyme';
import Typeahead from '../index';
import { expect } from 'chai';
const { describe, it } = global;

describe('Typeahead', () => {
  it('should show the input', () => {
    const wrapper = shallow(<Typeahead list={[]} />);
    expect(wrapper.find('input')).to.have.length(1);
  });
});
