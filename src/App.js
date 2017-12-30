import React, { Component } from 'react';
import './App.css';
import { cellArray, setCell } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellCount: 0,
      cells: null
    };
  }

  componentWillMount() {
    this.recreateCells();
  }
  componentDidMount() {
    window.addEventListener('resize', this.recreateCells);
    /*
    this.interval = setInterval(
      () => updateCells(this.state.cells),
      500
    );
    */
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.recreateCells);
    //clearInterval(this.interval);
  }

  recreateCells = () => {
    const cellsWidth = Math.floor(window.innerWidth / 12);
    const cellsHeight = Math.floor(window.innerHeight / 12);

    const cellCount = cellsWidth * cellsHeight;
    const cells = cellArray(cellsWidth, cellsHeight);

    this.setState({ cellCount, cells });
  }

  cellClick = (e, index) => {
    const width = this.state.cells[0].length;
    const y = Math.floor(index / width);
    const x = index % width;

    const val = !e.target.className.includes('active');

    this.setState((prevState) => ({
      cells: setCell(prevState.cells, y, x, val)
    }));
  }

  render() {
    const flattenedCells = [].concat.apply([], this.state.cells);

    return (
      <div className="App">

        {flattenedCells.map((e, i) => (
          <div className={e ? "cell active" : "cell"}
            onClick={(e) => this.cellClick(e, i)}
            key={i}
          />
        ))}

      </div>
    );
  }
}

export default App;
