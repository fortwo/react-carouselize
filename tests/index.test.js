import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';

// Components
import Carouselize from '../src/';

const getSlides = wrapper => wrapper.querySelectorAll('.slide');
const getActiveSlides = wrapper => wrapper.querySelectorAll('.slide.selected');
const getBullets = wrapper => wrapper.querySelectorAll('.bullet');
const getActiveBullets = wrapper => wrapper.querySelectorAll('.bullet.selected');
const getReadySlides = wrapper => wrapper.querySelectorAll('.slide.ready');
const getPreviousSlides = wrapper => wrapper.querySelectorAll('.slide.previous');

describe('mount <Carouselize />', () => {
  /** @type {RenderResult} */
  let wrapper;

  beforeEach(() => {
    act(() => {
      wrapper = render(
        <Carouselize>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carouselize>
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should move to the last slide on last bullet click', () => {
    const bullets = wrapper.container.querySelectorAll('.bullet');
    const lastBullet = bullets.item(bullets.length - 1);

    act(() => {
      fireEvent(lastBullet, new MouseEvent('click', { bubbles: true }));
    });

    const selectedSlide = getActiveSlides(wrapper.container).item(0);
    expect(selectedSlide.innerHTML).toBe('3');
  });

  it('should start from index 0', () => {
    const selected = getActiveSlides(wrapper.container);

    expect(selected).toHaveLength(1);
    expect(selected.item(0).innerHTML).toBe('1');
  });

  it("should have 3 'slide' children", () => {
    expect(getSlides(wrapper.container)).toHaveLength(3);
  });

  it("should always have a 'selected' child", () => {
    expect(getActiveSlides(wrapper.container)).toHaveLength(1);
  });

  it("should always have a 'previous' child", () => {
    expect(getPreviousSlides(wrapper.container)).toHaveLength(1);
  });

  it("should always have a N-2 'ready' children", () => {
    const count = getSlides(wrapper.container).length;
    expect(getReadySlides(wrapper.container)).toHaveLength(count - 2);
  });

  it('should have 3 bullets', () => {
    expect(getBullets(wrapper.container)).toHaveLength(3);
  });

  it("should always have 1 'selected' bullet", () => {
    expect(getActiveBullets(wrapper.container)).toHaveLength(1);
  });

  it('should move to the next slide on right arrow press', () => {
    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('1');

    act(() => {
      fireEvent(document, new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    });

    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('2');

    act(() => {
      fireEvent(document, new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    });

    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('3');
  });

  it('should move to the previous slide on left arrow press', () => {
    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('1');

    act(() => {
      fireEvent(document, new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    });

    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('3');
  });

  it('does not do anything if other keys are pressed', () => {
    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('1');

    act(() => {
      fireEvent(document, new KeyboardEvent('keydown', { key: 'A' }));
    });

    expect(getActiveSlides(wrapper.container).item(0).innerHTML).toBe('1');
  });

  it('disable key listener on component unmount', () => {
    jest.spyOn(document, 'removeEventListener');
    wrapper.unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.anything()
    );
  });
});
