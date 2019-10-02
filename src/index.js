import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Utils
import classNames from "classnames";

// Style
import "./index.css";

const Carouselize = props => {
 
  let [state, setState] = useState({ current: 0 });
  useEffect(() => {
    if (props.enableKeys) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      clearTimeout(begin);
      if (props.enableKeys) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [state]);

  const handleKeyDown = e => {
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
  };

  let begin = setTimeout(() => {
    setState({
      current:
        state.current === props.children.length - 1 ? 0 : state.current + 1
    });
  }, props.duration);

  const goTo = current => {
    if (props.enableNavigation) {
      setState({
        current
      });
    }
  };

  const goToPrev = () => {
    setState({
      current:
        state.current === 0 ? props.children.length - 1 : state.current - 1
    });
  };

  const goToNext = () => {
    setState({
      current:
        state.current === props.children.length - 1 ? 0 : state.current + 1
    });
  };

  const { animation, children, navigation, enableNavigation } = props;
  const { current } = state;

  const items = React.Children.toArray(children);

  return (
    <div className={classNames("carouselize", animation)}>
      {items.map((child, index) => {
        const previous =
          (current === 0 && index === children.length - 1) ||
          current === index + 1
            ? "previous"
            : "";
        const selected = current === index ? "selected" : "";
        const ready = !previous && !selected ? "ready" : "";
        return React.cloneElement(child, {
          key: index,
          className: classNames(
            child.props.className,
            "slide",
            previous,
            selected,
            ready
          )
        });
      })}

      {navigation && (
        <nav
          className={classNames(
            "navigation",
            navigation,
            enableNavigation && "enabled"
          )}
        >
          {items.map((child, index) => {
            const selected = current === index ? "selected" : "";
            return (
              <div
                key={index}
                className={classNames("bullet", selected)}
                onClick={() => goTo(index)}
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
  animation: PropTypes.oneOf(["v-scroll", "h-scroll", "fade"]),
  navigation: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  enableNavigation: PropTypes.bool,
  enableKeys: PropTypes.bool
};

Carouselize.defaultProps = {
  duration: 5000,
  animation: "v-scroll",
  navigation: "left",
  enableNavigation: true,
  enableKeys: true
};

export default Carouselize;

