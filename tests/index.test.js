import React from 'react';
import { mount, shallow } from 'enzyme';

// Components
import Carouselize from '../src/';

describe('mount <Carouselize />', () => {
  const wrapper = mount(
    <Carouselize>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carouselize>
  );

  it('should start from index 0', () => {
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

  it('should move to the last slide on last bullet click', () => {
    const lastBullet = wrapper.find('.bullet:last-child');
    lastBullet.simulate('click');
    expect(wrapper.state().current).toBe(2);
  });
});

describe('shallow <Carouselize />', () => {
  let eventMap;
  let wrapper;

  beforeEach(() => {
    eventMap = {
      keydown: null,
    };
  
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });
  
    wrapper = shallow(
      <Carouselize>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carouselize>
    );
  });
  
  it('should move to the next slide on right arrow press', () => {
    const { current } = wrapper.state();
    eventMap.keydown({ keyCode: 39 });
    expect(wrapper.state().current).toBe(current + 1);
  });

  it('should move to the previous slide on left arrow press', () => {
    eventMap.keydown({ keyCode: 37 });
    const slides = wrapper.find('.slide').length;
    expect(wrapper.state().current).toBe(slides - 1);
  });

  it('do anything if other keys are pressed', () => {
    eventMap.keydown({});
    expect(wrapper.state().current).toBe(wrapper.state().current);
  });

  it('disable key listener on component unmount', () => {
    wrapper.instance().componentWillUnmount();

    eventMap.keydown({ keyCode: 37 });
    expect(wrapper.state().current).toBe(wrapper.state().current);
  });
});
