import React, { Component } from 'react';
import './App.css';
import { 
  setCell, 
  updateCells, 
  recreateCells
} from './actions';
import flatten from 'lodash/flatten';
import key from 'keymaster';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: null,
      gen: 0
    };
  }

  startGame = (time) => {
    clearInterval(this.interval);
    this.running = true;
    this.time = time;
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
      time
    );
  }

  componentWillMount() {
    this.handleResize();
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.startGame(500);
    key('space', this.handlePause);
    key('left', () => this.handleSpeed('left'));
    key('right', () => this.handleSpeed('right'));
    key('delete', this.handleClear);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.interval);
    this.running = false;
    key.unbind('space');
    key.unbind('left');
    key.unbind('right');
    key.unbind('delete');
  }

  handlePause = () => {
    if (this.running) {
      clearInterval(this.interval);
      this.running = false;
    } else {
      this.startGame(this.time);
    }
  }

  handleSpeed = (dir) => {
    let time = this.time;
    if (dir === 'right' && time > 100) {
      time -= 100;
    } else if (dir === 'left') {
      time += 100;
    }
    if (this.running) {
      this.startGame(time);
    } else {
      this.time = time;
    }
  }

  handleClear = () => {
    this.setState((prevState) => ({
      cells: prevState.cells.map(
        arr => arr.map(e => false)
      ),
      gen: 0
    }));
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
      <li>Press the <Red>space</Red> key to pause and resume the game</li>
      <li>Click on any cell to toggle life</li>
      <li>Press the <Red>delete</Red> key to clear the board</li>
      <li>Use the <Red>left</Red> and <Red>right</Red> arrow keys to adjust the game speed</li>
    </ul>
  </div>
);

const Red = (props) => (
  <span className="red">
    {props.children}
  </span>
);
