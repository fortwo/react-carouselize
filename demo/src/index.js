import React, { Component } from 'react';
import { render } from 'react-dom';

// Components
import ReactCarouselize from '../../src';

// Style
import './index.css';

class Demo extends Component {
  render() {
    return (
      <div className="app">
        <ReactCarouselize animation="h-scroll">
          <div className="first">1</div>
          <div className="second">2</div>
          <div className="third">3</div>
          <div className="fourth">4</div>
        </ReactCarouselize>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'))
