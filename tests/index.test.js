import React from 'react';
import { mount } from 'enzyme';

// Components
import Carouselize from '../src/';

describe('<Carouselize />', () => {
  const wrapper = mount(
    <Carouselize>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carouselize>
  );

  it('should start from index 0', () => {
    const wrapper = mount(
      <Carouselize />
    );
    expect(wrapper.state().current).toBe(0);
  });

  it("should have 3 'slide' children", () => {
    expect(wrapper.find('.slide')).toHaveLength(3);
  });

  it("should always have a 'selected' child", () => {
    expect(wrapper.find('.slide.selected')).toHaveLength(1);
  });

  it("should always have a 'previous' child", () => {
    expect(wrapper.find('.slide.previous')).toHaveLength(1);
  });

  it("should always have a N-2 'ready' children", () => {
    const count = wrapper.props().children.length;
    expect(wrapper.find('.slide.ready')).toHaveLength(count - 2);
  });

  it('should have 3 bullets', () => {
    expect(wrapper.find('.bullet')).toHaveLength(3);
  });

  it("should always have 1 'selected' bullet", () => {
    expect(wrapper.find('.bullet.selected')).toHaveLength(1);
  });
});
