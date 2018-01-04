import React, { Component } from 'react';
import './App.css';
import { 
  setCell, 
  updateCells, 
  recreateCells
} from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: null
    };
  }

  componentWillMount() {
    this.handleResize();
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.interval = setInterval(
      () => {
        this.setState((prevState) => ({
          cells: updateCells(prevState.cells)
        }));
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
