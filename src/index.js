import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Utils
import classNames from 'classnames';

// Style
import './index.css';

const Carouselize = props => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeout = useRef(0);

  const { animation, children, duration, navigation, enableNavigation } = props;

  const doSetTimeout = () => {
    timeout.current = setTimeout(() => {
      setCurrentSlide(curr => (curr === children.length - 1 ? 0 : curr + 1));
    }, duration);
  };

  const goTo = slideIndex => {
    setCurrentSlide(slideIndex);
  };

  const goToPrev = useCallback(() => {
    setCurrentSlide(curr => (curr - 1 < 0 ? children.length - 1 : curr - 1));
  }, [children]);

  const goToNext = useCallback(() => {
    setCurrentSlide(curr => (curr + 1) % children.length);
  }, [children]);

  const handleKeyDown = useCallback(
    e => {
      switch (e.keyCode) {
        case 37:
          goToPrev();
          break;

        case 39:
          goToNext();
          break;

        default:
          break;
      }
    },
    [goToNext, goToPrev]
  );

  //Clear and Set timeout when currentSlide is updated
  useEffect(() => {
    clearTimeout(timeout.current);
    doSetTimeout();
  }, [currentSlide]);

  //Bind keydown listener on mount, remove listener on unmount (or when handleKeyDown changes)
  useEffect(() => {
    if (props.enableKeys) {
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  // Remove timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className={classNames('carouselize', animation)}>
      {children.map((child, index) => {
        const previous =
          (currentSlide === 0 && index === children.length - 1) ||
          currentSlide === index + 1
            ? 'previous'
            : '';
        const selected = currentSlide === index ? 'selected' : '';
        const ready = !previous && !selected ? 'ready' : '';
        return React.cloneElement(child, {
          key: index,
          className: classNames(
            child.props.className,
            'slide',
            previous,
            selected,
            ready
          ),
        });
      })}

      {navigation && (
        <nav
          className={classNames(
            'navigation',
            navigation,
            enableNavigation && 'enabled'
          )}
        >
          {children.map((child, index) => {
            const selected = currentSlide === index ? 'selected' : '';
            return (
              <div
                key={index}
                className={classNames('bullet', selected)}
                onClick={() => {
                  if (enableNavigation) {
                    goTo(index);
                  }
                }}
              >
                &bull;
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
};

Carouselize.propTypes = {
  duration: PropTypes.number,
  animation: PropTypes.oneOf(['v-scroll', 'h-scroll', 'fade']),
  navigation: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  enableNavigation: PropTypes.bool,
  enableKeys: PropTypes.bool,
};

Carouselize.defaultProps = {
  duration: 5000,
  animation: 'v-scroll',
  navigation: 'left',
  enableNavigation: true,
  enableKeys: true,
};

export default Carouselize;
