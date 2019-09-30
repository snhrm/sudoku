import React from 'react';
import * as _ from 'lodash';
import './App.css';
import {Field} from "./lib/ModelInterface";
import {calcArea, calcX, calcY, checkValid, createInitialField, createProblem, Invalid} from "./lib/util";
import {Area} from "./components/Area";
import {AppContext} from "./AppContext";

type Props = {};
type State = {
  field: Field;
  problem: Field;
  invalids: Invalid[];
}

class App extends React.Component<Props, State> {
  state: State = {
    field: [],
    problem: [],
    invalids: [],
  };

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckValid = this.handleCheckValid.bind(this);
    this.handleInitValid = this.handleInitValid.bind(this);
  }

  componentDidMount(): void {
    this.handleCheckValid();
    const field = createInitialField();
    this.setState({
      field,
      problem: createProblem(1, 2, field),
    })
  }

  handleChange(x: number, y: number, value?: number) {
    const newField = this.state.field.slice();

    const targetIndex = _.findIndex(newField, (cell) => {
      return cell.x === x && cell.y === y;
    });

    newField[targetIndex].value = value;

    this.setState({
      field: newField,
    })
  }

  handleCheckValid() {
    this.setState({
      invalids: checkValid(this.state.field)
    })
  }

  handleInitValid() {
    this.setState({
      invalids: []
    })
  }

  render() {
    const {field, problem, invalids} = this.state;

    return (
      <AppContext.Provider
        value={{
          field,
          problem,
          invalids,
          handleChange: this.handleChange
        }}
      >
        <div className="container">
          <div className="sudoku">
            {_.range(1, 10).map((num, i) => {
              const cells = _.filter(problem, ((cell) => {
                return cell.area === num;
              }));

              return (
                <Area
                  key={i}
                  areaNum={num}
                  cells={cells}
                />
              )
            })}
          </div>
          <button onClick={this.handleCheckValid}>check</button>
          <button onClick={this.handleInitValid}>init</button>
        </div>
        <hr/>
        <code>
          {JSON.stringify(this.state.field)}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcArea(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcX(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcY(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(checkValid(this.state.field))}
        </code>
      </AppContext.Provider>
    );
  }
}

export default App;
