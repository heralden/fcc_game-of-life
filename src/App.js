import React, { Component } from 'react';
import './App.css';
import { 
  setCell, 
  updateCells, 
  recreateCells
} from './actions';
import flatten from 'lodash/flatten';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: null,
      gen: 0
    };
  }

  componentWillMount() {
    this.handleResize();
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.interval = setInterval(
      () => {
        this.setState((prevState) => {
          const newCells = updateCells(prevState.cells);

          let nextGen = 0;
          if (flatten(newCells).some(e => e === true))
            nextGen = prevState.gen + 1;

          return {
            cells: newCells,
            gen: nextGen
          };
        });
      },
      2000
    );
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.interval);
  }

  handleResize = () => {
    this.setState(recreateCells);
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
    const flattenedCells = flatten(this.state.cells);
    const noLife = flattenedCells.every((e) => e === false);

    return (
      <div className="App">

        <span className="generation">
          {this.state.gen}
        </span>

        {noLife ? <Intro show/> : <Intro />}

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

const Intro = ({ show }) => (
  <div className={show ? "intro show" : "intro"}>
    <ul>
      <li>Resize or zoom your window to change the board size</li>
      <li>Press the space key to pause and resume the game</li>
      <li>Click on any cell to toggle life</li>
      <li>Press the delete key to clear the board</li>
      <li>Use the left and right arrow keys to adjust the update interval</li>
    </ul>
  </div>
);
