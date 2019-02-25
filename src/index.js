import React from 'react';
import PropTypes from 'prop-types';

// Utils
import classNames from 'classnames';

// Style
import './index.css';

class Carouselize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
    };

    this.setInterval = this.setInterval.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.goTo = this.goTo.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
  }

  componentDidMount() {
    this.setInterval();

    if (this.props.enableKeys) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    if (this.props.enableKeys) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 37:
        this.goToPrev();
        break;

      case 39:
        this.goToNext();
        break;

      default:
        break;
    }
  }

  setInterval() {
    this.interval = setInterval(() => {
      this.setState({
        current: this.state.current === (this.props.children.length - 1) ? 0 : this.state.current + 1,
      });
    }, this.props.duration);
  }

  goTo(current) {
    if (this.props.enableNavigation) {
      clearInterval(this.interval);
  
      this.setState(
        {
          current,
        },
        () => {
          this.setInterval();
        },
      );
    }
  }

  goToPrev() {
    clearInterval(this.interval);

    this.setState(
      {
        current: this.state.current === 0 ? this.props.children.length - 1 : this.state.current - 1,
      },
      () => {
        this.setInterval();
      },
    );
  }

  goToNext() {
    clearInterval(this.interval);

    this.setState(
      {
        current: this.state.current === this.props.children.length - 1 ? 0 : this.state.current + 1,
      },
      () => {
        this.setInterval();
      },
    );
  }

  render() {
    const { animation, children, navigation, enableNavigation } = this.props;
    const { current } = this.state;

    const items = React.Children.toArray(children);

    return (
      <div className={classNames('carouselize', animation)}>
        {items.map((child, index) => {
          const previous = (current === 0 && index === children.length - 1) || current === index + 1 ? 'previous' : '';
          const selected = current === index ? 'selected' : '';
          const ready = !previous && !selected ? 'ready' : '';
          return React.cloneElement(child, {
            key: index,
            className: classNames(child.props.className, 'slide', previous, selected, ready),
          });
        })}

        {navigation &&
          <nav className={classNames('navigation', navigation, enableNavigation && 'enabled')}>
            {items.map((child, index) => {
              const selected = current === index ? 'selected' : '';
              return (
                <div key={index} className={classNames('bullet', selected)} onClick={() => this.goTo(index)}>&bull;</div>
              );
            })}
          </nav>
        }
      </div>
    );
  }
}

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
