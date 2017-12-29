import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: 0
    };
  }

  componentWillMount() {
    this.updateCells();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateCells);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCells);
  }

  updateCells = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cells = Math.floor(width / 12) * Math.floor(height / 12);

    this.setState({ cells });
  }

  render() {
    return (
      <div className="App">

        {Array(this.state.cells).fill('').map((e, i) => (
          <div className="App-cell"
            key={i}
          />
        ))}

      </div>
    );
  }
}

export default App;
